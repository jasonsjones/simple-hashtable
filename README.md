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

This implementation uses the djb2 hashing function which provides a
good distribution of hashed values (or indexes) to minimize collisions.
A hash collision occurs when two different keys hash to the same value.
If the collisions are not handled properly, the first value in the hash
table will be overwritten by the second.

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

// more usage to follow...
```

## API
API still needs to be documented

----
## License
MIT &copy; Jason Jones
