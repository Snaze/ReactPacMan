"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActorBase2 = require("./ActorBase");

var _ActorBase3 = _interopRequireDefault(_ActorBase2);

var _lodash = require("../../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _GhostBrainManual = require("./GhostBrains/GhostBrainManual");

var _GhostBrainManual2 = _interopRequireDefault(_GhostBrainManual);

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Points = require("../Points");

var _Points2 = _interopRequireDefault(_Points);

var _SoundPlayer = require("../../utils/SoundPlayer");

var _SoundPlayer2 = _interopRequireDefault(_SoundPlayer);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var red = 0;
var blue = 1;
var pink = 2;
var orange = 3;
var valid_color = [red, blue, pink, orange];

var not_scared = 0;
var scared = 1;
var scared_flash = 2;

var Ghost = function (_ActorBase) {
    _inherits(Ghost, _ActorBase);

    _createClass(Ghost, [{
        key: "SCARED_STATE_NOT_SCARED",
        get: function get() {
            return not_scared;
        }
    }, {
        key: "SCARED_STATE_SCARED",
        get: function get() {
            return scared;
        }
    }, {
        key: "SCARED_STATE_SCARED_FLASH",
        get: function get() {
            return scared_flash;
        }
    }], [{
        key: "colorIsValid",
        value: function colorIsValid(color) {
            return valid_color.indexOf(color) > -1;
        }
    }, {
        key: "RED",
        get: function get() {
            return red;
        }
    }, {
        key: "BLUE",
        get: function get() {
            return blue;
        }
    }, {
        key: "PINK",
        get: function get() {
            return pink;
        }
    }, {
        key: "ORANGE",
        get: function get() {
            return orange;
        }
    }, {
        key: "SCARED_STATE_NOT_SCARED",
        get: function get() {
            return not_scared;
        }
    }, {
        key: "SCARED_STATE_SCARED",
        get: function get() {
            return scared;
        }
    }, {
        key: "SCARED_STATE_SCARED_FLASH",
        get: function get() {
            return scared_flash;
        }
    }]);

    function Ghost(level, color, player) {
        _classCallCheck(this, Ghost);

        var _this = _possibleConstructorReturn(this, (Ghost.__proto__ || Object.getPrototypeOf(Ghost)).call(this, level));

        if (!Ghost.colorIsValid(color)) {
            throw new Error("Invalid Color");
        }

        if (!(player instanceof _Player2.default)) {
            throw new Error("Invalid Player");
        }

        _this._player = player;
        _this._color = color;

        _this.location.setWithLocation(Ghost.getSpawnLocationFromLevel(level, color));
        _this._spawnLocation = _this.location.clone();
        _this._prevLocation = _this.location.clone();

        _this._ghostBrain = new _GhostBrainManual2.default();
        _this._scaredState = Ghost.SCARED_STATE_NOT_SCARED;
        _this._points = _this._wireUp("_points", new _Points2.default(_Points2.default.POINTS_TYPE_GHOST_KILL));
        _this._prevKilledByAttackModeId = -1;
        return _this;
    }

    _createClass(Ghost, [{
        key: "resetLocations",
        value: function resetLocations() {
            this.location.setWithLocation(Ghost.getSpawnLocationFromLevel(this.level, this.color));
            this.spawnLocation.setWithLocation(this.location);
            this._prevLocation.setWithLocation(this.location);
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            if (_lodash2.default.startsWith(e.source, "_ghostRedLocation") && this.color === Ghost.RED) {
                this._spawnLocation.setWithLocation(this.level.ghostRedLocation);
                if (this.editMode) {
                    this.location.setWithLocation(this._spawnLocation);
                }
            } else if (_lodash2.default.startsWith(e.source, "_ghostBlueLocation") && this.color === Ghost.BLUE) {
                this._spawnLocation.setWithLocation(this.level.ghostBlueLocation);
                if (this.editMode) {
                    this.location.setWithLocation(this._spawnLocation);
                }
            } else if (_lodash2.default.startsWith(e.source, "_ghostPinkLocation") && this.color === Ghost.PINK) {
                this._spawnLocation.setWithLocation(this.level.ghostPinkLocation);
                if (this.editMode) {
                    this.location.setWithLocation(this._spawnLocation);
                }
            } else if (_lodash2.default.startsWith(e.source, "_ghostOrangeLocation") && this.color === Ghost.ORANGE) {
                this._spawnLocation.setWithLocation(this.level.ghostOrangeLocation);
                if (this.editMode) {
                    this.location.setWithLocation(this._spawnLocation);
                }
            }

            _get(Ghost.prototype.__proto__ || Object.getPrototypeOf(Ghost.prototype), "_nestedDataSourceChanged", this).call(this, e);
        }
    }, {
        key: "canMoveInDirection",
        value: function canMoveInDirection(sourceLocation, direction) {

            if (!this.isAlive) {
                var theCell = this.level.getCellByLocation(sourceLocation);
                var hasSolidBorder = theCell.getSolidBorder(direction);

                return !hasSolidBorder;
            }

            return _get(Ghost.prototype.__proto__ || Object.getPrototypeOf(Ghost.prototype), "canMoveInDirection", this).call(this, sourceLocation, direction);
        }
    }, {
        key: "executeActorStep",
        value: function executeActorStep(e) {
            var toRet = _get(Ghost.prototype.__proto__ || Object.getPrototypeOf(Ghost.prototype), "executeActorStep", this).call(this, e);

            // I put this here so ghosts become unscared as soon as possible
            this.scaredState = this._ghostBrain.getScaredState(this, this.player, this.level);

            this.points.timerTick(e);

            return toRet;
        }
    }, {
        key: "timerTick",
        value: function timerTick(e) {
            if (!this.location.isValid) {
                return;
            }

            var theDirection = this._ghostBrain.getNextDirection(this, this.player, this.level);
            this.cellTransitionDuration = this._ghostBrain.getCellTransitionDuration(this.level);

            this._prevLocation.setWithLocation(this.location);
            this.moveInDirection(theDirection);
        }
    }, {
        key: "resetBrain",
        value: function resetBrain() {
            this._ghostBrain.reset();
            this._raiseOnChangeCallbacks("_scaredState", true, false);
        }
    }, {
        key: "kill",
        value: function kill(player, killScore) {
            if (!this.isAlive || !this.isScared) {
                throw new Error("You can only kill a live and scared ghost");
            }

            this.isAlive = false;
            this.points.amount = killScore;
            this.points.show(this.location);
            this.prevKilledByAttackModeId = player.attackModeId;
            player.score += killScore;
            _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.eatghost);
        }
    }, {
        key: "toFeatureVector",


        /**
         * This will return the feature vector that can be used to train machine learning algorithms
         *
         * @returns {Array}
         */
        value: function toFeatureVector() {

            var toRet = [];
            var delta = this.location.getDelta(this.prevLocation);

            toRet.push(this.location.x); // location                 0
            toRet.push(this.location.y); // location                 1
            toRet.push(delta.x); //                          2
            toRet.push(delta.y); //                          3
            toRet.push(this.isAlive ? 1 : 0); // isAlive                  4
            toRet.push(this.prevLocation.x); // prevLocation             5
            toRet.push(this.prevLocation.y); // prevLocation             6
            toRet.push(_Direction2.default.directionToDecimal(this.direction)); // direction      7
            toRet.push(this._prevKilledByAttackModeId); // prevKilledByAttackModeId 8
            toRet.push(this.brainState); // brainState               9
            if (!!this._ghostBrain.destinationLocation) {
                toRet.push(this._ghostBrain.destinationLocation.x); // destinationLocationX 10
                toRet.push(this._ghostBrain.destinationLocation.y); // destinationLocationY 11
            } else {
                toRet.push(-1); // destinationLocationX 10
                toRet.push(-1); // destinationLocationY 11
            }

            return toRet;
        }

        /**
         * This will change the state of the Ghost back to the state represented by the feature vector
         *
         * @param featureVector {Array} The state you wish to go back to
         */

    }, {
        key: "setFeatureVector",
        value: function setFeatureVector(featureVector) {
            var locationX = featureVector[0],
                locationY = featureVector[1];
            this.location.set(locationX, locationY);

            this.isAlive = featureVector[4] === 1;

            var prevLocation = this.location.clone();
            prevLocation.set(featureVector[5], featureVector[6]);
            this._prevLocation = prevLocation;
            this._direction = _Direction2.default.decimalToDirection(featureVector[7]);
            this._prevKilledByAttackModeId = featureVector[8];
            this.brainState = featureVector[9];

            if (!this._ghostBrain.destinationLocation) {
                this._ghostBrain.destinationLocation = new _Location2.default(featureVector[10], featureVector[11]);
            } else {
                this._ghostBrain.destinationLocation.set(featureVector[10], featureVector[11]);
            }
        }
    }, {
        key: "brainState",
        get: function get() {
            return this._ghostBrain.currentState;
        },
        set: function set(value) {
            this._ghostBrain.enterState(value);
        }
    }, {
        key: "color",
        get: function get() {
            return this._color;
        }
    }, {
        key: "player",
        get: function get() {
            return this._player;
        }
    }, {
        key: "scaredState",
        get: function get() {
            return this._scaredState;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_scaredState", value);
        }
    }, {
        key: "isScared",
        get: function get() {
            return this._scaredState === Ghost.SCARED_STATE_SCARED || this._scaredState === Ghost.SCARED_STATE_SCARED_FLASH;
        }
    }, {
        key: "prevLocation",
        get: function get() {
            return this._prevLocation;
        }
    }, {
        key: "points",
        get: function get() {
            return this._points;
        }
    }, {
        key: "prevKilledByAttackModeId",
        get: function get() {
            return this._prevKilledByAttackModeId;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_prevKilledByAttackModeId", value);
        }
    }, {
        key: "level",
        get: function get() {
            return _get(Ghost.prototype.__proto__ || Object.getPrototypeOf(Ghost.prototype), "level", this);
        },
        set: function set(value) {
            _set(Ghost.prototype.__proto__ || Object.getPrototypeOf(Ghost.prototype), "level", value, this);

            this.resetBrain();
        }
    }], [{
        key: "getSpawnLocationFromLevel",
        value: function getSpawnLocationFromLevel(level, color) {
            switch (color) {
                case Ghost.RED:
                    return level.ghostRedLocation;
                case Ghost.BLUE:
                    return level.ghostBlueLocation;
                case Ghost.PINK:
                    return level.ghostPinkLocation;
                case Ghost.ORANGE:
                    return level.ghostOrangeLocation;
                default:
                    throw new Error("Unknown Ghost color detected");
            }
        }
    }, {
        key: "trainingFeatureIndices",
        get: function get() {
            if (Ghost._trainingFeatureIndices === null) {
                Ghost._trainingFeatureIndices = [2, // delta x
                3, // delta y
                4, // isAlive
                7, // direction
                9 // brainState
                ];
            }

            return Ghost._trainingFeatureIndices;
        }
    }, {
        key: "featureVectorLength",
        get: function get() {
            return 12;
        }
    }]);

    return Ghost;
}(_ActorBase3.default);

Ghost._trainingFeatureIndices = null;
exports.default = Ghost;