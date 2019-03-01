"use strict";

var _ArrayUtils = require("./ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("test getColumn", function () {
    // SETUP
    var dataSet = [[3, 4], [4, 5], [5, 6]];

    // CALL
    var col0 = _ArrayUtils2.default.getColumn(dataSet, 0);
    var col1 = _ArrayUtils2.default.getColumn(dataSet, 1);

    // ASSERT
    expect(col0.length).toBe(3);
    expect(col0[0]).toBe(3);
    expect(col0[1]).toBe(4);
    expect(col0[2]).toBe(5);

    expect(col1.length).toBe(3);
    expect(col1[0]).toBe(4);
    expect(col1[1]).toBe(5);
    expect(col1[2]).toBe(6);
});

it("test setColumn", function () {
    // SETUP
    var dataSet = [[3, 4], [4, 5], [5, 6]];

    // CALL
    _ArrayUtils2.default.setColumn(dataSet, [-3, -4, -5], 0);
    _ArrayUtils2.default.setColumn(dataSet, [-4, -5, -6], 1);

    // ASSERT
    var col0 = _ArrayUtils2.default.getColumn(dataSet, 0);
    var col1 = _ArrayUtils2.default.getColumn(dataSet, 1);

    expect(col0.length).toBe(3);
    expect(col0[0]).toBe(-3);
    expect(col0[1]).toBe(-4);
    expect(col0[2]).toBe(-5);

    expect(col1.length).toBe(3);
    expect(col1[0]).toBe(-4);
    expect(col1[1]).toBe(-5);
    expect(col1[2]).toBe(-6);
});

it("test forEachColumn", function () {
    // SETUP
    var dataSet = [[3, 4, 5]];
    var num = 0;
    var callback = function callback(column) {
        if ([3, 4, 5].indexOf(column[0]) >= 0) {
            num++;
        }
    };

    // CALL
    _ArrayUtils2.default.forEachColumn(dataSet, callback);

    // ASSERT
    expect(num).toBe(3);
});

it("test transpose", function () {
    // SETUP
    var dataSet = [[3, 4, 5], [6, 7, 8]];

    // CALL
    var result = _ArrayUtils2.default.transpose(dataSet);

    // ASSERT
    expect(result[0][0]).toBe(3);
    expect(result[0][1]).toBe(6);
    expect(result[1][0]).toBe(4);
    expect(result[1][1]).toBe(7);
    expect(result[2][0]).toBe(5);
    expect(result[2][1]).toBe(8);
});

it("test create", function () {
    // SETUP

    // CALL
    var result = _ArrayUtils2.default.create(3, 3, 1);

    // ASSERT
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            expect(result[y][x]).toBe(1);
        }
    }
});

it("test height", function () {
    // SETUP
    var input = [[1, 2], [3, 4], [5, 6]];

    // CALL
    var height = _ArrayUtils2.default.height(input);

    // ASSERT
    expect(height).toBe(3);
});

it("test width", function () {
    // SETUP
    var input = [[1, 2], [3, 4], [5, 6]];

    // CALL
    var width = _ArrayUtils2.default.width(input);

    // ASSERT
    expect(width).toBe(2);
});

it("range works", function () {
    // SETUP
    var length = 5;

    // CALL
    var toCheck = _ArrayUtils2.default.range(length);

    // ASSERT
    expect(toCheck[0]).toBe(0);
    expect(toCheck[1]).toBe(1);
    expect(toCheck[2]).toBe(2);
    expect(toCheck[3]).toBe(3);
    expect(toCheck[4]).toBe(4);
});

it("shuffle works", function () {
    // SETUP
    var length = 1000;
    var range = _ArrayUtils2.default.range(length);

    // CALL
    var shuffledRange = _ArrayUtils2.default.shuffle(range);

    // ASSERT
    var diffFound = false;
    for (var i = 0; i < length; i++) {
        if (range[i] !== shuffledRange[i]) {
            diffFound = true;
            break;
        }
    }
    expect(diffFound).toBe(true);
});

it("sample with replacement", function () {
    // SETUP
    var toSampleFrom = [1, 2, 3];

    // CALL
    var result = _ArrayUtils2.default.sample(toSampleFrom, 9, true);

    // ASSERT
    expect(result.length).toBe(9);
    for (var i = 0; i < 9; i++) {
        expect(toSampleFrom).toContain(result[i]);
    }
});

it("sample with replacement up to index 2", function () {
    // SETUP
    var toSampleFrom = [1, 2, 3];

    // CALL
    var result = _ArrayUtils2.default.sample(toSampleFrom, 9, true, 2);

    // ASSERT
    expect(result.length).toBe(9);
    for (var i = 0; i < 9; i++) {
        expect([1, 2]).toContain(result[i]);
    }
});

