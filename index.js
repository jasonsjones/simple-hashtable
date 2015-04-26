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

    HashTable.prototype = {

        isEmpty: function (attribute) {
            return this.table.length === 0;
        },

        put: function (key, value) {
            var index = loseloseHashCode(key);
            //console.log(index + ' -- ' + value);
            this.table[index] = value;
        },

        get: function (key) {
            return this.table[loseloseHashCode(key)];
        },

        remove: function (key) {
            this.table[loseloseHashCode(key)] = undefined;
        }
    };

    module.exports = HashTable;
}());
