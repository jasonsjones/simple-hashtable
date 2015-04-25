(function () {
    'use strict';

    function loseloseHashCode(key) {
        var hashValue = 0;
        for (var i = 0, len = key.length; i < len; i++) {
            hashValue += key.charCodeAt(i);
        }
        return hashValue % 42;
    }

    function HashTable() {
        this.table = [];
    }

    Hashtable.prototype = {
        // TODO: implement the following functions:
        // put(key, value)
        // remove(key)
        // get(get)
    };

    module.exports = HashTable;
}());
