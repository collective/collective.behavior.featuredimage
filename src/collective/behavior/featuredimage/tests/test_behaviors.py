# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.testing import INTEGRATION_TESTING
from plone import api

import unittest


class BehaviorsTestCase(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']

        with api.env.adopt_roles(['Manager']):
            self.obj = api.content.create(self.portal, 'News Item', 'foo')

    def test_featuredimage_behavior(self):
        from collective.behavior.featuredimage.behaviors.interfaces import IFeaturedImage
        self.assertTrue(IFeaturedImage.providedBy(self.obj))

    def test_fields(self):
        self.assertTrue(self.obj.featuredimage_enabled)
        self.assertIsNone(self.obj.featuredimage_quote)
        self.assertIsNone(self.obj.featuredimage_author)

        self.obj.featuredimage_enabled = True
        quote = (
            u'Give me six hours to chop down a tree and '
            u'I will spend the first four sharpening the axe.'
        )
        author = u'Abraham Lincoln'

        self.obj.featuredimage_quote = quote
        self.obj.featuredimage_author = author
        self.assertTrue(self.obj.featuredimage_enabled)
        self.assertEqual(self.obj.featuredimage_quote, quote)
        self.assertEqual(self.obj.featuredimage_author, author)
