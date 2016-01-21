# coding: utf-8
from collective.behavior.featuredimage import _
from plone.directives import form
from plone.namedfile import field
from plone.supermodel import model
from zope import schema
from zope.interface import provider


@provider(form.IFormFieldProvider)
class IFeaturedImage(model.Schema):

    """Behavior interface to add some Featured Image features."""

    model.fieldset(
        'featured-image',
        label=_(u'Featured Image'),
        fields=[
            'featuredimage_enabled',
            'featuredimage_quote',
            'featuredimage_author',
            'featured_image'
        ],
    )

    featuredimage_enabled = schema.Bool(
        title=_(u'Enable Featured Image'),
        description=_(u'Enable featured image for this content'),
        required=False,
        default=True
    )

    featuredimage_quote = schema.TextLine(
        title=_(u'Quote'),
        required=False,
    )

    featuredimage_author = schema.TextLine(
        title=_(u'Author'),
        required=False,
    )

    form.omitted('featured_image')
    featured_image = field.NamedBlobImage(
        title=_(u'Featured Image'),
        required=False,
    )
