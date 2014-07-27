var error = require('tea-error'),
  Promise = require('bluebird');

var InvalidAdminTabError = error('InvalidAdminTabError');

var adminTabs = {};

module.exports =  {
  collector: function() {
    return function collector(tab) {
      if (!tab.title) {
        throw new InvalidAdminTabError('Admin tab must have a title');
      }
      if (!tab.name) {
        throw new InvalidAdminTabError('Admin tab must have a name');
      }
      if (adminTabs[tab.name]) {
        throw new InvalidAdminTabError('Admin tab with the name "' + tab.name + '" already exists');
      }

      if (!tab.get) {
        tab.get = function() {
          return new Promise(function(resolve) {
            resolve();
          });
        };
      }

      adminTabs[tab.name] = tab;
    };
  },
  initialise: function(app) {
    app.set('pagesAdminTabs', {
      add: this.collector(),
      get: function(name) {
        return adminTabs[name];
      },
      getList: function() {
        var adminTabsList = [];
        Object.keys(adminTabs).forEach(function(adminTabName) {
          adminTabsList.push(adminTabs[adminTabName]);
        });
        return adminTabsList;
      }
    });
  }
};

