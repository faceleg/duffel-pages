var CMSContent = require('duffel-cms').CMSContent();
var CMSRequest = require('duffel-cms').CMSRequest();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.get('/duffel-pages/api/cmspagecontents', 'view-cmspagecontents', function(req, res){

    var uri = req.query.uri;

    CMSRequest.find({
      include: 'cms_content',
      where: {
        uri: uri
      },
      orderBy: 'created ASC',
      groupBy: 'uri'
    }, function(error, cmsRequests) {
      var cmsContents = cmsRequests.map(function(cmsRequest) {
        cmsContent = cmsRequest.cms_content();

        // Only return those blocks that have no owner or the correct owner
        if (!cmsContent.owner_id && !cmsContent.owner_type) {
          return cmsContent;
        }

        if (req.query.owner_id != cmsContent.owner_id) {
          return false;
        }
        if (req.query.owner_type != cmsContent.owner_type) {
          return false;
        }

        return cmsContent;
      });

      res.json(cmsContents);
    });

  });
};
