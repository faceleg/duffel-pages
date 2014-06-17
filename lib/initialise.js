var controllerLoader = require('controller-loader'),
  path = require('path');

module.exports = function(app, mongoose, connection, callback) {
  require('./models/Page').initialise(mongoose, connection);
  Page = require('./models/Page').model();

  require('../lib/initialisers/title-extractor')(app);

  controllerLoader.load(path.resolve(path.join(__dirname, 'controllers')), function(controller) {
    require(controller)({
      app: app
    });
  }, callback);
};