it("sample without replacement", function () {
    // SETUP
    var toSampleFrom = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var numToSample = 3;

    // CALL
    var result = _ArrayUtils2.default.sample(toSampleFrom, numToSample, false);

    // ASSERT
    expect(result.length).toBe(numToSample);
    for (var i = 0; i < numToSample; i++) {
        expect(toSampleFrom).toContain(result[i]);
    }
    expect(result[0] !== result[1]).toBe(true);
    expect(result[0] !== result[2]).toBe(true);
    expect(result[1] !== result[2]).toBe(true);
});

it("sample without replacement up to index", function () {
    // SETUP
    var toSampleFrom = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var numToSample = 3;

    // CALL
    var result = _ArrayUtils2.default.sample(toSampleFrom, numToSample, false, 3);

    // ASSERT
    expect(result.length).toBe(numToSample);
    for (var i = 0; i < numToSample; i++) {
        expect([1, 2, 3]).toContain(result[i]);
    }
    expect(result[0] !== result[1]).toBe(true);
    expect(result[0] !== result[2]).toBe(true);
    expect(result[1] !== result[2]).toBe(true);
});

it("test take", function () {
    // SETUP
    var toTakeFrom = [1, 2, 3, 4, 5];

    // CALL
    var result = _ArrayUtils2.default.take(toTakeFrom, 3, 1);
    var endResult = _ArrayUtils2.default.take(toTakeFrom, 3, 4);

    // ASSERT
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(3);
    expect(result[2]).toBe(4);
    expect(endResult.length).toBe(1);
    expect(endResult[0]).toBe(5);
});

it("test selectByIndices", function () {
    // SETUP
    var toSelectFrom = [0, 1, 2, 3, 4, 5];

    // CALL
    var result = _ArrayUtils2.default.selectByIndices(toSelectFrom, [0, 3, 5]);

    // ASSERT
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(3);
    expect(result[2]).toBe(5);
});

it("test element multiply", function () {
    // SETUP
    var array = [[1, 2], [3, 4]];

    // CALL
    var result = _ArrayUtils2.default.elementWiseMatrixMultiply(array, array);

    // ASSERT
    expect(result[0][0]).toBe(1);
    expect(result[0][1]).toBe(4);
    expect(result[1][0]).toBe(9);
    expect(result[1][1]).toBe(16);
});

it("test copyInto", function () {
    // SETUP
    var source = [1, 2, 3];
    var dest = [0, 0, 0];

    // CALL
    _ArrayUtils2.default.copyInto(source, dest);

    // ASSERT
    expect(dest[0]).toBe(1);
    expect(dest[1]).toBe(2);
    expect(dest[2]).toBe(3);
});

it("flatten works", function () {
    // SETUP
    var toFlatten = [[[3]]];
    var shouldEqual = [3];

    // CALL
    var toCheck = _ArrayUtils2.default.flatten(toFlatten);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(toCheck, shouldEqual)).toBe(true);
});

it("flatten works 2", function () {
    // SETUP
    var toFlatten = [0, [1, 2], 3, [[4], [[5, 6]]]];
    var shouldEqual = [0, 1, 2, 3, 4, 5, 6];

    // CALL
    var toCheck = _ArrayUtils2.default.flatten(toFlatten);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(toCheck, shouldEqual)).toBe(true);
});

it("arrayEquals works", function () {
    // SETUP
    var one_1 = [1, 2, 3];
    var one_2 = [1, 2, 3];

    var two_1 = [1, 2, 4];
    var two_2 = [1, 2, 3];

    var three_1 = [1, 2, 3];
    var three_2 = [1, 2, 3, 4];

    // CALL
    var one = _ArrayUtils2.default.arrayEquals(one_1, one_2);
    var two = _ArrayUtils2.default.arrayEquals(two_1, two_2);
    var three = _ArrayUtils2.default.arrayEquals(three_1, three_2);

    // ASSERT
    expect(one).toBe(true);
    expect(two).toBe(false);
    expect(three).toBe(false);
});

it("filter works", function () {
    // SETUP
    var toFilter = [-5, -4, -3, -2, -1, 0];

    // CALL
    var result = _ArrayUtils2.default.filter(toFilter, function (item) {
        return item >= 0;
    });

    // ASSERT
    expect(result.length).toBe(1);
    expect(result[0]).toBe(0);
});

it("arrayApproxEquals works", function () {
    // SETUP
    var toCheck = [0.0000001, 0.0000002];
    var other = [0.00000012222, 0.00000022222];
    var otherFa = [0.00002012222, 0.00000022222];

    // CALL
    var areEquals = _ArrayUtils2.default.arrayApproxEquals(toCheck, other);
    var areEquals2 = _ArrayUtils2.default.arrayApproxEquals(toCheck, otherFa);

    // ASSERT
    expect(areEquals).toBe(true);
    expect(areEquals2).toBe(false);
});

it("isIn works", function () {
    // SETUP
    var toCheck = [0, 1, 2, 3];

    // CALL

    // ASSERT
    expect(_ArrayUtils2.default.isIn(toCheck, 0)).toBe(true);
    expect(_ArrayUtils2.default.isIn(toCheck, 4)).toBe(false);
});

