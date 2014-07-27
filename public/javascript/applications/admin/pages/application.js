(function() {
  'use strict';

  angular.module('admin-pages', [
    'page',
    'admin-pages.controllers',
    'ngTable', 'cgBusy'
  ]);

  angular.module('admin-pages').value('cgBusyDefaults',{
      message: 'Loading pages',
      templateUrl: '/bower/angular-busy/angular-busy.html',
      minDuration: 700
  });

})();
