"use strict";

var _NeuralNetwork = require("./NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _NeuralNetworkParameter = require("./NeuralNetworkParameter");

var _NeuralNetworkParameter2 = _interopRequireDefault(_NeuralNetworkParameter);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _EdgeStore = require("./EdgeStore");

var _EdgeStore2 = _interopRequireDefault(_EdgeStore);

var _WeightInitializer = require("./WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

var _BackPropFactory = require("./backprop/BackPropFactory");

var _BackPropFactory2 = _interopRequireDefault(_BackPropFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { default as NeuralNetworkMatrix } from "./blas/NeuralNetwork";
// import Layer from "./blas/Layer";
// import Normalizer from "./Normalizer";
// import LearningRate from "./LearningRate";
// import Adam from "./blas/backprop/Adam";
// import moment from "moment";
// import math from "mathjs";
// import TimeRecorder from "../../../utils/TimeRecorder";

it("NeuralNetork constructor works", function () {
    // CALL
    var nn = new _NeuralNetwork2.default([2, 2, 1], true, _ActivationFunctions2.default.sigmoid);

    // ASSERT
    expect(nn !== null).toBe(true);
});

it("createNodes works", function () {
    // SETUP

    // CALL
    var toCheck = _NeuralNetwork2.default.createNodes([2, 2, 1], false, _ActivationFunctions2.default.sigmoid, 1.0, new _EdgeStore2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid));

    // ASSERT
    expect(toCheck.length).toBe(3);
    expect(toCheck[0].length).toBe(2);
    expect(toCheck[1].length).toBe(2);
    expect(toCheck[2].length).toBe(1);

    expect(toCheck[0][0].weights.length).toBe(0);
    expect(toCheck[0][1].weights.length).toBe(0);

    expect(toCheck[1][0].weights.length).toBe(2);
    expect(toCheck[1][1].weights.length).toBe(2);

    expect(toCheck[2][0].weights.length).toBe(2);
});

it("feedforward test", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid);
    nn.setWeights([[], [[0.1, 0.8], [0.4, 0.6]], // LAYER 0
    [[0.3, 0.9]] // LAYER 1
    ]);
    var input = [0.35, 0.9];

    // CALL
    var output = nn.feedForward([input]);

    // ASSERT
    expect(output !== null).toBe(true);
    expect(output.length === 1).toBe(true);
    expect(output[0].length === 1).toBe(true);
    expect(output[0][0]).toBeCloseTo(0.69);
});

it("feedforward test 2", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 2], true, _ActivationFunctions2.default.sigmoid);
    nn.setWeights([[], [[0.15, 0.2, 0.35], [0.25, 0.3, 0.35]], // LAYER 0
    [[0.4, 0.45, 0.6], [0.5, 0.55, 0.6]] // LAYER 1
    ]);
    var input = [0.05, 0.1, 1.0];

    // CALL
    var output = nn.feedForward([input]);

    // ASSERT
    expect(output !== null).toBe(true);
    expect(output.length === 1).toBe(true);
    expect(output[0].length === 2).toBe(true);
    expect(output[0][0]).toBeCloseTo(0.75136);
    expect(output[0][1]).toBeCloseTo(0.77292);
});

it("backpropagate test", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid);
    nn.setWeights([[], [[0.1, 0.8], [0.4, 0.6]], // LAYER 0
    [[0.3, 0.9]] // LAYER 1
    ]);
    var input = [0.35, 0.9];
    var output = nn.feedForward([input]);
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

