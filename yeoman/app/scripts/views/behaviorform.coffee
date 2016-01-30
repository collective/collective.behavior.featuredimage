'use strict';

define [
    'underscore'
    'backbone'
    'templates'
], (_, Backbone, JST) ->
  class Behaviorform extends Backbone.View
    template: JST['app/scripts/templates/behaviorform.ejs']
    tagName: 'div'
    id: 'featuredimage-preview'

    initialize: () ->
      @render()
      $('#fieldset-featured-image').append @el
      @$iframe = @$('iframe')
      @$quote = $('#form-widgets-IFeaturedImage-featuredimage_quote')
      @$author = $('#form-widgets-IFeaturedImage-featuredimage_author')
      @$iframe.on 'load', @iframeready
      @$quote.on 'input', @updateFeaturedImage
      @$author.on 'input', @updateFeaturedImage

    render: () ->
      data =
        source: 'featuredimage.html'
      if location.port != "9000"  # Production
        data.source = "#{$('head base').attr('href')}/@@featuredimage"
      @$el.html @template(data)
      return @

    iframeready: () =>
      @$featuredimage = $(
        '#featuredimage'
        @$iframe[0].contentWindow.document.body
      )
      @$el.width(@$featuredimage.width() / 2 + 10)
      @$el.height(@$featuredimage.height() / 2 + 10)
      @$iframe.width(@$featuredimage.width() + 10)
      @$iframe.height(@$featuredimage.height() + 10)
      @updateFeaturedImage()

    updateFeaturedImage: () =>
      $iframeQuote = $('.quote .text', @$featuredimage)
      $iframeAuthor = $('.quote .author', @$featuredimage)
      $iframeQuote.html(@$quote.val())
      $iframeAuthor.html(@$author.val())
