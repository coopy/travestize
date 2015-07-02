var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');

var app = express();
var api = require('./api/fragments');

var config = {
  port: 16925
};

app.use(bodyParser.json());
api.register(app);
app.use('/js', express.static('build'));
app.use('/css', express.static('build'));

app.get('/', function (req, res) {
  res.redirect('/travestize');
});

app.get('/travestize', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

var server = app.listen(config.port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Travestize server listening at http://%s:%s', host, port);

});
