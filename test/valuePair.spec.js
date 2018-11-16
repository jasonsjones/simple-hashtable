var expect = require('chai').expect;
var ValuePair = require('../lib/valuePair');

describe('A Value Pair', function() {
    it('toString() returns a correctly formatted string', function() {
        var pair = new ValuePair('React', 'UI library');
        expect(pair.toString()).to.equal('[ React: UI library ]');
    });
});
