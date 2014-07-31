var CMSContent = require('duffel-cms').CMSContent();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.put('/duffel-pages/api/cmspagecontents/:id', 'edit-cmspagecontents', function(req, res){

    CMSContent.findById(req.params.id, function(error, cmsContent) {
      if (error) throw error;

      cmsContent.html = req.body.html;
      cmsContent.saved = true;

      cmsContent.save(function(error, cmsContent) {
        if (error) throw error;
        res.json(cmsContent);
      });
    });

  });
};
