'use strict';

var _ = require('lodash');
var Ssksample = require('./ssksample.model');

// Get list of ssksamples
exports.index = function(req, res) {
  Ssksample.find(function (err, ssksamples) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ssksamples);
  });
};

// Get a single ssksample
exports.show = function(req, res) {
  Ssksample.findById(req.params.id, function (err, ssksample) {
    if(err) { return handleError(res, err); }
    if(!ssksample) { return res.status(404).send('Not Found'); }
    return res.json(ssksample);
  });
};

// Creates a new ssksample in the DB.
exports.create = function(req, res) {
  Ssksample.create(req.body, function(err, ssksample) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ssksample);
  });
};

// Updates an existing ssksample in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ssksample.findById(req.params.id, function (err, ssksample) {
    if (err) { return handleError(res, err); }
    if(!ssksample) { return res.status(404).send('Not Found'); }
    var updated = _.merge(ssksample, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ssksample);
    });
  });
};

// Deletes a ssksample from the DB.
exports.destroy = function(req, res) {
  Ssksample.findById(req.params.id, function (err, ssksample) {
    if(err) { return handleError(res, err); }
    if(!ssksample) { return res.status(404).send('Not Found'); }
    ssksample.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}