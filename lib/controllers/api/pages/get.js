var Page = require('duffel-pages').Page();

module.exports = function(parameters) {
  var app = parameters.app;

  /**
   * List pages.
   *
   * @permission: view-pages
   */
  app.protect.get('/duffel-pages/api/pages', 'view-pages', function(req, res){

    var page = req.query.page,
      count = req.query.count,
      sorting = req.query.sorting || {},
      filter = req.query.filter || {};

    var order = [];
    Object.keys(sorting).forEach(function(key) {
      order.push(key + ' ' + (sorting[key] == 'asc' ? 'ASC' : 'DESC'));
    });

    var where = {
      status: {
        neq: 'Deleted'
      }
    };

    Object.keys(filter).forEach(function(key) {
      where[key] = {
        like: filter[key]
      };
    });

    var params = {
      where: where,
      order: order.join(', '),
      limit:count,
      skip: (page - 1) * count
    };

    Page.all(params, function(error, pages) {
      if (error) throw error;
      Page.count(where, function(error, count) {
        if (error) throw error;
        res.json({
          total: count,
          result: pages
        });
      });
    });
  });
};
