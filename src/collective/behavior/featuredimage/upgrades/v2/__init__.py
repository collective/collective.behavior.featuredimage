# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.config import PROJECTNAME
from plone.app.upgrade.utils import loadMigrationProfile

import logging


def apply_profile(context):
    """Apply profile."""
    logger = logging.getLogger(PROJECTNAME)
    profile = 'profile-collective.behavior.featuredimage.upgrades.v2:default'
    loadMigrationProfile(context, profile)
    logger.info('Profile migrated.')
