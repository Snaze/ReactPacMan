"use strict";

var _MathUtil = require("./MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("distance works", function () {
    // SETUP
    var array1 = [1, 2, 3];
    var array2 = [0, 2, 3];

    // CALL
    var distance = _MathUtil2.default.distance(array1, array1);
    var distance2 = _MathUtil2.default.distance(array1, array2);

    // ASSERT
    expect(distance).toBeCloseTo(0);
    expect(distance2).toBeCloseTo(1);
});

it("clip works", function () {
    // SETUP
    var toClip = [0.1, -0.1, 1.1, 1.0, 0.5];

    // CALL
    _MathUtil2.default.clip(toClip, 0, 1);

    // ASSERT
    var filteredResult = _ArrayUtils2.default.filter(toClip, function (item) {
        return item >= 0 && item <= 1;
    });
    expect(filteredResult.length).toBe(5);
    expect(filteredResult[0]).toBeCloseTo(0.1);
    expect(filteredResult[1]).toBeCloseTo(0.0);
    expect(filteredResult[2]).toBeCloseTo(1.0);
    expect(filteredResult[3]).toBeCloseTo(1.0);
    expect(filteredResult[4]).toBeCloseTo(0.5);
});

it("getNumBits", function () {
    // SETUP

    // CALL

    // ASSERT
    expect(_MathUtil2.default.getNumBits(0)).toBe(1);
    expect(_MathUtil2.default.getNumBits(1)).toBe(1);
    expect(_MathUtil2.default.getNumBits(2)).toBe(2);
    expect(_MathUtil2.default.getNumBits(3)).toBe(2);
    expect(_MathUtil2.default.getNumBits(4)).toBe(3);
    expect(_MathUtil2.default.getNumBits(5)).toBe(3);
    expect(_MathUtil2.default.getNumBits(6)).toBe(3);
    expect(_MathUtil2.default.getNumBits(7)).toBe(3);
    expect(_MathUtil2.default.getNumBits(8)).toBe(4);
    expect(_MathUtil2.default.getNumBits(9)).toBe(4);
    expect(_MathUtil2.default.getNumBits(10)).toBe(4);
});

it("isClose", function () {
    // SETUP

    // CALL

    // ASSERT
    expect(_MathUtil2.default.isClose(0.1, 0.2)).toBe(false);
    expect(_MathUtil2.default.isClose(0.001, 0.0012, 1e-3)).toBe(true);
});