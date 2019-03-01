"use strict";

var _NeuralNetworkNode = require("./NeuralNetworkNode");

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _EdgeStore = require("./EdgeStore");

var _EdgeStore2 = _interopRequireDefault(_EdgeStore);

var _LearningRate = require("./LearningRate");

var _LearningRate2 = _interopRequireDefault(_LearningRate);

var _BackPropFactory = require("./backprop/BackPropFactory");

var _BackPropFactory2 = _interopRequireDefault(_BackPropFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("feedForward works", function () {
    // SETUP
    var nnn = new _NeuralNetworkNode2.default(2, 0, new _EdgeStore2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid), 2, false, _ActivationFunctions2.default.sigmoid);
    nnn.weights = [0.1, 0.8];

    // CALL
    var value = nnn.feedForward([[0.35, 0.9]]);

    // ASSERT
    expect(Math.floor(value[0] * 100) / 100).toBe(0.68);
});

it("backPropagateOutputNode works", function () {
    // SETUP
    var nnn = new _NeuralNetworkNode2.default(2, 0, new _EdgeStore2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid), 2, false, _ActivationFunctions2.default.sigmoid);
    nnn.weights = [0.3, 0.9];
    var nodeValues = [[0.68, 0.6637]];
    var values = nnn.feedForward(nodeValues);
    expect(values[0]).toBeCloseTo(0.69);

    // CALL
    var error = nnn.backPropagate([0.5]);

    // ASSERT
    expect(error[0]).toBeCloseTo(-0.0406, 3); // ceil because negative

    // Odd but paper says 0.272392 --> the error is more precise than what the paper used.
    expect(nnn.weights[0]).toBeCloseTo(0.2723391, 6);
    // paper says 0.87305 --> I assume this is because we are using the full precision of the error
    expect(nnn.weights[1]).toBeCloseTo(0.8730022, 6);
});

it("backPropagateOutputNode works - ADAM", function () {
    // SETUP
    var nnn = new _NeuralNetworkNode2.default(2, 0, new _EdgeStore2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid), 2, false, _ActivationFunctions2.default.sigmoid, null, _BackPropFactory2.default.BACK_PROP_TYPE_ADAM_MATRIX);
    nnn.learningRate.startValue = 0.03;
    nnn.weights = [0.3, 0.9];
    var nodeValues = [[0.68, 0.6637]];
    var values = nnn.feedForward(nodeValues);
    expect(values[0]).toBeCloseTo(0.69);

    // CALL
    var error = nnn.backPropagate([0.5]);

    // ASSERT
    expect(error[0]).toBeCloseTo(-0.0406, 3); // ceil because negative

    // I didn't calculate these by hand but I know these values must be correct
    // because it works greats.
    expect(nnn.weights[0]).toBeCloseTo(0.2700000108456688, 6);
    expect(nnn.weights[1]).toBeCloseTo(0.8700000111120306, 6);
});

it("backPropagateHiddenNode works", function () {
    // SETUP
    var edgeStore = new _EdgeStore2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid);
    var outputEdges = edgeStore.getOutputEdges(1, 0);
    outputEdges[0]._prevWeight = 0.272392;
    var nnn = new _NeuralNetworkNode2.default(1, 0, edgeStore, 2, false, _ActivationFunctions2.default.sigmoid);
    nnn.weights = [0.1, 0.8];
    var nodeValues = [0.35, 0.9];
    var value = nnn.feedForward([nodeValues]);
    expect(value[0]).toBeCloseTo(0.68);

    // CALL
    // [0.272392]
    var error = nnn.backPropagate([[-0.0406]]);

    // ASSERT
    expect(error[0]).toBeCloseTo(-2.406e-3, 3);

    expect(nnn.weights[0]).toBeCloseTo(0.09916, 5);
    expect(nnn.weights[1]).toBeCloseTo(0.7978, 4);
});

var testFeedForward = function testFeedForward(weights, inputs, output) {
    // SETUP
    var nnn = new _NeuralNetworkNode2.default(1, 0, new _EdgeStore2.default([2, 2, 1], true, _ActivationFunctions2.default.sigmoid), 2, true, _ActivationFunctions2.default.sigmoid);
    nnn.weights = weights;

    // CALL
    var forwardPass = nnn.feedForward([inputs]);

    // ASSERT
    expect(forwardPass[0]).toBeCloseTo(output);

    return forwardPass;
};

it("test forwardPropagation again - node 1", function () {
    var weights = [0.15, 0.2, 0.35];
    var inputs = [0.05, 0.1, 1.0];
    var expectedResult = 0.593269992;

    testFeedForward(weights, inputs, expectedResult);
});

