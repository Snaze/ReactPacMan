"use strict";

var _QLearner = require("./QLearner");

var _QLearner2 = _interopRequireDefault(_QLearner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Constructor works", function () {
    var qLearner = new _QLearner2.default(5);

    expect(qLearner !== null).toBe(true);
});

it("QLearner Converges", function () {
    var qLearner = new _QLearner2.default(5, 2, 0.2, 0.9, 0.2, 0.9);
    var num_runs = 10000;
    var goalPositions = [0, 4];

    var startPos = 2;
    var minSteps = Number.POSITIVE_INFINITY;
    var playerPos = startPos;

    for (var i = 0; i < num_runs; i++) {
        playerPos = startPos;
        var action = qLearner.querySetState(playerPos);
        var steps = 0;

        while (goalPositions.indexOf(playerPos) < 0) {
            if (action === 0) {
                playerPos--;
            } else if (action === 1) {
                playerPos++;
            } else {
                throw new Error("Unknown Action");
            }

            var r = -1;
            if (playerPos === 1) {
                r = -100;
                // r = -1;
            } else if (goalPositions.indexOf(playerPos) >= 0) {
                r = 100;
            }

            // console.log(`i = ${i}, playerPos = ${playerPos}`);

            action = qLearner.query(playerPos, r);
            steps++;
        }

        if (steps < minSteps) {
            minSteps = steps;
        }
    }

    console.log(window.q);
    // expect(minSteps).toBe(2);
    expect(playerPos).toBe(4);
});