var _ = require('lodash');
var assert = require('assert');

var vowels = ['a','o','u','e','i','y'];
var punctuation = ['.',',','!','?','"','\'','&','(',')',':',';'];
var config = {
  pivotProb: 0.35,
  glueProb: 0.55
};

function isPunctuation(char) {
  return punctuation.indexOf(char) !== -1;
}

function isVowel(char) {
  return vowels.indexOf(char) !== -1;
}

function fragmentize(word) {
  var pieces = word.split('');
  var fragments = [];
  var pivotIndex = 0;

  if (pieces.length === 0) {
    return [];
  }

  if (pieces.length < 3) {
    return [word];
  }

  for (var currIndex = 0; currIndex < pieces.length; currIndex++) {
    // Triple the probability for vowels
    var prob = isVowel(pieces[currIndex]) ? config.pivotProb*2 : config.pivotProb;
    // var prob = config.pivotProb;

    if (currIndex - pivotIndex > 1 && Math.random() < prob) {
      currIndex += 1;
      fragments.push(word.substring(pivotIndex, currIndex));
      pivotIndex = currIndex;
    }
  }

  if (pivotIndex < pieces.length) {
    fragments.push(word.substring(pivotIndex));
  }

  return fragments;
}

function glue(fragments) {
  var result = _.reduce(fragments, function (result, frag) {
    var lastChar = frag[frag.length - 1];
    if (isPunctuation(lastChar) || Math.random() > config.glueProb) {
      frag += ' ';
    }
    return result + frag;
  }, '');
  return result.trim();
}

function sentence(str) {
  var chars = str.split('');
  chars[0] = chars[0].toUpperCase();

  for (var i = 2; i < chars.length; i++) {
    if (chars[i-1] === ' ' && isPunctuation(chars[i-2])) {
      chars[i] = chars[i].toUpperCase();
    }
  }

  var lastChar = chars[chars.length-1];
  if (!isPunctuation(lastChar)) {
    chars.push('.');
  }

  return chars.join('');
}

function handlePostFrag (req, res, next) {
  assert(req.body.text, '`text` body property is required');
  var original = req.body.text.toLowerCase();
  var words = original.split(' ');
  var fragments = _.chain(words)
    .map(fragmentize)
    .flatten()
    .shuffle()
    .value();

  var transformed = sentence(glue(fragments));

  res.send(transformed);
}

module.exports = {
  register: function register(app) {
    app.post('/frag', handlePostFrag);
  },
  fragmentize: fragmentize
};

