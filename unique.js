'use strict';

/* istanbul ignore next */

if (typeof define === 'function' && define.amd) {

    define(['./dist/amd/unique'], function(unique) {
        return unique;
    });

} else if (typeof exports === 'object') {

    module.exports = require('./dist/cjs/unique');

} else throw Error("Cannot find a module loader");
