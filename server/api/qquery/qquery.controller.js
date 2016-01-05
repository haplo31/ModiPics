'use strict';

var _ = require('lodash');
var Qquery = require('./qquery.model');
var main=require('./../../app.js')
// Get list of qquerys
exports.index = function(req, res) {
  Qquery.find(function (err, qquerys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(qquerys);
  });
};

// Get a single qquery
exports.show = function(req, res) {
  Qquery.findById(req.params.id, function (err, qquery) {
    if(err) { return handleError(res, err); }
    if(!qquery) { return res.status(404).send('Not Found'); }
    return res.json(qquery);
  });
};

// Creates a new qquery in the DB.
exports.create = function(req, res) {
  Qquery.create(req.body, function(err, qquery) {
    main.qqueryAffect();
    if(err) { return handleError(res, err); }
    return res.status(201).json(qquery);
  });
};

// Updates an existing qquery in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Qquery.findById(req.params.id, function (err, qquery) {
    if (err) { return handleError(res, err); }
    if(!qquery) { return res.status(404).send('Not Found'); }
    var updated = _.merge(qquery, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(qquery);
    });
  });
};

// Deletes a qquery from the DB.
exports.destroy = function(req, res) {
  Qquery.findById(req.params.id, function (err, qquery) {
    if(err) { return handleError(res, err); }
    if(!qquery) { return res.status(404).send('Not Found'); }
    qquery.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}