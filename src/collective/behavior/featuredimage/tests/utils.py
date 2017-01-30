# -*- coding: utf-8 -*-
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import queryUtility


def enable_featured_image_behavior(portal_type):
    """Enable Related Items behavior on the specified portal type."""
    fti = queryUtility(IDexterityFTI, name=portal_type)
    behavior = 'collective.behavior.featuredimage.behaviors.interfaces.IFeaturedImage'
    if behavior in fti.behaviors:
        return
    behaviors = list(fti.behaviors)
    behaviors.append(behavior)
    fti.behaviors = tuple(behaviors)
