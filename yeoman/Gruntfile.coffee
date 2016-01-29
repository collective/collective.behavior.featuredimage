'use strict'
LIVERELOAD_PORT = 35729
SERVER_PORT = 9000
lrSnippet = require('connect-livereload')(port: LIVERELOAD_PORT)

mountFolder = (connect, dir) ->
  connect.static require('path').resolve(dir)

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to match all subfolders:
# 'test/spec/**/*.js'
# templateFramework: 'lodash'

module.exports = (grunt) ->
  # show elapsed time at the end
  require('time-grunt') grunt
  # Automatically load required Grunt tasks
  require('jit-grunt') grunt, useminPrepare: 'grunt-usemin'
  # configurable paths
  yeomanConfig =
    app: 'app'
    dist: '../src/collective/behavior/featuredimage/static'
  grunt.initConfig
    yeoman: yeomanConfig
    watch:
      options:
        nospawn: true
        livereload: LIVERELOAD_PORT
      coffee:
        files: [ '<%= yeoman.app %>/scripts/{,*/}*.coffee' ]
        tasks: [ 'coffee:dist' ]
      coffeeTest:
        files: [ 'test/spec/{,*/}*.coffee' ]
        tasks: [ 'coffee:test' ]
      postcss:
        files: [ '<%= yeoman.app %>/styles/{,*/}*.scss' ]
        tasks: [
          'csscomb'
          'postcss'
        ]
      livereload:
        options: livereload: grunt.option('livereloadport') or LIVERELOAD_PORT
        files: [
          '<%= yeoman.app %>/*.html'
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css'
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js'
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
          '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}'
          'test/spec/**/*.js'
        ]
      jst:
        files: [ '<%= yeoman.app %>/scripts/templates/*.ejs' ]
        tasks: [ 'jst' ]
      test:
        files: [
          '<%= yeoman.app %>/scripts/{,*/}*.js'
          'test/spec/**/*.js'
        ]
        tasks: [ 'test:true' ]
    connect:
      options:
        port: grunt.option('port') or SERVER_PORT
        hostname: 'localhost'
      livereload: options: middleware: (connect) ->
        [
          lrSnippet
          mountFolder(connect, '.tmp')
          mountFolder(connect, yeomanConfig.app)
        ]
      test: options:
        port: 9001
        middleware: (connect) ->
          [
            mountFolder(connect, 'test')
            lrSnippet
            mountFolder(connect, '.tmp')
            mountFolder(connect, yeomanConfig.app)
          ]
      dist: options: middleware: (connect) ->
        [ mountFolder(connect, yeomanConfig.dist) ]
    open:
      server: path: 'http://localhost:<%= connect.options.port %>'
      test: path: 'http://localhost:<%= connect.test.options.port %>'
    clean:
      options: force: true
      dist: [
        '.tmp'
        '<%= yeoman.dist %>/*'
      ]
      server: '.tmp'
      afterbuild: [
        '<%= yeoman.dist %>/*.html'
        '<%= yeoman.dist %>/images/featuredimage-base.png'
      ]
    jshint:
      options:
        jshintrc: '.jshintrc'
        reporter: require('jshint-stylish')
      all: [
        'Gruntfile.js'
        '<%= yeoman.app %>/scripts/{,*/}*.js'
        '!<%= yeoman.app %>/scripts/vendor/*'
        'test/spec/{,*/}*.js'
      ]
    mocha: all: options:
      run: true
      urls: [ 'http://localhost:<%= connect.test.options.port %>/index.html' ]
    coffee:
      dist: files: [ {
        expand: true
        cwd: '<%= yeoman.app %>/scripts'
        src: '{,*/}*.coffee'
        dest: '.tmp/scripts'
        ext: '.js'
      } ]
      test: files: [ {
        expand: true
        cwd: 'test/spec'
        src: '{,*/}*.coffee'
        dest: '.tmp/spec'
        ext: '.js'
      } ]
    csscomb: dist: files: 'app/styles/main.scss': [ 'app/styles/main.scss' ]
    postcss:
      options:
        map: false
        processors: [
          require('autoprefixer')(browsers: 'last 3 versions')
          require('postcss-cssnext')()
          require('postcss-nested')()
        ]
      server:
        src: '<%= yeoman.app %>/styles/{,*/}*.scss'
        dest: '.tmp/styles/main.css'
      dist:
        src: '<%= yeoman.app %>/styles/{,*/}*.scss'
        dest: '.tmp/styles/main.css'
    requirejs: dist: options:
      almond: true
      replaceRequireScript: [ {
        files: [ '<%= yeoman.dist %>/index.html' ]
        module: 'main'
      } ]
      modules: [ { name: 'main' } ]
      baseUrl: '<%= yeoman.app %>/scripts'
      paths: 'main': '../../.tmp/scripts/main'
      keepBuildDir: true
      allowSourceOverwrites: true
      mainConfigFile: '.tmp/scripts/main.js'
      dir: '.tmp/scripts'
      optimize: 'none'
      useStrict: true
      wrap: true
    uglify: dist: files: '<%= yeoman.dist %>/scripts/main.js': [ '.tmp/scripts/main.js' ]
    useminPrepare:
      html: '<%= yeoman.app %>/index.html'
      options: dest: '<%= yeoman.dist %>'
    usemin:
      html: [ '<%= yeoman.dist %>/{,*/}*.html' ]
      css: [ '<%= yeoman.dist %>/styles/{,*/}*.css' ]
      options: dirs: [ '<%= yeoman.dist %>' ]
    imagemin: dist: files: [ {
      expand: true
      cwd: '<%= yeoman.app %>/images'
      src: '{,*/}*.{png,jpg,jpeg}'
      dest: '<%= yeoman.dist %>/images'
    } ]
    cssmin: dist: files: '<%= yeoman.dist %>/styles/main.css': [
      '.tmp/styles/{,*/}*.css'
      '<%= yeoman.app %>/styles/{,*/}*.css'
    ]
    htmlmin: dist:
      options: {}
      files: [ {
        expand: true
        cwd: '<%= yeoman.app %>'
        src: '*.html'
        dest: '<%= yeoman.dist %>'
      } ]
    copy: dist: files: [ {
      expand: true
      dot: true
      cwd: '<%= yeoman.app %>'
      dest: '<%= yeoman.dist %>'
      src: [
        '*.{ico,txt}'
        'images/{,*/}*.{webp,gif}'
        'styles/fonts/{,*/}*.*'
      ]
    } ]
    bower: all: rjsConfig: '<%= yeoman.app %>/scripts/main.js'
    jst:
      options: amd: true
      compile: files: '.tmp/scripts/templates.js': [ '<%= yeoman.app %>/scripts/templates/*.ejs' ]
  grunt.registerTask 'createDefaultTemplate', ->
    grunt.file.write '.tmp/scripts/templates.js', 'this.JST = this.JST || {};'
    return
  grunt.registerTask 'server', (target) ->
    grunt.log.warn 'The `server` task has been deprecated. Use `grunt serve` to start a server.'
    grunt.task.run [ 'serve' + (if target then ':' + target else '') ]
    return
  grunt.registerTask 'serve', (target) ->
    if target == 'test'
      return grunt.task.run([
        'clean:server'
        'coffee'
        'createDefaultTemplate'
        'jst'
        'postcss:server'
        'connect:test'
        'open:test'
        'watch'
      ])
    grunt.task.run [
      'clean:server'
      'coffee:dist'
      'createDefaultTemplate'
      'jst'
      'postcss:server'
      'connect:livereload'
      'watch'
    ]
    return
  grunt.registerTask 'test', (isConnected) ->
    isConnected = Boolean(isConnected)
    testTasks = [
      'clean:server'
      'coffee'
      'createDefaultTemplate'
      'jst'
      'postcss'
      'connect:test'
      'mocha'
    ]
    if !isConnected
      grunt.task.run testTasks
    else
      # already connected so not going to connect again, remove the connect:test task
      testTasks.splice testTasks.indexOf('connect:test'), 1
      grunt.task.run testTasks
  grunt.registerTask 'build', [
    'clean:dist'
    'coffee'
    'createDefaultTemplate'
    'jst'
    'postcss:dist'
    'useminPrepare'
    'imagemin'
    'htmlmin'
    'concat'
    'cssmin'
    'requirejs'
    'uglify'
    'copy'
    'clean:afterbuild'
    'usemin'
  ]
  grunt.registerTask 'default', [
    'jshint'
    'test'
    'build'
  ]
