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

There a few different ways that hash collisions can be handled.  One way is to
implement what is called
[separate chaining](http://en.wikipedia.org/wiki/Hash_table#Separate_chaining).
With separate chaining, instead
of assigning a single value to the index (or hash), some sort of additional
data structure is assigned, say a linked-list for example.  Then the payload
(key/value pair) is added to the data structure based on its API.  So basically,
the hash table becomes an array of data structures--a data structure of data
structures.

Separate chaining is not yet implemented here, but it is in the plan.

Another method for resolving hash collisions is
[linear probing](http://en.wikipedia.org/wiki/Linear_probing).  Linear probing
will not be implemented within this project.

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
