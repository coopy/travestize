var _ = require('lodash');
var assert = require('assert');

var vowels = ['a','o','u','e','i','y'];
var punctuation = ['.',',','!','?','"','\'','&','(',')',':',';'];
var defaults = {
  splitProb: 0.35,
  glueProb: 0.55
};

function isPunctuation(char) {
  return punctuation.indexOf(char) !== -1;
}

function isVowel(char) {
  return vowels.indexOf(char) !== -1;
}

function split(splitProb) {
  // Return function to pass into _.chain
  return function (word) {
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
      // Double the probability for vowels
      var prob = isVowel(pieces[currIndex]) ? splitProb * 2 : splitProb;

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
  };
}

function glue(fragments, glueProb) {
  var result = _.reduce(fragments, function (result, frag) {
    var lastChar = frag[frag.length - 1];
    if (isPunctuation(lastChar) || Math.random() > glueProb) {
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

function travestize (original, options) {
  options = options || {};
  var glueProb = options.glueProb || defaults.glueProb;
  var splitProb = options.splitProb || defaults.splitProb;
  // Create a shuffled list of word pieces.
  var words = original.split(' ');
  var fragments = _.chain(words)
    .map(split(splitProb))
    .flatten()
    .shuffle()
    .value();

  // Radomly glue the pieces together into a new sentence.
  return sentence(glue(fragments, glueProb));
}

module.exports = {
  _glue: glue,
  _isPunctuation: isPunctuation,
  _isVowel: isVowel,
  _sentence: sentence,
  _split: split,
  travestize: travestize
};

