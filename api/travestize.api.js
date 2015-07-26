var assert = require('assert');
var travestize = require('../lib/travestize.js').travestize;
var mongo = require('../db/mongo');

function handleGenerateTravesty (req, res, next) {
  if (!req.body.text) {
    console.warn({ error: '`text` body property is required' });
    return res.send('');
  }
  var original = req.body.text.toLowerCase();
  var options = {
    splitProb: req.body.splitProb || null,
    glueProb:  req.body.glueProb  || null
  };
  var transformed = travestize(original, options);
  var travesty = {
    time: new Date().toString(),
    original: original,
    transformed: transformed
  };

  console.log(travesty);
  mongo.insertTravesty(travesty, function (err) {
    if (err) {
      console.error(err);
    }
  });

  res.send(transformed);
}

function handleCreateTravesty (req, res, next) {
  var responseObj = {
    message: 'saved',
    travesty: req.body
  };
  res.send(responseObj);
}

function handleGetTravesties (req, res, next) {
  res.send([]);
}

module.exports = {
  register: function register(app) {
    app.post('/travestize', handleGenerateTravesty);
    app.post('/travesties', handleCreateTravesty);
    app.get('/travesties', handleGetTravesties);
  }
};

