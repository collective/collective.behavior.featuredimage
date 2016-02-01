# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.interfaces import IPackageSettings
from plone import api
from zope.publisher.browser import BrowserView


class FeaturedImage(BrowserView):

    """View featured image html"""

    def theme(self):
        """Return theme"""
        return api.portal.get_registry_record(
            IPackageSettings.__identifier__ + '.theme'
        )

    def quote(self):
        """Return quote"""
        if not self.context.featuredimage_quote:
            return self.context.Title()
        return self.context.featuredimage_quote

    def author(self):
        """Return author"""
        if not self.context.featuredimage_author:
            return self.context.Creator()
        return self.context.featuredimage_author
