'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QqdesignerSchema = new Schema({
  name: String,
  gskills: {},
  date:String
});

module.exports = mongoose.model('Qqdesigner', QqdesignerSchema);