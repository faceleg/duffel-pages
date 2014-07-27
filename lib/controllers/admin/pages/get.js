var Page = require('duffel-pages').Page(),
  __ = require('underscore');

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.get('/pages/admin', 'view-pages', function(req, res){
    res.render('/duffel-pages/admin/pages/index.nunjucks');
  });


  app.protect.get('/pages/admin/:id/:tab', 'manage-pages', function(req, res, next) {
    if (!parseInt(req.params.id, 10)) {
      return next();
    }

    Page.findById(req.params.id, function(error, page) {

      if (error) throw error;
      if (!page) {
        res.status(404);
        return res.render('/errors/404.nunjucks');
      }

      var adminTabs = app.get('pagesAdminTabs');
      var currentTab = adminTabs.get(req.params.tab);

      var tabLocals = {};
      currentTab.get(page, tabLocals, req).then(function() {
        res.render('/duffel-pages/admin/pages/edit.nunjucks', __.extend(tabLocals, {
          page: page,
          adminTabs: adminTabs.getList(),
          currentTab: currentTab
        }));
      }, function(error) {
        throw error;
      });
    });
  });
};
