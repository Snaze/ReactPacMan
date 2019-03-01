"use strict";

var _GhostBrainStrategyWander = require("./GhostBrainStrategyWander");

var _GhostBrainStrategyWander2 = _interopRequireDefault(_GhostBrainStrategyWander);

var _Location = require("../../../Location");

var _Location2 = _interopRequireDefault(_Location);

var _Level = require("../../../Level");

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("GhostBrainStrategyWander._getRandomLocation", function () {
    // SETUP
    // let strategy = new GhostBrainStrategyWander();
    var currentLocation = new _Location2.default(0, 0);
    var level = new _Level2.default();

    // CALL
    var randomLocation = _GhostBrainStrategyWander2.default._getRandomLocation(currentLocation, level);

    // SETUP
    expect(!randomLocation.equals(currentLocation)).toBe(true);
    expect(randomLocation.x < level.width).toBe(true);
    expect(randomLocation.x >= 0).toBe(true);
    expect(randomLocation.y < level.height).toBe(true);
    expect(randomLocation.y >= 0).toBe(true);
});