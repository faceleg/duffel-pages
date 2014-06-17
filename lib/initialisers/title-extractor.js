module.exports = function(app) {

  /**
   * Buffer content, extract page title when content is sent
   * @link http://stackoverflow.com/a/19215370/187954
   */
  app.all('*', function(req, res, next) {
    var responseWrite = res.write,
    responseEnd = res.end,
    chunks = [];

    res.write = function (chunk) {
      chunks.push(chunk);
      responseWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) {
        chunks.push(chunk);
      }

      var body = Buffer.concat(chunks).toString('utf8');
      var regexp = /(<title[^>]*>)(.*?)(<\/title>)/;
      var match = body.match(regexp);

      if (match && match[2]) {
        var title = match[2];

        Page.findOne({
          uri: req.path
        }, function (error, page) {
          if (error) {
            throw error;
          }
          if (page) {
            return;
          }

          (new Page({
            uri: req.path,
            title: match[2],
            type: Page.types.CONTROLLER
          })).save();
        });
      }

      responseEnd.apply(res, arguments);
    };

    next();
  });
};
