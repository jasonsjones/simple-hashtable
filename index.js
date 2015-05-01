/**
 * @fileOverview Implementation of a hash table data structure
 * @author Jason S. Jones
 * @version 0.1.0
 * @license MIT
 */
(function () {
    'use strict';

    /**
     * Simple hash function.  Hashes the key to returns a value which
     * will be used to index into the table array.
     *
     * @param {string} key the key to hash
     * @return {number} the hash value to use as index
     */
    function loseloseHashCode(key) {
        var hashValue = 0;
        for (var i = 0, len = key.length; i < len; i++) {
            hashValue += key.charCodeAt(i);
        }
        return hashValue % 42;
    }

    /**
     * Creates a new simple hash table instance
     *
     * @constructor
     */
    function HashTable() {
        this.table = [];
        this.hashFn = loseloseHashCode;
    }

    /*
     * All member functions attached to the HashTable prototype.  All
     * hash table instances will share these methods, meaning there will
     * NOT be copies made for each instance.  This can be a potential memory
     * savings since there can be several different hash table instances
     * instantiated.
     */
    HashTable.prototype = {

        isEmpty: function (attribute) {
            return this.table.length === 0;
        },

        put: function (key, value) {
            var index = this.hashFn(key);
            this.table[index] = value;
            return this;
        },

        get: function (key) {
            return this.table[this.hashFn(key)];
        },

        remove: function (key) {
            this.table[this.hashFn(key)] = undefined;
            return this;
        }
    };

    module.exports = HashTable;
}());
