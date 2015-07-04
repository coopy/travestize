var assert = require('assert');
var travestize = require('../src/travestize.js').travestize;

function handleGenerateTravesty (req, res, next) {
  if (!req.body.text) {
    console.warn({ error: '`text` body property is required' });
    return res.send('');
  }
  var original = req.body.text.toLowerCase();
  var transformed = travestize(original);
  var now = new Date();

  console.log({
    time: now.toString(),
    original: original,
    transformed: transformed
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

