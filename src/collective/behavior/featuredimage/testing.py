# -*- coding: utf-8 -*-
"""Setup testing infrastructure.

For Plone 5 we need to manually install plone.app.contenttypes.
"""
from collective.behavior.featuredimage.interfaces import IPackageSettings
from plone import api
from plone.app.robotframework.testing import AUTOLOGIN_LIBRARY_FIXTURE
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import PloneSandboxLayer
from plone.formwidget.namedfile.converter import b64encode_file
from plone.testing import z2

import os

PLONE_VERSION = api.env.plone_version()


def get_encoded_image(filename):
    """Return image encoded in base64."""
    cwd = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(cwd, 'tests', filename)
    with open(path, 'rb') as f:
        data = f.read()
    return b64encode_file(filename, data)


class Fixture(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        if PLONE_VERSION >= '5.0':
            import plone.app.contenttypes
            self.loadZCML(package=plone.app.contenttypes)

        import collective.behavior.featuredimage
        self.loadZCML(package=collective.behavior.featuredimage)
        self.loadZCML(package=collective.behavior.featuredimage, name='testing.zcml')

    def setUpPloneSite(self, portal):
        if PLONE_VERSION >= '5.0':
            self.applyProfile(portal, 'plone.app.contenttypes:default')

        self.applyProfile(portal, 'collective.behavior.featuredimage:default')
        self.applyProfile(portal, 'collective.behavior.featuredimage:testfixture')


class RobotFixture(Fixture):

    """This fixture adds content to test the standout journalism validator."""

    def setUpPloneSite(self, portal):
        super(RobotFixture, self).setUpPloneSite(portal)
        api.portal.set_registry_record(
            IPackageSettings.__identifier__ + '.base_image',
            get_encoded_image('featuredimage-base.png')
        )


FIXTURE = Fixture()

INTEGRATION_TESTING = IntegrationTesting(
    bases=(FIXTURE,),
    name='collective.behavior.featuredimage:Integration')

FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(FIXTURE,),
    name='collective.behavior.featuredimage:Functional')

ROBOTFIXTURE = RobotFixture()

ROBOT_TESTING = FunctionalTesting(
    bases=(ROBOTFIXTURE, AUTOLOGIN_LIBRARY_FIXTURE, z2.ZSERVER_FIXTURE),
    name='collective.behavior.featuredimage:Robot',
)
