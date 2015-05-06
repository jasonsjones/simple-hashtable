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
     * Improved hash function.  Hashes the key to returns a value which
     * will be used to index into the table array.  Better distribution of
     * hash values than the lose lose hash function.
     *
     * @param {string} key the key to hash
     * @return {number} the hash value to use as index
     */
    function djb2HashCode(key) {
        var hashValue = 5381;
        for (var i = 0; i < key.length; i++) {
            hashValue = hashValue * 33 + key.charCodeAt(i);
        }
        return hashValue % 1013;
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

        /**
         * Determines if the hash table is empty
         *
         * @returns {boolean} true if hash table is empty, false otherwise
         */
        isEmpty: function () {
            return this.table.length === 0;
        },

        /**
         * Puts the value in the hash table.  Hashes the key to determine
         * the index in the hash table to assign the value.
         *
         * @param {string} key the key to hash to determine the index
         * @param {number|string|object} value the value to associate with
         *          the key/hash in the hash table
         *
         * @returns {object} this for method chaining
         */
        put: function (key, value) {
            var index = this.hashFn(key);
            this.table[index] = value;
            return this;
        },

        /**
         * Gets the value in the hash table based on the hash of the key
         *
         * @param {string} key the key to hash to determine the index to
         *                 retrieve the value
         * @returns {number|string|object} the value associated the the key
         */
        get: function (key) {
            return this.table[this.hashFn(key)];
        },

        /**
         * Removes the value in the hash table associated with the key
         *
         * @param {string} key the key to hash to determine the index to
         *                 remove the value
         *
         * @returns {object} this for method chaining
         */
        remove: function (key) {
            this.table[this.hashFn(key)] = undefined;
            return this;
        }
    };

    // expose HashTable
    module.exports = HashTable;
}());
