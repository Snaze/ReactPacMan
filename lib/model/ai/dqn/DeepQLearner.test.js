"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _DeepQLearner = require("./DeepQLearner");

var _DeepQLearner2 = _interopRequireDefault(_DeepQLearner);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _Transition = require("./Transition");

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import math from "../../../../node_modules/mathjs/dist/math";

it("constructor works", function () {
    var toCheck = new _DeepQLearner2.default(10);

    expect(toCheck !== null).toBe(true);
});

it("createNodesPerLayerArray", function () {
    // SETUP

    // CALL
    var toCheck = _DeepQLearner2.default.createNodesPerLayerArray(4, 30, 3, 2);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(toCheck, [60, 60, 60, 60, 4])).toBe(true);
});

it("getActionWithLargestQValue", function () {
    // SETUP
    var numActions = 4;
    var learner = new _DeepQLearner2.default(14, numActions, 0.03, 0.9, 0.98, 0.9999, false, 10000, 3, 1000, 10000, 1, 10);
    var sPrime = [-0.5, 0.5, 0, 0.75, 0.35, -0.5, -0.1, -0.2, 0.7, 0.75, 0.934, 0.74, 0.29, 0.9];

    // CALL
    var toCheck = learner.getActionWithLargestQValue(sPrime);

    // ASSERT
    expect(toCheck).toBeGreaterThanOrEqual(0);
    expect(toCheck).toBeLessThan(numActions);
});

it("getQValueForAllActions", function () {
    var numActions = 4;
    var learner = new _DeepQLearner2.default(14, numActions, 0.03, 0.9, 0.98, 0.9999, false, 10000, 3, 1000, 10000, 1, 10);
    var sPrime = [-0.5, 0.5, 0, 0.75, 0.35, -0.5, -0.1, -0.2, 0.7, 0.75, 0.934, 0.74, 0.29, 0.9];

    // CALL
    var toCheck = learner.getQValueForAllActions(sPrime);

    // ASSERT
    expect(toCheck.length).toBe(4);
});

it("getAction", function () {
    // SETUP
    var numActions = 4;
    var rar = 0.98;
    var learner = new _DeepQLearner2.default(14, numActions, 0.03, 0.9, rar, 0.5, false, 10000, 2, 1000, 10000, 1);
    var sPrime = [-0.5, 0.5, 0, 0.75, 0.35, -0.5, -0.1, -0.2, 0.7, 0.75, 0.934, 0.74, 0.29, 0.9];

    // CALL
    var action = learner.getAction(sPrime, true);

    // ASSERT
    expect(action).toBeGreaterThanOrEqual(0);
    expect(action).toBeLessThan(numActions);
    expect(learner.rar).toBeCloseTo(rar / 2);
});

it("query", function () {
    // SETUP
    var learner = new _DeepQLearner2.default(4, 4, 0.03, 0.9, 0.98, 0.9999, false, 10000, 3, 1000, 10000, 1, 10);
    learner._s = [0, 1, 2, 3];

    // CALL
    var newAction = learner.query([1, 2, 3, 4], 1);

    // ASSERT
    expect(newAction).toBeGreaterThanOrEqual(0);
    expect(newAction).toBeLessThan(learner.numActions);
});

it("querySetState", function () {
    // SETUP
    var learner = new _DeepQLearner2.default(4);
    var origRAR = learner.rar;

    // CALL
    var newAction = learner.querySetState([0, 1, 2, 3]);

    // ASSERT
    expect(newAction).toBeGreaterThanOrEqual(0);
    expect(newAction).toBeLessThan(learner.numActions);
    expect(origRAR).toBe(learner.rar); // it shouldn't update the rar
});

it("learnOne - beginning of episode", function () {
    // SETUP
    var learner = new _DeepQLearner2.default(1, 4, 0.03, 0.9, 0.98, 0.9999, false, 10000, 3, 1000, 10000, 1, 10);
    // let learner = new DeepQLearner(4);
    var callback = jest.fn(function () {
        return {
            reward: 1,
            state: [6],
            isTerminal: false
        };
    });
    var initialState = [555];

    // CALL
    learner.learnOne(callback, initialState);

    // ASSERT
    expect(learner.sequence).toBeInstanceOf(_Sequence2.default);
    expect(learner.sequence.states.length).toBe(1);
    expect(learner.sequence.states[0][0]).toBe(6);
});

