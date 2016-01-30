#/*global require*/
'use strict'

# http://www.manuel-strehl.de/dev/load_jquery_before_requirejs.en.html
define 'jquery', [], ->
    return jQuery

require.config
  paths:
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/lodash/dist/lodash'

require [
  'backbone'
  'views/behaviorform'
], (Backbone, AppView) ->
  Backbone.history.start()
  if $('#fieldset-featured-image').length > 0
    new AppView()
