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

    describe("run with invalid ordering", function () {

        it("should throw an error", function () {

            uniqueify.bind(null, [1, 2, 3], 123).should.throwError();
            uniqueify.bind(null, [1, 2, 3], "foo").should.throwError();
            uniqueify.bind(null, [1, 2, 3], {a: 'b'}).should.throwError();
            uniqueify.bind([1, 2, 3], 123).should.throwError();
            uniqueify.bind([1, 2, 3], "foo").should.throwError();
            uniqueify.bind([1, 2, 3], {a: 'b'}).should.throwError();

        });

    });

    describe("run with an empty array", function () {

        it("should not throw an error", function () {

            uniqueify.bind(null, []).should.not.throwError();

        });

    });

});

describe("without setting 'this'", function () {

    describe("without a custom order", function () {

        describe("unique numbers", function () {

            var arr = [4, 3, 1, 1, 1, 4, 3, 2, 2, 2, 0],
                unique = [0, 1, 2, 3, 4];

            it('should uniqueify the array', function () {

                uniqueify(arr);
                should.deepEqual(arr, unique);

            });

        });

        describe("unique strings", function () {

            var arr = ["world", "hi", "hello", "hi", "hello"],
                unique = ["hello", "hi", "world"];

            it('should uniqueify the array', function () {

                uniqueify(arr);
                should.deepEqual(arr, unique);

            });

        });

    });

    describe("with a custom order", function () {

        describe("unique strings by first letter", function () {

            var arr = ["world", "hi", "hello", "hi", "hello"],
                unique = ["hi", "world"];

            it('should uniqueify the array', function () {

                uniqueify(arr, function (a, b) {
                    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
                });
                should.deepEqual(arr, unique);

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

                uniqueify(arr, function (a, b) {
                    return a.id - b.id;
                });
                should.deepEqual(arr, unique);

            });

        });

    });

});

describe("with setting 'this'", function () {

    describe("without a custom order", function () {

        describe("unique numbers", function () {

            var arr = [4, 3, 1, 1, 1, 4, 3, 2, 2, 2, 0],
                unique = [0, 1, 2, 3, 4];

            it('should uniqueify the array', function () {

                uniqueify.call(arr);
                should.deepEqual(arr, unique);

            });

        });

        describe("unique strings", function () {

            var arr = ["world", "hi", "hello", "hi", "hello"],
                unique = ["hello", "hi", "world"];

            it('should uniqueify the array', function () {

                uniqueify.call(arr);
                should.deepEqual(arr, unique);

            });

        });

    });

    describe("with a custom order", function () {

        describe("unique strings by first letter", function () {

            var arr = ["world", "hi", "hello", "hi", "hello"],
                unique = ["hi", "world"];

            it('should uniqueify the array', function () {

                uniqueify.call(arr, function (a, b) {
                    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
                });
                should.deepEqual(arr, unique);

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

                uniqueify.call(arr, function (a, b) {
                    return a.id - b.id;
                });
                should.deepEqual(arr, unique);

            });

        });

    });

});