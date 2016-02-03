'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

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
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
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
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
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
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test'),
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
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },
    clean: {
      options: {
        force: true
      },
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp',
      aftercopy: [
        '<%= yeoman.dist %>/*.html'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    babel: {
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
    },
    csscomb: {
      dist: {
        expand: true,
        cwd: 'app/styles/',
        src: '*.scss',
        dest: 'app/styles/'
      }
    },
    postcss: {
      options: {
        map: false,
        parser: require('postcss-scss'),
        processors: [
          require('precss')(), require('autoprefixer')({
            browsers: 'last 3 versions'
          }), require('postcss-cssnext')()
        ]
      },
      dist: {
        src: '<%= yeoman.app %>/styles/main.scss',
        dest: '.tmp/styles/main.css'
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          almond: true,

          replaceRequireScript: [{
            files: ['<%= yeoman.dist %>/index.html'],
            module: 'main'
          }],

          modules: [{name: 'main'}],
          baseUrl: '<%= yeoman.app %>/scripts',
          paths: {
            'main': '../../.tmp/scripts/main'
          },
          keepBuildDir: true,
          allowSourceOverwrites: true,
          mainConfigFile: '.tmp/scripts/main.js', // contains path specifications and nothing else important with respect to config

          dir: '.tmp/scripts',

          optimize: 'none', // optimize by uglify task
          useStrict: true,
          wrap: true

        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/main.js': [
            '.tmp/scripts/main.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
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
          src: [
            '*.{ico,txt}',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*'
          ]
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
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    },
    jst: {
      options: {
        amd: true,
        templateSettings: {
          variable: 'data'
        }
      },
      compile: {
        files: {
          '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'babel',
        'createDefaultTemplate',
        'jst',
        'postcss',
        'connect:test',
        'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'babel:dist',
      'createDefaultTemplate',
      'jst',
      'postcss',
      'connect:livereload',
      'watch'
    ]);
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
    'babel',
    'createDefaultTemplate',
    'jst',
    'postcss',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'requirejs',
    'copy:dev',
    'clean:aftercopy',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
