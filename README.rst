*********************************
collective.behavior.featuredimage
*********************************

.. contents:: Table of Contents

Life, the Universe, and Everything
----------------------------------

A behavior for Dexterity-based content types to add a featured image for sharing content on social media.

Mostly Harmless
---------------

.. image:: http://img.shields.io/pypi/v/collective.behavior.featuredimage.svg
   :target: https://pypi.python.org/pypi/collective.behavior.featuredimage

.. image:: https://img.shields.io/travis/collective/collective.behavior.featuredimage/master.svg
    :target: http://travis-ci.org/collective/collective.behavior.featuredimage

.. image:: https://img.shields.io/coveralls/collective/collective.behavior.featuredimage/master.svg
    :target: https://coveralls.io/r/collective/collective.behavior.featuredimage

Got an idea? Found a bug? Let us know by `opening a support ticket <https://github.com/collective/collective.behavior.featuredimage/issues>`_.

Don't Panic
-----------

Installation
^^^^^^^^^^^^

To enable this package in a buildout-based installation:

#. Edit your buildout.cfg and add add the following to it::

    [buildout]
    ...
    eggs =
        collective.behavior.featuredimage

After updating the configuration you need to run ''bin/buildout'', which will take care of updating your system.

Go to the 'Site Setup' page in a Plone site and click on the 'Add-ons' link.

Check the box next to ``collective.behavior.featuredimage`` and click the 'Activate' button.

.. Note::
    You may have to empty your browser cache and save your resource registries
    in order to see the effects of the product installation.

Usage
^^^^^
