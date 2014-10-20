module.exports = function factory(sorter) {
    function trivialOrder(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    }
    function _uniqueifySorted(arr, order) {
        var i = 0, n = 1, len = arr.length;
        if (len < 2)
            return;
        while (i < len) {
            if (order(arr[i], arr[n - 1]) !== 0) {
                arr[n] = arr[i];
                n++;
            }
            i++;
        }
        arr.length = n;
    }
    return function (arr, order) {
        order = order || trivialOrder;
        if (typeof arr === 'function') {
            order = arr;
            arr = null;
        }
        arr = arr || this;
        if (typeof order !== 'function')
            throw Error('\'order\' must be a function');
        if (Object.prototype.toString.call(arr) !== '[object Array]')
            throw Error('\'arr\' must be an array');
        sorter(arr, order);
        _uniqueifySorted(arr, order);
        return arr.length;
    };
}(require('./sorter'));