it("expand works", function () {
    // SETUP
    var toExpand = [];
    var index = 3;

    // CALL
    _ArrayUtils2.default.expand(toExpand, index, 0);

    // ASSERT
    expect(toExpand.length).toBe(4);
    expect(_ArrayUtils2.default.arrayEquals(toExpand, [0, 0, 0, 0])).toBe(true);

    _ArrayUtils2.default.expand(toExpand, index, 4);
    expect(toExpand.length).toBe(4);
    expect(_ArrayUtils2.default.arrayEquals(toExpand, [0, 0, 0, 0])).toBe(true);
});

it("copy works", function () {
    // SETUP
    var toCopy = [1, 2, 3];

    // CALL
    var copied = _ArrayUtils2.default.copy(toCopy);
    copied.push(4);

    // ASSERT
    expect(toCopy.length).toBe(3);
    expect(_ArrayUtils2.default.arrayEquals(toCopy, [1, 2, 3])).toBe(true);
    expect(copied.length).toBe(4);
    expect(_ArrayUtils2.default.arrayEquals(copied, [1, 2, 3, 4])).toBe(true);
});

it("removeByIndex works", function () {
    // SETUP
    var toRemoveFrom = [1, 2, 3];

    // CALL
    var temp = _ArrayUtils2.default.removeByIndex(toRemoveFrom, 0);

    // ASSERT
    expect(temp.length).toBe(2);
    expect(toRemoveFrom.length).toBe(3);
    expect(_ArrayUtils2.default.arrayEquals(temp, [2, 3])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(toRemoveFrom, [1, 2, 3])).toBe(true);
});

it("select works", function () {
    // SETUP
    var toSelectFrom = [{ data: 1 }, { data: 2 }, { data: 3 }];
    var toSelectFrom2 = [];

    // CALL
    var toCheck = _ArrayUtils2.default.select(toSelectFrom, function (item) {
        return item.data;
    });
    var toCheck2 = _ArrayUtils2.default.select(toSelectFrom2, function (item) {
        return item.data;
    });

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(toCheck, [1, 2, 3])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(toCheck2, [])).toBe(true);
});

it("update works", function () {
    // SETUP
    var toUpdate = [{ data: 1 }, { data: 2 }, { data: 3 }];
    var toUpdateWith = [4, 5, 6];

    // CALL
    _ArrayUtils2.default.update(toUpdate, function (item, idx) {
        return item.data = toUpdateWith[idx];
    });

    // ASSERT
    expect(toUpdate[0].data).toBe(4);
    expect(toUpdate[1].data).toBe(5);
    expect(toUpdate[2].data).toBe(6);
});

it("update works with filter", function () {
    // SETUP
    var toUpdate = [{ data: 1 }, { data: 2 }, { data: 3 }];

    // CALL
    _ArrayUtils2.default.update(toUpdate, function (item, idx) {
        item.data = 10;
    }, function (item) {
        return item.data === 2;
    });

    // ASSERT
    expect(toUpdate[0].data).toBe(1);
    expect(toUpdate[1].data).toBe(10);
    expect(toUpdate[2].data).toBe(3);
});

it("deepCopy works", function () {
    // SETUP
    var toCopy = [[1, 2], [3, 4], [5, 6]];

    // CALL
    var toCheck = _ArrayUtils2.default.deepCopy(toCopy);
    toCopy[0].push(7);
    toCopy[1].push(7);
    toCopy[2].push(7);

    // ASSERT
    expect(toCheck.length).toBe(3);
    expect(toCheck[0].length).toBe(2);
    expect(toCheck[1].length).toBe(2);
    expect(toCheck[2].length).toBe(2);
});

it("create1D works", function () {
    // SETUP
    var length = 2;

    // CALL
    var toCheck = _ArrayUtils2.default.create1D(length, 0);

    // ASSERT
    expect(toCheck.length).toBe(2);
    expect(_ArrayUtils2.default.arrayEquals(toCheck, [0, 0])).toBe(true);
});

it("distinct integers", function () {
    // SETUP
    var toTest = [1, 1, 1, 2, 3, 4, 4, 5, 5];

    // CALL
    var toCheck = _ArrayUtils2.default.distinctIntegers(toTest);

    // ASSERT
    expect(toCheck.length).toBe(5);
    expect(_ArrayUtils2.default.isIn(toCheck, 1)).toBe(true);
    expect(_ArrayUtils2.default.isIn(toCheck, 2)).toBe(true);
    expect(_ArrayUtils2.default.isIn(toCheck, 3)).toBe(true);
    expect(_ArrayUtils2.default.isIn(toCheck, 4)).toBe(true);
    expect(_ArrayUtils2.default.isIn(toCheck, 5)).toBe(true);
});

it("arrayIsCloseTo", function () {
    expect(_ArrayUtils2.default.arrayIsCloseTo([0.1, 0.2, 0.3], [0.1, 0.2, 0.31], 0.1)).toBe(true);
    expect(_ArrayUtils2.default.arrayIsCloseTo([0.1, 0.2, 0.3], [0.1, 0.2, 0.31], 1e-6)).toBe(false);
});