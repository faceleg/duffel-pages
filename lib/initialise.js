var controllerLoader = require('controller-loader'),
  path = require('path');

module.exports = function(app, callback) {

  app.get('nunjucksEnvironment').loaders
    .push(new (app.get('nunjucks')).FileSystemLoader(path.join(__dirname, 'views')));

  require('../lib/initialisers/assets')(app);
  require('../lib/initialisers/visor')(app);

  require('../lib/admin-tabs').initialise(app);
  require('../lib/initialisers/cms-admin-tab')(app);

  controllerLoader.load(path.resolve(path.join(__dirname, 'controllers')), function(controller) {
    require(controller)({
      app: app
    });
  }, callback);
};

