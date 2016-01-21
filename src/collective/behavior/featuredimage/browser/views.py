# -*- coding: utf-8 -*-
from zope.publisher.browser import BrowserView


class FeaturedImage(BrowserView):

    """View featured image html"""

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
