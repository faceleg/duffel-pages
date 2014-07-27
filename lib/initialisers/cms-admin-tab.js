/* jshint esnext: true */
var Promise = require('bluebird'),
  CMSRequest = require('duffel-cms').CMSRequest(),
  CMSContent = require('duffel-cms').CMSContent();

module.exports = function(app) {
  app.get('pagesAdminTabs').add({

    /** @required */
    title: 'Content',

    /** @required */
    name: 'content',
    /** @required */
    template: '/duffel-pages/admin/partials/cms-admin-tab.nunjucks',

    /**
     * An optional function that will be called from within the tab's GET controller
     *
     * @optional
     *
     * @param @page {Page} The current page
     * @param @locals {Object} Will be extended on top of the template locals
     * @param @req {Object} The incoming request
     *
     * @returns {Promise} A Bluebird promise
     */
    get: function(page, locals, req) {
      return new Promise(function (resolve, reject) {

        CMSRequest.find({
          where: {
            uri: page.uri
          },
          order: 'requested ASC',
          include: ['cms_content'],
          groupBy: ['name', 'uri']
        }, function(error, cmsRequests) {

          Promise.map(cmsRequests, function(cmsRequest) {
            return new Promise(function(resolve, reject) {
              var html = cmsRequest.default_html;
              if (typeof cmsRequest.cms_content.html != 'undefined') {
                html = cmsRequest.cms_content.html;
              }
              return resolve({
                name: cmsRequest.name,
                owner: cmsRequest.owner,
                html: html,
                type: cmsRequest.type
              });
            });
          }).then(function(cmsContents) {
            locals.cmsContents = cmsContents;
            resolve();
          });

        });
      });
    }
  });
};
