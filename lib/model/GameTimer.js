"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Eventer = require("../utils/Eventer");

var _Eventer2 = _interopRequireDefault(_Eventer);

var _moment = require("../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _singleton = Symbol();

var tickFrequency = 5;

var time_25ms = 0;
var time_50ms = 1;
var time_100ms = 2;
var time_250ms = 3;
var time_500ms = 4;
var time_1000ms = 5;

// const time_250ms = 0;
// const time_500ms = 1;
// const time_1000ms = 2;

var GameTimer = function () {
    _createClass(GameTimer, null, [{
        key: "TIME_25MS",
        get: function get() {
            return time_25ms;
        }
    }, {
        key: "TIME_50MS",
        get: function get() {
            return time_50ms;
        }
    }, {
        key: "TIME_100MS",
        get: function get() {
            return time_100ms;
        }
    }, {
        key: "TIME_250MS",
        get: function get() {
            return time_250ms;
        }
    }, {
        key: "TIME_500MS",
        get: function get() {
            return time_500ms;
        }
    }, {
        key: "TIME_1000MS",
        get: function get() {
            return time_1000ms;
        }
    }]);

    function GameTimer(singletonToken) {
        var _this = this;

        _classCallCheck(this, GameTimer);

        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        if (typeof document !== "undefined") {
            this._interval = setInterval(function (e) {
                return _this.intervalTick(e);
            }, tickFrequency);
        }
        var now = (0, _moment2.default)();
        this._stepDetails = [{
            stepNumber: 0,
            increment: 25,
            nextTime: now.clone().add(25, 'ms')
        }, {
            stepNumber: 0,
            increment: 50,
            nextTime: now.clone().add(50, 'ms')
        }, {
            stepNumber: 0,
            increment: 100,
            nextTime: now.clone().add(100, 'ms')
        }, {
            stepNumber: 0,
            increment: 250,
            nextTime: now.clone().add(250, 'ms')
        }, {
            stepNumber: 0,
            increment: 500,
            nextTime: now.clone().add(500, 'ms')
        }, {
            stepNumber: 0,
            increment: 1000,
            nextTime: now.clone().add(1000, 'ms')
        }];

        this._steps = [0, 0, 0, 0, 0, 0];
        this._eventer = new _Eventer2.default();
        this._tickFinishedEventer = new _Eventer2.default();
        this._intervalEventers = {};
    }

    _createClass(GameTimer, [{
        key: "intervalTick",
        value: function intervalTick(e) {
            var now = (0, _moment2.default)();
            var current = null;

            for (var i = 0; i < this._stepDetails.length; i++) {
                current = this._stepDetails[i];

                if (now.isAfter(current.nextTime)) {
                    current.stepNumber += 1;
                    this._steps[i] += 1;
                    current.nextTime = now.clone().add(current.increment, 'ms');
                }
            }

            // LEAVE THIS COMMENT IN HERE.  YOU MAY WANT THIS AT SOME POINT
            // this._iterateOverIntervalEventer(function (intervalObject) {
            //     if (now >= intervalObject.nextTime) {
            //         intervalObject.eventer.raiseEvent(this);
            //         intervalObject.tickFinishedEventer.raiseEvent(this);
            //         intervalObject.nextTime = moment().add(intervalObject.timeInMilliSec, "ms");
            //     }
            // });

            this._eventer.raiseEvent(this._steps);
            this._tickFinishedEventer.raiseEvent(this);
        }
    }, {
        key: "getStepNumber",
        value: function getStepNumber(timeIndex) {
            return this._stepDetails[timeIndex].stepNumber;
        }
    }, {
        key: "addCallback",
        value: function addCallback(theCallback) {
            this._eventer.addCallback(theCallback);
        }
    }, {
        key: "addTickFinishedCallback",
        value: function addTickFinishedCallback(theCallback) {
            this._tickFinishedEventer.addCallback(theCallback);
        }
    }, {
        key: "addIntervalCallback",
        value: function addIntervalCallback(theCallback, timeInMilliSec) {
            this._createIntervalEventer(timeInMilliSec);

            this._intervalEventers[timeInMilliSec].eventer.addCallback(theCallback);
        }
    }, {
        key: "addTickFinishedIntervalCallback",
        value: function addTickFinishedIntervalCallback(theCallback, timeInMilliSec) {
            this._createIntervalEventer(timeInMilliSec);
            this._intervalEventers[timeInMilliSec].tickFinishedEventer.addCallback(theCallback);
        }
    }, {
        key: "_createIntervalEventer",
        value: function _createIntervalEventer(timeInMilliSec) {
            if (typeof this._intervalEventers[timeInMilliSec] === "undefined") {
                this._intervalEventers[timeInMilliSec] = {
                    timeInMilliSec: timeInMilliSec,
                    nextTime: (0, _moment2.default)().add(timeInMilliSec, "ms"),
                    eventer: new _Eventer2.default(),
                    tickFinishedEventer: new _Eventer2.default()
                };
            }
        }
    }, {
        key: "removeIntervalCallback",
        value: function removeIntervalCallback(theCallback, timeInMilliSec) {
            this._intervalEventers[timeInMilliSec].eventer.removeCallback(theCallback);
        }
    }, {
        key: "removeTickFinishedIntervalCallback",
        value: function removeTickFinishedIntervalCallback(theCallback, timeInMilliSec) {
            this._intervalEventers[timeInMilliSec].tickFinishedEventer.removeCallback(theCallback);
        }
    }, {
        key: "removeCallback",
        value: function removeCallback(theCallback) {
            this._eventer.removeCallback(theCallback);
        }
    }, {
        key: "removeTickCallback",
        value: function removeTickCallback(theCallback) {
            this._tickFinishedEventer.removeCallback();
        }
    }, {
        key: "removeAllCallbacks",
        value: function removeAllCallbacks() {
            this._eventer.removeAllCallbacks();
            this._tickFinishedEventer.removeAllCallbacks();
            this._iterateOverIntervalEventer(function (intervalObject) {
                intervalObject.eventer.removeAllCallbacks();
                intervalObject.tickFinishedEventer.removeAllCallbacks();
            });
        }
    }, {
        key: "_iterateOverIntervalEventer",
        value: function _iterateOverIntervalEventer(callback) {
            for (var prop in this._intervalEventers) {
                if (this._intervalEventers.hasOwnProperty(prop)) {
                    callback(this._intervalEventers[prop]);
                }
            }
        }
    }], [{
        key: "instance",
        get: function get() {
            if (!this[_singleton]) {
                this[_singleton] = new GameTimer(_singleton);
            }

            return this[_singleton];
        }
    }]);

    return GameTimer;
}();

exports.default = GameTimer;