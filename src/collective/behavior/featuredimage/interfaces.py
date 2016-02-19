# -*- coding: utf-8 -*-
from collective.behavior.featuredimage import _
from collective.behavior.featuredimage.utils import validate_base_image
from plone.directives import form
from zope import schema
from zope.interface import Interface


class IBrowserLayer(Interface):

    """A layer specific for this add-on product."""


class IPackageSettings(form.Schema):

    """Schema for the control panel form."""

    base_image = schema.ASCII(
        title=_(u'Base image'),
        description=_(u'Base image used to create featured image.'),
        required=True,
        constraint=validate_base_image
    )

    theme = schema.Choice(
        title=_(u'Theme'),
        vocabulary='collective.behavior.featuredimage.Theme',
        default=u'light',
        required=True
    )
