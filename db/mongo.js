'use strict';

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

var config = require('../config');

var url = 'mongodb://localhost:' + config.mongo.port + '/' + config.mongo.db;
var _db = null;

module.exports = exports = {};

exports.connect = function connect(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      return callback(err)
    }
    _db = db;
    callback();
  });
}

exports.diconnect = function disconnect() {
  if (_db) {
    _db.close();
    _db = null;
  }
}

exports.insertTravesty = function insertTravesty(travesty, callback) {
  if (!_db) {
    return callback(new Error('db not connected'));
  }
  _db.collection('travesties').insertOne(travesty, callback);
}

exports.getTravesties = function getTravesties(callback) {
  if (!_db) {
    return callback(new Error('db not connected'));
  }
  _db.travesties.find(callback);
}

