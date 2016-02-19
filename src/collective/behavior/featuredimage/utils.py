# -*- coding: utf-8 -*-
from collective.behavior.featuredimage import _
from cStringIO import StringIO
from PIL import Image
from plone.formwidget.namedfile.converter import b64decode_file
from zope.interface import Invalid


def validate_base_image(value):
    """Validate the base image used to create featured image.

    The image must follow these specifications:
    * .png format
    * be at least 1200 x 630 pixels
    * should be smaller that 1MB

    :param value: Image encoded into base64 to be validated
    :type value: string
    :raises:
        :class:`~zope.interface.Invalid` if the image is not valid
    """
    if not value:
        return False

    filename, data = b64decode_file(value)

    # check size
    if len(data) > 1048576:
        raise Invalid(_(u'Image should be smaller than 1MB.'))

    img = Image.open(StringIO(data))

    # check format
    if img.format != 'PNG':
        raise Invalid(_(u'Image should be in PNG format.'))

    # check image dimensions
    width, height = img.size
    if not(width >= 1200 and height >= 630):
        raise Invalid(_(
            u'Image must be at least 1200 x 630 pixels for the best display on high resolution devices.'
        ))

    return True
