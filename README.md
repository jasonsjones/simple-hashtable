# [![npm version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dm-image]][dm-url]

# Simple Hash Table

## Description

This is a javascript implementation of a [hash
table](http://en.wikipedia.org/wiki/Hash_Table) data structure.

A hash table (or hash map) is a data structure used to implement
an associative array, a structure that can map keys to values.
A hash table uses a hash function to compute the index into an array
of buckets, or slots, from which the correct value can be found.
This 'hashing' of the key makes a lookup very efficient and independent
of the number of items in the hash table.

This implementation uses the djb2 hash function which provides a
good distribution of hashed values (or indexes) to minimize collisions.
A hash collision occurs when two different keys hash to the same value.
If the collisions are not handled properly, the first value in the hash
table will be overwritten by the second.

Hash collisions can be handled using one of several techniques.  One way is to
implement what is called
[separate chaining](http://en.wikipedia.org/wiki/Hash_table#Separate_chaining).
With separate chaining, instead of assigning a single value to the index
(or hash), some type of additional data structure is assigned, say a linked-list
for example.  Then the payload (key/value pair) is added to the data structure
based on the data structure's native API.  So basically, the hash table becomes
an array of data structures--a data structure of data structures.

This project implements separate chaining to mitigate hash collisions.

Another method for resolving hash collisions is
[linear probing](http://en.wikipedia.org/wiki/Linear_probing).  Linear probing
is not implemented in this project.

*For specific examples and documentation, see the below sections*

#### Environment:

Although this implementation is designed to be used with
[Node.js](http://www.nodejs.org), it could be used in other contexts with minor
modifications.  This implementation does not have any external dependencies
that would preclude it from being used in the browser--just include it with a
`<script>` tag and it should be good to go.  _Disclaimer: I have not tested
this implementation in any other context/environment; only tested with node.js_

----

## Basic Usage

Install with npm :

```bash
# not yet published to npm
npm install simple-hashtable --save
```

```javascript
var SimpleHashTable = require('simple-hashtable');
var hashtable = new SimpleHashTable();

hashtable.isEmpty();
// --> true

hashtable.put('node', 'asychronous, event-driven io for server side javascript')
         .put('mongodb', 'noSQL database');
// API supports method chaining for 'put' method

hashtable.isEmpty();
// --> false

hashtable.get('node');
// --> asychronous, event-driven io for server side javascript

hashtable.get('mongodb')
// --> noSQL database

hashtable.put('node', 'server side javascript');
// overwrites old value with new value

hashtable.get('node');
// --> server side javascript

hashtable.remove('mongodb');
// --> true

hashtable.get('mongodb');
// --> -1

```
## API
**Available methods for a Simple Hash Table instance:**

* ### isEmpty()
    Determines if the hash table is empty or not. Returns true if is empty, false
    otherwise.

* ### put(key, value)
    Puts the value in the hash table and utilizes the key for lookup

* ### get(key)
    Gets the value from the hash table that is associated with the key

* ### remove(key)
    Removes the value from the hash table that is associated with the key

----
## License
MIT &copy; Jason Jones

[npm-image]:https://badge.fury.io/js/simple-hashtable.svg
[npm-url]:http://npmjs.org/package/simple-hashtable
[travis-image]:https://travis-ci.org/jasonsjones/simple-hashtable.svg
[travis-url]:https://travis-ci.org/jasonsjones/simple-hashtable
[dm-image]:https://david-dm.org/jasonsjones/simple-hashtable.svg
[dm-url]:https://david-dm.org/jasonsjones/simple-hashtable