it("backPropagate test 2", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 2], true, _ActivationFunctions2.default.sigmoid, 0.5);
    nn.setWeights([[], [[0.15, 0.2, 0.35], [0.25, 0.3, 0.35]], // LAYER 0
    [[0.4, 0.45, 0.6], [0.5, 0.55, 0.6]] // LAYER 1
    ]);
    var input = [0.05, 0.1, 1.0];
    var output = nn.feedForward([input]);
    expect(output !== null).toBe(true);
    expect(output.length === 1).toBe(true);
    expect(output[0].length === 2).toBe(true);
    expect(output[0][0]).toBeCloseTo(0.75136);
    expect(output[0][1]).toBeCloseTo(0.77292);

    var expectedOutput = [[0.01, 0.99]];
    var destWeights = [[], [[0.149780716, 0.19956143], [0.24975114, 0.29950229]], [[0.35891648, 0.408666186], [0.511301270, 0.561370121]]];

    // CALL
    nn.backPropagate(expectedOutput);

    // ASSERT
    var newWeights = nn.getWeights();
    for (var layerIndex = 0; layerIndex < destWeights.length; layerIndex++) {
        var layer = destWeights[layerIndex];

        for (var nodeIndex = 0; nodeIndex < layer.length; nodeIndex++) {
            var node = layer[nodeIndex];

            for (var weightIndex = 0; weightIndex < node.length; weightIndex++) {
                // console.log(`layerIndex = ${layerIndex}`);
                // console.log(`nodeIndex = ${nodeIndex}`);
                // console.log(`weightIndex = ${weightIndex}`);

                var newWeight = newWeights[layerIndex][nodeIndex][weightIndex];
                var destWeight = destWeights[layerIndex][nodeIndex][weightIndex];
                expect(newWeight).toBeCloseTo(destWeight, 8);
            }
        }
    }
});

it("convergence test", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 1], false, _ActivationFunctions2.default.sigmoid, 1.0);
    nn.setWeights([[], [[0.1, 0.8], [0.4, 0.6]], // LAYER 0
    [[0.3, 0.9]] // LAYER 1
    ]);
    var input = [0.35, 0.9];
    var expectedOutput = [[0.5]];
    var lastOutput = null;

    // CALL
    for (var i = 0; i < 100; i++) {
        lastOutput = nn.feedForward([input]);
        nn.backPropagate(expectedOutput);
    }

    // ASSERT
    var error = Math.abs(expectedOutput[0][0] - lastOutput[0][0]);
    expect(error).toBeLessThan(0.001);
});

var convergenceTestWithBiasTerm = function convergenceTestWithBiasTerm(nn) {
    nn.setWeights([[], [[0.1, 0.8, 0.01], [0.4, 0.6, 0.01]], // LAYER 0
    [[0.3, 0.9, 0.01]] // LAYER 1
    ]);
    var input = [[0.35, 0.9]];
    var expectedOutput = [[0.5]];
    var lastOutput = null;

    // CALL
    for (var i = 0; i < 100; i++) {
        lastOutput = nn.feedForward(input);
        nn.backPropagate(expectedOutput);
    }

    // ASSERT
    var error = Math.abs(expectedOutput[0][0] - lastOutput[0][0]);
    // console.log(`error = ${error}`);
    expect(error).toBeLessThan(0.001);

    nn.iterateOverNodes(function (node) {

        if (node.layerIndex > 0) {
            expect(node.weights.length).toBeGreaterThan(2);
            var biasWeight = node.weights[node.weights.length - 1];
            expect(biasWeight !== 0.01).toBe(true);
        } else {
            expect(node.weights.length).toBe(0);
        }
    });
};

it("convergence test with bias term", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 1], true, _ActivationFunctions2.default.sigmoid, 1.0);

    convergenceTestWithBiasTerm(nn);
});

it("convergence test with bias term with tanh", function () {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 2, 1], true, _ActivationFunctions2.default.tanh, 1.0);

    convergenceTestWithBiasTerm(nn);
});

