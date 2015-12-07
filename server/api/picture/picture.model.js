'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PictureSchema = new Schema({
  name: String,
  owner: String,
  artist: String,
  vote: Number,
  info: String,
  date: Date,
  src: String,
  modtype: String
});

module.exports = mongoose.model('Picture', PictureSchema);