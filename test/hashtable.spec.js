var expect = require('chai').expect;
var HashTable = require('../');

describe('Hash Table', function () {
    var ht;

    beforeEach(function () {
        ht = new HashTable();
    });

    it('has a working test framework', function () {
        expect(true).to.be.true;
    });

    it('correctly instantiates an instance with an empty table', function () {
        expect(ht).to.exist;
        expect(ht.isEmpty()).to.be.true;
    });

    it('hashes a key and puts the value in the hash table', function () {
        ht.put('jason', 'me@myemail.com');
        expect(ht.isEmpty()).to.not.be.true;
    });
});
