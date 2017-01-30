# -*- coding: utf-8 -*-
"""Setup testing fixture.

We need to install plone.app.contenttypes always.
"""
from collective.behavior.featuredimage.interfaces import IPackageSettings
from collective.behavior.featuredimage.tests.utils import enable_featured_image_behavior
from plone import api
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE as PLONE_FIXTURE
from plone.app.robotframework.testing import AUTOLOGIN_LIBRARY_FIXTURE
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PloneSandboxLayer
from plone.formwidget.namedfile.converter import b64encode_file
from plone.testing import z2

import os

IS_PLONE_5 = api.env.plone_version().startswith('5')


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
        import collective.behavior.featuredimage
        self.loadZCML(package=collective.behavior.featuredimage)

    def setUpPloneSite(self, portal):
        self.applyProfile(portal, 'collective.behavior.featuredimage:default')
        enable_featured_image_behavior('News Item')


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
