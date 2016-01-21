# -*- coding: utf-8 -*-
from collective.behavior.featuredimage import _
from collective.behavior.featuredimage.interfaces import IPackageSettings
from plone.app.registry.browser import controlpanel
from plone.formwidget.namedfile.widget import NamedImageFieldWidget


class PackageSettingsEditForm(controlpanel.RegistryEditForm):

    schema = IPackageSettings
    label = _(u'Featured Image Settings')
    description = _(u'Here you can modify the settings for collective.behavior.featuredimage.')

    def updateFields(self):
        """Update logo widget."""
        super(PackageSettingsEditForm, self).updateFields()
        self.fields['base_image'].widgetFactory = NamedImageFieldWidget


class PackageSettingsControlPanel(controlpanel.ControlPanelFormWrapper):

    form = PackageSettingsEditForm
