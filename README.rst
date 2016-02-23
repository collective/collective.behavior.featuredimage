*********************************
collective.behavior.featuredimage
*********************************

.. contents:: Table of Contents

Life, the Universe, and Everything
----------------------------------

A behavior for Dexterity-based content types to add a featured image for sharing content on social media.

Use cases
^^^^^^^^^

Suppose you are running The Planet, a news portal that has a bunch of editors
focused on getting news on different topics, like Economy, Health or Sports.

Sometimes your news have a great catchphrase, and you want to add more appeal in this phrase
writing it into the image you share.

This package allows you to automatize this image creation with the text embedded, and set this image as a
featured image of your news.

.. figure:: https://raw.github.com/collective/collective.behavior.featuredimage/master/docs/featuredimage-example.png
    :align: center
    :height: 600px
    :width: 907px

    Featured Image example.

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

This package uses `PhantomJS <http://phantomjs.org/>`_ to create the featured image.

To enable this package in a buildout-based installation:

#. Edit your buildout.cfg and add add the following to it::

    [buildout]
    ...
    eggs =
        collective.behavior.featuredimage

    parts =
        ...
        env
        node

    [env]
    recipe = collective.recipe.environment

    [instance]
    ...
    environment-vars +=
        PATH ${buildout:bin-directory}:${env:PATH}

    [node]
    recipe = gp.recipe.node
    npms = phantomjs-prebuilt
    scripts = phantomjs

After updating the configuration you need to run ''bin/buildout'', which will take care of updating your system.

Go to the 'Site Setup' page in a Plone site and click on the 'Add-ons' link.

Check the box next to ``collective.behavior.featuredimage`` and click the 'Activate' button.

.. Note::
    You may have to empty your browser cache and save your resource registries in order to see the effects of the product installation.

Usage
^^^^^

This add-on includes a behavior to add four extra fields on Dexterity-based content types:

Enabled
    Used to indicate that this content should use the featured image.
    Enabled by default.
Quote
    The catchphrase you want to be embedded into the image.
    Uses the title field (if available) by default.
Author
    The author of the catchphrase.
Featured Image
    The featured image generated.
    This field is read-only.

Configuring the behavior
^^^^^^^^^^^^^^^^^^^^^^^^

Add the base image in the control panel configlet.

.. figure:: https://raw.github.com/collective/collective.behavior.featuredimage/master/docs/featuredimage-controlpanel.png
    :align: center
    :height: 380px
    :width: 780px

    Featured Image control panel configlet.

Enabling the behavior
^^^^^^^^^^^^^^^^^^^^^

* In 'Site Setup', select the Dexterity Content Types configlet
* Select your content type
* Go to Behaviors tab and select Featured Image

A new fieldset called Featured Image will be present in the edit form of your content type.

.. figure:: https://raw.github.com/collective/collective.behavior.featuredimage/master/featuredimage-behavior.png
    :align: center
    :height: 380px
    :width: 780px

    Featured Image behavior in action.

Development
^^^^^^^^^^^

The buildout configuration already installs PhantomJS and makes it available by updating the `PATH` environment variable.

We use yeoman and grunt to build static files, to start grunt watch run:

.. code-block:: console

    buildout_dir$ ./bin/grunt_watch

Then open the browser at http://localhost:9000 and edit the files at directory yeoman/app to customize the static files.

To build the static files run:

.. code-block:: console

    buildout_dir$ ./bin/grunt_build
