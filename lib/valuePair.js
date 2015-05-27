(function () {
    'use strict';

    /**
     * Creates a new instance of key/value pair
     *
     * @constructor
     */
    function ValuePair(key, value) {
        this.key = key;
        this.value = value;
    }

    /**
     * Returns a string representation of a specific key/value pair
     *
     * @return {string} string representation of the key/value pair
     */
    ValuePair.prototype.toString = function () {
        return "[ " + this.key + ": " + this.value + " ]";
    };

    // expose ValuePair
    module.exports = ValuePair;
})();