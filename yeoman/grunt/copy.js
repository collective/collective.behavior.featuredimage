module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '*.{ico,txt}',
        'images/{,*/}*.{webp,gif}',
        'styles/fonts/{,*/}*.*'
      ]
    }]
  },
  dev: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: '*.{ico,txt}'
    }, {
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>/styles/fonts',
      dest: '<%= yeoman.dist %>',
      src: '{,*/}*.*'
    }, {
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>/images',
      dest: '<%= yeoman.dist %>',
      src: '{,*/}*.{png,jpg,jpeg,webp,gif}'
    }, {
      expand: true,
      dot: true,
      cwd: '.tmp/concat/styles',
      dest: '<%= yeoman.dist %>',
      src: 'main.css'
    }, {
      expand: true,
      dot: true,
      cwd: '.tmp/scripts',
      dest: '<%= yeoman.dist %>',
      src: 'main.js'
    }]
  }
};
