"use strict";

var _NeuralNetwork = require("./NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _Normalizer = require("../Normalizer");

var _Normalizer2 = _interopRequireDefault(_Normalizer);

var _WeightInitializer = require("../WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

var _ActivationFunctions = require("../ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _LearningRate = require("../LearningRate");

var _LearningRate2 = _interopRequireDefault(_LearningRate);

var _Layer = require("./Layer");

var _Layer2 = _interopRequireDefault(_Layer);

var _vectorious = require("vectorious");

var _ArrayUtils = require("../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTestNetwork = function createTestNetwork() {
    var activationFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ActivationFunctions2.default.lrelu;
    var startLearningRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.03;
    var nodesPerLayer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [2, 2];
    var hasBias = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var normalizer = new _Normalizer2.default(activationFunction);
    var weightInitializer = new _WeightInitializer2.default(activationFunction, _WeightInitializer2.default.COMPRESSED_NORMAL);
    var learningRate = new _LearningRate2.default(startLearningRate, 0.001, 1000);

    var toRet = new _NeuralNetwork2.default(normalizer, weightInitializer, hasBias);

    nodesPerLayer.forEach(function (numNodes) {
        toRet.addLayer(new _Layer2.default(numNodes, activationFunction, learningRate));
    });

    return toRet;
};

it("constructor", function () {
    var instance = new _NeuralNetwork2.default();

    expect(instance !== null).toBe(true);
});

it("test addLayer", function () {
    // SETUP
    var activationFunction = _ActivationFunctions2.default.lrelu;
    var normalizer = new _Normalizer2.default(activationFunction);
    var weightInitializer = new _WeightInitializer2.default(activationFunction, _WeightInitializer2.default.COMPRESSED_NORMAL);
    var learningRate = new _LearningRate2.default(1.0, 0.001, 1000);
    var nn = new _NeuralNetwork2.default(normalizer, weightInitializer, true, null);
    var layer1 = new _Layer2.default(3, _ActivationFunctions2.default.lrelu, learningRate, null);
    var layer2 = new _Layer2.default(3, _ActivationFunctions2.default.lrelu, learningRate, null);
    var layer3 = new _Layer2.default(3, _ActivationFunctions2.default.lrelu, learningRate, null);

    // CALL
    nn.addLayer(layer1).addLayer(layer2).addLayer(layer3);

    // ASSERT
    expect(nn.layers.length).toBe(3);
    expect(layer1.hasBias).toBe(true);
    expect(layer2.hasBias).toBe(true);
    expect(layer3.hasBias).toBe(true);
});

it("_createWeights", function () {
    // SETUP
    var instance = createTestNetwork();

    // CALL
    var theWeights = instance._createWeights();

    // ASSERT
    expect(theWeights.length).toBe(2);
    expect(theWeights[0] === null).toBe(true);
    expect(theWeights[1]).toBeInstanceOf(_vectorious.Matrix);
    expect(_ArrayUtils2.default.arrayEquals(theWeights[1].shape, [2, 2])).toBe(true);
    expect(Number.isFinite(theWeights[1].get(0, 0))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(0, 1))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(1, 0))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(1, 1))).toBe(true);
});

it("_createWeights with bias", function () {
    // SETUP
    var instance = createTestNetwork(_ActivationFunctions2.default.lrelu, 0.03, [2, 2, 1], true);

    // CALL
    var theWeights = instance._createWeights();

    // ASSERT
    expect(theWeights.length).toBe(3);
    expect(theWeights[0] === null).toBe(true);

    expect(theWeights[1]).toBeInstanceOf(_vectorious.Matrix);
    expect(_ArrayUtils2.default.arrayEquals(theWeights[1].shape, [3, 2])).toBe(true);
    expect(Number.isFinite(theWeights[1].get(0, 0))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(0, 1))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(1, 0))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(1, 1))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(2, 0))).toBe(true);
    expect(Number.isFinite(theWeights[1].get(2, 1))).toBe(true);

    expect(theWeights[2]).toBeInstanceOf(_vectorious.Matrix);
    expect(_ArrayUtils2.default.arrayEquals(theWeights[2].shape, [3, 1])).toBe(true);
    expect(Number.isFinite(theWeights[2].get(0, 0))).toBe(true);
    expect(Number.isFinite(theWeights[2].get(1, 0))).toBe(true);
    expect(Number.isFinite(theWeights[2].get(2, 0))).toBe(true);
});

