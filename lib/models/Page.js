var PageSchema = null,
  Page = null,
  timestamps = require('mongoose-times');

function initialiseSchema(mongoose, connection) {
  PageSchema = new mongoose.Schema({
    uri: {
      type: String,
      required: true,
    },
    type: String,
    title: String,
  });

  PageSchema.statics.types = {
    CONTROLLER: 'Controller',
    CMS: 'CMS'
  };
  PageSchema.plugin(timestamps);
  Page = connection.model('Page', PageSchema);
}

module.exports = {
  initialise: function(mongoose, connection) {
    initialiseSchema(mongoose, connection);
  },
  model: function() {
    return Page;
  }
};

