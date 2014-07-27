angular.module('cmsPageContent', ['ngResource'])
  .factory('CMSPageContent', [
    '$resource',
    function($resource, $http, $rootScope) {

    return $resource('/duffel-pages/api/cmspagecontents/:id:command', {
      id : '@id'
    }, {
      query: { method: 'GET', isArray: true },
      save: { method: 'PUT' },
      create: { method: 'POST' },
      destroy: { method: 'DELETE' }
    });
}]);

