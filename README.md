[![Version](http://img.shields.io/npm/v/mu-unique.svg)](https://www.npmjs.org/package/mu-unique)
[![Version](http://img.shields.io/bower/v/mu-unique.svg)](https://github.com/mu-lib/mu-unique)
[![Build Status](https://api.travis-ci.org/mu-lib/mu-unique.svg?branch=master)](https://travis-ci.org/mu-lib/mu-unique)
[![Coverage Status](https://img.shields.io/coveralls/mu-lib/mu-unique/master.svg)](https://coveralls.io/r/mu-lib/mu-unique)

# mu-unique

Uniqueify an array of elements.

**Runtime complexity:** `O(n*log(n))` for sortable arrays, `O(n^2)` for
non-sortable arrays.

`unique(arr, sortable, comparator)`

0. `arr {Array}` - The source array.
0. `sortable {Boolean}` - Optional. Does the array contain sortable elements?
   **defaults to `false`**.
0. `comparator {Function}` - Optional.
    - If the array is sortable, it defines the order of the elements in the
      array. It is called with 2 elements from the array and should return `0`
      if they are equal, a positive number if `a` is bigger and a negative
      number if `b` is bigger. If not provided, the array will be sorted with a
      natural order (as defined by the runtime).
    - If the array is not sortable, it defines the equality between elements
      in the array. It is called with 2 elements from the array and should 
      return `true` if they are equal, and `false` otherwise.
      If not provided, the elements will be tested for equality with `===`.
   
**Notes:**

0. The function modifies the array and returns its new length.
0. The original order of items may not be preserved.
0. If the `this` value of the function is defined, it will be used as the array
   (see examples). Thus it is possible to use this function to extend the Array 
   prototype: `Array.prototype.unique = unique`.

## Installation

- Node:
    0. `npm install mu-unique`
    0. `var unique = require('mu-unique');`
- AMD (install with bower):
    0. `bower install mu-unique`
    0. `require(['mu-unique'], function(unique){ /* ... */ });`
   
Run tests with `make test`.

Run coverage analysis with `make coverage` (coverage report is saved to `./coverage`).

## Examples

```Javascript
var arr = [1, 2, 1, 2, 3],
    len = unique(arr);
console.log(arr, true); // [1, 2, 3]
console.log(len); // 3
```

```Javascript
var o1 = {},
    o2 = function(){},
    o3 = "foo",
    arr = [o1,o1,o2,o3,o2,o3],
    len = unique(arr);
console.log(arr); // [o1, o2, o3]
console.log(len); // 3
```

**With a custom order:**

```Javascript
var arr1 = ['hello', 'hi', 'world'],
    arr2 = unique(arr1, function(a, b){
        // compare only first character
        return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0; 
    });
console.log(arr1); // ['hello', 'hi', 'world']
console.log(arr2); // ['hello', 'world']
```

**By setting the `this` value:**

```Javascript
var arr = [1, 2, 1, 2, 3],
    len = unique.call(arr);
console.log(arr); // [1, 2, 3]
console.log(len); // 3
```
