"use strict";

var _LahiriSampler = require("./LahiriSampler");

var _LahiriSampler2 = _interopRequireDefault(_LahiriSampler);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var toCheck = new _LahiriSampler2.default();

    expect(toCheck !== null).toBe(true);
});

it("setMaxIfMax", function () {
    // SETUP
    var toTest = new _LahiriSampler2.default();
    var theArray = [];

    // CALL and ASSERT
    theArray.push(1);
    toTest.setMaxIfMax(1);
    expect(toTest.max).toBe(1);
    expect(!Number.isFinite(toTest.prevMax[toTest.prevMax.length - 1])).toBe(true);

    theArray.push(2);
    toTest.setMaxIfMax(2);
    expect(toTest.max).toBe(2);
    expect(toTest.prevMax[toTest.prevMax.length - 1]).toBe(1);

    theArray.push(0.5);
    toTest.setMaxIfMax(0.5);
    expect(toTest.max).toBe(2);
    expect(toTest.prevMax[toTest.prevMax.length - 1]).toBe(1);
});

it("removeMaxIfMax", function () {
    // SETUP
    var toTest = new _LahiriSampler2.default();
    var theArray = [];
    theArray.push(1);
    toTest.setMaxIfMax(1);
    theArray.push(2);
    toTest.setMaxIfMax(2);
    theArray.push(0.5);
    toTest.setMaxIfMax(0.5);

    // CALL and ASSERT
    var toRemove = theArray.pop();
    toTest.removeMaxIfMax(toRemove);
    expect(toTest.max).toBe(2);
    expect(toTest.prevMax[toTest.prevMax.length - 1]).toBe(1);

    toRemove = theArray.pop();
    toTest.removeMaxIfMax(toRemove);
    expect(toTest.max).toBe(1);
    expect(!Number.isFinite(toTest.prevMax[toTest.prevMax.length - 1])).toBe(true);

    toRemove = theArray.pop();
    toTest.removeMaxIfMax(toRemove);
    expect(!Number.isFinite(toTest.max)).toBe(true);
});

/**
 * This method is probabilistic in nature so it CAN fail with a small probability.
 */
it("sample", function () {

    // SETUP
    var toTest = new _LahiriSampler2.default();
    var theArray = [];
    theArray.push(2);
    toTest.setMaxIfMax(2);
    theArray.push(3);
    toTest.setMaxIfMax(3);
    theArray.push(1);
    toTest.setMaxIfMax(1);

    // CALL
    var sample = [];

    for (var i = 0; i < 100; i++) {
        _ArrayUtils2.default.extend(sample, toTest.sample(theArray, null, 10));
    }

    // ASSERT
    expect(sample.length).toBe(1000);

    var num3s = 0;
    var num2s = 0;
    var num1s = 0;

    sample.forEach(function (sample) {
        if (sample === 3) {
            num3s++;
        }
        if (sample === 2) {
            num2s++;
        }
        if (sample === 1) {
            num1s++;
        }
    });

    expect(num3s).toBeGreaterThanOrEqual(num2s);
    expect(num3s).toBeGreaterThanOrEqual(num1s);
    expect(num2s).toBeGreaterThanOrEqual(num1s);
});