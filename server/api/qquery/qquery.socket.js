/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Qquery = require('./qquery.model');

exports.register = function(socket) {
  Qquery.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Qquery.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('qquery:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('qquery:remove', doc);
}