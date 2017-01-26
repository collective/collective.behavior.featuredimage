class BehaviorformView {
  constructor() {
    this.render();
    this.$el = $('#featuredimage-preview');
    this.$iframe = $('iframe');
    this.$quote = $('#form-widgets-IFeaturedImage-featuredimage_quote');
    this.$author = $('#form-widgets-IFeaturedImage-featuredimage_author');
    this.$iframe.on('load', $.proxy(this.iframeready, this));
    this.$quote.on('input', $.proxy(this.updateFeaturedImage, this));
    this.$author.on('input', $.proxy(this.updateFeaturedImage, this));
  }

  render() {
    var template = `
      <div id="featuredimage-preview">
        <iframe src="${portal_url}/@@featuredimage"
                        frameborder="0"
                        scrolling="no"></iframe>
      </div>
    `
    $('#fieldset-featured-image').append(template);
  }

  iframeready(e) {
    e.preventDefault();
    let screenImage, theImage;
    this.$featuredimage = $('#featuredimage', this.$iframe[0].contentWindow.document.body);
    screenImage = $('img', this.$featuredimage);
    theImage = new Image();
    theImage.src = screenImage.attr('src');
    theImage.onload = function(that) {
      return function() {
        that.$el.width(this.width / 2 + 10);
        that.$el.height(this.height / 2 + 10);
        that.$iframe.width(this.width + 10);
        that.$iframe.height(this.height + 10);
        that.updateFeaturedImage();
      }
    }(this)
  }

  updateFeaturedImage(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    let $iframeAuthor, $iframeQuote;
    $iframeQuote = $('.quote .text', this.$featuredimage);
    $iframeAuthor = $('.quote .author', this.$featuredimage);
    $iframeQuote.html(this.$quote.val());
    $iframeAuthor.html(this.$author.val());
  }
}

module.exports = BehaviorformView;
