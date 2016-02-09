module.exports = {
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
};
