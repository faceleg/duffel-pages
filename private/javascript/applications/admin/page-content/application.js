(function() {
  'use strict';

  angular.module('admin-page-content', [
    'page', 'cmsPageContent',
    'admin-page-content.controllers',
    'raptor', 'cgBusy'
  ]);

  angular.module('admin-page-content').value('cgBusyDefaults',{
      message: 'Working...',
      templateUrl: '/bower/angular-busy/angular-busy.html',
      minDuration: 700
  });

})();
