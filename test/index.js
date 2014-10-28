var should = require('should'),
    uniqueify = require('../');

describe("arguments validation", function () {

    describe("run with non-array", function () {

        it("should throw an error", function () {

            uniqueify.bind(null, 123).should.throwError();
            uniqueify.bind(null, "foo").should.throwError();
            uniqueify.bind(null, {a: 'b'}).should.throwError();

        });

    });

    describe("call with non-array", function () {

        it("should throw an error", function () {

            uniqueify.bind(123).should.throwError();
            uniqueify.bind("foo").should.throwError();
            uniqueify.bind({a: 'b'}).should.throwError();

        });

    });

    describe("run with invalid sortable", function () {

        it("should throw an error", function () {

            uniqueify.bind(null, [1, 2, 3], 123).should.throwError();
            uniqueify.bind(null, [1, 2, 3], "foo").should.throwError();
            uniqueify.bind(null, [1, 2, 3], {a: 'b'}, function () {
            }).should.throwError();
            uniqueify.bind([1, 2, 3], 123).should.throwError();
            uniqueify.bind([1, 2, 3], "foo").should.throwError();
            uniqueify.bind([1, 2, 3], {a: 'b'}, function () {
            }).should.throwError();

        });

    });

    describe("run with invalid comparator", function () {

        it("should throw an error", function () {

            uniqueify.bind(null, [1, 2, 3], true, 123).should.throwError();
            uniqueify.bind(null, [1, 2, 3], true, "foo").should.throwError();
            uniqueify.bind(null, [1, 2, 3], false, {a: 'b'}).should.throwError();
            uniqueify.bind([1, 2, 3], false, 123).should.throwError();
            uniqueify.bind([1, 2, 3], true, "foo").should.throwError();
            uniqueify.bind([1, 2, 3], true, {a: 'b'}).should.throwError();

        });

    });

    describe("run with an empty array", function () {

        it("should not throw an error", function () {

            uniqueify.bind(null, []).should.not.throwError();

        });

    });

});

describe("without setting 'this'", function () {

    describe("with sortable array", function () {

        describe("without a custom sorter", function () {

            describe("unique numbers", function () {

                var arr = [4, 3, 1, 1, 1, 4, 3, 2, 2, 2, 0],
                    unique = [0, 1, 2, 3, 4];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, true));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique strings", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hello", "hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, true));
                    arr.should.containDeep(unique);

                });

            });

        });

        describe("with a custom sorter", function () {

            describe("unique strings by first letter", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, true, function (a, b) {
                        return a[0] > b[0] ? 1 : a[0] > b[0] ? -1 : 0;
                    }));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique objects by field", function () {

                var arr = [
                        {id: 1},
                        {id: 1},
                        {id: 2},
                        {id: 1},
                        {id: 3}
                    ],
                    unique = [
                        {id: 1},
                        {id: 2},
                        {id: 3}
                    ];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, true, function (a, b) {
                        return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
                    }));
                    arr.should.containDeep(unique);

                });

            });

        });

    });

    describe("with unsortable array", function () {

        describe("without a custom comparator", function () {

            describe("unique numbers", function () {

                var arr = [4, 3, 1, 1, 1, 4, 3, 2, 2, 2, 0],
                    unique = [0, 1, 2, 3, 4];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, false));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique strings", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hello", "hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, false));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique objects", function () {

                var o1 = {a: 'a'}, o2 = {b: 'b'}, o3 = {c: 'c'},
                    arr = [o1, o1, o2, o3, o2, o1, o3, o2],
                    unique = [o1, o2, o3];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, false));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique functions", function () {

                var f1 = function () {
                    },
                    f2 = function () {
                        return true;
                    },
                    f3 = function () {
                        return false;
                    },
                    f4 = function () {
                    },
                    arr = [f1, f2, f2, f1, f4, f1, f2, f4, f3, f3, f4],
                    unique = [f1, f2, f3, f4];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, false));
                    arr.should.containDeep(unique);

                });

            });

        });

        describe("with a custom comparator", function () {

            describe("unique strings by first letter", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, false, function (a, b) {
                        return a[0] === b[0];
                    }));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique objects by field", function () {

                var arr = [
                        {id: 1},
                        {id: 1},
                        {id: 2},
                        {id: 1},
                        {id: 3}
                    ],
                    unique = [
                        {id: 1},
                        {id: 2},
                        {id: 3}
                    ];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify(arr, false, function (a, b) {
                        return a.id === b.id;
                    }));
                    arr.should.containDeep(unique);

                });

            });

        });

    });

});

describe("with setting 'this'", function () {

    describe("with sortable array", function () {

        describe("without a custom sorter", function () {

            describe("unique numbers", function () {

                var arr = [4, 3, 1, 1, 1, 4, 3, 2, 2, 2, 0],
                    unique = [0, 1, 2, 3, 4];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, true));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique strings", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hello", "hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, true));
                    arr.should.containDeep(unique);

                });

            });

        });

        describe("with a custom sorter", function () {

            describe("unique strings by first letter", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, true, function (a, b) {
                        return a[0] > b[0] ? 1 : a[0] > b[0] ? -1 : 0;
                    }));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique objects by field", function () {

                var arr = [
                        {id: 1},
                        {id: 1},
                        {id: 2},
                        {id: 1},
                        {id: 3}
                    ],
                    unique = [
                        {id: 1},
                        {id: 2},
                        {id: 3}
                    ];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, true, function (a, b) {
                        return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
                    }));
                    arr.should.containDeep(unique);

                });

            });

        });

    });

    describe("with unsortable array", function () {

        describe("without a custom sorter", function () {

            describe("unique numbers", function () {

                var arr = [4, 3, 1, 1, 1, 4, 3, 2, 2, 2, 0],
                    unique = [0, 1, 2, 3, 4];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, false));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique strings", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hello", "hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, false));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique objects", function () {

                var o1 = {a: 'a'}, o2 = {b: 'b'}, o3 = {c: 'c'},
                    arr = [o1, o1, o2, o3, o2, o1, o3, o2],
                    unique = [o1, o2, o3];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, false));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique functions", function () {

                var f1 = function () {
                    },
                    f2 = function () {
                        return true;
                    },
                    f3 = function () {
                        return false;
                    },
                    f4 = function () {
                    },
                    arr = [f1, f2, f2, f1, f4, f1, f2, f4, f3, f3, f4],
                    unique = [f1, f2, f3, f4];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, false));
                    arr.should.containDeep(unique);

                });

            });

        });

        describe("with a custom sorter", function () {

            describe("unique strings by first letter", function () {

                var arr = ["world", "hi", "hello", "hi", "hello"],
                    unique = ["hi", "world"];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, false, function (a, b) {
                        return a[0] === b[0];
                    }));
                    arr.should.containDeep(unique);

                });

            });

            describe("unique objects by field", function () {

                var arr = [
                        {id: 1},
                        {id: 1},
                        {id: 2},
                        {id: 1},
                        {id: 3}
                    ],
                    unique = [
                        {id: 1},
                        {id: 2},
                        {id: 3}
                    ];

                it('should uniqueify the array', function () {

                    should.equal(unique.length, uniqueify.call(arr, false, function (a, b) {
                        return a.id === b.id;
                    }));
                    arr.should.containDeep(unique);

                });

            });

        });

    });

});
