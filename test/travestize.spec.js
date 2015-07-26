var expect = require('chai').expect;

var travestize = require('../src/travestize');
var split = travestize._split();

describe('fragments', function () {
  describe('split', function () {
    it('returns an array', function () {
      expect(split('')).to.be.an.empty('array');
      expect(split('a')).to.be.an('array').with.length(1);
      expect(split('al')).to.be.an('array').with.length(1);
      expect(split('alo')).to.be.an('array').with.length(1);
      expect(split('allo')).to.be.an('array').with.length.gte(1);
    });
  });
});