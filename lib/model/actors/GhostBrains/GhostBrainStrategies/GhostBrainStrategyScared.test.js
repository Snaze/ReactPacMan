"use strict";

var _GhostBrainStrategyScared = require("./GhostBrainStrategyScared");

var _GhostBrainStrategyScared2 = _interopRequireDefault(_GhostBrainStrategyScared);

var _Level = require("../../../Level");

var _Level2 = _interopRequireDefault(_Level);

var _Ghost = require("../../../actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _Player = require("../../../actors/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Direction = require("../../../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("getNextDirection works", function () {
    // SETUP
    var level = new _Level2.default(6, 6);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(3, 3);
    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(4, 3);
    var scaredStrat = new _GhostBrainStrategyScared2.default();
    var validDirections = [_Direction2.default.UP, _Direction2.default.RIGHT, _Direction2.default.DOWN];

    // CALL
    var nextDirection = scaredStrat.getNextDirection(ghost, player, level);

    // ASSERT
    expect(validDirections.indexOf(nextDirection) >= 0).toBe(true);
});