it("train works", function () {
    jest.useFakeTimers();

    // SETUP
    var trainingFinished = false;
    var numEpochs = 0;
    var callback = function callback(e) {
        if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_EPOCH_COMPLETE) {
            numEpochs++;
        } else if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_TRAINING_COMPLETE) {
            trainingFinished = true;
        }
    };

    var nn = new _NeuralNetwork2.default([2, 2, 1], true, _ActivationFunctions2.default.sigmoid, 1.0, _WeightInitializer2.default.COMPRESSED_NORMAL, callback);
    var input = []; // [0.35, 0.9]
    var expectedOutput = []; // [0.5]
    var maxEpochs = 1000;
    var error = 1e-3;

    for (var i = 0; i < 1000; i++) {
        input.push([0.35, 0.9]);
        expectedOutput.push([0.5]);
    }

    var nnp = new _NeuralNetworkParameter2.default();
    nnp.inputs = input;
    nnp.expectedOutputs = expectedOutput;
    nnp.miniBatchSize = 10;
    nnp.normalizeInputs = false;
    nnp.maxEpochs = maxEpochs;
    nnp.minError = error;
    nnp.minWeightDelta = null;
    nnp.cacheMinError = false;

    // CALL
    var maxError = nn.train(nnp);

    jest.runAllTimers();

    var result = nn.feedForward([[0.35, 0.9]]);

    // ASSERT
    if (nn.epochs < maxEpochs) {
        expect(maxError).toBeCloseTo(1e-3);
    }

    expect(result[0][0]).toBeCloseTo(0.5, 2);
    expect(trainingFinished).toBe(true);
    expect(numEpochs > 0).toBe(true);

    jest.useRealTimers();
});

it("train works with linear regression", function () {
    jest.useFakeTimers();

    // SETUP
    var trainingFinished = false;
    var numEpochs = 0;
    var callback = function callback(e) {
        if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_EPOCH_COMPLETE) {
            numEpochs++;
        } else if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_TRAINING_COMPLETE) {
            trainingFinished = true;
        }
    };

    var nn = new _NeuralNetwork2.default([1, 6, 6, 1], true, _ActivationFunctions2.default.lrelu, 0.03, _WeightInitializer2.default.COMPRESSED_NORMAL, callback, true, 1e-3, _BackPropFactory2.default.BACK_PROP_TYPE_ADAM);
    // The reason I'm doing this is because I know these initial weights will always converge
    // I feel like I should probably do this for some other unit tests floating around out there.
    // let weights = [ [ [] ],
    //     [ [ 0.7776985377528062, 0.06547888540063548 ],
    //         [ -1.0621244687575382, 1.9352786171748875 ],
    //         [ 2.0248414055188984, 1.153253792224752 ],
    //         [ 5.545850522861383, -0.42411745499615383 ] ],
    //     [ [ -0.6454772935453812,
    //         -0.1682958051952745,
    //         -0.8668841442229629,
    //         0.45985212673485637,
    //         0.5506448718517046 ],
    //         [ 0.43571195443164973,
    //             -0.4743172912861029,
    //             2.273385178255259,
    //             5.317613240545271,
    //             0.5149331374872288 ],
    //         [ 0.14986566044787267,
    //             -0.5237579228846228,
    //             0.9777263178385457,
    //             0.25407728658269807,
    //             -0.020884685011659857 ],
    //         [ 0.30297176590989955,
    //             -0.635201596046075,
    //             -1.0315510832141501,
    //             0.2107789640609194,
    //             -1.0216718566085556 ] ],
    //     [ [ -0.47644311490470254,
    //         5.597183313990964,
    //         0.6046536471829903,
    //         0.05629915947817528,
    //         0.044723933634539234 ] ] ];
    // nn.setWeights(weights);
    var input = []; // [0.35, 0.9]
    var expectedOutput = []; // [0.5]
    var maxEpochs = 250;
    var error = 1e-3;

    for (var i = 0; i < 100; i++) {
        input.push([i]);
        expectedOutput.push([i * 2]);
    }

    var nnp = new _NeuralNetworkParameter2.default();
    nnp.inputs = input;
    nnp.expectedOutputs = expectedOutput;
    nnp.miniBatchSize = 10;
    nnp.normalizeInputs = true;
    nnp.maxEpochs = maxEpochs;
    nnp.minError = error;
    nnp.minWeightDelta = null;
    nnp.cacheMinError = false;

    // CALL
    nn.train(nnp);

    jest.runAllTimers();

    var result = nn.predict([[10]]);

    // ASSERT
    expect(Math.round(result[0][0])).toBeCloseTo(20.0);
    expect(trainingFinished).toBe(true);
    expect(numEpochs > 0).toBe(true);

    // if (!!console) {
    //     console.log("prediction = " + result[0][0]);
    //     console.log("should be 20");
    //     console.log(nn.getWeights());
    // }

    jest.useRealTimers();
});

