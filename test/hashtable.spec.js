var expect = require('chai').expect;
var HashTable = require('../');

describe('A Hash Table', function() {
    var ht;

    function loseloseHashCode(key) {
        var hashValue = 0;
        for (var i = 0, len = key.length; i < len; i++) {
            hashValue += key.charCodeAt(i);
        }
        return hashValue % 42;
    }

    beforeEach(function() {
        ht = new HashTable();
    });

    describe('basic setup', function() {
        it('has a working test framework', function() {
            expect(true).to.be.true;
        });

        it('correctly instantiates an instance with an empty table', function() {
            expect(ht).to.exist;
            expect(ht.isEmpty()).to.be.true;
        });
    });

    describe('clear method', function() {
        it('clears the table of all keys', function() {
            ht.put('node', 'server-side js')
                .put('mongodb', 'noSQL database')
                .put('express', 'webframework on top of node');
            expect(ht.size()).to.equal(3);
            expect(ht.isEmpty()).to.be.false;
            ht.clear();
            expect(ht.size()).to.equal(0);
            expect(ht.isEmpty()).to.be.true;
        });
    });

    describe('keys method', function() {
        it('returns array of all the keys in the table', function() {
            ht.put('node', 'server-side js')
                .put('mongodb', 'noSQL database')
                .put('angularjs', 'client side MV* framework')
                .put('express', 'webframework on top of node');
            var keys = ht.keys();
            expect(keys).to.be.an('array');
            expect(keys).to.have.length(4);
            expect(keys).to.include('node');
        });

        it('returns empty array of keys if table is empty', function() {
            var keys = ht.keys();
            expect(keys).to.be.empty;
            expect(keys).to.be.an('array');
            expect(keys).to.have.length(0);
        });
    });

    describe('containsKey method', function() {
        it('determines if a key is in the hash table', function() {
            ht.put('node', 'server-side js').put('mongodb', 'noSQL database');
            expect(ht.containsKey('node')).to.be.true;
            expect(ht.containsKey('mongodb')).to.be.true;
        });

        it('returns false if key is not in hash table', function() {
            ht.put('node', 'server-side js').put('mongodb', 'noSQL database');
            expect(ht.containsKey('express')).to.be.false;
        });
    });

    describe('containsValue method', function() {
        it('determines if a value is in the hash table', function() {
            ht.put('node', 'server-side js')
                .put('mongodb', 'noSQL database')
                .put('angularjs', 'client side MV* framework')
                .put('express', 'webframework on top of node');

            expect(ht.containsValue('server-side js')).to.be.true;
            expect(ht.containsValue('noSQL database')).to.be.true;
            expect(ht.containsValue('this is not there...')).to.be.false;
        });

        it('determines if a complex object is in the hash table', function() {
            ht.put('me', { name: 'jason jones', email: 'me@jasonjones.com' });
            expect(ht.containsValue({ name: 'jason jones', email: 'me@jasonjones.com' })).to.be
                .true;
        });
    });

    describe('put method', function() {
        it('adds a value to the hash table', function() {
            ht.put('node', 'asychronous, event-driven io for server side javascript');
            expect(ht.size()).to.equal(1);
            expect(ht.isEmpty()).to.be.false;
        });

        it('adds values to the hash table using cascading calls', function() {
            ht.put('node', 'server-side js').put('mongodb', 'noSQL database');
            expect(ht.size()).to.equal(2);
            expect(ht.isEmpty()).to.be.false;
        });
    });

    describe('get method', function() {
        it('gets the value associated with a key', function() {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('mongodb')).to.equal('noSQL database');
        });

        it('returns -1 if the key does not exist in the hash table', function() {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('express')).to.equal(-1);
        });

        it('returns correct value even if its a complex object', function() {
            ht.put('me', { name: 'jason jones', email: 'me@jasonjones.com' });
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(1);
            var obj = ht.get('me');
            expect(obj).to.be.an('object');
            expect(obj).to.have.all.keys('name', 'email');
        });

        it('gets the value that was last assigned', function() {
            ht.put('node', 'bogus value');
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.get('node')).to.equal('server-side js');
            expect(ht.get('mongodb')).to.equal('noSQL database');
        });
    });

    describe('remove method', function() {
        it('removes entry when given a key in the table', function() {
            ht.put('node', 'server-side js').put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            ht.remove('node');
            expect(ht.size()).to.equal(1);
            ht.remove('mongodb');
            expect(ht.size()).to.equal(0);
            expect(ht.get('node')).to.equal(-1);
            expect(ht.get('mongodb')).to.equal(-1);
        });

        it('removes all entries for the same key (separate chaining)', function() {
            ht.put('node', 'server-side js');
            ht.put('node', 'this is another value');
            ht.put('node', 'one last value to add...');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(1);
            expect(ht.remove('node')).to.be.true;
            expect(ht.get('node')).to.equal(-1);
        });

        it('returns false if key does not exist in hash table', function() {
            ht.put('node', 'server-side js');
            ht.put('mongodb', 'noSQL database');
            expect(ht.isEmpty()).to.be.false;
            expect(ht.size()).to.equal(2);
            expect(ht.remove('express')).to.be.false;
            expect(ht.remove('angularjs')).to.be.false;
        });
    });

    describe('values method', function() {
        it('returns array of all the values in the table', function() {
            ht.put('node', 'server-side js')
                .put('mongodb', 'noSQL database')
                .put('angularjs', 'client side MV* framework')
                .put('express', 'webframework on top of node');
            var values = ht.values();
            expect(values).to.be.an('array');
            expect(values).to.have.length(4);
            expect(values).to.include('client side MV* framework');
        });

        it('returns empty array of values if table is empty', function() {
            var values = ht.values();
            expect(values).to.be.empty;
            expect(values).to.be.an('array');
            expect(values).to.have.length(0);
        });
    });

    describe('setHashFn method', function() {
        it('sets the hash function for the hash table', function() {
            ht.setHashFn(loseloseHashCode);
            expect(ht.hashFn).to.exist;
            expect(ht.hashFn).to.equal(loseloseHashCode);
        });

        it('does not set hash fn if table is not empty', function() {
            ht.put('node', 'server side javascript');
            ht.setHashFn(loseloseHashCode);
            expect(ht.hashFn).to.not.equal(loseloseHashCode);
            expect(ht.hashFn.name).to.equal('djb2HashCode');
        });

        it('does not set hash fn if parameter is not a function', function() {
            ht.setHashFn('loseloseHashCode');
            expect(ht.hashFn.name).to.equal('djb2HashCode');
        });
    });
});
