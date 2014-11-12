(function() {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['./src/unique'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('./src/unique')
        );
    } else {
        throw Error("no module loader found");
    }

    function factory(unique) {
        return unique;
    }

})();
