"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _Assert = require("./Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type_start = 0;
var type_end = 1;

var instance = null;

/**
 * Use this class to see how long certain things are taking to run.
 *
 * This class is a singleton.
 */

var TimeRecorder = function () {

    /**
     * The constructor of the TimeRecorder object.
     * @constructor
     */
    function TimeRecorder() {
        _classCallCheck(this, TimeRecorder);

        if (instance !== null) {
            return instance;
        }

        instance = this;

        this._cache = {};

        return instance;
    }

    /**
     * Use this method to pull the data object out of the cache.
     * @param key {string} This is the cache key to use.
     * @returns {*} The cache object.
     * @private
     */


    _createClass(TimeRecorder, [{
        key: "_getCacheObject",
        value: function _getCacheObject(key) {
            if (!(key in this._cache)) {
                this._cache[key] = {
                    type: type_end,
                    startTime: null,
                    endTime: null,
                    avgDuration: null,
                    minDuration: null,
                    maxDuration: null,
                    numIterations: 0
                };
            }

            return this._cache[key];
        }
    }, {
        key: "logSummary",
        value: function logSummary() {
            var cacheObject = void 0;

            Object.keys(this._cache).forEach(function (key) {
                cacheObject = this._cache[key];

                console.log("---------------- START " + key + " -----------------");
                console.log("Duration (avg): " + cacheObject.avgDuration + " ms");
                console.log("Duration (min): " + cacheObject.minDuration + " ms");
                console.log("Duration (max): " + cacheObject.maxDuration + " ms");
                console.log("Iterations    : " + cacheObject.numIterations);
                console.log("----------------- END " + key + " ------------------");
                console.log("\n");
            }.bind(this));
        }

        /**
         * Use this method to start timing an event.
         * @param key {string} the string that identitifies the event.
         */

    }, {
        key: "recordStart",
        value: function recordStart(key) {
            var now = (0, _moment2.default)();

            var cacheObj = this._getCacheObject(key);

            (0, _Assert.assert)(cacheObj.type === type_end, "You are calling these methods out of sync");

            cacheObj.type = type_start;
            cacheObj.startTime = now;
        }

        /**
         * Use this method to stop timing the event.
         * @param key {string} this string identifies the event you wish to stop timing.
         */

    }, {
        key: "recordEnd",
        value: function recordEnd(key) {
            var now = (0, _moment2.default)();

            var cacheObj = this._getCacheObject(key);

            (0, _Assert.assert)(cacheObj.type === type_start, "You are calling these methods out of sync");

            cacheObj.numIterations++;
            cacheObj.endTime = now;
            cacheObj.type = type_end;

            var duration = now.diff(cacheObj.startTime);
            if (cacheObj.avgDuration === null) {
                cacheObj.avgDuration = duration;
            } else {
                // CALCULATE AVG
                cacheObj.avgDuration += (duration - cacheObj.avgDuration) / cacheObj.numIterations;
            }

            if (cacheObj.minDuration === null) {
                cacheObj.minDuration = duration;
            } else {
                if (duration < cacheObj.minDuration) {
                    cacheObj.minDuration = duration;
                }
            }

            if (cacheObj.maxDuration === null) {
                cacheObj.maxDuration = duration;
            } else {
                if (duration > cacheObj.maxDuration) {
                    cacheObj.maxDuration = duration;
                }
            }
        }
    }]);

    return TimeRecorder;
}();

exports.default = TimeRecorder;