# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.interfaces import IBrowserLayer
from collective.behavior.featuredimage.testing import INTEGRATION_TESTING
from plone import api
from zope.interface import alsoProvides

import unittest


class FeaturedImageTestCase(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.request = self.layer['request']
        alsoProvides(self.request, IBrowserLayer)
        with api.env.adopt_roles(['Manager']):
            self.obj = api.content.create(
                self.portal, 'News Item', 'foo', title='Extra! Extra!')
        self.view = api.content.get_view(u'featuredimage', self.obj, self.request)

    def test_quote(self):
        self.assertEqual(self.view.quote(), 'Extra! Extra!')
        quote = (
            u'Give me six hours to chop down a tree and '
            u'I will spend the first four sharpening the axe.'
        )
        self.obj.featuredimage_quote = quote
        self.assertEqual(self.view.quote(), quote)

    def test_author(self):
        self.assertEqual(self.view.author(), 'test_user_1_')
        self.obj.featuredimage_author = u'Abraham Lincoln'
        self.assertEqual(self.view.author(), u'Abraham Lincoln')
