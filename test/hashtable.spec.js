
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

    describe('hashes a key and puts the value in the hash table', function () {

        it('using single put call', function () {
            ht.put('node', 'asychronous, event-driven io for server side javascript');
            expect(ht.isEmpty()).to.be.false;
        });

        it('using the fluent/cascading API', function () {
            ht.put('node', 'server-side js')
              .put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
        });

    });

    describe('gets the correct value when given a key', function () {

        it('that is contained in the hash table', function () {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('mongodb')).to.equal('noSQL database');
        });

        it('that does not exist in the hash table', function () {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('express')).to.equal(-1);
        });

        it('where the value was re-assigned', function () {
            ht.put('node', 'bogus value');
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
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
            ht.remove('mongodb');
            expect(ht.get('node')).to.equal(-1);
            expect(ht.get('mongodb')).to.equal(-1);
        });

        it('even if there are multiple values for the same key (separate chaining)',
            function () {
                ht.put('node', 'server-side js');
                ht.put('node', 'this is another value');
                ht.put('node', 'one last value to add...');
                expect(ht.isEmpty()).to.be.false;
                expect(ht.remove('node')).to.be.true;
                expect(ht.get('node')).to.equal(-1);
            });

        it('or returns false if asked to remove a key that does not exist',
            function () {
                ht.put('node', 'server-side js');
                ht.put('mongodb', 'noSQL database');
                expect(ht.isEmpty()).to.be.false;
                expect(ht.remove('express')).to.be.false;
                expect(ht.remove('angularjs')).to.be.false;
            });
    });
});
