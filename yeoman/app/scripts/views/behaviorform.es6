/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], ($, _, Backbone, JST) => {
  "use strict";

  const BehaviorformView = Backbone.View.extend({
    template: JST['app/scripts/templates/behaviorform.ejs'],

    tagName: 'div',
    id: 'featuredimage-preview',

    initialize() {
      this.render();
      $('#fieldset-featured-image').append(this.el);
      this.$iframe = this.$('iframe');
      this.$quote = $('#form-widgets-IFeaturedImage-featuredimage_quote');
      this.$author = $('#form-widgets-IFeaturedImage-featuredimage_author');
      this.$iframe.on('load', this.iframeready(this));
      this.$quote.on('input', this.updateFeaturedImage(this));
      this.$author.on('input', this.updateFeaturedImage(this));
    },

    render() {
      let data;
      data = {
        source: 'featuredimage.html'
      };
      if (location.port !== "9000") {
        data.source = `${$('head base').attr('href')}/@@featuredimage`;
      }
      data.source = data.source.replace(/\/\//g, '/');
      data.source = data.source.replace(/http\:\//g, 'http://');
      this.$el.html(this.template(data));
    },

    iframeready(_this) {
      return function() {
        let screenImage, theImage;
        _this.$featuredimage = $('#featuredimage', _this.$iframe[0].contentWindow.document.body);
        screenImage = $('img', _this.$featuredimage);
        theImage = new Image();
        theImage.src = screenImage.attr('src');
        theImage.onload = function() {
          _this.$el.width(this.width / 2 + 10);
          _this.$el.height(this.height / 2 + 10);
          _this.$iframe.width(this.width + 10);
          _this.$iframe.height(this.height + 10);
          _this.updateFeaturedImage(_this)();
        }
      };
    },

    updateFeaturedImage(_this) {
      return function() {
        let $iframeAuthor, $iframeQuote;
        $iframeQuote = $('.quote .text', _this.$featuredimage);
        $iframeAuthor = $('.quote .author', _this.$featuredimage);
        $iframeQuote.html(_this.$quote.val());
        $iframeAuthor.html(_this.$author.val());
      };
    }
  });
  return BehaviorformView;
});
