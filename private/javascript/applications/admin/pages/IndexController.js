(function() {
  'use strict';

  angular.module('admin-pages.controllers')
  .controller('IndexController', [
    '$scope', 'Page', 'ngTableParams',
    function IndexController($scope, Page, ngTableParams) {

      $scope.pagePromise = null;
      $scope.adminPageTableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
          title: 'desc'
        }
      }, {
        total: 0,
        getData: function($defer, params) {
          $scope.pagePromise = Page.query(params.url(), function(data) {
            params.total(data.total);
            $defer.resolve(data.result);
          });
        }
      });
    }
  ]);
})();