it("learnOne - select action, perform callback, store transition", function () {
    // SETUP
    var ffCalled = false;
    var bpCalled = false;
    var nnMock = function nnMock() {};
    nnMock.prototype.feedForward = function (miniBatch) {
        ffCalled = true;

        return miniBatch.map(function (single) {
            // Case Phi_j
            if (_ArrayUtils2.default.arrayEquals(single, [0, 0, 0, 2])) {
                return [1, 0, 0, 0];
            }

            // Case Phi_j+1
            if (_ArrayUtils2.default.arrayEquals(single, [0, 0, 2, 3])) {
                return [0, 1, 0, 0];
            }

            throw new Error("How did I get here");
        });
    };
    nnMock.prototype.backPropagate = function (expectedOutputsMiniBatch) {
        bpCalled = true;
        expectedOutputsMiniBatch.forEach(function (expectedOutputs) {
            expect(_ArrayUtils2.default.arrayEquals(expectedOutputs, [1.9, 0, 0, 0]));
        });

        return 0.1;
    };
    nnMock.prototype.predict = nnMock.prototype.feedForward;

    var learner = new _DeepQLearner2.default(1, 4, 0.03, 0.9, 0.0, 0.9999, false);
    learner._neuralNetwork = new nnMock();
    var callback = jest.fn(function () {
        return {
            reward: 1,
            state: [3],
            isTerminal: false
        };
    });
    var initialState = [2];

    // CALL
    var prevTick = learner.tickNum;
    var error = learner.learnOne(callback, initialState);

    // ASSERT
    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe(learner);
    expect(callback.mock.calls[0][1]).toBeGreaterThanOrEqual(0);
    expect(callback.mock.calls[0][1]).toBeLessThan(4);

    var miniBatch = learner.replayMemory.sampleRandomMinibatch(1);
    expect([2]).toContain(miniBatch[0].sequenceT.states[0][0]);
    expect([2]).toContain(miniBatch[0].sequenceTPlus1.states[0][0]);
    expect([3]).toContain(miniBatch[0].sequenceTPlus1.states[1][0]);

    expect(ffCalled).toBe(true);
    expect(bpCalled).toBe(true);
    expect(error).toBeCloseTo(0.1);
    expect(learner.tickNum).toBe(prevTick + 1);
});

it("convertMiniBatchToTargetValues", function () {
    // SETUP
    var numActions = 4;
    var learner = new _DeepQLearner2.default(4, numActions);

    var transition0 = new _Transition2.default(new _Sequence2.default([0, 0, 0, 0]), 0, 1, new _Sequence2.default([1, 1, 1, 1]), 0);
    var transition1 = new _Transition2.default(new _Sequence2.default([1, 1, 1, 1]), 0, 1, new _Sequence2.default([2, 2, 2, 2]), 1);
    var miniBatchOfTransitions = [transition0, transition1];

    // CALL
    var result = learner.convertMiniBatchToTargetValues(miniBatchOfTransitions, false);

    // ASSERT
    expect(result.length).toBe(2);
    expect(result[0].qValuesForEachAction.length).toBe(numActions);
    expect(result[1].qValuesForEachAction.length).toBe(numActions);

    expect(result[0].maxAction).toBeGreaterThanOrEqual(0);
    expect(result[0].maxAction).toBeLessThan(numActions);
    expect(result[1].maxAction).toBeGreaterThanOrEqual(0);
    expect(result[1].maxAction).toBeLessThan(numActions);

    expect(_typeof(result[0].maxQValue)).toBe("number");
    expect(_typeof(result[1].maxQValue)).toBe("number");

    expect(_typeof(result[0].targetValue)).toBe("number");
    expect(_typeof(result[1].targetValue)).toBe("number");
});

it("convertMiniBatchToPredictedValues", function () {
    // SETUP
    var numActions = 4;
    var learner = new _DeepQLearner2.default(4, numActions);

    var transition0 = new _Transition2.default(new _Sequence2.default([0, 0, 0, 0]), 0, 1, new _Sequence2.default([1, 1, 1, 1]), 0);
    var transition1 = new _Transition2.default(new _Sequence2.default([1, 1, 1, 1]), 0, 1, new _Sequence2.default([2, 2, 2, 2]), 1);
    var miniBatchOfTransitions = [transition0, transition1];

    // CALL
    var result = learner.convertMiniBatchToPredictedValues(miniBatchOfTransitions);

    // ASSERT
    expect(result.length).toBe(2);
    expect(result[0].qValuesForEachAction.length).toBe(numActions);
    expect(result[1].qValuesForEachAction.length).toBe(numActions);

    expect(result[0].action).toBeGreaterThanOrEqual(0);
    expect(result[0].action).toBeLessThan(numActions);
    expect(result[1].action).toBeGreaterThanOrEqual(0);
    expect(result[1].action).toBeLessThan(numActions);

    expect(_typeof(result[0].qValue)).toBe("number");
    expect(_typeof(result[1].qValue)).toBe("number");
});

