angular.module('page', ['ngResource'])
  .factory('Page', [
    '$resource', '$http',
    function($resource, $http) {

    return $resource('/duffel-pages/api/pages/:id:command', {
      id : '@id'
    }, {
      query: { method: 'GET' },
      save: { method: 'PUT' },
      create: { method: 'POST' },
      destroy: { method: 'DELETE' }
    });
}]);
