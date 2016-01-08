'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QquerySchema = new Schema({
	owner: String,
	artist: String,
	modtype: String,
	vote : Number,
	src : String,
	modinfos: [],
	addinfos: String,
	quality: String,
	rating: [],
	price:[],
	available: Boolean
});

module.exports = mongoose.model('Qquery', QquerySchema);