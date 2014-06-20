module.exports = function(app, callback) {
  require('./models/Page').initialise(app.get('database'));
  Page = require('./models/Page').model();

  require('../lib/initialisers/title-extractor')(app);

  callback(null, app);
};

