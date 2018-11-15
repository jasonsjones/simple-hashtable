[![npm version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]
[![dep status][dep-status-image]][dep-status-url]
[![dev dep status][dev-status-image]][dev-status-url]
[![license](https://img.shields.io/npm/l/simple-hashtable.svg?style=flat-square)](LICENSE-MIT)

[npm-image]: https://img.shields.io/npm/v/simple-hashtable.svg?style=flat-square
[npm-url]: http://npmjs.org/package/simple-hashtable
[circleci-image]: https://img.shields.io/circleci/project/github/jasonsjones/simple-hashtable.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/jasonsjones/simple-hashtable
[dep-status-image]: https://img.shields.io/david/jasonsjones/simple-hashtable.svg?style=flat-square
[dep-status-url]: https://david-dm.org/jasonsjones/simple-hashtable
[dev-status-image]: https://img.shields.io/david/dev/jasonsjones/simple-hashtable.svg?style=flat-square
[dev-status-url]: https://david-dm.org/jasonsjones/simple-hashtable?type=dev

# Simple Hash Table

> A javascript implementation of a [hash table](http://en.wikipedia.org/wiki/Hash_Table) data structure.

## Description

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

Hash collisions can be handled using one of several techniques. One way is to
implement what is called
[separate chaining](http://en.wikipedia.org/wiki/Hash_table#Separate_chaining).
With separate chaining, instead of assigning a single value to the index
(or hash), some type of additional data structure is assigned, say a linked-list
for example. Then the payload (key/value pair) is added to the data structure
based on the data structure's native API. So basically, the hash table becomes
an array of data structures--a data structure of data structures.

This project implements separate chaining to mitigate hash collisions.

Another method for resolving hash collisions is
[linear probing](http://en.wikipedia.org/wiki/Linear_probing). Linear probing
is not implemented in this project.

_For specific examples and documentation, see the below sections_

#### Environment:

Although this implementation is designed to be used with
[Node.js](http://www.nodejs.org), it could be used in other contexts with minor
modifications. This implementation does not have any external dependencies
that would preclude it from being used in the browser--just include it with a
`<script>` tag and it should be good to go. _Disclaimer: I have not tested
this implementation in any other context/environment; only tested with node.js_

---

## Basic Usage

Install with npm :

```bash
npm install simple-hashtable --save
```

```javascript
var SimpleHashTable = require('simple-hashtable');
var hashtable = new SimpleHashTable();

hashtable.isEmpty();
// --> true

hashtable
    .put('node', 'asynchronous, event-driven io for server side javascript')
    .put('mongodb', 'noSQL database');
// API supports method chaining for 'put' method

hashtable.isEmpty();
// --> false

hashtable.size();
// --> 2

hashtable.containsKey('node');
// --> true

hashtable.containsKey('express');
// --> false

hashtable.containsValue('noSQL database');
// --> true;

hashtable.get('node');
// --> asynchronous, event-driven io for server side javascript

hashtable.get('mongodb');
// --> noSQL database

hashtable.keys();
// --> ['node', 'mongodb']

hashtable.values();
// --> ['asynchronous, event-driven io for server side javascript',
//      'noSQL database']

hashtable.put('node', 'server side javascript');
// overwrites old value with new value

hashtable.get('node');
// --> server side javascript

hashtable.remove('mongodb');
// --> true

hashtable.get('mongodb');
// --> -1

hashtable.size();
// --> 1

hashtable.clear();
hashtable.isEmpty();
// --> true
```

## API

**Available methods for a Hash Table instance:**

-   ### isEmpty()

    Determines if the hash table is empty or not. Returns true if is empty, false
    otherwise.

-   ### clear()

    Clears all entries in the hash table

-   ### size()

    Returns the number of keys in the hash table

-   ### put(key, value)

    Puts the value in the hash table and utilizes the key for lookup

-   ### get(key)

    Gets the value from the hash table that is associated with the key

-   ### remove(key)

    Removes the value from the hash table that is associated with the key

-   ### containsKey(key)

    Determines whether or not the hash table contains the key

-   ### containsValue(value)

    Determines whether or not the hash table contains the value

-   ### keys()

    Returns an array of all the keys in the hash table

-   ### values()

    Returns an array of all the values in the hash table

-   ### setHashFn(fn)
    Sets the hash function for the hash table to fn

---

## License

MIT &copy; Jason Jones
