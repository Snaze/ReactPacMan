"use strict";

var _MatrixUtils = require("./MatrixUtils");

var _MatrixUtils2 = _interopRequireDefault(_MatrixUtils);

var _ArrayUtils = require("./ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("test create", function () {
    // SETUP

    // CALL
    var result = _MatrixUtils2.default.create(3, 3, 1);

    // ASSERT
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            expect(result[y][x]).toBe(1);
        }
    }
});

it("is1D", function () {
    // SETUP
    var yes1 = [1, 2, 3];
    var yes2 = [1];
    var no1 = [[1, 2]];
    var no2 = [[1, 2], [3, 4]];

    // CALL and ASSERT
    expect(_MatrixUtils2.default.is1D(no1)).toBe(false);
    expect(_MatrixUtils2.default.is1D(no2)).toBe(false);
    expect(_MatrixUtils2.default.is1D(yes1)).toBe(true);
    expect(_MatrixUtils2.default.is1D(yes2)).toBe(true);
});

it("is2D", function () {
    // SETUP
    var no1 = [1, 2, 3];
    var no2 = [];
    var yes1 = [[1, 2]];
    var yes2 = [[1, 2], [3, 4]];

    // CALL and ASSERT
    expect(_MatrixUtils2.default.is2D(no1)).toBe(false);
    expect(_MatrixUtils2.default.is2D(no2)).toBe(false);
    expect(_MatrixUtils2.default.is2D(yes1)).toBe(true);
    expect(_MatrixUtils2.default.is2D(yes2)).toBe(true);
});

it("Convert to 2D", function () {
    // SETUP
    var toConvert = [1, 2, 3];

    // CALL
    var toCheck = _MatrixUtils2.default.convertTo2D(toConvert);

    // ASSERT
    expect(toCheck.length).toBe(3);
    expect(toCheck[0].length).toBe(1);
    expect(toCheck[0][0]).toBe(1);
    expect(toCheck[1].length).toBe(1);
    expect(toCheck[1][0]).toBe(2);
    expect(toCheck[2].length).toBe(1);
    expect(toCheck[2][0]).toBe(3);
});

it("toDiagonal", function () {
    // SETUP
    var toDiagonalize = [1, 2, 3];

    // CALL
    var toCheck = _MatrixUtils2.default.toDiagonal(toDiagonalize);

    // ASSERT
    expect(toCheck.length).toBe(3);
    expect(toCheck[0].length).toBe(3);
    expect(toCheck[0][0]).toBe(1);
    expect(toCheck[0][1]).toBe(0);
    expect(toCheck[0][2]).toBe(0);

    expect(toCheck[1].length).toBe(3);
    expect(toCheck[1][0]).toBe(0);
    expect(toCheck[1][1]).toBe(2);
    expect(toCheck[1][2]).toBe(0);

    expect(toCheck[2].length).toBe(3);
    expect(toCheck[2][0]).toBe(0);
    expect(toCheck[2][1]).toBe(0);
    expect(toCheck[2][2]).toBe(3);
});

it("popColumn", function () {
    // SETUP
    var toPopFrom = [[1, 2, 3], [1, 2, 3]];

    // CALL
    _MatrixUtils2.default.popColumn(toPopFrom);

    // ASSERT
    expect(toPopFrom.length).toBe(2);
    expect(toPopFrom[0].length).toBe(2);
    expect(toPopFrom[1].length).toBe(2);
    expect(_ArrayUtils2.default.arrayEquals(toPopFrom[0], [1, 2])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(toPopFrom[1], [1, 2])).toBe(true);
});