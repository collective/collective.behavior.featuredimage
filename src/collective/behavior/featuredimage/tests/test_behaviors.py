# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.testing import INTEGRATION_TESTING
from plone import api

import unittest


class BehaviorsTestCase(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']

        with api.env.adopt_roles(['Manager']):
            self.folder = api.content.create(self.portal, 'Folder', 'folder')

        self.dummy1 = api.content.create(self.folder, 'Dexterity Item', 'd1')

    def test_featuredimage_behavior(self):
        from collective.behavior.featuredimage.behaviors.interfaces import IFeaturedImage
        self.assertTrue(IFeaturedImage.providedBy(self.dummy1))

    def test_fields(self):
        self.assertTrue(self.dummy1.featuredimage_enabled)
        self.assertIsNone(self.dummy1.featuredimage_quote)
        self.assertIsNone(self.dummy1.featuredimage_author)

        self.dummy1.featuredimage_enabled = True
        quote = (
            u'Give me six hours to chop down a tree and '
            u'I will spend the first four sharpening the axe.'
        )
        author = u'Abraham Lincoln'

        self.dummy1.featuredimage_quote = quote
        self.dummy1.featuredimage_author = author
        self.assertTrue(self.dummy1.featuredimage_enabled)
        self.assertEqual(self.dummy1.featuredimage_quote, quote)
        self.assertEqual(self.dummy1.featuredimage_author, author)
