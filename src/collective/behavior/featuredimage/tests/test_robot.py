# -*- coding: utf-8 -*-
from collective.behavior.featuredimage.testing import ROBOT_TESTING
from plone.testing import layered

import os
import robotsuite
import unittest


def test_suite():
    suite = unittest.TestSuite()
    current_dir = os.path.abspath(os.path.dirname(__file__))
    tests = [
        doc for doc in os.listdir(current_dir)
        if doc.startswith('test_') and doc.endswith('.robot')
    ]
    # XXX: skip all RF tests meanwhiled
    tests = []
    suite.addTests([
        layered(
            robotsuite.RobotTestSuite(t, noncritical=['Expected Failure']),
            layer=ROBOT_TESTING)
        for t in tests
    ])
    return suite