it("feedforward test", function () {
    // SETUP
    var nn = createTestNetwork(_ActivationFunctions2.default.sigmoid, 1.0, [2, 2, 1]);
    nn.weights = [null, [[0.1, 0.4], [0.8, 0.6]], // LAYER 0
    [[0.3], [0.9]] // LAYER 1
    ];
    var input = [0.35, 0.9];

    // CALL
    var output = nn.feedForward([input]);

    // ASSERT
    expect(output !== null).toBe(true);
    expect(output[0][0]).toBeCloseTo(0.69);
});

it("backprop test", function () {
    // SETUP
    var nn = createTestNetwork(_ActivationFunctions2.default.sigmoid, 1.0, [2, 2, 1]);
    nn.weights = [null, [[0.1, 0.4], [0.8, 0.6]], // LAYER 0
    [[0.3], [0.9]] // LAYER 1
    ];
    var input = [0.35, 0.9];

    var output = nn.feedForward([input]);

    expect(output !== null).toBe(true);
    expect(output[0][0]).toBeCloseTo(0.69);
    var expectedOutput = [[0.5]];
    var oldError = expectedOutput[0][0] - output[0][0];

    // CALL
    nn.backPropagate(expectedOutput);
    var newOutput = nn.feedForward([input]);
    var newError = expectedOutput[0][0] - newOutput[0][0];

    // ASSERT
    expect(Math.abs(oldError) > Math.abs(newError)).toBe(true);

    // These are close enough.  They don't exactly match the paper
    // because the error metric we calculated has more precision
    // than the paper (so hopefully this is more accurate).
    expect(oldError).toBeCloseTo(-0.19);
    expect(newError).toBeCloseTo(-0.182);
});

it("includeBias test", function () {
    // SETUP
    var nn = createTestNetwork(_ActivationFunctions2.default.sigmoid, 1.0, [2, 2, 1]);
    nn.includeBias = true;
    var input = [0.35, 0.9];

    var output = nn.feedForward([input]);

    expect(output !== null).toBe(true);
    // expect(output[0][0]).toBeCloseTo(0.69);
    var expectedOutput = [[0.5]];
    var oldError = expectedOutput[0][0] - output[0][0];

    // CALL
    nn.backPropagate(expectedOutput);
    var newOutput = nn.feedForward([input]);
    var newError = expectedOutput[0][0] - newOutput[0][0];

    // ASSERT
    expect(Math.abs(oldError) > Math.abs(newError)).toBe(true);

    // These are close enough.  They don't exactly match the paper
    // because the error metric we calculated has more precision
    // than the paper (so hopefully this is more accurate).
    // expect(oldError).toBeCloseTo(-0.19);
    // expect(newError).toBeCloseTo(-0.182);
});

it("backprop test with bias", function () {
    // SETUP
    var nn = createTestNetwork(_ActivationFunctions2.default.sigmoid, 1.0, [2, 2, 1], true);
    nn.weights = [null, [[0.1, 0.4], [0.8, 0.6], [1.0, 1.0]], // LAYER 0
    [[0.3], [0.9], [1.0]] // LAYER 1
    ];
    var input = [0.35, 0.9, 1.0];

    var output = nn.feedForward([input]);

    expect(output !== null).toBe(true);
    // expect(output[0][0]).toBeCloseTo(0.69);
    var expectedOutput = [[0.5, 1.0]];
    var oldError = expectedOutput[0][0] - output[0][0];

    // CALL
    nn.backPropagate(expectedOutput);
    var newOutput = nn.feedForward([input]);
    var newError = expectedOutput[0][0] - newOutput[0][0];

    // ASSERT
    expect(Math.abs(oldError) > Math.abs(newError)).toBe(true);

    // These are close enough.  They don't exactly match the paper
    // because the error metric we calculated has more precision
    // than the paper (so hopefully this is more accurate).
    // expect(oldError).toBeCloseTo(-0.19);
    // expect(newError).toBeCloseTo(-0.182);
});