// /**
//  * Commenting this out for now since it takes forever.
//  */
// const testDeepQLearnerConverges = function (num_runs, finalRar=0.0000001) {
//
//     let rar = 0.98;
//     let radr = Math.pow((finalRar / rar), 1/ num_runs);
//
//     if (radr <= 0) {
//         throw new Error("Invalid radr");
//     }
//
//     let qLearner = new DeepQLearner(1, 2, 0.03, 0.99, rar, radr, false, 10, 2, num_runs);
//     // let num_runs = 10000;
//     let goalPositions = [1, 6];
//
//     let startPos = 3;
//     let minSteps = Number.POSITIVE_INFINITY;
//     let playerPos = startPos;
//     let steps = Number.POSITIVE_INFINITY;
//     let executeActionCallback = function (source, action) {
//         if (action === 0) {
//             playerPos--;
//         } else if (action === 1) {
//             playerPos++;
//         } else {
//             throw new Error("Unknown Action");
//         }
//
//         let r = -0.01;
//         let isTerminal = false;
//         if (playerPos === 2) {
//             r = -0.1;
//             // r = -1;
//         } else if (goalPositions.indexOf(playerPos) >= 0) {
//             r = 0.1;
//             isTerminal = true;
//         }
//
//         steps++;
//         return { reward: r, state: [playerPos/10], isTerminal: isTerminal };
//     };
//
//     let prevEpoch = -1;
//     while (qLearner.epochNum < num_runs) {
//         if (qLearner.epochNum !== prevEpoch) {
//             if (steps < minSteps) {
//                 minSteps = steps;
//             }
//             steps = 0;
//             playerPos = startPos;
//         }
//         prevEpoch = qLearner.epochNum;
//
//         qLearner.learnOne(executeActionCallback, [startPos / 10]);
//     }
//
//     return playerPos === 6;
// };
//
// it ("DeepQLearner Converges", () => {
//
//     let numCorrect = 0;
//     let results = [];
//     // let numRunsArray = [100, 200, 400, 800, 1600, 3200, 6400, 12800];
//     // let numRunsArray = [100, 200, 400, 800, 1600];
//     // let numRunsToAverage = 3;
//     let numRunsArray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000];
//     let numRunsToAverage = 3;
//     let totalTests = 100;
//
//     numRunsArray.forEach(function (numRuns, index) {
//
//         let currentResults = [];
//
//         for (let runNum = 0; runNum < numRunsToAverage; runNum++) {
//             numCorrect = 0;
//
//             for (let i = 0; i < totalTests; i++) {
//                 if (testDeepQLearnerConverges(numRuns)) {
//                     numCorrect++;
//                 }
//             }
//
//             let percentCorrect = Math.floor((numCorrect / totalTests) * 100);
//             console.log(`Intermediate Results for ${numRuns} runs = ${percentCorrect}`);
//             currentResults.push(percentCorrect);
//         }
//
//         let toRecord = math.mean(currentResults);
//         results.push(toRecord);
//         console.log(`Results for ${numRuns} runs = ${toRecord}`);
//     });
//
//     numRunsArray.forEach(function (numRuns, index) {
//         console.log(`Results for ${numRuns} runs = ${results[index]}`);
//     });
//     // 100 runs = 77% percent correct
//     // 200 runs = 82% percent correct - 84%
//     // 300 runs = 81% percent correct
//     // 400 runs = 84% percent correct - 3m 16s - 87%
//     // 500 runs = 82% percent correct - 3m 59s
//     // 600 runs = 84% percent correct - 5m 3s
//     // 700 runs =
//     // 800 runs = 91% correct
//     // 900 runs =
//     // 1000 runs = 84% - 8m 10s, 73%   with decaying learning rate., 83%, 70%, 74% with prioritized. (11m 19s though).
//     // 10000 runs = 87% - 1h 25 m 38 s with decaying learning rate
//     // 20000 runs = 90%   2h 42 m 34 s with decaying learning rate - 7:32
//     // expect(percentCorrect).toBeGreaterThanOrEqual(90);
//
//     // Tweaked experience replay to only store unique Transitions
//     // 200 runs = 84%
//     // 400 runs = 87%
//     // 800 runs = 91%
//     // 1200 runs = 91%
//     // 1600 runs = 95%
//     // 3200 runs = 90%/91% - 31m 24s
//     // 6400 runs  - 85% 3:05 it should be done.
// });