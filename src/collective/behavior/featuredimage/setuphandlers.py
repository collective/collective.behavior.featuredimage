# -*- coding: utf-8 -*-
from Products.CMFPlone import interfaces as Plone
from Products.CMFQuickInstallerTool import interfaces as QuickInstaller
from zope.interface import implements


class HiddenProfiles(object):

    implements(Plone.INonInstallable)

    def getNonInstallableProfiles(self):
        """Do not show on Plone's list of installable profiles."""
        return [
            u'collective.behavior.featuredimage:uninstall',
            u'collective.behavior.featuredimage.upgrades.v2:default',
        ]


class HiddenProducts(object):

    implements(QuickInstaller.INonInstallable)

    def getNonInstallableProducts(self):
        """Do not show on QuickInstaller's list of installable products."""
        return [
            u'collective.behavior.featuredimage.upgrades.v2',
        ]
