var path = require('path');

module.exports = function(app) {
  var assetManager = app.get('assetManager');
  if (!assetManager) {
    return;
  }

  assetManager.addFiles({
    profile: 'duffel-pages-page',
    permission: 'manage-pages',
    after: [
      'angular-resource',
    ],
    js: [
      path.join(__dirname, '/../../public/javascript/resources/page.js')
    ]
  });

  assetManager.addFiles({
    profile: 'duffel-pages-admin',
    permission: 'manage-pages',
    after: [
      'angular',
      'angular-cookies',
      'angular-bootstrap',
      'ng-table',
      'angular-busy',
      'duffel-cms-cmscontent'
    ],
    before: 'ng-application-bootstrap',
    js: [
      // Page table
      path.join(__dirname, '/../../public/javascript/applications/admin/pages/application.js'),
      path.join(__dirname, '/../../public/javascript/applications/admin/pages/controllers.js'),
      path.join(__dirname, '/../../public/javascript/applications/admin/pages/IndexController.js'),

      // Page content tab
      path.join(__dirname, '/../../public/javascript/applications/admin/page-content/application.js'),
      path.join(__dirname, '/../../public/javascript/applications/admin/page-content/controllers.js'),
      path.join(__dirname, '/../../public/javascript/applications/admin/page-content/PageContentController.js'),

      path.join(__dirname, '/../../public/javascript/resources/cms-page-content.js')
    ]
  });
};
