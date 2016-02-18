# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.interfaces import validate_base_image
from collective.behavior.featuredimage.testing import get_encoded_image
from collective.behavior.featuredimage.testing import INTEGRATION_TESTING
from zope.interface import Invalid

import unittest


class UtilsTestCase(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']

    def test_validate_logo_constraint(self):
        invalid_images = (
            'fractal_wrong_size.png',
            'fractal_wrong_format.jpg',
            'fractal_wrong_dimensions.png'
        )
        for image in invalid_images:
            data = get_encoded_image(image)
            with self.assertRaises(Invalid):
                validate_base_image(data)

        data = get_encoded_image('fractal_ok.png')
        self.assertTrue(validate_base_image(data))
