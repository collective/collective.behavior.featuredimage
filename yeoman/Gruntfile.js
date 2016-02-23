'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
  grunt.LIVERELOAD_PORT = 35729;
  grunt.SERVER_PORT = 9000;
  grunt.lrSnippet = require('connect-livereload')({port: grunt.LIVERELOAD_PORT});
  grunt.mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // configurable paths
  grunt.yeomanConfig = {
    app: 'app',
    dist: '../src/collective/behavior/featuredimage/static'
  };

  require('load-grunt-config')(grunt, function(){
    jitGrunt: {
      useminPrepare: 'grunt-usemin'
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('test', function (isConnected) {
    isConnected = Boolean(isConnected);
    var testTasks = [
      'clean:server',
      'babel',
      'createDefaultTemplate',
      'jst',
      'postcss',
      'connect:test',
      'mocha'
    ];

    if(!isConnected) {
      return grunt.task.run(testTasks);
    } else {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
      return grunt.task.run(testTasks);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'babel',
    'createDefaultTemplate',
    'jst',
    'postcss',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin:dist',
    'requirejs',
    'uglify',
    'copy:dist',
    'clean:aftercopy',
    'usemin'
  ]);

  grunt.registerTask('dev', [
    'clean:dist',
    'babel:dist',
    'createDefaultTemplate',
    'jst',
    'postcss',
    'useminPrepare',
    'htmlmin',
    'concat',
    'requirejs',
    'copy:dev',
    'clean:aftercopy'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
