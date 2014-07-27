var Page = null;

function initialiseSchema(database) {
  Page = database.connections.main.define('pages', {
    uri: {
      type: String,
      required: true,
    },
    type: String,
    title: String,
    status: {
      type: String,
      default: 'Active'
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date
  });

  Page.types = {
    CONTROLLER: 'Controller',
    CMS: 'CMS'
  };
}

module.exports = {
  initialise: function(database) {
    initialiseSchema(database);
  },
  model: function() {
    return Page;
  }
};

