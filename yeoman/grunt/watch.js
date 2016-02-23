module.exports = function(grunt, options){
  return {
    options: {
      nospawn: true,
      livereload: grunt.LIVERELOAD_PORT
    },
    babel: {
      files: [ '<%= yeoman.app %>/scripts/{,*/}*.js' ],
      tasks: [
        'babel:dist',
        'createDefaultTemplate',
        'jst',
        'useminPrepare',
        'htmlmin',
        'concat',
        'requirejs',
        'copy:dev',
        'clean:aftercopy'
      ]
    },
    babelTest: {
      files: [ 'test/spec/{,*/}*.js' ],
        tasks: [ 'babel:test' ]
    },
    postcss: {
      files: ['<%= yeoman.app %>/styles/{,*/}*.scss'],
      tasks: [
        'csscomb',
        'postcss',
        'useminPrepare',
        'htmlmin',
        'concat',
        'copy:dev',
        'clean:aftercopy'
      ]
    },
    livereload: {
      options: {
        livereload: grunt.option('livereloadport') || grunt.LIVERELOAD_PORT
      },
      files: [
        '<%= yeoman.app %>/*.html',
        '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
        '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
        '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
        'test/spec/**/*.js'
      ]
    },
    jst: {
      files: [
        '<%= yeoman.app %>/scripts/templates/*.ejs'
      ],
      tasks: ['jst']
    }
  };
};
