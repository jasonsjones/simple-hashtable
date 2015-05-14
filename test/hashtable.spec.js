var expect = require('chai').expect;
var HashTable = require('../');

describe('A Hash Table', function () {
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
        ht.put('node', 'asychronous, event-driven io for server side javascript');
        expect(ht.isEmpty()).to.be.false;
    });

    it('hashes a key and puts the value in the hash table using separate chaining', function () {
        ht.scPut('node', 'asychronous, event-driven io for server side javascript');
        expect(ht.isEmpty()).to.be.false;
    });

    it('gets the correct value when given the key', function () {
        ht.put('node', 'server-side js');
        ht.put('mongodb', 'noSQL database');
        expect(ht.isEmpty()).to.be.false;
        expect(ht.get('node')).to.equal('server-side js');
        expect(ht.get('mongodb')).to.equal('noSQL database');
    });

    it('gets the correct value when given the key using separate chaining', function () {
        ht.scPut('node', 'server-side js');
        ht.scPut('mongodb', 'noSQL database');
        expect(ht.isEmpty()).to.be.false;
        expect(ht.scGet('node')).to.equal('server-side js');
        expect(ht.scGet('mongodb')).to.equal('noSQL database');
    });

    it('gets the last assigned value for a given key when using separate chaining', function () {
        ht.scPut('node', 'bogus value');
        ht.scPut('node', 'server-side js');
        ht.scPut('mongodb', 'noSQL database');
        expect(ht.isEmpty()).to.be.false;
        expect(ht.scGet('node')).to.equal('server-side js');
        expect(ht.scGet('mongodb')).to.equal('noSQL database');
    });

    it('correctly chains calls to the put method for a fluent/cascading API', function () {
        ht.put('node', 'server-side js')
          .put('mongodb', 'noSQL database');
        expect(ht.isEmpty()).to.be.false;
        expect(ht.get('node')).to.equal('server-side js');
        expect(ht.get('mongodb')).to.equal('noSQL database');

    });

    it('removes the correct value from the hash table', function () {
        ht.put('node', 'server-side js');
        ht.put('mongodb', 'noSQL database');
        expect(ht.isEmpty()).to.be.false;
        ht.remove('node');
        ht.remove('mongodb');
        expect(ht.get('node')).to.be.undefined;
        expect(ht.get('mongodb')).to.be.undefined;
    });

    it('correctly chains calls to the remove method for a fluent/cascading API', function () {
        ht.put('node', 'server-side js')
          .put('mongodb', 'noSQL database');
        expect(ht.isEmpty()).to.be.false;
        ht.remove('node')
          .remove('mongodb');
        expect(ht.get('node')).to.be.undefined;
        expect(ht.get('mongodb')).to.be.undefined;
    });
});
