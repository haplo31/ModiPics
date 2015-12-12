'use strict';

// Production specific configuration
// =================================
var ip;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  ip=add;
})
module.exports = {
  // Server IP
  ip:       ip,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/modipics'
  }
};