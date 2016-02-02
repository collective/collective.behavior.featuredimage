module.exports = {
  options: {
    map: false,
    parser: require('postcss-scss'),
    processors: [
      require('precss')(), require('autoprefixer')({
        browsers: 'last 3 versions'
      }), require('postcss-cssnext')()
    ]
  },
  dist: {
    src: '<%= yeoman.app %>/styles/main.scss',
    dest: '.tmp/styles/main.css'
  }
};
