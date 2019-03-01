"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("../../utils/Assert");

var _math = require("../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtil = function () {
    function MathUtil() {
        _classCallCheck(this, MathUtil);
    }

    _createClass(MathUtil, null, [{
        key: "argMax",
        value: function argMax(theArray) {
            var index = -1;
            var max = Number.NEGATIVE_INFINITY;

            theArray.forEach(function (item, i) {
                if (item > max) {
                    max = item;
                    index = i;
                }
            });

            return index;
        }
    }, {
        key: "getRandomArbitrary",
        value: function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }, {
        key: "distance",
        value: function distance(array1, array2) {
            (0, _Assert.assert)(array1.length === array2.length);

            var diffArray = _math2.default.subtract(array1, array2);
            for (var i = 0; i < diffArray.length; i++) {
                diffArray[i] = _math2.default.pow(diffArray[i], 2);
            }
            var sum = _math2.default.sum(diffArray);
            return _math2.default.sqrt(sum);
        }
    }, {
        key: "clip",
        value: function clip(toClip, minValue, maxValue) {
            if (toClip instanceof Array) {

                for (var i = 0; i < toClip.length; i++) {
                    toClip[i] = MathUtil.clip(toClip[i], minValue, maxValue);
                }

                return toClip;
            }

            if (toClip < minValue) {
                toClip = minValue;
            } else if (toClip > maxValue) {
                toClip = maxValue;
            }

            return toClip;
        }

        /**
         * This method will compute the number of bits required to represent the input decimal value.
         *
         * @param decimalValue {Number} The decimal value you wish to know how many bits are required
         * for it to be represented in binary.  This value must be positive.
         * @returns {Number} The number of bits required to represent the decimal value in binary.
         */

    }, {
        key: "getNumBits",
        value: function getNumBits(decimalValue) {
            (0, _Assert.assert)(decimalValue >= 0, "decimal value must be positive");

            if (decimalValue === 0) {
                return 1;
            }

            return Math.floor(Math.log2(decimalValue)) + 1;
        }

        /**
         * Use this method to compare 2 float values for equality.
         * @param float1 {Number} The first number to compare.
         * @param float2 {Number} The second number to compare.
         * @param minDistance {Number} The minimum distance between float1 and float2 in order to return true.
         * @returns {boolean} Returns true if the 2 numbers are within minDistance of each other.
         */

    }, {
        key: "isClose",
        value: function isClose(float1, float2) {
            var minDistance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-9;

            return Math.abs(float1 - float2) <= minDistance;
        }
    }]);

    return MathUtil;
}();

exports.default = MathUtil;