/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);


var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var lwip=require('lwip');
app.use(busboy());
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, '.tmp'))); //TODO
app.use("/public", express.static(__dirname + "/uploads"));
app.route('/upload')
  .post(function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      var stream = fs.createWriteStream(__dirname + '/uploads/' + filename);
      file.pipe(stream);
      stream.on('close', function () {
        console.log('File ' + filename + ' is uploaded');

		lwip.open(__dirname +'/uploads/'+filename, function(err, image){
		  // check err...
		  // define a batch of manipulations and save to disk as JPEG:
		  var imgRatio = image.height()/image.width();
		  var tempHeight = 285*imgRatio
		  if ((285*imgRatio)>570){
		  	image.batch()
		  	.resize(570/imgRatio,570)
		    .writeFile(__dirname +'/uploads/samples/'+filename, function(err){
		    	console.log("done");
		    });
		  }
		  else{
		  	image.batch()
		  	.resize(285,285*imgRatio)
		    .writeFile(__dirname +'/uploads/samples/'+filename, function(err){
		    	console.log("done");
		    });
		  }
		});

        res.json({
          filename: filename
        });
      });
    });
  });
app.route('/uploadssk')
  .post(function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      var stream = fs.createWriteStream(__dirname + '/uploads/sskexamples/' + filename);
      file.pipe(stream);
      stream.on('close', function () {
        console.log('File ' + filename + ' is uploaded');
        res.json({
          filename: filename
        });
      });
    });
  });
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
