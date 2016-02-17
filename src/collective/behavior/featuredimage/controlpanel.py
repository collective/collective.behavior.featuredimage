# -*- coding: utf-8 -*-
from collective.behavior.featuredimage import _
from collective.behavior.featuredimage.interfaces import IPackageSettings
from plone.app.registry.browser import controlpanel
from plone.formwidget.namedfile.widget import NamedImageFieldWidget


class PackageSettingsEditForm(controlpanel.RegistryEditForm):

    schema = IPackageSettings
    label = _(u'Featured Image')
    description = _(u'Settings of the Featured Image.')

    def updateFields(self):
        """Update logo widget."""
        super(PackageSettingsEditForm, self).updateFields()
        self.fields['base_image'].widgetFactory = NamedImageFieldWidget


class PackageSettingsControlPanel(controlpanel.ControlPanelFormWrapper):

    form = PackageSettingsEditForm
