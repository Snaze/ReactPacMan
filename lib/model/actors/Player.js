"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _KeyEventer = require("../../utils/KeyEventer");

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

var _ActorBase2 = require("./ActorBase");

var _ActorBase3 = _interopRequireDefault(_ActorBase2);

var _lodash = require("../../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Dot = require("../Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _moment = require("../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _EasingFunctions = require("../../utils/EasingFunctions");

var _EasingFunctions2 = _interopRequireDefault(_EasingFunctions);

var _SoundPlayer = require("../../utils/SoundPlayer");

var _SoundPlayer2 = _interopRequireDefault(_SoundPlayer);

var _PlayerAgent = require("./PlayerBrains/PlayerAgent");

var _PlayerAgent2 = _interopRequireDefault(_PlayerAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mr_pac_man = 0;
var mrs_pac_man = 1;
var valid_gender = [mr_pac_man, mrs_pac_man];
var min_cell_duration = 0.1;
var max_cell_duration = 0.175;
var min_attack_duration = 0.0; // seconds
var max_attack_duration = 8.0; // seconds
var new_life_increment = 10000;
var max_score_delta = 5000;

var Player = function (_ActorBase) {
    _inherits(Player, _ActorBase);

    _createClass(Player, null, [{
        key: "genderIsValid",
        value: function genderIsValid(theGender) {
            return valid_gender.indexOf(theGender) > -1;
        }
    }, {
        key: "MR_PAC_MAN",
        get: function get() {
            return mr_pac_man;
        }
    }, {
        key: "MRS_PAC_MAN",
        get: function get() {
            return mrs_pac_man;
        }
    }, {
        key: "MAX_CELL_DURATION",
        get: function get() {
            return max_cell_duration;
        }
    }, {
        key: "MIN_CELL_DURATION",
        get: function get() {
            return min_cell_duration;
        }
    }, {
        key: "MAX_ATTACK_DURATION",
        get: function get() {
            return max_attack_duration;
        }
    }, {
        key: "MIN_ATTACK_DURATION",
        get: function get() {
            return min_attack_duration;
        }
    }]);

    function Player(level, gender) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, level));

        if (!Player.genderIsValid(gender)) {
            throw new Error("Invalid gender");
        }

        _this._gender = gender;

        _this.location.setWithLocation(level.playerSpawnLocation);
        _this._spawnLocation = level.playerSpawnLocation.clone();
        _this._score = 0;
        _this._dotsEaten = 0;
        _this._attackModeId = Player._nextAttackModeId++;
        _this._attackModeFinishTime = (0, _moment2.default)();
        _this._prevLocation = _this.location.clone();
        _this._numLives = 3;
        _this._originalNumLives = _this._numLives;
        _this._currentReward = -1 / max_score_delta;
        _this._state = 0;
        _this._learnMode = false;

        _this._cellTransitionDuration = Player.getCellTransitionDuration(_this.level); // seconds
        return _this;
    }

    _createClass(Player, [{
        key: "resetLocations",
        value: function resetLocations() {
            this.location.setWithLocation(this.level.playerSpawnLocation);
            this._spawnLocation.setWithLocation(this.location);
            this._prevLocation.setWithLocation(this.location);
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            if (_lodash2.default.startsWith(e.source, "_playerSpawnLocation")) {
                this._spawnLocation.setWithLocation(this.level.playerSpawnLocation);
                if (this.editMode) {
                    this.location.setWithLocation(this._spawnLocation);
                }
            }

            _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "_nestedDataSourceChanged", this).call(this, e);
        }
    }, {
        key: "handleLocationChanged",
        value: function handleLocationChanged(theLocation) {

            if (!theLocation.isValid) {
                return;
            }

            var cell = this.level.getCellByLocation(theLocation);

            if (cell === null) {
                this.location.set(-1, -1);
                return;
            }

            if (cell.dotType === _Dot2.default.LITTLE) {
                this.score = this.score + 10;
                cell.dotType = _Dot2.default.NONE;
                this._setValueAndRaiseOnChange("_dotsEaten", this._dotsEaten + 1);
                _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.chompSmall);
            } else if (cell.dotType === _Dot2.default.BIG) {
                this._eatBigDot(cell);
                // SoundPlayer.instance.chomp.stop();
                _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.chompBig);
            }
        }
    }, {
        key: "_eatBigDot",
        value: function _eatBigDot(cell) {
            this.score = this.score + 50;
            cell.dotType = _Dot2.default.NONE;

            // This use to be here but ghosts wouldn't turn blue again
            // when you picked up a new power pellet.
            // if (moment() >= this._attackModeFinishTime) {
            this._attackModeId = Player._nextAttackModeId++;
            // }

            var attackDuration = Player.getAttackDuration(this.level);
            var attackFinishTime = (0, _moment2.default)().add(attackDuration, "s");
            this._setValueAndRaiseOnChange("_attackModeFinishTime", attackFinishTime);
            this._setValueAndRaiseOnChange("_dotsEaten", this._dotsEaten + 1);
            if (Player.sirenSoundId === null) {
                Player.sirenSoundId = _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.siren, null, "main");
            }
        }
    }, {
        key: "executeActorStep",
        value: function executeActorStep(goc) {
            var toRet = _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "executeActorStep", this).call(this, goc);

            if ((0, _moment2.default)() >= this._attackModeFinishTime && Player.sirenSoundId !== null) {
                var tempId = Player.sirenSoundId;
                Player.sirenSoundId = null;

                _SoundPlayer2.default.instance.siren.stop(tempId);
            }

            this.resetAnimating();

            return toRet;
        }
    }, {
        key: "timerTick",
        value: function timerTick(goc) {

            if (this.aiMode || this.learnMode) {
                this.aiTick(goc);
            } else {
                this.humanTick(goc);
            }

            this.resetAnimating(true);
        }
    }, {
        key: "aiTick",
        value: function aiTick(goc) {

            var decimalDirection = goc.playerActionNum;
            var newDirection = _Direction2.default.decimalToDirection(decimalDirection);
            this._currentReward = -1 / max_score_delta;

            // console.log(`decimalDirection = ${decimalDirection}, newDirection = ${newDirection}`);

            this.prevLocation.setWithLocation(this.location);
            this.attemptToMoveInDirection(newDirection);

            this.handleLocationChanged(this.location);
        }
    }, {
        key: "humanTick",
        value: function humanTick(goc) {
            var _this2 = this;

            if (!this.location.isValid) {
                return;
            }

            var newDirection = this.direction;

            if (_KeyEventer2.default.instance.lastArrowPressed !== null) {
                if (_KeyEventer2.default.instance.lastArrowPressed === _Direction2.default.UP) {
                    newDirection = _Direction2.default.UP;
                } else if (_KeyEventer2.default.instance.lastArrowPressed === _Direction2.default.DOWN) {
                    newDirection = _Direction2.default.DOWN;
                } else if (_KeyEventer2.default.instance.lastArrowPressed === _Direction2.default.LEFT) {
                    newDirection = _Direction2.default.LEFT;
                } else if (_KeyEventer2.default.instance.lastArrowPressed === _Direction2.default.RIGHT) {
                    newDirection = _Direction2.default.RIGHT;
                }
            }

            this.prevLocation.setWithLocation(this.location);
            this.attemptToMoveInDirection(newDirection);

            setTimeout(function (e) {
                return _this2.handleLocationChanged(_this2.location.clone());
            }, this._cellTransitionDuration * 1000.0 / 2.0);
        }
    }, {
        key: "attemptToMoveInDirection",
        value: function attemptToMoveInDirection(direction) {
            var prevX = this.location.x;
            var prevY = this.location.y;

            this.moveInDirection(direction);
            if (this.location.isEqualTo(prevX, prevY)) {
                this.moveInDirection(this._direction);
            }
        }
    }, {
        key: "resetNumLives",
        value: function resetNumLives() {
            this.numLives = this._originalNumLives;
        }
    }, {
        key: "resetReward",
        value: function resetReward() {
            this._currentReward = null;
        }
    }, {
        key: "resetAnimating",
        value: function resetAnimating() {
            var raiseEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!raiseEvent) {
                this._animating = !(this.location.equals(this.prevLocation) || this.paused);
            } else {
                this.animating = !(this.location.equals(this.prevLocation) || this.paused);
            }
        }
    }, {
        key: "getAgent",
        value: function getAgent(numStates) {
            if (this._agent === null) {
                this._agent = new _PlayerAgent2.default(numStates);
            }

            return this._agent;
        }
    }, {
        key: "toFeatureVector",


        /**
         * This will return the feature vector that can be used to train machine learning algorithms
         *
         * @returns {Array}
         */
        value: function toFeatureVector() {

            var milliSecTillAttachModeFinishTime = 0;
            if (this._attackModeFinishTime > (0, _moment2.default)()) {
                milliSecTillAttachModeFinishTime = this._attackModeFinishTime.clone().diff((0, _moment2.default)(), "ms");
            }

            var toRet = [];
            var delta = this.location.getDelta(this.prevLocation);

            toRet.push(this.location.x); // location                 0
            toRet.push(this.location.y); // location                 1
            toRet.push(delta.x); //                          2
            toRet.push(delta.y); //                          3
            toRet.push(this.isAlive ? 1 : 0); // isAlive                  4
            toRet.push(milliSecTillAttachModeFinishTime); // attackModeFinishTime     5
            toRet.push(this.score); // score                    6
            toRet.push(this.dotsEaten); // dotsEaten                7
            toRet.push(this.attackModeId); // attackModeId             8
            toRet.push(this.numLives); // this._numLives = 3;      9
            toRet.push(this.prevLocation.x); // prevLocation             10
            toRet.push(this.prevLocation.y); // prevLocation             11
            toRet.push(_Direction2.default.directionToDecimal(this.direction)); // direction      12

            return toRet;
        }

        /**
         * This will change the state of the player back to the state represented by the feature vector
         * @param featureVector {Array} The state you wish to go back to
         */

    }, {
        key: "setFeatureVector",
        value: function setFeatureVector(featureVector) {
            var locationX = featureVector[0],
                locationY = featureVector[1];
            this.location.set(locationX, locationY);

            this.isAlive = featureVector[4] === 1;
            this._attackModeFinishTime = (0, _moment2.default)().add(featureVector[5], "ms");
            this.score = featureVector[6];
            this._dotsEaten = featureVector[7];
            this._attackModeId = featureVector[8];
            this._numLives = featureVector[9];
            var prevLocation = this.location.clone();
            prevLocation.set(featureVector[10], featureVector[11]);
            this._prevLocation = prevLocation;
            this._direction = _Direction2.default.decimalToDirection(featureVector[12]);
        }
    }, {
        key: "gender",
        get: function get() {
            return this._gender;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_gender", value);
        }
    }, {
        key: "score",
        get: function get() {
            return this._score;
        },
        set: function set(value) {
            this._currentReward = (value - this.score) / max_score_delta;

            var origValue = Math.floor(this.score / new_life_increment);
            var newValue = Math.floor(value / new_life_increment);

            if (newValue > origValue) {
                this.numLives = this.numLives + 1;
                _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.extrapac);
            }

            this._setValueAndRaiseOnChange("_score", value);
        }
    }, {
        key: "attackModeFinishTime",
        get: function get() {
            return this._attackModeFinishTime;
        }
    }, {
        key: "dotsEaten",
        get: function get() {
            return this._dotsEaten;
        }
    }, {
        key: "numLives",
        get: function get() {
            if (this.aiMode) {
                return 3;
            }

            return this._numLives;
        },
        set: function set(value) {
            if (!this.aiMode) {
                this._setValueAndRaiseOnChange("_numLives", value);
            }
        }
    }, {
        key: "attackModeId",
        get: function get() {
            return this._attackModeId;
        }
    }, {
        key: "isAlive",
        get: function get() {
            return _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "isAlive", this);
        },
        set: function set(value) {
            this._attackModeFinishTime = (0, _moment2.default)().add(-1, "s");

            if (this._isAlive && !value) {
                _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.death);
                this._currentReward = -0.3; // Special case.  -1 is max neg reward.  Think -5000 / 5000 = -5000 / max_score_delta
            }

            _set(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "isAlive", value, this);
        }
    }, {
        key: "level",
        get: function get() {
            return this._level;
        },
        set: function set(value) {
            this._dotsEaten = 0;
            this._cellTransitionDuration = Player.getCellTransitionDuration(value);
            this._attackModeFinishTime = (0, _moment2.default)().add(-1, "s");

            _set(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "level", value, this);
        }
    }, {
        key: "prevLocation",
        get: function get() {
            return this._prevLocation;
        }
    }, {
        key: "animating",
        get: function get() {
            return this._animating;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_animating", value);
        }
    }, {
        key: "state",
        get: function get() {
            return this._state;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_state", value);
        }
    }, {
        key: "learnMode",
        get: function get() {
            return this._learnMode;
        },
        set: function set(value) {
            this._learnMode = value;
        }
    }, {
        key: "currentReward",
        get: function get() {
            return this._currentReward;
        }
    }], [{
        key: "getCellTransitionDuration",
        value: function getCellTransitionDuration(level) {
            var levelNumberAsRange = level.getLevelNumAsTimeRange();
            levelNumberAsRange = Math.abs(1.0 - levelNumberAsRange);
            return _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeOutCubic, levelNumberAsRange, min_cell_duration, max_cell_duration);
        }
    }, {
        key: "getAttackDuration",
        value: function getAttackDuration(level) {
            var levelNumberAsRange = level.getLevelNumAsTimeRange();
            levelNumberAsRange = Math.abs(1.0 - levelNumberAsRange);
            return _EasingFunctions2.default.doCalculation(_EasingFunctions2.default.easeOutCubic, levelNumberAsRange, min_attack_duration, max_attack_duration);
        }
    }, {
        key: "trainingFeatureIndices",
        get: function get() {
            if (Player._trainingFeatureIndices === null) {
                Player._trainingFeatureIndices = [2, // delta x
                3, // delta y
                6, // score
                12 // direction
                ];
            }

            return Player._trainingFeatureIndices;
        }
    }, {
        key: "featureVectorLength",
        get: function get() {
            return 13;
        }
    }]);

    return Player;
}(_ActorBase3.default);

Player._nextAttackModeId = 1;
Player.sirenSoundId = null;
Player._trainingFeatureIndices = null;
exports.default = Player;