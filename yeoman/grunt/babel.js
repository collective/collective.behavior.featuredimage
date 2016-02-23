module.exports = {
  options: {
    sourceMap: true,
    presets: ['es2015']
  },
  dist: {
    files: [ {
      expand: true,
      cwd: '<%= yeoman.app %>/scripts',
      src: '{,*/}*.js',
      dest: '.tmp/scripts',
      ext: '.js'
    } ]
  },
  test: {
    files: [ {
      expand: true,
      cwd: 'test/spec',
      src: '{,*/}*.js',
      dest: '.tmp/spec',
      ext: '.js'
    } ]
  }
};
