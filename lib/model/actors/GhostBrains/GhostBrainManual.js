"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GhostBrainStrategyHoldingPin = require("./GhostBrainStrategies/GhostBrainStrategyHoldingPin");

var _GhostBrainStrategyHoldingPin2 = _interopRequireDefault(_GhostBrainStrategyHoldingPin);

var _moment = require("../../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _GhostBrainStrategyWander = require("./GhostBrainStrategies/GhostBrainStrategyWander");

var _GhostBrainStrategyWander2 = _interopRequireDefault(_GhostBrainStrategyWander);

var _Direction = require("../../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _GhostBrainStrategyAttack = require("./GhostBrainStrategies/GhostBrainStrategyAttack");

var _GhostBrainStrategyAttack2 = _interopRequireDefault(_GhostBrainStrategyAttack);

var _GhostBrainStrategyScared = require("./GhostBrainStrategies/GhostBrainStrategyScared");

var _GhostBrainStrategyScared2 = _interopRequireDefault(_GhostBrainStrategyScared);

var _GhostBrainStrategyDead = require("./GhostBrainStrategies/GhostBrainStrategyDead");

var _GhostBrainStrategyDead2 = _interopRequireDefault(_GhostBrainStrategyDead);

var _EasingFunctions = require("../../../utils/EasingFunctions");

var _EasingFunctions2 = _interopRequireDefault(_EasingFunctions);

var _Player = require("../Player");

var _Player2 = _interopRequireDefault(_Player);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Assert = require("../../../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ghost_state_wander = 0;
var ghost_state_holding_pin = 1;
var ghost_state_attack = 2;
var ghost_state_scared = 3;
var ghost_state_dead = 4;

var all = [ghost_state_wander, ghost_state_holding_pin, ghost_state_attack, ghost_state_scared, ghost_state_dead];

var GhostBrainManual = function () {
    _createClass(GhostBrainManual, null, [{
        key: "getCellTransitionDuration",


        // TODO: This is also in Player.js, refactor to a common location
        value: function getCellTransitionDuration(level, minDuration, maxDuration) {
            var levelNumberAsRange = level.getLevelNumAsTimeRange();
            levelNumberAsRange = Math.abs(1.0 - levelNumberAsRange);
            return _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeOutCubic, levelNumberAsRange, minDuration, maxDuration);
        }
    }, {
        key: "GHOST_STATE_WANDER",
        get: function get() {
            return ghost_state_wander;
        }
    }, {
        key: "GHOST_STATE_HOLDING_PIN",
        get: function get() {
            return ghost_state_holding_pin;
        }
    }, {
        key: "GHOST_STATE_ATTACK",
        get: function get() {
            return ghost_state_attack;
        }
    }, {
        key: "GHOST_STATE_SCARED",
        get: function get() {
            return ghost_state_scared;
        }
    }, {
        key: "GHOST_STATE_DEAD",
        get: function get() {
            return ghost_state_dead;
        }
    }]);

    function GhostBrainManual() {
        _classCallCheck(this, GhostBrainManual);

        this._ghostBrainStrategyHoldingPin = new _GhostBrainStrategyHoldingPin2.default();
        this._ghostBrainStrategyWander = new _GhostBrainStrategyWander2.default();
        this._ghostBrainStrategyAttack = new _GhostBrainStrategyAttack2.default();
        this._ghostBrainStrategyScared = new _GhostBrainStrategyScared2.default();
        this._ghostBrainStrategyDead = new _GhostBrainStrategyDead2.default();
        this._currentGhostBrainStrategy = null;

        this._currentState = null;
        this._endHoldingPinTime = null;
        this._attackStateExpiration = (0, _moment2.default)();
        this._holdingPinDuration = 8.0;

        this.enterState(GhostBrainManual.GHOST_STATE_HOLDING_PIN);
    }

    _createClass(GhostBrainManual, [{
        key: "getNextDirection",
        value: function getNextDirection(ghost, player, level) {
            this._changeStateIfNeeded(ghost, player, level);

            return this._currentGhostBrainStrategy.getNextDirection(ghost, player, level);
        }
    }, {
        key: "getCellTransitionDuration",
        value: function getCellTransitionDuration(level) {
            return GhostBrainManual.getCellTransitionDuration(level, this._currentGhostBrainStrategy.cellTransitionDurationMin, this._currentGhostBrainStrategy.cellTransitionDurationMax);
        }
    }, {
        key: "reset",
        value: function reset() {
            this.enterState(GhostBrainManual.GHOST_STATE_HOLDING_PIN);
        }
    }, {
        key: "enterState",
        value: function enterState(state) {
            (0, _Assert.assert)(_ArrayUtils2.default.isIn(all, state), "Invalid Brain State");

            this._currentState = state;

            switch (state) {
                case GhostBrainManual.GHOST_STATE_HOLDING_PIN:
                    var randomValue = Math.floor(Math.random() * this._holdingPinDuration);
                    this._endHoldingPinTime = (0, _moment2.default)().add(randomValue, "s");
                    this._currentGhostBrainStrategy = this._ghostBrainStrategyHoldingPin;
                    // console.log("enter Holding Pin Strat");
                    break;
                case GhostBrainManual.GHOST_STATE_WANDER:
                    this._currentGhostBrainStrategy = this._ghostBrainStrategyWander;
                    // console.log("enter wander Strat");
                    break;
                case GhostBrainManual.GHOST_STATE_ATTACK:
                    this._attackStateExpiration = (0, _moment2.default)().add(this._ghostBrainStrategyAttack.attackExpirationDuration, "s");
                    this._currentGhostBrainStrategy = this._ghostBrainStrategyAttack;
                    // console.log("enter attack Strat");
                    break;
                case GhostBrainManual.GHOST_STATE_SCARED:
                    this._currentGhostBrainStrategy = this._ghostBrainStrategyScared;
                    // console.log("enter scared Strat");
                    break;
                case GhostBrainManual.GHOST_STATE_DEAD:
                    this._currentGhostBrainStrategy = this._ghostBrainStrategyDead;
                    // console.log("enter dead Strat");
                    break;
                default:
                    throw new Error("Unknown Strategy");
            }
        }
    }, {
        key: "_changeStateIfNeeded",


        // TODO: move some of this logic into the GameObjectContainer
        value: function _changeStateIfNeeded(ghost, player, level) {

            switch (this._currentState) {
                case GhostBrainManual.GHOST_STATE_HOLDING_PIN:
                    if (this._endHoldingPinTime < (0, _moment2.default)()) {
                        this.enterState(GhostBrainManual.GHOST_STATE_WANDER);
                    }
                    break;
                case GhostBrainManual.GHOST_STATE_WANDER:
                    if (ghost.prevKilledByAttackModeId !== player.attackModeId && (0, _moment2.default)() < player.attackModeFinishTime) {
                        // console.log("SCARED 2");
                        ghost.prevLocation.setWithLocation(level.getRandomActiveCellLocation());
                        this.enterState(GhostBrainManual.GHOST_STATE_SCARED);
                    } else if (this._canGhostSeePlayer(ghost, player, level)) {
                        this.enterState(GhostBrainManual.GHOST_STATE_ATTACK);
                    }
                    break;
                case GhostBrainManual.GHOST_STATE_ATTACK:
                    if (ghost.prevKilledByAttackModeId !== player.attackModeId && (0, _moment2.default)() < player.attackModeFinishTime) {
                        // console.log("SCARED 1");
                        ghost.prevLocation.setWithLocation(level.getRandomActiveCellLocation());
                        this.enterState(GhostBrainManual.GHOST_STATE_SCARED);
                    } else if (this._attackStateExpiration < (0, _moment2.default)() && !this._canGhostSeePlayer(ghost, player, level)) {

                        this._ghostBrainStrategyWander.destinationLocation.setWithLocation(player.location);
                        this.enterState(GhostBrainManual.GHOST_STATE_WANDER);
                    }
                    break;
                case GhostBrainManual.GHOST_STATE_SCARED:
                    if (!ghost.isAlive) {
                        this.enterState(GhostBrainManual.GHOST_STATE_DEAD);
                    } else if ((0, _moment2.default)() >= player.attackModeFinishTime) {
                        this.enterState(GhostBrainManual.GHOST_STATE_WANDER);
                    }
                    break;
                case GhostBrainManual.GHOST_STATE_DEAD:
                    if (ghost.location.equals(ghost.spawnLocation)) {
                        ghost.isAlive = true;
                        ghost.points.reset();
                        this.enterState(GhostBrainManual.GHOST_STATE_WANDER);
                        this._ghostBrainStrategyWander.resetDestination(ghost, player, level);
                    }
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "_canGhostSeePlayer",
        value: function _canGhostSeePlayer(ghost, player, level) {
            var ghostLocation = ghost.location;
            var ghostDirection = ghost.direction;
            var playerLocation = player.location;

            if (playerLocation.y === ghostLocation.y || playerLocation.x === ghostLocation.x) {
                // Player and Ghost are on the same column or row.

                var ghostCellId = ghostLocation.toCellId();
                var playerCellId = playerLocation.toCellId();
                var shortestPathDistance = level.floydWarshall.getPathDistance(ghostCellId, playerCellId);
                var distBetween = 0;

                if (playerLocation.y === ghostLocation.y) {
                    distBetween = Math.abs(playerLocation.x - ghostLocation.x);

                    if (shortestPathDistance - 1 === distBetween && (ghostDirection === _Direction2.default.RIGHT && playerLocation.x >= ghostLocation.x || ghostDirection === _Direction2.default.LEFT && playerLocation.x <= ghostLocation.x)) {
                        return true;
                    }
                } else {
                    distBetween = Math.abs(playerLocation.y - ghostLocation.y);

                    if (shortestPathDistance - 1 === distBetween && (ghostDirection === _Direction2.default.DOWN && playerLocation.y >= ghostLocation.y || ghostDirection === _Direction2.default.UP && playerLocation.y <= ghostLocation.y)) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: "getScaredState",
        value: function getScaredState(ghost, player, level) {
            if (this._currentState !== GhostBrainManual.GHOST_STATE_SCARED) {
                return ghost.SCARED_STATE_NOT_SCARED;
            }

            var toSubtract = _Player2.default.getAttackDuration(level) * 0.2;
            var eightyPercentTime = player.attackModeFinishTime.clone().subtract(toSubtract, "s");

            if ((0, _moment2.default)() >= eightyPercentTime) {
                return ghost.SCARED_STATE_SCARED_FLASH;
            }

            return ghost.SCARED_STATE_SCARED;
        }
    }, {
        key: "currentState",
        get: function get() {
            return this._currentState;
        }
    }, {
        key: "destinationLocation",
        get: function get() {
            return this._ghostBrainStrategyWander.destinationLocation;
        },
        set: function set(value) {
            this._ghostBrainStrategyWander.destinationLocation = value;
        }
    }]);

    return GhostBrainManual;
}();

exports.default = GhostBrainManual;