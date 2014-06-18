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

      if (res.statusCode == 200 &&
          req.method == 'GET' &&
          res._headers['content-type'] &&
          res._headers['content-type'].match(/text\/html/)) {

        var body = Buffer.concat(chunks).toString('utf8');
        var regexp = /(<title[^>]*>)(.*?)(<\/title>)/;
        var match = body.match(regexp);

        var title = null;
        if (match && match.length == 3 && match[2]) {
          title = match[2];
        }

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
            title: title,
            type: Page.types.CONTROLLER
          })).save();
        });

      }

      responseEnd.apply(res, arguments);
    };

    next();
  });
};
