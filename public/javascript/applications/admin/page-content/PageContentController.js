(function() {
  'use strict';

  angular.module('admin-page-content.controllers')
  .controller('PageContentController', [
    '$scope', 'Page',
    function PageContentController($scope, Page) {
      $scope.page = Page.get({ id: $scope.pageId });
      $scope.cmsContent = {};


      $scope.save = function() {
        console.log('here');
        console.log($scope.cmsContent);
      };

    }
  ]);
})();
