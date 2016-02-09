module.exports = {
  options: {
    force: true
  },
  dist: ['.tmp', '<%= yeoman.dist %>/*'],
  server: '.tmp',
  aftercopy: [
    '<%= yeoman.dist %>/*.html'
  ]
};