var reluTest = function reluTest() {
    // SETUP
    var nn = new _NeuralNetwork2.default([2, 3, 2], false, _ActivationFunctions2.default.relu, 1.0);
    nn.setWeights([[], [[0.25, 0.1], [-0.25, -0.1], [0.5, 0.5]], // LAYER 0
    [[0.5, 0.3, 0.5], [0.4, -0.4, -0.3]] // LAYER 1
    ]);
    var input = [-5, -5];
    var expectedOutput = [[0.525, 0.0]];
    var lastOutput = void 0;

    // CALL
    lastOutput = nn.feedForward([input]);

    // ASSERT
    expect(lastOutput[0][0]).toBeCloseTo(expectedOutput[0][0]);
    expect(lastOutput[0][1]).toBeCloseTo(expectedOutput[0][1]);

    return nn;
};

it("relu feedForward test", function () {
    reluTest();
});

it("relu backprop test", function () {
    var nn = reluTest();

    // CALL
    nn.backPropagate([[1, 0]]);

    // ASSERT
    var weightsShouldEqual = [[[0.25, 0.1], [-0.9625, -0.8125], [0.5, 0.5]], // LAYER 0
    [[0.5, 1.13125, 0.5], [0.4, -0.4, -0.3]] // LAYER 1
    ];
    var weights = nn.getWeights();

    var flattenedWeights = _ArrayUtils2.default.flatten(weights);
    var flattenedShouldEqualWeights = _ArrayUtils2.default.flatten(weightsShouldEqual);

    // console.log(flattenedWeights);
    // console.log(flattenedShouldEqualWeights);

    expect(_ArrayUtils2.default.arrayApproxEquals(flattenedWeights, flattenedShouldEqualWeights)).toBe(true);
});

it("callback test", function () {
    // SETUP
    var tracker = {};
    _NeuralNetwork2.default.ALL_CALLBACKS.forEach(function (item) {
        return tracker[item] = false;
    });

    var callback = function callback(e) {
        tracker[e.type] = true;
    };
    var nn = new _NeuralNetwork2.default([2, 3, 2], false, _ActivationFunctions2.default.relu, 1.0, _WeightInitializer2.default.COMPRESSED_NORMAL, callback);

    var input = [[0.35, 0.9]];
    var expectedOutput = [[1, 0]];
    var nnp = new _NeuralNetworkParameter2.default();
    nnp.inputs = input;
    nnp.expectedOutputs = expectedOutput;
    nnp.miniBatchSize = 10;
    nnp.normalizeInputs = false;
    nnp.maxEpochs = 1;
    nnp.minError = 1e-6;
    nnp.minWeightDelta = null;
    nnp.cacheMinError = false;

    // CALL
    nn.train(nnp);

    // ASSERT
    for (var key in Object.keys(tracker)) {
        expect(tracker[key]).toBe(true);
    }
});

