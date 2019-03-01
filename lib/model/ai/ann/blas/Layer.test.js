"use strict";

var _Layer = require("./Layer");

var _Layer2 = _interopRequireDefault(_Layer);

var _LearningRate = require("../LearningRate");

var _LearningRate2 = _interopRequireDefault(_LearningRate);

var _ActivationFunctions = require("../ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _vectorious = require("vectorious");

var _ArrayUtils = require("../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Adam = require("./backprop/Adam");

var _Adam2 = _interopRequireDefault(_Adam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLayer = function createLayer() {
    var numNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

    return new _Layer2.default(numNodes, _ActivationFunctions2.default.lrelu, new _LearningRate2.default(0.03, 0.001, 10000));
};

it("constructor", function () {
    var instance = new _Layer2.default();

    expect(instance !== null).toBe(true);
});

it("feedForward input layer", function () {
    // SETUP
    var instance = createLayer(1);
    var inputWeights = null;
    var miniBatch = new _vectorious.Matrix([[0.5], [0.3], [0.8]]);

    // CALL
    var result = instance.feedForward(inputWeights, miniBatch);

    // ASSERT
    expect(result).toBe(miniBatch);
});

it("feedForward input layer with bias", function () {
    // SETUP
    var instance = createLayer(1);
    instance.hasBias = true;
    var inputWeights = null;
    var miniBatch = new _vectorious.Matrix([[0.5, 1.0], [0.3, 1.0], [0.8, 1.0]]);

    // CALL
    var result = instance.feedForward(inputWeights, miniBatch);

    // ASSERT
    expect(result).toBe(miniBatch);
});

it("feedForward non-input layer", function () {
    // SETUP
    var instance = createLayer(3);
    var inputWeights = new _vectorious.Matrix([[1, 1, 1], [0.5, 0.5, 0.5], [0, 0, 0]]);
    var miniBatch = new _vectorious.Matrix([[0.5, 0.3, 0.8], [0.5, 0.3, 0.8], [0.5, 0.3, 0.8]]);

    // CALL
    var result = instance.feedForward(inputWeights, miniBatch);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(result.shape, [3, 3])).toBe(true);
    result.each(function (item) {
        expect(item).toBeCloseTo(0.65);
    });
});

it("feedForward non-input layer with bias", function () {
    // SETUP
    var instance = createLayer(3);
    instance.hasBias = true;
    var inputWeights = new _vectorious.Matrix([[1.0, 1.0, 1.0], [0.5, 0.5, 0.5], [0.0, 0.0, 0.0], [1.0, 1.0, 1.0]]);
    var miniBatch = new _vectorious.Matrix([[0.5, 0.3, 0.8, 1], [0.5, 0.3, 0.8, 1], [0.5, 0.3, 0.8, 1]]);

    // CALL
    var result = instance.feedForward(inputWeights, miniBatch);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(result.shape, [3, 4])).toBe(true);
    result.each(function (item, row, col) {
        if (col <= 2) {
            expect(item).toBeCloseTo(1.65);
        } else {
            expect(item).toBe(1);
        }
    });
});

/**
 * Imagine the layer we are testing is the output layer with 1 nodes.
 */
it("backprop ouput layer", function () {
    // SETUP

    var instance = new _Layer2.default(2, _ActivationFunctions2.default.sigmoid, new _LearningRate2.default(1.0, 0.001, 100));

    var inputWeights = new _vectorious.Matrix([[0.3], [0.9]]);
    var outputWeights = null; // output layer
    var nodeValues = new _vectorious.Matrix([[0.68, 0.6637]]);
    var nextLayerErrorsMiniBatch = new _vectorious.Matrix([[0.5]]);
    var values = instance.feedForward(inputWeights, nodeValues);
    expect(values.get(0, 0)).toBeCloseTo(0.69);

    // CALL
    var newInputWeights = instance.backProp(inputWeights, outputWeights, nextLayerErrorsMiniBatch, 0);

    // ASSERT
    expect(instance.errors.get(0, 0)).toBeCloseTo(-0.0406, 3); // ceil because negative

    expect(inputWeights.get(0, 0)).toBeCloseTo(0.3, 6);
    expect(inputWeights.get(1, 0)).toBeCloseTo(0.9, 6);

    expect(newInputWeights.get(0, 0)).toBeCloseTo(0.2723391, 6);
    expect(newInputWeights.get(1, 0)).toBeCloseTo(0.8730022, 6);
});

/**
 * Imagine the layer we are testing is the output layer with 1 nodes.
 */
it("backprop output layer with bias", function () {
    // SETUP

    var instance = new _Layer2.default(2, _ActivationFunctions2.default.sigmoid, new _LearningRate2.default(1.0, 0.001, 100));
    instance.hasBias = true;
    var inputWeights = new _vectorious.Matrix([[0.3, 0.3], [0.9, 0.9], [1.0, 1.0]]);
    var outputWeights = new _vectorious.Matrix([[0.3, 0.3, 0.3], [0.6, 0.6, 0.6]]); // output layer
    var inputsMiniBatch = new _vectorious.Matrix([[0.68, 0.6637, 1.0]]);
    var nextLayerErrorsMiniBatch = new _vectorious.Matrix([[0.5, 0.5]]);
    instance.feedForward(inputWeights, inputsMiniBatch);
    // expect(values.get(0, 0)).toBeCloseTo(0.69);

    // CALL
    var newInputWeights = instance.backProp(inputWeights, outputWeights, nextLayerErrorsMiniBatch, 0);

    // ASSERT
    expect(newInputWeights !== null).toBe(true);
    expect(newInputWeights).toBeInstanceOf(_vectorious.Matrix);
    // expect(instance.errors.get(0, 0)).toBeCloseTo(-0.0406, 3); // ceil because negative
    //
    // expect(inputWeights.get(0, 0)).toBeCloseTo(0.3, 6);
    // expect(inputWeights.get(1, 0)).toBeCloseTo(0.9, 6);
    //
    // expect(newInputWeights.get(0, 0)).toBeCloseTo(0.2723391, 6);
    // expect(newInputWeights.get(1, 0)).toBeCloseTo(0.8730022, 6);
});

it("backprop ouput layer - ADAM", function () {
    // SETUP

    var instance = new _Layer2.default(2, _ActivationFunctions2.default.sigmoid, new _LearningRate2.default(0.03, 0.001, 100), new _Adam2.default());

    var inputWeights = new _vectorious.Matrix([[0.3], [0.9]]);
    var outputWeights = null; // output layer
    var nodeValues = new _vectorious.Matrix([[0.68, 0.6637]]);
    var nextLayerErrorsMiniBatch = new _vectorious.Matrix([[0.5]]);
    var values = instance.feedForward(inputWeights, nodeValues);
    expect(values.get(0, 0)).toBeCloseTo(0.69);

    // CALL
    var newInputWeights = instance.backProp(inputWeights, outputWeights, nextLayerErrorsMiniBatch, 0);

    // ASSERT
    expect(instance.errors.get(0, 0)).toBeCloseTo(-0.0406, 3); // ceil because negative

    expect(inputWeights.get(0, 0)).toBeCloseTo(0.3, 6);
    expect(inputWeights.get(1, 0)).toBeCloseTo(0.9, 6);

    expect(newInputWeights.get(0, 0)).toBeCloseTo(0.2700000108456688, 6);
    expect(newInputWeights.get(1, 0)).toBeCloseTo(0.8700000111120306, 6);
});

it("backPropagateHiddenNode works", function () {
    // SETUP
    var instance = new _Layer2.default(1, _ActivationFunctions2.default.sigmoid, new _LearningRate2.default(1.0, 0.001, 100));

    var inputWeights = new _vectorious.Matrix([[0.1], [0.8]]);
    var outputWeights = new _vectorious.Matrix([[0.272392]]); // output layer
    var nodeValues = new _vectorious.Matrix([[0.35, 0.9]]);
    var nextLayerErrorsMiniBatch = new _vectorious.Matrix([[-0.0406]]);
    var values = instance.feedForward(inputWeights, nodeValues);
    expect(values.get(0, 0)).toBeCloseTo(0.68);

    // CALL
    var newInputWeights = instance.backProp(inputWeights, outputWeights, nextLayerErrorsMiniBatch, 0);

    // ASSERT
    expect(instance.errors.get(0, 0)).toBeCloseTo(-2.406e-3, 3);

    expect(inputWeights.get(0, 0)).toBeCloseTo(0.1, 5); // I tweaked the precious comparison here
    expect(inputWeights.get(1, 0)).toBeCloseTo(0.8, 4); // I tweaked the precious comparison here

    expect(newInputWeights.get(0, 0)).toBeCloseTo(0.09916, 5); // I tweaked the precious comparison here
    expect(newInputWeights.get(1, 0)).toBeCloseTo(0.7978, 4); // I tweaked the precious comparison here
});

it("augment output with ones", function () {
    // SETUP
    var instance = new _Layer2.default(1, _ActivationFunctions2.default.sigmoid, new _LearningRate2.default(1.0, 0.001, 100));
    var outputMatrix = _vectorious.Matrix.zeros(2, 1);

    // CALL
    instance.augmentOutputWithOnes(outputMatrix);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(outputMatrix.shape, [2, 2])).toBe(true);
    expect(outputMatrix.get(0, 0)).toBe(0);
    expect(outputMatrix.get(1, 0)).toBe(0);
    expect(outputMatrix.get(0, 1)).toBe(1);
    expect(outputMatrix.get(1, 1)).toBe(1);
});