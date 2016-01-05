'use strict';

var _ = require('lodash');
var Qqdesigner = require('./qqdesigner.model');
var main=require('./../../app.js')
// Get list of qqdesigners
exports.index = function(req, res) {
  Qqdesigner.find(function (err, qqdesigners) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(qqdesigners);
  });
};

// Get a single qqdesigner
exports.show = function(req, res) {
  Qqdesigner.findById(req.params.id, function (err, qqdesigner) {
    if(err) { return handleError(res, err); }
    if(!qqdesigner) { return res.status(404).send('Not Found'); }
    return res.json(qqdesigner);
  });
};

// Creates a new qqdesigner in the DB.
exports.create = function(req, res) {
  Qqdesigner.create(req.body, function(err, qqdesigner) {
    main.qqueryAffect();
    if(err) { return handleError(res, err); }
    return res.status(201).json(qqdesigner);
  });
};

// Updates an existing qqdesigner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Qqdesigner.findById(req.params.id, function (err, qqdesigner) {
    if (err) { return handleError(res, err); }
    if(!qqdesigner) { return res.status(404).send('Not Found'); }
    var updated = _.merge(qqdesigner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(qqdesigner);
    });
  });
};

// Deletes a qqdesigner from the DB.
exports.destroy = function(req, res) {
  Qqdesigner.findById(req.params.id, function (err, qqdesigner) {
    if(err) { return handleError(res, err); }
    if(!qqdesigner) { return res.status(404).send('Not Found'); }
    qqdesigner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}