var events = require('event-component');
var request = require('superagent');

// TODO Remove and use canonical object when frontend uses travestize library
// and POSTs result instead of calling service.
var defaults = {
  splitProb: 0.35,
  glueProb: 0.55
};

var $ = function (selector) {
  if (selector[0] === '#') {
    return document.getElementById(selector.substr(1));
  }
};

var handleSubmit = function handleSubmit(ev) {
  ev.preventDefault();

  request
    .post('/travestize')
    .send({
      text:      $('#original-text').value,
      splitProb: Number($('#split-prob').value),
      glueProb:  Number($('#glue-prob').value)
    })
    .end(function(err, response){
      if (err) {
        return console.error(err);
      }
      $('#result-text').innerText = response.text;
    });
};

events.bind($('#submit-form'), 'click', handleSubmit);
$('#split-prob').value = defaults.splitProb;
$('#glue-prob').value = defaults.glueProb;