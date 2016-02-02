module.exports = {
  dist: {
    files: {
      '<%= yeoman.dist %>/main.css': [
        '.tmp/styles/{,*/}*.css',
        '<%= yeoman.app %>/styles/{,*/}*.css'
      ]
    }
  }
};
