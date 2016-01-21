'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: '../src/collective/behavior/featuredimage/static'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      postcss: {
        files: ['<%= yeoman.app %>/{,*/}*.scss'],
        tasks: ['csscomb', 'postcss']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        ]
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    clean: {
      options: {
        force: true
      },
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    csscomb: {
        dist: {
            files: {
                'app/main.scss': ['app/main.scss']
            }
        }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: 'last 3 versions'
          }),
          require('postcss-cssnext')(),
          require('postcss-nested')(),
          require('cssnano')()
        ]
      },
      server: {
        src: '<%= yeoman.app %>/{,*/}*.scss',
        dest: '.tmp/main.css'
      },
      dist: {
        src: '<%= yeoman.app %>/{,*/}*.scss',
        dest: '<%= yeoman.dist %>/main.css'
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'featuredimage-icon.png'
          ]
        }]
      }
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'postcss:dist',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