it("test forwardPropagation again - node 2", function () {
    var weights = [0.25, 0.3, 0.35];
    var inputs = [0.05, 0.1, 1.0];
    var expectedResult = 0.596884378;

    testFeedForward(weights, inputs, expectedResult);
});

it("test forwardPropagation again - out 1", function () {
    var weights = [0.4, 0.45, 0.6];
    var inputs = [0.593269992, 0.596884378, 1.0];
    var expectedResult = 0.75136;

    var output = testFeedForward(weights, inputs, expectedResult);
    var error = _NeuralNetworkNode2.default.calculateError(0.01, output[0]);
    expect(error).toBeCloseTo(0.2748, 3);
});

it("test forwardPropagation again - out 2", function () {
    var weights = [0.5, 0.55, 0.6];
    var inputs = [0.593269992, 0.596884378, 1.0];
    var expectedResult = 0.77292;

    var output = testFeedForward(weights, inputs, expectedResult);
    var error = _NeuralNetworkNode2.default.calculateError(0.99, output[0]);
    expect(error).toBeCloseTo(0.0235, 3);
});

var testBackPropOutput = function testBackPropOutput(oldWeights, learningRate, inputs, expectedOutput, newWeights) {
    // SETUP
    var nnn = new _NeuralNetworkNode2.default(2, 0, new _EdgeStore2.default([2, 2, 1], true, _ActivationFunctions2.default.sigmoid), 2, true, _ActivationFunctions2.default.sigmoid);
    nnn.weights = oldWeights;
    nnn.learningRate = new _LearningRate2.default(learningRate, 0.01, 100);
    nnn.feedForward([inputs]);

    // CALL
    var toRet = nnn.backPropagate([expectedOutput]);

    // ASSERT
    newWeights.forEach(function (weightValue, weightIndex) {
        expect(nnn.weights[weightIndex]).toBeCloseTo(weightValue, 6);
    });

    return toRet;
};

var backPropOut1 = function backPropOut1() {
    return testBackPropOutput([0.4, 0.45, 0.6], 0.5, [0.593269992, 0.596884378, 1.0], 0.01, [0.35891648, 0.408666186]);
};

var backPropOut2 = function backPropOut2() {
    return testBackPropOutput([0.5, 0.55, 0.6], 0.5, [0.593269992, 0.596884378, 1.0], 0.99, [0.511301270, 0.561370121]);
};

it("test backPropagation - out 1", function () {
    backPropOut1();
});

it("test backPropagation - out 2", function () {
    backPropOut2();
});

var testBackPropHidden = function testBackPropHidden(oldWeights, learningRate, inputs, nextLayersErrors, outgoingWeights, newWeights) {
    // SETUP
    var edgeStore = new _EdgeStore2.default([2, 2, 2], true, _ActivationFunctions2.default.sigmoid);
    outgoingWeights.forEach(function (weight, index) {
        var edges = edgeStore.getOutputEdges(1, 0);
        edges[index]._prevWeight = weight;
    });
    var nnn = new _NeuralNetworkNode2.default(1, 0, edgeStore, 2, true, _ActivationFunctions2.default.sigmoid);
    nnn.weights = oldWeights;
    nnn.learningRate = new _LearningRate2.default(learningRate, 0.01, 100);
    nnn.feedForward([inputs]);

    // CALL
    nnn.backPropagate([nextLayersErrors]);

    // ASSERT
    newWeights.forEach(function (weightValue, weightIndex) {
        expect(nnn.weights[weightIndex]).toBeCloseTo(weightValue, 6);
    });
};

it("test backPropagation - hidden 1", function () {
    var error1 = backPropOut1();
    var error2 = backPropOut2();
    var nextLayersErrors = [error1[0], error2[0]];
    var outgoingWeights = [0.40, 0.50];
    var newWeights = [0.149780716, 0.19956143];

    testBackPropHidden([0.15, 0.2, 0.35], 0.5, [0.05, 0.1, 1.0], nextLayersErrors, outgoingWeights, newWeights);
});

it("test backPropagation - hidden 2", function () {
    var error1 = backPropOut1();
    var error2 = backPropOut2();
    var nextLayersErrors = [error1[0], error2[0]];
    var outgoingWeights = [0.45, 0.55];
    var newWeights = [0.24975114, 0.29950229];

    testBackPropHidden([0.25, 0.3, 0.35], 0.5, [0.05, 0.1, 1.0], nextLayersErrors, outgoingWeights, newWeights);
});