/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Qqdesigner = require('./qqdesigner.model');

exports.register = function(socket) {
  Qqdesigner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Qqdesigner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('qqdesigner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('qqdesigner:remove', doc);
}