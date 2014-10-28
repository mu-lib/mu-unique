(function () {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else
        throw Error('Cannot find a module loader');
    function factory() {
        return function (arr, order) {
            Array.prototype.sort.call(arr, order);
        };
    }
}());