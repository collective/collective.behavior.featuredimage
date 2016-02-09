module.exports = function(grunt, options) {
  return {
      options: {
      port: grunt.option('port') || grunt.SERVER_PORT,
      // change this to '0.0.0.0' to access the server from outside
      hostname: 'localhost'
    },
    livereload: {
      options: {
        middleware: function (connect) {
          return [
            grunt.lrSnippet,
            grunt.mountFolder(connect, '.tmp'),
            grunt.mountFolder(connect, grunt.yeomanConfig.app)
          ];
        }
      }
    },
    test: {
      options: {
        port: 9001,
        middleware: function (connect) {
          return [
            grunt.mountFolder(connect, 'test'),
            grunt.lrSnippet,
            grunt.mountFolder(connect, '.tmp'),
            grunt.mountFolder(connect, grunt.yeomanConfig.app)
          ];
        }
      }
    },
    dist: {
      options: {
        middleware: function (connect) {
          return [
            grunt.mountFolder(connect, grunt.yeomanConfig.dist)
          ];
        }
      }
    }
  };
};
