"use strict";

var _EasingFunctions = require("./EasingFunctions");

var _EasingFunctions2 = _interopRequireDefault(_EasingFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("test doCalculation minValue", function () {
    // SETUP
    var t = 0;
    var minValue = 0.15;
    var maxValue = 0.25;

    // CALL
    var nextValue = _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeInCubic, t, minValue, maxValue);

    // ASSERT
    expect(nextValue).toBe(minValue);
});

it("test doCalculation maxValue", function () {
    // SETUP
    var t = 1;
    var minValue = 0.15;
    var maxValue = 0.25;

    // CALL
    var nextValue = _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeInCubic, t, minValue, maxValue);

    // ASSERT
    expect(nextValue).toBe(maxValue);
});

it("test doCalculation between values", function () {
    // SETUP
    var t = 0.5;
    var minValue = 0.15;
    var maxValue = 0.25;

    // CALL
    var nextValue = _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeInCubic, t, minValue, maxValue);

    // ASSERT
    expect(minValue < nextValue && maxValue > nextValue).toBe(true);
});

it("test doCalculation min and max are equal", function () {
    // SETUP
    var t = 0.5;
    var minAndMaxValue = 0.25;

    // CALL
    var nextValue = _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeInCubic, t, minAndMaxValue, minAndMaxValue);

    // ASSERT
    expect(nextValue).toBe(minAndMaxValue);
});

it("test getTime min = t", function () {
    // SETUP
    var t = 1;
    var minTime = 1;
    var maxTime = 17;

    // CALL
    var nextTime = _EasingFunctions2.default.getTime(minTime, maxTime, t);
    var nextTimeInvert = _EasingFunctions2.default.getTime(minTime, maxTime, t, true);

    // ASSERT
    expect(nextTime).toBe(0);
    expect(nextTimeInvert).toBe(1);
});

it("test getTime max = t", function () {
    // SETUP
    var t = 17;
    var minTime = 1;
    var maxTime = 17;

    // CALL
    var nextTime = _EasingFunctions2.default.getTime(minTime, maxTime, t);
    var nextTimeInvert = _EasingFunctions2.default.getTime(minTime, maxTime, t, true);

    // ASSERT
    expect(nextTime).toBe(1);
    expect(nextTimeInvert).toBe(0);
});

it("test getTime t is between", function () {
    // SETUP
    var t = 8;
    var minTime = 1;
    var maxTime = 17;

    // CALL
    var nextTime = _EasingFunctions2.default.getTime(minTime, maxTime, t);
    var nextTimeInvert = _EasingFunctions2.default.getTime(minTime, maxTime, t, true);

    // ASSERT
    expect(nextTime > 0 && nextTime < 1).toBe(true);
    expect(nextTimeInvert > 0 && nextTimeInvert < 1).toBe(true);
});