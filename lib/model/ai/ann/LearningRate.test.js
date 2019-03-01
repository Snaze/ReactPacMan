"use strict";

var _LearningRate = require("./LearningRate");

var _LearningRate2 = _interopRequireDefault(_LearningRate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("basic test", function () {
    var value = new _LearningRate2.default();

    expect(value !== null).toBe(true);
});

it("test getGrowthConstant", function () {
    // SETUP
    var startValue = 100;
    var endValue = 450;
    var numEpochs = 6;

    // CALL
    var growthConstant = _LearningRate2.default.getGrowthConstant(startValue, endValue, numEpochs);

    // ASSERT
    expect(growthConstant).toBeCloseTo(0.2506);
});

it("test getLearningRate", function () {
    // SETUP
    var lr = new _LearningRate2.default(1.0, 0.001, 100);
    // let k = -0.069077552789821;

    // CALL
    var learningRate = lr.getLearningRate(50);

    // ASSERT
    expect(learningRate).toBeCloseTo(0.031622776601684);
});

it("test getLearningRate should go past the final value", function () {
    // SETUP
    var lr = new _LearningRate2.default(1.0, 0.001, 100);

    // CALL
    var learningRate = lr.getLearningRate(200);

    // ASSERT
    expect(learningRate).toBeCloseTo(0.001, 5);
});

it("getGrowthConstant should return 0 if start and end are the same", function () {
    expect(_LearningRate2.default.getGrowthConstant(0.001, 0.001, 100)).toBe(0);
});