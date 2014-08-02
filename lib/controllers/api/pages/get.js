var Page = require('duffel-pages').Page();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.get('/duffel-pages/api/pages', 'view-pages', function(req, res){

    Page.findPaginate(req.query, {
      where: {
        status: {
          neq: 'Deleted'
        }
      }
    }).then(function(pages) {
      res.json(pages);
    });

  });

  app.protect.get('/duffel-pages/api/pages/:id', 'view-pages', function(req, res) {

    var id = req.params.id;

    Page.findById(id, function(error, page) {
      res.json(page);
    });
  });
};
