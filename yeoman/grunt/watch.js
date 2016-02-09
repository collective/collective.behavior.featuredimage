module.exports = function(grunt, options){
  return {
    options: {
      nospawn: true,
      livereload: grunt.LIVERELOAD_PORT
    },
    babel: {
      files: [ '<%= yeoman.app %>/scripts/{,*/}*.es6' ],
      tasks: [ 'babel:dist' ]
    },
    babelTest: {
      files: [ 'test/spec/{,*/}*.es6' ],
        tasks: [ 'babel:test' ]
    },
    postcss: {
      files: ['<%= yeoman.app %>/styles/{,*/}*.scss'],
      tasks: ['csscomb', 'postcss']
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
    },
    test: {
      files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
      tasks: ['test:true']
    }
  };
};
