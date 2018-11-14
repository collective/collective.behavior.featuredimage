# coding: utf-8
from collective.behavior.featuredimage import _
from collective.behavior.featuredimage.logger import logger
from cStringIO import StringIO
from PIL import Image
from plone import api
from plone.namedfile.file import NamedBlobImage
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

import signal
import transaction


def _get_screenshot(page, request):
    """Get a screenshot of the fetured image. Do not fail in case of
    errors, but store an image of the whole page.
    """
    browser = webdriver.PhantomJS()
    browser.implicitly_wait(1)  # seconds

    # Use minimun image size while don't break image proportion
    browser.set_window_size(1300, 1300)
    browser.get(page)
    data = browser.get_screenshot_as_png()

    location = size = None
    try:
        el = browser.find_element_by_id('featuredimage')
        location, size = el.location, el.size
    except NoSuchElementException:
        logger.error('An error ocurred while generating the featured image')
        msg = _(
            'featured_image_generation_error',
            default=u'An error ocurred while generating the featured image. '
                    u'Please revert the workflow state. '
                    u'The image generated can be used for further analysis.')
        api.portal.show_message(msg, request=request, type='error')
    finally:
        # XXX: quit() does not terminate PhantomJS process
        #      https://github.com/SeleniumHQ/selenium/issues/767
        browser.service.process.send_signal(signal.SIGTERM)
        browser.quit()

    im = Image.open(StringIO(data))
    if location and size:  # crop image
        im = im.crop((
            location['x'], location['y'],
            location['x'] + size['width'],
            location['y'] + size['height']
        ))
    output = StringIO()
    im.save(output, 'PNG', optimize=True)
    data = output.getvalue()
    output.close()

    return data


def update_featuredimage(context, event):
    """Update Fetured Image after save content"""
    if not context.featuredimage_enabled:
        return
    page = '{0}/@@featuredimage'.format(context.absolute_url())
    # integration tests don't work with phantomjs
    if page.startswith('http://nohost/'):
        return
    # without this phantomjs look the old page
    transaction.commit()
    # get screenshot
    logger.info('Getting screenshot for: ' + page)
    data = _get_screenshot(page, context.REQUEST)
    # save image
    image = NamedBlobImage()
    image._setData(data)
    context.featured_image = image
