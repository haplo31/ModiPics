/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var main = require('./../app.js')
// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/qqdesigner/qqdesigner.socket').register(socket);
  require('../api/qquery/qquery.socket').register(socket);
  require('../api/ssksample/ssksample.socket').register(socket);
  require('../api/picture/picture.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));
  var Qqdesigner = require('./../api/qqdesigner/qqdesigner.model');
  socketio.on('connection', function (socket) {
    socket.on('qqdesigner', function(data){
      data.socket=socket.id
      Qqdesigner.find({name:data.name},function(err,designer){
        if (designer.length){
          console.log("Already in QQ")
        }
        else{
          Qqdesigner.create(data, function(err, qqdesigner) {
            main.qqueryAffect();
          });
        }
      })
    });
    socket.on('qqdesignerdel', function(){
      console.log("del")
      Qqdesigner.findOneAndRemove({socket:socket.id},function(err){})
    });
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      console.log(socket.id)

      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};