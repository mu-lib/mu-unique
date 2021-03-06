(function () {
    if (typeof define === 'function' && define.amd) {
        define(['./sorter'], uniqueFactory);
    } else if (typeof exports === 'object') {
        module.exports = uniqueFactory(require('./sorter'));
    } else
        throw Error('Cannot find a module loader');
    function uniqueFactory(sorter) {
        var undefined, DEFAULT_SORTABLE = false;
        function trivialOrder(a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
        }
        function trivialCompare(a, b) {
            return a === b;
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
        function _uniqueifyNotSorted(arr, compare) {
            var i = 0, j, len = arr.length;
            while (i < len) {
                j = i + 1;
                while (j < len) {
                    if (compare(arr[i], arr[j])) {
                        arr[j--] = arr[--len];
                    }
                    j++;
                }
                i++;
            }
            arr.length = len;
        }
        return function () {
            var arr, sortable, comparator, args = Array.prototype.slice.call(arguments, 0);
            if (args.length === 0)
                args.push(this);
            if (args.length === 1) {
                if (Object.prototype.toString.call(args[0]) !== '[object Array]')
                    args.unshift(this);
                else
                    args.push(DEFAULT_SORTABLE);
            }
            if (args.length === 2) {
                if (Object.prototype.toString.call(args[0]) !== '[object Array]') {
                    args.unshift(this);
                } else if (args[1] === true) {
                    args.push(trivialOrder);
                } else if (args[1] === false) {
                    args.push(trivialCompare);
                } else {
                    args[2] = args[1];
                    args[1] = DEFAULT_SORTABLE;
                }
            }
            arr = args[0];
            sortable = args[1];
            comparator = args[2];
            if (Object.prototype.toString.call(arr) !== '[object Array]')
                throw Error('\'arr\' must be an array');
            if (!(sortable === true || sortable === false))
                throw Error('\'sortable\' must be a boolean');
            if (!(typeof comparator === 'function'))
                throw Error('\'comparator\' must be a function');
            if (sortable) {
                sorter(arr, comparator);
                _uniqueifySorted(arr, comparator);
            } else {
                _uniqueifyNotSorted(arr, comparator);
            }
            return arr.length;
        };
    }
}());