module.exports = {
  options: {
    sourceMap: true,
    presets: ['es2015']
  },
  dist: {
    files: [ {
      expand: true,
      cwd: '<%= yeoman.app %>/scripts',
      src: '{,*/}*.es6',
      dest: '.tmp/scripts',
      ext: '.js'
    } ]
  },
  test: {
    files: [ {
      expand: true,
      cwd: 'test/spec',
      src: '{,*/}*.es6',
      dest: '.tmp/spec',
      ext: '.js'
    } ]
  }
};
