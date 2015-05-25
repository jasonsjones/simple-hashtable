
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

    it('clears the table of all keys', function () {
        ht.put('node', 'server-side js')
          .put('mongodb', 'noSQL database')
          .put('express', 'webframework on top of node');
        expect(ht.size()).to.equal(3);
        expect(ht.isEmpty()).to.be.false;
        ht.clear();
        expect(ht.size()).to.equal(0);
        expect(ht.isEmpty()).to.be.true;
    });

    it('returns array of all the keys in the table', function () {
        ht.put('node', 'server-side js')
          .put('mongodb', 'noSQL database')
          .put('angularjs', 'client side MV* framework')
          .put('express', 'webframework on top of node');
        var keys = ht.keys();
        expect(keys).to.be.Array;
        expect(keys).to.have.length(4);
        expect(keys).to.include('node');
    });

    it('returns empty array of keys if table is empty', function () {
        var keys = ht.keys();
        expect(keys).to.be.empty;
        expect(keys).to.be.Array;
        expect(keys).to.have.length(0);
    });

    describe('hashes a key and puts the value in the hash table', function () {

        it('using single put call', function () {
            ht.put('node', 'asychronous, event-driven io for server side javascript');
            expect(ht.size()).to.equal(1);
            expect(ht.isEmpty()).to.be.false;
        });

        it('using the fluent/cascading API', function () {
            ht.put('node', 'server-side js')
              .put('mongodb', 'noSQL database');
            expect(ht.size()).to.equal(2);
            expect(ht.isEmpty()).to.be.false;
        });

    });

    describe('gets the correct value when given a key', function () {

        it('that is contained in the hash table', function () {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('mongodb')).to.equal('noSQL database');
        });

        it('that does not exist in the hash table', function () {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('express')).to.equal(-1);
        });

        it('when the value is a complex object', function () {
            ht.put('me', {name: 'jason jones', email: 'me@jasonjones.com'});
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(1);
            expect(ht.get('me')).to.have.all.keys('name', 'email');
        });

        it('where the value was re-assigned', function () {
            ht.put('node', 'bogus value');
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('mongodb')).to.equal('noSQL database');
        });

    });

    describe('removes the correct value from the hash table', function () {

        it('when given a key in the table', function () {
            ht.put('node', 'server-side js')
              .put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            ht.remove('node');
            expect(ht.size()).to.equal(1);
            ht.remove('mongodb');
            expect(ht.size()).to.equal(0);
            expect(ht.get('node')).to.equal(-1);
            expect(ht.get('mongodb')).to.equal(-1);
        });

        it('even if there are multiple values for the same key (separate chaining)',
            function () {
                ht.put('node', 'server-side js');
                ht.put('node', 'this is another value');
                ht.put('node', 'one last value to add...');
                expect(ht.isEmpty()).to.be.false;
                expect(ht.size()).to.equal(1);
                expect(ht.remove('node')).to.be.true;
                expect(ht.get('node')).to.equal(-1);
            });

        it('or returns false if asked to remove a key that does not exist',
            function () {
                ht.put('node', 'server-side js');
                ht.put('mongodb', 'noSQL database');
                expect(ht.isEmpty()).to.be.false;
                expect(ht.size()).to.equal(2);
                expect(ht.remove('express')).to.be.false;
                expect(ht.remove('angularjs')).to.be.false;
            });
    });

    describe('correctly determines if a key is in the table', function () {
        it('for a key that is contained in the table', function () {
            ht.put('node', 'server-side js')
              .put('mongodb', 'noSQL database');
            expect(ht.containsKey('node')).to.be.true;
            expect(ht.containsKey('mongodb')).to.be.true;
        });

        it('for a key that is not contained in the table', function () {
            ht.put('node', 'server-side js')
              .put('mongodb', 'noSQL database');
            expect(ht.containsKey('express')).to.be.false;
        });
    });
});
