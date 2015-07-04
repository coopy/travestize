var events = require('event-component');
var request = require('superagent');
var $ = function (selector) {
  if (selector[0] === '#') {
    return document.getElementById(selector.substr(1));
  }
};

var handleSubmit = function handleSubmit(ev) {
  ev.preventDefault();

  request
    .post('/travestize')
    .send({ text: $('#original-text').value })
    .end(function(err, response){
      if (err) {
        return console.error(err);
      }
      $('#result-text').innerText = response.text;
    });
};

events.bind($('#submit-form'), 'click', handleSubmit);
