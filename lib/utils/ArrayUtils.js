"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("./Assert");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayUtils = function () {
    function ArrayUtils() {
        _classCallCheck(this, ArrayUtils);
    }

    _createClass(ArrayUtils, null, [{
        key: "getColumn",
        value: function getColumn(array2D, colIndex) {
            var toRet = [];

            for (var y = 0; y < array2D.length; y++) {
                toRet.push(array2D[y][colIndex]);
            }

            return toRet;
        }
    }, {
        key: "setColumn",
        value: function setColumn(array2D, column, colIndex) {

            (0, _Assert.assert)(array2D.length === column.length);

            for (var y = 0; y < array2D.length; y++) {
                array2D[y][colIndex] = column[y];
            }
        }
    }, {
        key: "forEachColumn",
        value: function forEachColumn(array2D, callback) {

            for (var colIndex = 0; colIndex < array2D[0].length; colIndex++) {
                var currentColumn = ArrayUtils.getColumn(array2D, colIndex);
                callback(currentColumn, colIndex);
            }
        }
    }, {
        key: "transpose",
        value: function transpose(array2D) {
            var toRet = [];

            ArrayUtils.forEachColumn(array2D, function (column) {
                toRet.push(column);
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
    }, {
        key: "create1D",
        value: function create1D(length) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var toRet = [];

            for (var i = 0; i < length; i++) {
                toRet.push(value);
            }

            return toRet;
        }
    }, {
        key: "height",
        value: function height(array2D) {
            return array2D.length;
        }
    }, {
        key: "width",
        value: function width(array2D) {
            if (array2D && array2D.length > 0) {
                return array2D[0].length;
            }

            return 0;
        }

        /**
         * This will return an array containing the numbers 0 to (length - 1)
         *
         * @param length The length of the range array
         */

    }, {
        key: "range",
        value: function range(length) {
            var toRet = [];

            for (var i = 0; i < length; i++) {
                toRet.push(i);
            }

            return toRet;
        }

        /**
         * Returns a shuffle version of the array
         *
         * @param toShuffle
         */

    }, {
        key: "shuffle",
        value: function shuffle(toShuffle) {
            var toRet = toShuffle.slice(0);

            for (var i = toRet.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                var _ref = [toRet[j], toRet[i - 1]];
                toRet[i - 1] = _ref[0];
                toRet[j] = _ref[1];
            }

            return toRet;
        }

        /**
         * This method will extract a number samples from an array
         * @param toSample {Array} This is the array you wish to sample from.
         * @param numToSample {Number} This is the number of elements you wish to sample.
         * @param replacement {Boolean} True if the same element can be sampled twice.  False o/w
         * @param sampleUpToIndex {Number} This number designates indicates an exclusive index
         * at which you want to stop sampling.  If replacement is false, this number must be greater
         * than or equal numToSample.
         * @returns {Array} This array should contain the samples.
         */

    }, {
        key: "sample",
        value: function sample(toSample, numToSample) {
            var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var sampleUpToIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


            var toRet = [];

            if (sampleUpToIndex === null) {
                sampleUpToIndex = toSample.length;
            }

            (0, _Assert.assert)(sampleUpToIndex <= toSample.length, "Invalid sampleUpToIndex");

            if (replacement) {

                for (var i = 0; i < numToSample; i++) {
                    var randomIndex = Math.floor(Math.random() * sampleUpToIndex);
                    toRet.push(toSample[randomIndex]);
                }
            } else {
                (0, _Assert.assert)(sampleUpToIndex >= numToSample, "Cannot sample more than array length if replacement is false");

                var range = ArrayUtils.range(sampleUpToIndex);
                var shuffledRange = ArrayUtils.shuffle(range);

                for (var _i = 0; _i < numToSample; _i++) {
                    var _randomIndex = shuffledRange[_i];
                    toRet.push(toSample[_randomIndex]);
                }
            }

            return toRet;
        }
    }, {
        key: "take",
        value: function take(theArray, numToTake) {
            var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            (0, _Assert.assert)(fromIndex < theArray.length);

            var toRet = [];

            for (var i = fromIndex; i < theArray.length; i++) {
                toRet.push(theArray[i]);
                if (toRet.length >= numToTake) {
                    break;
                }
            }

            return toRet;
        }
    }, {
        key: "selectByIndices",
        value: function selectByIndices(theArray, indicesToSelect) {
            (0, _Assert.assert)(theArray.length >= indicesToSelect.length);

            var toRet = [];

            for (var i = 0; i < indicesToSelect.length; i++) {
                toRet.push(theArray[indicesToSelect[i]]);
            }

            return toRet;
        }
    }, {
        key: "selectIndices",
        value: function selectIndices(theArray, filterFunction) {
            var toRet = [];

            for (var i = 0; i < theArray.length; i++) {
                if (filterFunction(theArray[i])) {
                    toRet.push(i);
                }
            }

            return toRet;
        }
    }, {
        key: "elementWiseMatrixMultiply",
        value: function elementWiseMatrixMultiply(array2D_1, array2D_2) {

            (0, _Assert.assert)(array2D_1.length === array2D_2.length);
            (0, _Assert.assert)(array2D_1[0].length === array2D_2[0].length);

            var toRet = [];

            for (var y = 0; y < array2D_1.length; y++) {

                toRet[y] = [];

                for (var x = 0; x < array2D_1[y].length; x++) {
                    toRet[y][x] = array2D_1[y][x] * array2D_2[y][x];
                }
            }

            return toRet;
        }
    }, {
        key: "copyInto",
        value: function copyInto(sourceArray, destArray) {

            for (var i = 0; i < sourceArray.length; i++) {
                destArray[i] = sourceArray[i];
            }
        }
    }, {
        key: "flatten",
        value: function flatten(toFlatten) {
            var toRet = [];
            var current = null;
            var nestedArray = null;

            for (var i = 0; i < toFlatten.length; i++) {
                current = toFlatten[i];

                if (current instanceof Array) {
                    nestedArray = ArrayUtils.flatten(current);

                    toRet.push.apply(toRet, nestedArray);
                } else {
                    toRet.push(current);
                }
            }

            return toRet;
        }
    }, {
        key: "arrayEquals",
        value: function arrayEquals(array1, array2) {
            if (array1 === array2) {
                return true;
            }

            if (array1 === null || array2 === null) {
                return false;
            }

            if (array1.length !== array2.length) {
                return false;
            }

            for (var i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: "extend",
        value: function extend(toExtend, toExtendWith, callback) {
            for (var i = 0; i < toExtendWith.length; i++) {
                if (!callback) {
                    toExtend.push(toExtendWith[i]);
                } else {
                    toExtend.push(callback(toExtendWith[i]));
                }
            }

            return toExtend;
        }
    }, {
        key: "filter",
        value: function filter(toFilter, filterFunction) {
            var toRet = [];

            for (var i = 0; i < toFilter.length; i++) {
                if (filterFunction(toFilter[i])) {
                    toRet.push(toFilter[i]);
                }
            }

            return toRet;
        }
    }, {
        key: "arrayApproxEquals",
        value: function arrayApproxEquals(array1, array2) {
            var minDiff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-6;


            (0, _Assert.assert)(array1.length === array2.length);

            for (var i = 0; i < array1.length; i++) {
                if (Math.abs(array1[i] - array2[i]) > minDiff) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: "isIn",
        value: function isIn(array, item) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === item) {
                    return true;
                }
            }

            return false;
        }

        // TODO: This is a little wonky.  Instead of extending to index, shouldn't it be expanding to length?

    }, {
        key: "expand",
        value: function expand(array, index, value) {
            while (array.length <= index) {
                array.push(value);
            }

            return array;
        }
    }, {
        key: "copy",
        value: function copy(array) {
            return array.slice(0);
        }
    }, {
        key: "deepCopy",
        value: function deepCopy(multiDimensionalArray) {
            var toRet = [];
            var current = void 0;

            for (var i = 0; i < multiDimensionalArray.length; i++) {
                current = multiDimensionalArray[i];

                if (current instanceof Array) {
                    var copiedArray = ArrayUtils.deepCopy(current);
                    toRet.push(copiedArray);
                } else {
                    toRet.push(current);
                }
            }

            return toRet;
        }

        /**
         * Remove element at index from the array.  Returns a new modified array
         *
         * @param array
         * @param index
         * @returns {*}
         */

    }, {
        key: "removeByIndex",
        value: function removeByIndex(array, index) {
            array = ArrayUtils.copy(array);
            array.splice(index, 1);
            return array;
        }
    }, {
        key: "select",
        value: function select(array, selectionFunction) {
            var toRet = [];

            for (var i = 0; i < array.length; i++) {
                toRet.push(selectionFunction(array[i]));
            }

            return toRet;
        }
    }, {
        key: "update",
        value: function update(array, updateFunction, filterFunction) {
            (0, _Assert.assert)(!!updateFunction, "You must supply an update function");

            var indicesToUpdate = void 0;
            var currentIndex = void 0;

            if (!!filterFunction) {
                indicesToUpdate = ArrayUtils.selectIndices(array, filterFunction);
            } else {
                indicesToUpdate = ArrayUtils.range(array.length);
            }

            for (var i = 0; i < indicesToUpdate.length; i++) {
                currentIndex = indicesToUpdate[i];

                updateFunction(array[currentIndex], currentIndex);
            }
        }
    }, {
        key: "traverse2D",
        value: function traverse2D(array2D, theFunction) {

            for (var y = 0; y < array2D.length; y++) {
                for (var x = 0; x < array2D[y].length; x++) {
                    theFunction(array2D[y][x]);
                }
            }
        }
    }, {
        key: "distinctIntegers",
        value: function distinctIntegers(array) {
            var temp = {};
            var toRet = [];

            for (var i = 0; i < array.length; i++) {
                temp[array[i]] = true;
            }

            for (var prop in temp) {
                if (temp.hasOwnProperty(prop)) {
                    toRet.push(parseInt(prop, 10));
                }
            }

            return toRet;
        }
    }, {
        key: "arrayIsCloseTo",
        value: function arrayIsCloseTo(array1, array2) {
            var minDistance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-6;

            (0, _Assert.assert)(array2.length === array1.length, "Arrays must be same length");

            for (var i = 0; i < array1.length; i++) {
                var currentDiff = Math.abs(array1[i] - array2[i]);

                if (currentDiff > minDistance) {
                    return false;
                }
            }

            return true;
        }
    }]);

    return ArrayUtils;
}();

exports.default = ArrayUtils;