# -*- coding: utf-8 -*-
from collective.behavior.featuredimage import _
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


def ThemeVocabulary(context):
    """Vocabulary factory for theme options."""

    return SimpleVocabulary([
        SimpleTerm(value=u'light', title=_(u'Light')),
        SimpleTerm(value=u'dark', title=_(u'Dark')),
        SimpleTerm(value=u'custom', title=_(u'Custom'))
    ])
