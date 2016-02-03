/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var BehaviorformView = Backbone.View.extend({
    template: JST['app/scripts/templates/behaviorform.ejs'],

    tagName: 'div',
    id: 'featuredimage-preview',

    initialize: function() {
      this.render();
      $('#fieldset-featured-image').append(this.el);
      this.$iframe = this.$('iframe');
      this.$quote = $('#form-widgets-IFeaturedImage-featuredimage_quote');
      this.$author = $('#form-widgets-IFeaturedImage-featuredimage_author');
      this.$iframe.on('load', this.iframeready(this));
      this.$quote.on('input', this.updateFeaturedImage(this));
      this.$author.on('input', this.updateFeaturedImage(this));
    },

    render: function() {
      var data;
      data = {
        source: 'featuredimage.html'
      };
      if (location.port !== "9000") {
        data.source = ($('head base').attr('href')) + "/@@featuredimage";
      }
      this.$el.html(this.template(data));
    },

    iframeready: (function(_this) {
      return function() {
        _this.$featuredimage = $('#featuredimage', _this.$iframe[0].contentWindow.document.body);
        _this.$el.width(_this.$featuredimage.width() / 2 + 10);
        _this.$el.height(_this.$featuredimage.height() / 2 + 10);
        _this.$iframe.width(_this.$featuredimage.width() + 10);
        _this.$iframe.height(_this.$featuredimage.height() + 10);
        _this.updateFeaturedImage();
      };
    }),

    updateFeaturedImage: (function(_this) {
      return function() {
        var $iframeAuthor, $iframeQuote;
        $iframeQuote = $('.quote .text', _this.$featuredimage);
        $iframeAuthor = $('.quote .author', _this.$featuredimage);
        $iframeQuote.html(_this.$quote.val());
        $iframeAuthor.html(_this.$author.val());
      };
    })
  });
  return BehaviorformView;
});
