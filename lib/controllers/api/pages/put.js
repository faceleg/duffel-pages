var Page = require('duffel-pages').Page();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.put('/duffel-pages/api/pages/:id', 'edit-pages', function(req, res){

    var id = req.params.id;

    Page.findById(id, function(error, page) {
      if (error) throw error;
      page.title = req.body.title;
      page.save(function(error, page) {
        if (error) throw error;
        res.json(page);
      });
    });
  });
};
