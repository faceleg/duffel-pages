module.exports = function(app) {
  var collector = app.get('visor');
  collector.add({
    'name': 'Pages',
    'uri': '/pages/admin',
    'permission': 'view-pages'
  });
};
