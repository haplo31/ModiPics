/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ssksample = require('./ssksample.model');

exports.register = function(socket) {
  Ssksample.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ssksample.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ssksample:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ssksample:remove', doc);
}