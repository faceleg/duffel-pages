(function() {
  'use strict';

  angular.module('admin-page-content', [
    'page', 'raptor',
    'admin-page-content.controllers',
    'cgBusy'
  ]);

  angular.module('admin-page-content').value('cgBusyDefaults',{
      message: 'Saving content',
      templateUrl: '/bower/angular-busy/angular-busy.html',
      minDuration: 700
  });

})();
