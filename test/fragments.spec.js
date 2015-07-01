var expect = require('chai').expect;

var fragments = require('../api/fragments');
var fragmentize = fragments.fragmentize;

describe('fragments', function () {
  describe('fragmentize', function () {
    it('returns an array', function () {
      expect(fragmentize('')).to.be.an.empty('array');
      expect(fragmentize('a')).to.be.an('array').with.length(1);
      expect(fragmentize('al')).to.be.an('array').with.length(1);
      expect(fragmentize('alo')).to.be.an('array').with.length(1);
      expect(fragmentize('allo')).to.be.an('array').with.length.gte(1);
    });
  });
});