module.exports = {
  initialise: require('./lib/initialise'),
  catchall: require('./lib/catchall'),
  Page: function() {
    return require('./lib/models/Page').model();
  },
};
