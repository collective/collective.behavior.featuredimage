# -*- coding: utf-8 -*-
from collective.behavior.featuredimage import _
from collective.behavior.featuredimage.interfaces import IPackageSettings
from plone.app.registry.browser import controlpanel


class PackageSettingsEditForm(controlpanel.RegistryEditForm):

    schema = IPackageSettings
    label = _(u'Package Settings')
    description = _(u'Here you can modify the settings for collective.behavior.featuredimage.')


class PackageSettingsControlPanel(controlpanel.ControlPanelFormWrapper):

    form = PackageSettingsEditForm
