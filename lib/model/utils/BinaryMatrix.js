"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConvertBase = require("../../utils/ConvertBase");

var _ConvertBase2 = _interopRequireDefault(_ConvertBase);

var _lodash = require("../../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryMatrix = function () {
    function BinaryMatrix(binStrMatrix) {
        var headerBufferLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        _classCallCheck(this, BinaryMatrix);

        this._headerBufferLength = headerBufferLength;
        this._height = binStrMatrix.length;
        this._width = binStrMatrix[0].length;

        var header = BinaryMatrix.createHeader(headerBufferLength);

        this._binStrMatrix = _lodash2.default.concat(header, _lodash2.default.flattenDeep(binStrMatrix));
        this._numMatrix = BinaryMatrix.createNumericMatrix(this._binStrMatrix);
        this._prevState = {};
    }

    _createClass(BinaryMatrix, [{
        key: "getIndex",
        value: function getIndex(x, y) {
            return this._headerBufferLength + y * this._width + x;
        }
    }, {
        key: "getDecimalValue",
        value: function getDecimalValue(x, y) {
            var index = this.getIndex(x, y);

            return this._numMatrix[index];
        }
    }, {
        key: "getBinaryValue",
        value: function getBinaryValue(x, y) {
            var index = this.getIndex(x, y);

            return this._binStrMatrix[index];
        }
    }, {
        key: "setBinaryHeaderValue",
        value: function setBinaryHeaderValue(index, value) {
            if (index >= this._headerBufferLength) {
                throw new Error("Invalid header index");
            }

            this._binStrMatrix[index] = value;
            var decimalValue = _ConvertBase2.default.bin2dec(value);
            this._numMatrix[index] = parseInt(decimalValue, 10);
        }
    }, {
        key: "_setBinaryValue",
        value: function _setBinaryValue(x, y, value) {
            var index = this.getIndex(x, y);

            this._binStrMatrix[index] = value;
            var decimalValue = _ConvertBase2.default.bin2dec(value);
            this._numMatrix[index] = parseInt(decimalValue, 10);
        }
    }, {
        key: "_setBinaryValueAtLocation",
        value: function _setBinaryValueAtLocation(location, index, value) {
            var origBinValue = this.getBinaryValue(location.x, location.y);
            var toggledBinValue = BinaryMatrix.setStringCharAtIndex(origBinValue, index, value);
            this._setBinaryValue(location.x, location.y, toggledBinValue);
        }

        /**
         * This will set a binary value at the specified grid location
         *
         * @param prevName the name used to store a prev location.  This value will get unset the next
         * time you call this method.  Pass null or false if you don't want to use this functionality.
         * @param location The location in the matrix
         * @param index The index of the binary string you wish to update
         * @param value The value you wish to set.  "0" or "1"
         */

    }, {
        key: "setBinaryValueAtLocation",
        value: function setBinaryValueAtLocation(prevName, location, index, value) {
            if (!!prevName && prevName in this._prevState && this._prevState[prevName].isValid) {
                var prevLoc = this._prevState[prevName];
                this._setBinaryValueAtLocation(prevLoc, index, "0");
            }

            if (location.isValid) {
                this._setBinaryValueAtLocation(location, index, value);
            }

            if (!this._prevState[prevName]) {
                this._prevState[prevName] = location.clone();
            } else {
                this._prevState[prevName].setWithLocation(location);
            }
        }

        /**
         * This returns the numeric matrix as a single flattened array
         *
         * @returns {*}
         */

    }, {
        key: "numMatrix",
        get: function get() {
            return this._numMatrix;
        }
    }], [{
        key: "createHeader",
        value: function createHeader(headerBufferLength) {
            var toRet = [];

            for (var i = 0; i < headerBufferLength; i++) {
                toRet.push("0");
            }

            return toRet;
        }
    }, {
        key: "createNumericMatrix",
        value: function createNumericMatrix(flattenedStrMatrix) {

            var toRet = [];
            var decimalString = null;

            for (var i = 0; i < flattenedStrMatrix.length; i++) {
                decimalString = _ConvertBase2.default.bin2dec(flattenedStrMatrix[i]);
                toRet[i] = parseInt(decimalString, 10);
            }

            return toRet;
        }
    }, {
        key: "setStringCharAtIndex",
        value: function setStringCharAtIndex(theString, theIndex, theValue) {
            var theStringArray = theString.split("");
            theStringArray[theIndex] = theValue;
            return theStringArray.join("");
        }
    }]);

    return BinaryMatrix;
}();

exports.default = BinaryMatrix;