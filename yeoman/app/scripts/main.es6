/*global require*/
"use strict";

define('jquery', [], () => {
  return jQuery;
});

require.config({
  paths: {
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash'
  }
});

require([
  'backbone',
  'views/behaviorform'
], (Backbone, AppView) => {
  Backbone.history.start();
  if ($('#fieldset-featured-image').length > 0) {
    return new AppView();
  }
});