// it ("nn comparison", () => {
//     let nnOldschool = new NeuralNetwork([1, 84, 84, 84, 1], true,
//         ActivationFunctions.lrelu, 0.03, WeightInitializer.COMPRESSED_NORMAL, null, true, 1e-3,
//         BackPropFactory.BACK_PROP_TYPE_ADAM);
//
//     let normalizer = new Normalizer(ActivationFunctions.lrelu);
//     let weightInitializer = new WeightInitializer(ActivationFunctions.lrelu, WeightInitializer.COMPRESSED_NORMAL);
//     let learningRate = new LearningRate(0.03, 1e-3, 100);
//     let nnNewSchool = new NeuralNetworkMatrix(normalizer, weightInitializer, true, null);
//     nnNewSchool.addLayer(new Layer(1, ActivationFunctions.lrelu, learningRate, new Adam()));
//     nnNewSchool.addLayer(new Layer(84, ActivationFunctions.lrelu, learningRate, new Adam()));
//     nnNewSchool.addLayer(new Layer(84, ActivationFunctions.lrelu, learningRate, new Adam()));
//     nnNewSchool.addLayer(new Layer(84, ActivationFunctions.lrelu, learningRate, new Adam()));
//     nnNewSchool.addLayer(new Layer(1, ActivationFunctions.identity, learningRate, new Adam()));
//
//     let input = []; // [0.35, 0.9]
//     let expectedOutput = []; // [0.5]
//     let newSchoolInput = [];
//     let newSchoolExpectedOutput = [];
//     let maxEpochs = 250;
//     let error = 1e-3;
//
//     for (let i = 0; i < 100; i++) {
//         input.push([i]);
//         newSchoolInput.push([i]);
//
//         expectedOutput.push([i*2 + 5]);
//         newSchoolExpectedOutput.push([i*2 + 5, 1]);
//     }
//
//     let oldSchoolNormalizedInput = normalizer.normalize(input, true);
//     let newSchoolNormalizedInput = normalizer.normalize(newSchoolInput, true);
//
//     let oldSchoolFeedForwardTime = [];
//     let oldSchoolBackPropTime = [];
//     let newSchoolFeedForwardTime = [];
//     let newSchoolBackPropTime = [];
//     let startTime, miniBatchSize = 10;
//
//     newSchoolNormalizedInput.forEach((item) => item.push(1));
//
//     for (let epoch = 0; epoch < maxEpochs; epoch++) {
//
//         for (let index = 0; index < input.length; index += miniBatchSize) {
//             let miniBatch = ArrayUtils.take(oldSchoolNormalizedInput, miniBatchSize, index);//[oldSchoolNormalizedInput[index]];
//             let output = ArrayUtils.take(expectedOutput, miniBatchSize, index); //[expectedOutput[index]];
//
//             startTime = moment();
//             nnOldschool.feedForward(miniBatch);
//             oldSchoolFeedForwardTime.push(moment().diff(startTime, "ms"));
//
//             startTime = moment();
//             nnOldschool.backPropagate(output);
//             oldSchoolBackPropTime.push(moment().diff(startTime, "ms"));
//
//             miniBatch = ArrayUtils.take(newSchoolNormalizedInput, miniBatchSize, index);
//             output = ArrayUtils.take(newSchoolExpectedOutput, miniBatchSize, index); //[newSchoolExpectedOutput[index]];
//
//             startTime = moment();
//             nnNewSchool.feedForward(miniBatch);
//             newSchoolFeedForwardTime.push(moment().diff(startTime, "ms"));
//
//             startTime = moment();
//             nnNewSchool.backPropagate(output);
//             newSchoolBackPropTime.push(moment().diff(startTime, "ms"));
//         }
//     }
//
//     let oldSchoolOutput = nnOldschool.feedForward([oldSchoolNormalizedInput[1]]);
//     let newSchoolOutput = nnNewSchool.feedForward([newSchoolNormalizedInput[1]]);
//
//     console.log(`oldSchoolOutput = ${oldSchoolOutput}`);
//     console.log(`newSchoolOutput = ${newSchoolOutput}`);
//
//     let meanOldSchoolFFTime = math.mean(oldSchoolFeedForwardTime);
//     let meanOldSchoolBPTime = math.mean(oldSchoolBackPropTime);
//     let meanNewSchoolFFTime = math.mean(newSchoolFeedForwardTime);
//     let meanNewSchoolBPTime = math.mean(newSchoolBackPropTime);
//
//     console.log(`mean old school FeedForward time = ${meanOldSchoolFFTime}`);
//     console.log(`mean old school BackProp time = ${meanOldSchoolBPTime}`);
//
//     console.log(`mean new school FeedForward time = ${meanNewSchoolFFTime}`);
//     console.log(`mean new school BackProp time = ${meanNewSchoolBPTime}`);
//
//     new TimeRecorder().logSummary();
//
//     // expect(oldSchoolOutput[0][0]).toBeCloseTo(7);
//     // expect(newSchoolOutput[0][0]).toBeCloseTo(7);
// });