define([], function factory() {
    return function (arr, order) {
        Array.prototype.sort.call(arr, order);
    };
});