var bodyParser = require('body-parser')
var express = require('express');

var app = express();
var api = require('./api/fragments');

var config = {
  port: 3000
};

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

api.register(app);

var server = app.listen(config.port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('fragments server listening at http://%s:%s', host, port);

});