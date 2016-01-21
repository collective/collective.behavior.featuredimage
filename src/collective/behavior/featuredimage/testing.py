# -*- coding: utf-8 -*-
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
import shutil


def load_file(name, size=0):
    """Load file from testing directory"""
    path = '/tmp/{0}'.format(name)
    with open(path, 'rb') as f:
        data = f.read()
    return data


def encode_image(image):
    """Return image encoded in base64"""
    return b64encode_file(image, load_file(image))


class Fixture(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load ZCML
        import collective.behavior.featuredimage
        self.loadZCML(package=collective.behavior.featuredimage)
        self.loadZCML(package=collective.behavior.featuredimage, name='testing.zcml')

    def setUpPloneSite(self, portal):
        self.applyProfile(
            portal, 'collective.behavior.featuredimage:default')
        self.applyProfile(
            portal, 'collective.behavior.featuredimage:testfixture')

        current_dir = os.path.abspath(os.path.dirname(__file__))
        img_path = os.path.join(current_dir, 'tests', 'featuredimage-base.png')
        shutil.copy2(img_path, '/tmp')


class RobotFixture(Fixture):

    """This fixture adds content to test the standout journalism validator."""

    def setUpPloneSite(self, portal):
        super(RobotFixture, self).setUpPloneSite(portal)
        api.portal.set_registry_record(
            IPackageSettings.__identifier__ + '.base_image',
            encode_image('featuredimage-base.png')
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
