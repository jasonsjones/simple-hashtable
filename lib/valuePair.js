(function () {
    'use strict';

    function ValuePair(key, value) {
        this.key = key;
        this.value = value;

        this.toString = function () {
            return "[ " + this.key + ": " + this.value + " ]";
        };
    }
})();