"use strict";

var _mathjs = require("mathjs");

var _mathjs2 = _interopRequireDefault(_mathjs);

var _DeepQLearner = require("./DeepQLearner");

var _DeepQLearner2 = _interopRequireDefault(_DeepQLearner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Commenting this out for now since it takes forever.
 */
var testDeepQLearnerConverges = function testDeepQLearnerConverges(num_runs) {
    var finalRar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0000001;


    var rar = 0.98;
    var radr = Math.pow(finalRar / rar, 1 / num_runs);

    if (radr <= 0) {
        throw new Error("Invalid radr");
    }

    var qLearner = new _DeepQLearner2.default(1, 2, 0.03, 0.99, rar, radr, false, 10, 2, num_runs);
    // let num_runs = 10000;
    var goalPositions = [1, 6];

    var startPos = 3;
    var minSteps = Number.POSITIVE_INFINITY;
    var playerPos = startPos;
    var steps = Number.POSITIVE_INFINITY;
    var executeActionCallback = function executeActionCallback(source, action) {
        if (action === 0) {
            playerPos--;
        } else if (action === 1) {
            playerPos++;
        } else {
            throw new Error("Unknown Action");
        }

        var r = -0.01;
        var isTerminal = false;
        if (playerPos === 2) {
            r = -0.1;
            // r = -1;
        } else if (goalPositions.indexOf(playerPos) >= 0) {
            r = 0.1;
            isTerminal = true;
        }

        steps++;
        return { reward: r, state: [playerPos / 10], isTerminal: isTerminal };
    };

    var prevEpoch = -1;
    while (qLearner.epochNum < num_runs) {
        if (qLearner.epochNum !== prevEpoch) {
            if (steps < minSteps) {
                minSteps = steps;
            }
            steps = 0;
            playerPos = startPos;
        }
        prevEpoch = qLearner.epochNum;

        qLearner.learnOne(executeActionCallback, [startPos / 10]);
    }

    return playerPos === 6;
};

function doWork() {

    var numCorrect = 0;
    var results = [];
    // let numRunsArray = [100, 200, 400, 800, 1600, 3200, 6400, 12800];
    // let numRunsArray = [100, 200, 400, 800, 1600];
    // let numRunsToAverage = 3;
    var numRunsArray = [12000];
    var numRunsToAverage = 3;
    var totalTests = 100;
    // let numRunsArray = [100];
    // let numRunsToAverage = 3;
    // let totalTests = 100;

    console.log("Running DeepQLearner.console.js");
    console.log("numRunsArray = " + numRunsArray);
    console.log("totalTests = " + totalTests);

    numRunsArray.forEach(function (numRuns, index) {

        var currentResults = [];

        for (var runNum = 0; runNum < numRunsToAverage; runNum++) {
            numCorrect = 0;

            for (var i = 0; i < totalTests; i++) {
                if (testDeepQLearnerConverges(numRuns)) {
                    numCorrect++;
                }
            }

            var percentCorrect = Math.floor(numCorrect / totalTests * 100);
            console.log("Intermediate Results for " + numRuns + " runs = " + percentCorrect);
            currentResults.push(percentCorrect);
        }

        var toRecord = _mathjs2.default.mean(currentResults);
        results.push(toRecord);
        console.log("Results for " + numRuns + " runs = " + toRecord);
    });

    numRunsArray.forEach(function (numRuns, index) {
        console.log("Results for " + numRuns + " runs = " + results[index]);
    });
    // 100 runs = 77% percent correct
    // 200 runs = 82% percent correct - 84%
    // 300 runs = 81% percent correct
    // 400 runs = 84% percent correct - 3m 16s - 87%
    // 500 runs = 82% percent correct - 3m 59s
    // 600 runs = 84% percent correct - 5m 3s
    // 700 runs =
    // 800 runs = 91% correct
    // 900 runs =
    // 1000 runs = 84% - 8m 10s, 73%   with decaying learning rate., 83%, 70%, 74% with prioritized. (11m 19s though).
    // 10000 runs = 87% - 1h 25 m 38 s with decaying learning rate
    // 20000 runs = 90%   2h 42 m 34 s with decaying learning rate - 7:32
    // expect(percentCorrect).toBeGreaterThanOrEqual(90);

    // Tweaked experience replay to only store unique Transitions
    // 200 runs = 84%
    // 400 runs = 87%
    // 800 runs = 91%
    // 1200 runs = 91%
    // 1600 runs = 95%
    // 3200 runs = 90%/91% - 31m 24s
    // 6400 runs  - 85% 3:05 it should be done.
}

doWork();