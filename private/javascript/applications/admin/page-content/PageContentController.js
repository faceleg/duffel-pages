(function() {
  'use strict';

  angular.module('admin-page-content.controllers')
  .controller('PageContentController', [
    '$scope', 'Page', '$timeout', 'CMSPageContent',
    function PageContentController($scope, Page, $timeout, CMSPageContent) {

      $scope.blockingPromises = [];
      $scope.page = null;
      $scope.cmsPageContents = null;

      $timeout(function() {
        $scope.blockingPromises.push(Page.get({
          id: $scope.page_id
        }, function(page) {
          $scope.page = page;

          $scope.blockingPromises.push($scope.cmsPageContent = CMSPageContent.query({
            owner_id: page.id,
            owner_type: 'Page',
            uri: page.uri
          }, function(cmsPageContents) {
            $scope.cmsPageContents = cmsPageContents;
          }));
        }));

      });

      $scope.save = function() {
        $scope.cmsPageContents.forEach(function(cmsPageContents) {
          $scope.blockingPromises.push(cmsPageContents.$save());
        });
        $scope.blockingPromises.push($scope.page.$save());
      };
    }
  ]);
})();
