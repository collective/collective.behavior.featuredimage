# coding: utf-8
from cStringIO import StringIO
from PIL import Image
from plone.namedfile.file import NamedBlobImage
from selenium import webdriver

import signal
import transaction


def _get_screenshot(page):
    """Get screenshot of Fetured Image"""
    browser = webdriver.PhantomJS()
    browser.implicitly_wait(1)  # seconds

    # Use minimun image size while don't break image proportion
    browser.set_window_size(1300, 1300)
    browser.get(page)
    data = browser.get_screenshot_as_png()
    el = browser.find_element_by_id('featuredimage')
    location, size = el.location, el.size

    # XXX: quit() does not terminate PhantomJS process
    #      https://github.com/SeleniumHQ/selenium/issues/767
    browser.service.process.send_signal(signal.SIGTERM)
    browser.quit()

    # crop image
    im = Image.open(StringIO(data))
    im = im.crop((
        location['x'], location['y'],
        location['x'] + size['width'],
        location['y'] + size['height']
    ))
    output = StringIO()
    im.save(output, 'PNG')
    data = output.getvalue()
    output.close()
    return data


def update_featuredimage(context, event):
    """Update Fetured Image after save content"""
    if not context.featuredimage_enabled:
        return
    page = u'{0}/@@featuredimage'.format(context.absolute_url())
    # integration tests don't work with phantomjs
    if page.startswith('http://nohost/'):
        return
    # without this phantomjs look the old page
    transaction.commit()
    # get screenshot
    data = _get_screenshot(page)
    # save image
    image = NamedBlobImage()
    image._setData(data)
    context.featured_image = image
