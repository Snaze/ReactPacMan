"use strict";

var _Level = require("../../Level");

var _Level2 = _interopRequireDefault(_Level);

var _Ghost = require("../Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _Player = require("../Player");

var _Player2 = _interopRequireDefault(_Player);

var _GhostBrainManual = require("./GhostBrainManual");

var _GhostBrainManual2 = _interopRequireDefault(_GhostBrainManual);

var _Direction = require("../../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _moment = require("../../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _GhostBrainStrategyHoldingPin = require("./GhostBrainStrategies/GhostBrainStrategyHoldingPin");

var _GhostBrainStrategyHoldingPin2 = _interopRequireDefault(_GhostBrainStrategyHoldingPin);

var _GhostBrainStrategyWander = require("./GhostBrainStrategies/GhostBrainStrategyWander");

var _GhostBrainStrategyWander2 = _interopRequireDefault(_GhostBrainStrategyWander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("_canGhostSeePlayer works", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = _Direction2.default.RIGHT;

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(1, 0);
    ghost.direction = _Direction2.default.LEFT;

    var gbm = new _GhostBrainManual2.default();

    // CALL
    var result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(true);
});

it("_canGhostSeePlayer works (not seeing - diff row)", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(0, 1);
    player.direction = _Direction2.default.RIGHT;

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(1, 0);
    ghost.direction = _Direction2.default.LEFT;

    var gbm = new _GhostBrainManual2.default();

    // CALL
    var result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(false);
});

it("_canGhostSeePlayer works (same col - can see)", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = _Direction2.default.DOWN;

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(0, 1);
    ghost.direction = _Direction2.default.UP;

    var gbm = new _GhostBrainManual2.default();

    // CALL
    var result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(true);
});

it("_canGhostSeePlayer works (same col - wrong direction)", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = _Direction2.default.DOWN;

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(0, 1);
    ghost.direction = _Direction2.default.DOWN;

    var gbm = new _GhostBrainManual2.default();

    // CALL
    var result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(false);
});

it("_canGhostSeePlayer works (same col - can see)", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(1, 0);
    player.direction = _Direction2.default.DOWN;

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(0, 1);
    ghost.direction = _Direction2.default.UP;

    var gbm = new _GhostBrainManual2.default();

    // CALL
    var result = gbm._canGhostSeePlayer(ghost, player, level);

    // ASSERT
    expect(result).toBe(false);
});

it("_changeStateIfNeeded wont go into scared mode if already killed during current attack mode", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = _Direction2.default.RIGHT;
    player._attackModeId = 1;
    player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(1, 1);
    ghost.direction = _Direction2.default.LEFT;
    ghost.prevKilledByAttackModeId = 1;

    var gbm = new _GhostBrainManual2.default();
    gbm._currentState = _GhostBrainManual2.default.GHOST_STATE_WANDER;

    // CALL
    gbm._changeStateIfNeeded(ghost, player, level);

    // ASSERT
    expect(gbm._currentState).toBe(_GhostBrainManual2.default.GHOST_STATE_WANDER);
});

it("_changeStateIfNeeded will go into scared mode if not already killed during current attack mode", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    player.location.set(0, 0);
    player.direction = _Direction2.default.RIGHT;
    player._attackModeId = 2;
    player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");

    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);
    ghost.location.set(1, 1);
    ghost.direction = _Direction2.default.LEFT;
    ghost.prevKilledByAttackModeId = 1;

    var gbm = new _GhostBrainManual2.default();
    gbm._currentState = _GhostBrainManual2.default.GHOST_STATE_WANDER;

    // CALL
    gbm._changeStateIfNeeded(ghost, player, level);

    // ASSERT
    expect(gbm._currentState).toBe(_GhostBrainManual2.default.GHOST_STATE_SCARED);
});

it("getCellTransitionDuration should return ghostBrainStrategyHoldingPin minDuration", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    level.levelNum = 10;

    var gbm = new _GhostBrainManual2.default();
    gbm.enterState(_GhostBrainManual2.default.GHOST_STATE_HOLDING_PIN);
    var gbsw = new _GhostBrainStrategyHoldingPin2.default();

    // CALL
    var theDuration = gbm.getCellTransitionDuration(level);

    // ASSERT
    expect(theDuration).toBe(gbsw.cellTransitionDurationMin);
    expect(theDuration).toBe(gbsw.cellTransitionDurationMax);
});

it("getCellTransitionDuration should return ghostBrainStrategyWander maxDuration", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    level.levelNum = 1;

    var gbm = new _GhostBrainManual2.default();
    gbm.enterState(_GhostBrainManual2.default.GHOST_STATE_WANDER);
    var gbsw = new _GhostBrainStrategyWander2.default();

    // CALL
    var theDuration = gbm.getCellTransitionDuration(level);

    // ASSERT
    expect(theDuration).toBe(gbsw.cellTransitionDurationMax);
});