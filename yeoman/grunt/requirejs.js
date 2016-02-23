module.exports = {
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
};
