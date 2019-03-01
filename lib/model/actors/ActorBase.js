"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("../DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

var _moment = require("../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _KeyEventer = require("../../utils/KeyEventer");

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is an abstract class that should be used by any game agent.
 *
 * i.e. Player, Ghost, etc....
 */
var ActorBase = function (_DataSourceBase) {
    _inherits(ActorBase, _DataSourceBase);

    function ActorBase(level) {
        _classCallCheck(this, ActorBase);

        var _this = _possibleConstructorReturn(this, (ActorBase.__proto__ || Object.getPrototypeOf(ActorBase)).call(this));

        if (!(level instanceof _Level2.default)) {
            throw new Error("Invalid Level");
        }

        _this._level = _this._wireUp("_level", level);
        _this._direction = _Direction2.default.LEFT;
        _this._startDirection = _Direction2.default.LEFT;
        _this._location = _this._wireUp("_location", new _Location2.default(-1, -1));
        _this._cellTransitionDuration = 0.3; // seconds
        _this._spawnLocation = null;
        _this._lastTick = (0, _moment2.default)();
        _this._editMode = false;
        _this._paused = false;
        _this._isAlive = true;

        return _this;
    }

    _createClass(ActorBase, [{
        key: "timerTick",


        /**
         * This method should be overridden in child classes.
         * It infinitely fires after the cellTransitionDuration has elapsed.
         * @param e The timer events args.  You can probably just ignore this.
         */
        value: function timerTick(e) {
            console.log("This method should be overridden in child classes.");
        }
    }, {
        key: "resetLocations",
        value: function resetLocations() {
            console.log("This method should be overridden in child classes.");
        }
    }, {
        key: "executeActorStep",
        value: function executeActorStep(e) {

            var toRet = false;

            if (this.paused) {
                return toRet;
            }

            var currentMoment = (0, _moment2.default)();
            var lastTickPlusDuration = this._lastTick.clone().add(this._cellTransitionDuration, "s");

            // Use this to train fast.
            if (ActorBase._fastLearnMode || currentMoment.isAfter(lastTickPlusDuration)) {
                // if (currentMoment.isAfter(lastTickPlusDuration)) {

                this.timerTick(e);

                this._lastTick = (0, _moment2.default)();
                toRet = true;
            }

            return toRet;
        }
    }, {
        key: "canMoveInDirection",
        value: function canMoveInDirection(sourceLocation, direction) {
            var theCell = this.level.getCellByLocation(sourceLocation);
            var hasSolidBorder = theCell.getSolidBorder(direction);
            var hasPartialBorder = theCell.getPartialBorder(direction);

            return !(hasSolidBorder || hasPartialBorder);
        }

        /**
         * This will move an Actor (Player or Ghost) in the appropriate
         * direction according the the level's borders
         * @param direction - The Direction to move
         */

    }, {
        key: "moveInDirection",
        value: function moveInDirection(direction) {
            var sourceLocation = this.location;

            if (typeof direction === "undefined") {
                console.log("how is direction undefined?");
                return;
            }

            if (_Direction2.default.NONE === direction || !this.canMoveInDirection(sourceLocation, direction)) {
                return;
            }

            sourceLocation.moveInDirection(direction, this.level.height, this.level.width);
            this.direction = direction;
        }
    }, {
        key: "moveBackToSpawn",
        value: function moveBackToSpawn() {
            if (this._spawnLocation === null) {
                throw new Error("_spawnLocation is null");
            }

            this.location.setWithLocation(this._spawnLocation);
        }
    }, {
        key: "resetDirection",
        value: function resetDirection() {
            this.direction = this._startDirection;
        }
    }, {
        key: "isCollision",
        value: function isCollision(otherActor) {
            return this.location.equals(otherActor.location) || !!this.prevLocation && !!otherActor.prevLocation && this.location.equals(otherActor.prevLocation) && otherActor.location.equals(this.prevLocation);
        }
    }, {
        key: "direction",
        get: function get() {
            return this._direction;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_direction", value);
        }
    }, {
        key: "location",
        get: function get() {
            return this._location;
        }
    }, {
        key: "cellTransitionDuration",
        get: function get() {
            return this._cellTransitionDuration;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_cellTransitionDuration", value);
        }
    }, {
        key: "editMode",
        get: function get() {
            return this._editMode;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_editMode", value);

            if (value) {
                this.paused = true;

                if (this._spawnLocation !== null && this._spawnLocation.isValid) {
                    this.direction = this._startDirection;
                    this.location.setWithLocation(this._spawnLocation);
                }
            } else {
                this.paused = false;
            }
        }
    }, {
        key: "spawnLocation",
        get: function get() {
            return this._spawnLocation;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_spawnLocation", value);
        }
    }, {
        key: "level",
        get: function get() {
            return this._level;
        },
        set: function set(value) {
            if (value !== this._level) {
                this._unWire(this._level);
                this._wireUp("_level", value);
            }

            this._setValueAndRaiseOnChange("_level", value);
            this.resetLocations();
        }
    }, {
        key: "paused",
        get: function get() {
            return this._paused;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_paused", value);
        }
    }, {
        key: "isAlive",
        get: function get() {
            return this._isAlive;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_isAlive", value);
        }
    }, {
        key: "aiMode",
        get: function get() {
            return ActorBase._aiMode;
        },
        set: function set(value) {
            ActorBase._aiMode = value;
        }
    }], [{
        key: "bindOnKeyDown",
        value: function bindOnKeyDown() {
            if (ActorBase._onKeyDownRef === null) {
                ActorBase._onKeyDownRef = function (e) {
                    return ActorBase.onKeyDown(e);
                };
                _KeyEventer2.default.instance.addCallback(ActorBase._onKeyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
            }
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(key) {
            if (key.toLowerCase() === "f") {
                ActorBase._fastLearnMode = !ActorBase._fastLearnMode;
            }
        }
    }]);

    return ActorBase;
}(_DataSourceBase3.default);

ActorBase._aiMode = false;
ActorBase._fastLearnMode = false;
ActorBase._onKeyDownRef = null;


ActorBase.bindOnKeyDown();

exports.default = ActorBase;