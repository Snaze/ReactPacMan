"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var EasingFunctions = function () {
    function EasingFunctions() {
        _classCallCheck(this, EasingFunctions);
    }

    _createClass(EasingFunctions, null, [{
        key: "linear",

        // no easing, no acceleration
        value: function linear(t) {
            return t;
        }

        // accelerating from zero velocity

    }, {
        key: "easeInQuad",
        value: function easeInQuad(t) {
            return t * t;
        }

        // decelerating to zero velocity

    }, {
        key: "easeOutQuad",
        value: function easeOutQuad(t) {
            return t * (2 - t);
        }

        // acceleration until halfway, then deceleration

    }, {
        key: "easeInOutQuad",
        value: function easeInOutQuad(t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // accelerating from zero velocity

    }, {
        key: "easeInCubic",
        value: function easeInCubic(t) {
            return t * t * t;
        }

        // decelerating to zero velocity

    }, {
        key: "easeOutCubic",
        value: function easeOutCubic(t) {
            return --t * t * t + 1;
        }

        // acceleration until halfway, then deceleration

    }, {
        key: "easeInOutCubic",
        value: function easeInOutCubic(t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        // accelerating from zero velocity

    }, {
        key: "easeInQuart",
        value: function easeInQuart(t) {
            return t * t * t * t;
        }

        // decelerating to zero velocity

    }, {
        key: "easeOutQuart",
        value: function easeOutQuart(t) {
            return 1 - --t * t * t * t;
        }

        // acceleration until halfway, then deceleration

    }, {
        key: "easeInOutQuart",
        value: function easeInOutQuart(t) {
            return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        }

        // accelerating from zero velocity

    }, {
        key: "easeInQuint",
        value: function easeInQuint(t) {
            return t * t * t * t * t;
        }

        // decelerating to zero velocity

    }, {
        key: "easeOutQuint",
        value: function easeOutQuint(t) {
            return 1 + --t * t * t * t * t;
        }

        // acceleration until halfway, then deceleration

    }, {
        key: "easeInOutQuint",
        value: function easeInOutQuint(t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
        }

        /**
         * At t = 1, maxValue is returned
         * At t = 0, minValue is returned
         * At t in [0 .. 1], a value between minValue and maxValue is returned
         * @param easingFunction
         * @param t
         * @param minValue
         * @param maxValue
         * @returns {*}
         */

    }, {
        key: "doCalculation",
        value: function doCalculation(easingFunction, t, minValue, maxValue) {
            if (minValue > maxValue) {
                throw new Error("MinValue should be less than max value");
            }

            var newMax = maxValue - minValue;
            // let newMin = 0; // minValue - minValue;

            var newT = easingFunction(t);
            return newT * newMax + minValue;
        }
    }, {
        key: "getTime",
        value: function getTime(minTime, maxTime, currentTime) {
            var invert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (minTime >= maxTime) {
                throw new Error("minTime should be less than maxTime");
            }

            if (currentTime < minTime) {
                throw new Error("currentTime should be >= minTime");
            }

            if (currentTime > maxTime) {
                throw new Error("currentTime should be <= maxTime");
            }

            var newMax = maxTime - minTime;
            var newCurrentTime = currentTime - minTime;
            // let newMin = 0; // minTime - minTime

            var toRet = newCurrentTime / newMax;
            if (!invert) {
                return toRet;
            }

            return 1.0 - toRet;
        }
    }]);

    return EasingFunctions;
}();

exports.default = EasingFunctions;