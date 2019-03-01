"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

var _moment = require("../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var points_type_ghost_kill = 0;
var points_type_power_up = 1;
var points_type_none = 2;
// const valid_points_type = [points_type_ghost_kill, points_type_power_up, points_type_none];

var points_state_visible = 0;
var points_state_fade = 1;
var points_state_invisible = 2;

var Points = function (_DataSourceBase) {
    _inherits(Points, _DataSourceBase);

    _createClass(Points, null, [{
        key: "POINTS_TYPE_GHOST_KILL",
        get: function get() {
            return points_type_ghost_kill;
        }
    }, {
        key: "POINTS_TYPE_POWER_UP",
        get: function get() {
            return points_type_power_up;
        }
    }, {
        key: "POINTS_TYPE_NONE",
        get: function get() {
            return points_type_none;
        }
    }, {
        key: "POINTS_STATE_VISIBLE",
        get: function get() {
            return points_state_visible;
        }
    }, {
        key: "POINTS_STATE_FADE",
        get: function get() {
            return points_state_fade;
        }
    }, {
        key: "POINTS_STATE_INVISIBLE",
        get: function get() {
            return points_state_invisible;
        }
    }]);

    function Points(pointsType) {
        _classCallCheck(this, Points);

        var _this = _possibleConstructorReturn(this, (Points.__proto__ || Object.getPrototypeOf(Points)).call(this));

        _this._pointsType = pointsType;
        _this._amount = 0;
        if (_this.pointsType === Points.POINTS_TYPE_GHOST_KILL) {
            _this._amount = 200;
        }
        _this._location = _this._wireUp("_location", new _Location2.default(-1, -1));
        _this._pointsState = Points.POINTS_STATE_INVISIBLE;
        _this._fadeTime = (0, _moment2.default)();
        _this._vanishTime = (0, _moment2.default)();
        _this._nextTick = (0, _moment2.default)().add(250, "ms");
        return _this;
    }

    _createClass(Points, [{
        key: "reset",
        value: function reset() {
            var self = this;
            setTimeout(function () {
                self.amount = 200;
                self.location.set(-1, -1);
                self._setValueAndRaiseOnChange("_pointsState", Points.POINTS_STATE_INVISIBLE);
            }, 4000);
        }
    }, {
        key: "removeAllCallbacks",
        value: function removeAllCallbacks() {
            _get(Points.prototype.__proto__ || Object.getPrototypeOf(Points.prototype), "removeAllCallbacks", this).call(this);
        }
    }, {
        key: "timerTick",
        value: function timerTick(e) {
            var now = (0, _moment2.default)();
            var toRet = false;

            if (now >= this._nextTick) {
                if (this._vanishTime <= now) {
                    this._setValueAndRaiseOnChange("_pointsState", Points.POINTS_STATE_INVISIBLE);
                    // console.log("timerTick - invisible");
                } else if (this._fadeTime <= now) {
                    this._setValueAndRaiseOnChange("_pointsState", Points.POINTS_STATE_FADE);
                    // console.log("timerTick - fade");
                } else {
                    this._setValueAndRaiseOnChange("_pointsState", Points.POINTS_STATE_VISIBLE);
                    // console.log("timerTick - visible");
                }

                this._nextTick = (0, _moment2.default)().add(250, "ms");
                toRet = true;
            }

            return toRet;
        }
    }, {
        key: "show",
        value: function show(theLocation) {
            var now = (0, _moment2.default)();
            this._fadeTime = now.clone().add(2, "s");
            this._vanishTime = now.clone().add(4, "s");
            this.location.setWithLocation(theLocation);
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            // this._resetFadeTime();
            _get(Points.prototype.__proto__ || Object.getPrototypeOf(Points.prototype), "_nestedDataSourceChanged", this).call(this, e);
        }
    }, {
        key: "pointsType",
        get: function get() {
            return this._pointsType;
        }
    }, {
        key: "amount",
        get: function get() {
            return this._amount;
        },
        set: function set(value) {
            if (value < 0) {
                throw new Error("Points should be positive");
            }

            // this._resetFadeTime();
            this._setValueAndRaiseOnChange("_amount", value);
        }
    }, {
        key: "location",
        get: function get() {
            return this._location;
        }
    }, {
        key: "pointsState",
        get: function get() {
            return this._pointsState;
        }
    }]);

    return Points;
}(_DataSourceBase3.default);

exports.default = Points;