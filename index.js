module.exports = {
  initialise: require('./lib/initialise'),
  catchall: require('./lib/catchall'),
  addAdminTab: require('./lib/admin-tabs').collector(),
  Page: function() {
    return require('./lib/models/Page').model();
  },
};
