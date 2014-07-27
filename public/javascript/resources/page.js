angular.module('page', ['ngResource'])
  .factory('Page', [
    '$resource', '$http', '$rootScope',
    function($resource, $http, $rootScope) {

    return $resource('/duffel-pages/api/pages/:id:command', {
      id : '@id'
    }, {
      query: { method: 'GET' },
      save: { method: 'PUT' },
      create: { method: 'POST' },
      destroy: { method: 'DELETE' }
    });
}]);
