/**
 * @fileOverview Implementation of a hash table data structure
 * @author Jason S. Jones
 * @version 0.1.0
 * @license MIT
 */
(function () {
    'use strict';

    var ValuePair = require('./lib/valuePair');
    var LinkedList = require('singly-linked-list');

    /**
     * Creates a new hash table instance
     *
     * @constructor
     */
    function HashTable() {
        this.table = [];
        this._size = 0;
        this.hashFn = djb2HashCode; // or loseloseHashCode
    }

    /*
     * All member functions attached to the HashTable prototype.  All
     * hash table instances will share these methods, meaning there will
     * NOT be copies made for each instance.  This can be a potential memory
     * savings since there can be several different hash table instances
     * instantiated.
     */

    /**
     * Determines if the hash table is empty
     *
     * @returns {boolean} true if hash table is empty, false otherwise
     */
    HashTable.prototype.isEmpty  = function () {
        return this._size === 0;
    };

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
    // HashTable.prototype.put = function (key, value) {
    //     var index = this.hashFn(key);
    //     this.table[index] = value;
    //     return this;
    // };

    /**
     * Clears the hash table of all keys and values
     */
    HashTable.prototype.clear = function () {
        this.table = [];
        this._size = 0;
    };

    /**
     * Determines whether or not the hash table contains the given key
     *
     * @param {string} key the key to find in the hash table
     * @return {boolean} true if the key is contained in the hash table,
     *                   false otherwise
     */
    HashTable.prototype.containsKey = function (key) {
        var index = this.hashFn(key);

        if (this.table[index] === undefined) {
            return false;
        }

        var current = this.table[index].getHeadNode();
        while (current !== null) {
            if (current.getData().key === key) {
                return true;
            }
            current = current.next;
        }
        return false;

    };

    /**
     * Puts the value in the hash table utilizing separate chaining to
     * handle hash collisions.  Hashes the key to determine
     * the index of the hash table and inserts a key/value object in the
     * front of the linked-list at the index.
     *
     * @param {string} key the key to hash to determine the index
     * @param {number|string|object} value the value to associate with
     *          the key/hash in the hash table
     *
     * @returns {object} this for method chaining
     */
    HashTable.prototype.put = function (key, value) {
        var index = this.hashFn(key);
        if (this.table[index] === undefined) {
            this.table[index] = new LinkedList();
        }

        // check if the list already contains a node with the key.
        // if it does, remove it, then insert the new key/value pair
        var nodeWithKey = listContainsKey(this.table[index], key);

        if (nodeWithKey !== null) {
            this.remove(key);
        }

        // append new key/value pair (obj) to the front of the linked list.
        this.table[index].insertFirst(new ValuePair(key, value));
        this._size++;
        return this;
    };

    /**
     * Gets the value in the hash table based on the hash of the key
     *
     * @param {string} key the key to hash to determine the index to
     *                 retrieve the value
     * @returns {number|string|object} the value associated the the key
     */
    // HashTable.prototype.get = function (key) {
    //     return this.table[this.hashFn(key)];
    // };

    /**
     * Gets the value in the hash table associated with the key.  This
     * version utilizes separate chaining to search for the key in the
     * respective linked-list.
     *
     * @param {string} key the key to hash to determine the index to
     *                 retrieve the value
     * @returns {number|string|object} the value associated the the key
     */
    HashTable.prototype.get = function (key) {
        var index = this.hashFn(key);
        if (this.table[index] === undefined) {
            return -1;
        }

        // initially set the current node to the head of the list
        var current = this.table[index].getHeadNode();

        // iterate over the list
        while (current !== null) {

            // until the first keys match
            if (current.getData().key === key) {
                return current.getData().value;
            }

            // no match, so get the next node in the list
            current = current.next;
        }

        // if we get here, there is not a node in the list with the key,
        // maybe because it was previously removed
        return -1;
    };

    /**
     * Removes the value in the hash table associated with the key
     *
     * @param {string} key the key to hash to determine the index to
     *                 remove the value
     *
     * @returns {object} this for method chaining
     */
    // HashTable.prototype.remove = function (key) {
    //     this.table[this.hashFn(key)] = undefined;
    //     return this;
    // };

    /**
     * Removes all the values in the hash table associated with the key.
     * When using separate chaining there is the possibility that there may be
     * more than one value for a specified key; however, this implementation
     * will only return the last value assigned.  This remove method will remove
     * all values from the hash table.
     *
     * @param {string} key the key to hash to determine the index to
     *                 remove the value
     *
     * @returns {object} this for method chaining
     */
    HashTable.prototype.remove = function (key) {
        var index = this.hashFn(key);
        var status = false;

        if (this.table[index] === undefined) {
            return status;
        }

        var current = this.table[index].getHeadNode();
        while (listContainsKey(this.table[index], key) && current !== null) {
            if (current.getData().key === key) {
                this.table[index].removeNode(current.getData());
                this._size--;
                status = true;
            }
            current = current.next;
        }
        return status;
    };

    /**
     * Returns the number of keys in the hash table
     *
     * @return {number} the number of keys in the hash table
     */
    HashTable.prototype.size = function () {
        return this._size;
    };

    // expose HashTable
    module.exports = HashTable;

    /*********************** Utility Functions ********************************/

    /**
     * Simple hash function.  Hashes the key to returns a value which
     * will be used to index into the table array. This hash function is very
     * susceptible to a hash collision
     *
     * @param {string} key the key to hash
     * @return {number} the hash value to use as index
     */
    // function loseloseHashCode(key) {
    //     var hashValue = 0;
    //     for (var i = 0, len = key.length; i < len; i++) {
    //         hashValue += key.charCodeAt(i);
    //     }
    //     return hashValue % 42;
    // }

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
     * Determines if a linked list contains a key.
     *
     * @param {object} list the linked list to check if it contains the key
     * @param {string} key the key to use to determine if it is contained in
     *                  the list
     * @return {object|null} the linked list node that contains the key;
     *                       null otherwise
     */
    function listContainsKey(list, key) {
        var current = list.getHeadNode();
        while (current !== null) {
            if (current.getData().key === key) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    /************************ End Utility Functions ***************************/
}());
