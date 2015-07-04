var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');

var app = express();
var api = require('./api/travestize.api.js');
var config = require('./config');

// API
app.use(bodyParser.json());
api.register(app);

// Static resources
app.use('/js', express.static('build'));
app.use('/css', express.static('build'));
app.get('/travestize', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Redirect
app.get('/', function (req, res) {
  res.redirect('/travestize');
});

var server = app.listen(config.httpPort, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Travestize server listening at http://%s:%s', host, port);

});
