"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MathUtil = require("../MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Use this class to perform Lahiri Sampling on a collection.  Note, you will need to manage
 * this collection in a separate location and log changes to this class.  This could be better, I must admit.
 */
var LahiriSampler = function () {

    /**
     * This is the constructor of the Lahiri Sampler.
     * @constructor
     */
    function LahiriSampler() {
        _classCallCheck(this, LahiriSampler);

        this._max = Number.NEGATIVE_INFINITY;
        this._prevMax = [];
    }

    /**
     * Use this method to record changes to the underlying array and record the max value.
     * @param possibleMax {Number} The number that could potentially be the max value.
     */


    _createClass(LahiriSampler, [{
        key: "setMaxIfMax",
        value: function setMaxIfMax(possibleMax) {
            if (possibleMax > this._max && Number.isFinite(possibleMax) && possibleMax > 0) {
                this._prevMax.push(this._max);
                this._max = possibleMax;
            }
        }

        /**
         * If an item is removed from the collection that could be potentially be the max,
         * call this method.
         * @param possibleMax {Number} This is the potential max value.
         * @param minDistance {Number} This is the min distance between possibleMax and the actual max
         * for them to be considered equal.
         */

    }, {
        key: "removeMaxIfMax",
        value: function removeMaxIfMax(possibleMax) {
            var minDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-9;

            if (_MathUtil2.default.isClose(this._max, possibleMax, minDistance)) {
                if (this._prevMax.length > 0) {
                    this._max = this._prevMax.pop();
                } else {
                    this._max = Number.NEGATIVE_INFINITY;
                }
            }
        }

        /**
         * This method sample "sampleSize" elements from the array.
         *
         * @param array {Array} The array to sample from.
         * @param valueProperty {String} The name of the property that contains the value to compare.  If this is
         * null it is assumed that the array contains primitive Numbers.
         * @param sampleSize {Number} The number of items to sample from array.
         * @returns {Array} Returns an array of random samples based on Lihiri's Method.
         */

    }, {
        key: "sample",
        value: function sample(array) {
            var valueProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var sampleSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

            var toRet = [];

            var n = array.length;
            // If the max is not finite, lets just select the first 10 random values.
            var m = Number.isFinite(this._max) && this._max > 0 ? this._max : 1000000;

            // i = random array index
            // j = random number from 0 to max value
            // x_i = the value of the ith element
            var i = void 0,
                j = void 0,
                x_i = void 0,
                arrayItem = void 0;

            while (toRet.length < sampleSize) {
                i = Math.floor(Math.random() * n); // This is an array index (so we floor)
                j = Math.random() * m; // This is a real value so no floor
                arrayItem = array[i];

                if (arrayItem === null) {
                    continue;
                }

                if (valueProperty === null || !(arrayItem instanceof Object)) {
                    x_i = arrayItem;
                } else if (arrayItem !== null) {
                    x_i = arrayItem[valueProperty];
                }

                // When x_i is less than 0, it hasn't been initialized yet so we
                // will just add it as a valid sample.  The TD Error will be updated
                // on the next pass in the Deep Q Learner.
                if (x_i <= 0 || j < x_i) {
                    toRet.push(arrayItem);
                }
            }

            return toRet;
        }

        /**
         * This is the current "max" value.
         * @returns {Number}
         */

    }, {
        key: "max",
        get: function get() {
            return this._max;
        }

        /**
         * This is a stack of the previous "max" values.
         * @returns {Array}
         */

    }, {
        key: "prevMax",
        get: function get() {
            return this._prevMax;
        }
    }]);

    return LahiriSampler;
}();

exports.default = LahiriSampler;