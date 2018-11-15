/**
 * @fileOverview Implementation of a hash table data structure
 * @author Jason S. Jones
 * @license MIT
 */
(function() {
    'use strict';

    // helper module to encapsulate a key/value pair
    var ValuePair = require('./lib/valuePair');

    // singly linked-list to use at each hash value to mitigate
    // hash collisions
    var LinkedList = require('singly-linked-list');

    // lodash utility module
    var _isEqual = require('lodash.isequal');
    var _includes = require('lodash.includes');

    /**
     * Creates a new hash table instance
     *
     * @constructor
     * @param {function} fn the hash function to use for the hash table
     */
    function HashTable(fn) {
        this.table = [];
        this._size = 0;

        // reference to hash function
        this.hashFn = fn || djb2HashCode; // or loseloseHashCode
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
    HashTable.prototype.isEmpty = function() {
        return this._size === 0;
    };

    /**
     * Clears the hash table of all keys and values
     */
    HashTable.prototype.clear = function() {
        this.table = [];
        this._size = 0;
    };

    /**
     * Determines whether or not the hash table contains the given key
     *
     * @param {string} key the key to find in the hash table
     * @returns {boolean} true if the key is contained in the hash table,
     *                   false otherwise
     */
    HashTable.prototype.containsKey = function(key) {
        // get the hash of the key to determine where to index in table
        var index = this.hashFn(key);

        // if that particular table index is undefined, no linked-list exist,
        // therefore there is no key assigned
        if (this.table[index] === undefined) {
            return false;
        }

        // get a reference to the head node of the linked-list
        var current = this.table[index].getHeadNode();

        // iterate over the list until the end is reached
        while (current !== null) {
            // if the key matches, success
            if (current.getData().key === key) {
                return true;
            }

            // get the next node
            current = current.next;
        }
        // if we get here, the key is not found in the linked-list associated
        // with the index
        return false;
    };

    /**
     * Determines whether or not the hash table contains the given value
     *
     * @param {object|string} value the value to find in the hash table
     * @returns {boolean} true if the value is contained in the hash table,
     *                   false otherwise
     */
    HashTable.prototype.containsValue = function(value) {
        // initialize current node to null
        var current = null;

        // since we don't have the key, we cannot take advantage of the lookup
        // efficiencies of the hash table, so we must iterate over the entire
        // table (array)
        for (var i = 0; i < this.table.length; i++) {
            // if the value of the table at index i is undefined, obviously
            // no linked-list is present, therefore no value(s) to find, so
            // we move on
            if (this.table[i] === undefined) {
                continue;

                // there is a value in the table at index i
            } else {
                // get a reference to the head node of the linked-list
                current = this.table[i].getHeadNode();

                // iterate over the linked-list
                while (current !== null) {
                    // get reference to the current node's value
                    var currentValue = current.getData().value;

                    // if the current node's value is equal to what we are
                    // looking for--success
                    if (_isEqual(currentValue, value)) {
                        return true;
                    }

                    // didn't find the value at the current node, so move to
                    // the next
                    current = current.next;
                }
            }
        }

        // if we got this far, the value was not found in the hash table
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
    HashTable.prototype.put = function(key, value) {
        // hash the key to get the index
        var index = this.hashFn(key);

        // if the table entry at index is undefined, we need to instantiate
        // a new linked-list to hold the key/value pairs
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

        // allow method chaining/cascading API
        return this;
    };

    /**
     * Gets the value in the hash table associated with the key.  This
     * version utilizes separate chaining to search for the key in the
     * respective linked-list.
     *
     * @param {string} key the key to hash to determine the index to
     *                 retrieve the value
     * @returns {number|string|object} the value associated the the key
     */
    HashTable.prototype.get = function(key) {
        // hash the key to get the index
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
     * Returns an array of all the keys in the hash table
     *
     * @returns {array} the keys in the hash table
     */
    HashTable.prototype.keys = function() {
        return getArrayOf(this, 'keys');
    };

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
    HashTable.prototype.remove = function(key) {
        var index = this.hashFn(key);
        var status = false;

        // if the entry at the hashed lookup is undefined, then there is no
        // key present to remove
        if (this.table[index] === undefined) {
            return status;
        }

        // get reference the head node
        var current = this.table[index].getHeadNode();

        // iterate over the linked-list while there is still a key in the list
        while (listContainsKey(this.table[index], key) && current !== null) {
            // if the current node's key matches the key to remove
            if (current.getData().key === key) {
                // remove the node, decrement the size, and set status
                this.table[index].removeNode(current.getData());
                this._size--;
                status = true;
            }

            // move to next node
            current = current.next;
        }
        return status;
    };

    /**
     * Returns the number of keys in the hash table
     *
     * @returns {number} the number of keys in the hash table
     */
    HashTable.prototype.size = function() {
        return this._size;
    };

    /**
     * Sets the hash function to fn.  This needs to be done before any
     * key/value pairs are added to the hash table in order to maintain
     * consistence.  Otherwise, the methods that rely on hashing a key
     * (get/remove) to take some action on the result will not yield the
     * correct hash, therefore will be unable to lookup the value in the
     * hash table.
     *
     * @param {function} fn the hash function to use for the hash table
     */
    HashTable.prototype.setHashFn = function(fn) {
        if (fn instanceof Function && this.isEmpty()) {
            this.hashFn = fn;
        }
    };

    /**
     * Returns an array of all the values in the hash table
     *
     * @returns {array} the values in the hash table
     */
    HashTable.prototype.values = function() {
        return getArrayOf(this, 'values');
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
     * @returns {number} the hash value to use as index
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
     * @returns {number} the hash value to use as index
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
     * @returns {object|null} the linked list node that contains the key;
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

    function getArrayOf(context, items) {
        if (!_includes(['values', 'keys'], items)) {
            throw new Error('invalid parameter: values or keys is required');
        }

        var results = [];
        var current = null;

        // loop over all elements, or indexes, of the hash table
        for (var i = 0; i < context.table.length; i++) {
            // if the value of the table at index i is undefined, obviously
            // no linked-list is present, therefore no keys to add, so
            // we move on
            if (context.table[i] === undefined) {
                continue;

                // there is a linked-list at index i
            } else {
                // get reference to the head node
                current = context.table[i].getHeadNode();

                // iterate over the list
                while (current !== null) {
                    if (items === 'values') {
                        // push the value on the array
                        results.push(current.getData().value);
                    } else {
                        // push the key on the array
                        results.push(current.getData().key);
                    }

                    // get the next node
                    current = current.next;
                }
            }
        }
        return results;
    }
    /************************ End Utility Functions ***************************/
})();
