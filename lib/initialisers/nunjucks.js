module.exports = function(app) {
  app.get('nunjucksEnvironment')
    .addExtension('title', require('../../lib/nunjucks-tags/title'));
};

