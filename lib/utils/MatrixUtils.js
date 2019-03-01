"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import GPU from "../../node_modules/gpu.js/src/gpu";


var _Assert = require("./Assert");

var _ArrayUtils = require("./ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MatrixUtils = function () {
    function MatrixUtils() {
        _classCallCheck(this, MatrixUtils);
    }

    _createClass(MatrixUtils, null, [{
        key: "is2D",


        /**
         * This will return true if the array passed in is a 2D array.
         * @param array {Array}
         * @returns {Boolean} true if array is 2D
         */
        value: function is2D(array) {
            if (!(array instanceof Array)) {
                return false;
            }

            if (array.length <= 0) {
                return false;
            }

            return array[0] instanceof Array;
        }

        /**
         * Return true if this is a 1D array.
         * @param array {Array}
         * @returns {boolean}
         */

    }, {
        key: "is1D",
        value: function is1D(array) {
            if (!array instanceof Array) {
                return false;
            }

            if (array.length <= 0) {
                return false;
            }

            return !(array[0] instanceof Array);
        }
    }, {
        key: "convertTo2D",
        value: function convertTo2D(array) {
            if (MatrixUtils.is2D(array)) {
                return _ArrayUtils2.default.deepCopy(array);
            }

            (0, _Assert.assert)(MatrixUtils.is1D(array), "Array must be 1D if not 2D");

            var toRet = [];

            array.forEach(function (item, index) {
                toRet[index] = [item];
            });

            return toRet;
        }
    }, {
        key: "create",
        value: function create(height, width) {
            var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var toRet = [];

            for (var y = 0; y < height; y++) {
                toRet[y] = [];

                for (var x = 0; x < width; x++) {
                    toRet[y][x] = value;
                }
            }

            return toRet;
        }

        /**
         * This method should convert a 1D array into a Diagonal Matrix
         * @param array1D {Array} 1D array which represents the diagonal.
         * @returns {Array} 2D Array of all zeros and the 1D diagonal.
         */

    }, {
        key: "toDiagonal",
        value: function toDiagonal(array1D) {
            var toRet = [];
            var length = array1D.length;
            var currentArray = void 0;

            array1D.forEach(function (item, index) {
                currentArray = _ArrayUtils2.default.create1D(length, 0);
                currentArray[index] = item;
                toRet.push(currentArray);
            });

            return toRet;
        }

        /**
         * This will modify array2D and remove the last column
         * @param array2D {Array} The array2D you wish to remove a column from.
         */

    }, {
        key: "popColumn",
        value: function popColumn(array2D) {
            (0, _Assert.assert)(array2D.length > 0 && array2D[0].length > 0, "Invalid array2d");

            array2D.forEach(function (row) {
                row.pop();
            });
        }
    }]);

    return MatrixUtils;
}();

exports.default = MatrixUtils;