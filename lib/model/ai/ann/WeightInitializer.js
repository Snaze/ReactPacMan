"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Assert = require("../../../utils/Assert");

var _MathUtil = require("../MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

var _math = require("../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

var _randgen = require("../../../../node_modules/randgen/lib/randgen");

var _randgen2 = _interopRequireDefault(_randgen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fan_in_fan_out = 0;
var generic_normal = 1;
var compressed_normal = 2;
var valid = [fan_in_fan_out, generic_normal, compressed_normal];

var WeightInitializer = function () {
    _createClass(WeightInitializer, null, [{
        key: "FAN_IN_FAN_OUT",
        get: function get() {
            return fan_in_fan_out;
        }
    }, {
        key: "GENERIC_NORMAL",
        get: function get() {
            return generic_normal;
        }
    }, {
        key: "COMPRESSED_NORMAL",
        get: function get() {
            return compressed_normal;
        }
    }, {
        key: "ALL",
        get: function get() {
            return valid;
        }
    }]);

    function WeightInitializer(activationFunction, initializationType) {
        var fanInCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var fanOutCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, WeightInitializer);

        (0, _Assert.assert)(_ArrayUtils2.default.isIn(_ActivationFunctions2.default.all, activationFunction), "Invalid activation function");
        (0, _Assert.assert)(_ArrayUtils2.default.isIn(valid, initializationType), "Invalid initialization type");
        // assert (fanInCount >= 0, "fanInCount must be >= 0");
        // assert (fanOutCount >= 0, "fanOutCount must be >= 0");

        this._activationFunction = activationFunction;
        this._initializationType = initializationType;
        this._fanInCount = fanInCount;
        this._fanOutCount = fanOutCount;
    }

    _createClass(WeightInitializer, [{
        key: "_createFanInFanOutWeight",
        value: function _createFanInFanOutWeight() {
            var fanInCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var fanOutCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var randomNum = null;
            var randomWeight = null;

            if (fanInCount === null) {
                fanInCount = this.fanInCount;
            }

            if (fanOutCount === null) {
                fanOutCount = this.fanOutCount;
            }

            switch (this.activationFunction) {
                case _ActivationFunctions2.default.relu:
                case _ActivationFunctions2.default.lrelu:
                case _ActivationFunctions2.default.identity:
                    randomNum = _math2.default.sqrt(_math2.default.divide(12, _math2.default.add(fanInCount, fanOutCount)));
                    randomWeight = _MathUtil2.default.getRandomArbitrary(-randomNum, randomNum);
                    break;
                case _ActivationFunctions2.default.tanh:
                    randomNum = _math2.default.sqrt(_math2.default.divide(6, _math2.default.add(fanInCount, fanOutCount)));
                    randomWeight = _MathUtil2.default.getRandomArbitrary(-randomNum, randomNum);
                    break;
                case _ActivationFunctions2.default.sigmoid:
                    randomNum = _math2.default.multiply(4, _math2.default.sqrt(_math2.default.divide(6, _math2.default.add(fanInCount, fanOutCount))));
                    randomWeight = _MathUtil2.default.getRandomArbitrary(-randomNum, randomNum);
                    break;
                default:
                    throw new Error("Unknown Activation Function");
            }

            return randomWeight;
        }
    }, {
        key: "_createGenericNormal",
        value: function _createGenericNormal() {
            return _randgen2.default.rnorm(0.0, 1.0);
        }
    }, {
        key: "_createCompressedNormal",
        value: function _createCompressedNormal() {
            var fanInCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (fanInCount === null) {
                fanInCount = this.fanInCount;
            }

            // if (fanOutCount === null) {
            //     fanOutCount = this.fanOutCount;
            // }

            var std = _math2.default.divide(1, _math2.default.sqrt(fanInCount));
            return _randgen2.default.rnorm(0.0, std);
        }
    }, {
        key: "createRandomWeight",
        value: function createRandomWeight() {
            var fanIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var fanOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            switch (this.initializationType) {
                case fan_in_fan_out:
                    return this._createFanInFanOutWeight(fanIn, fanOut);
                case generic_normal:
                    return this._createGenericNormal(fanIn, fanOut);
                case compressed_normal:
                    return this._createCompressedNormal(fanIn, fanOut);
                default:
                    throw new Error("Invalid Initialization Type");
            }
        }
    }, {
        key: "initializationType",
        get: function get() {
            return this._initializationType;
        }
    }, {
        key: "activationFunction",
        get: function get() {
            return this._activationFunction;
        }
    }, {
        key: "fanInCount",
        get: function get() {
            return this._fanInCount;
        }
    }, {
        key: "fanOutCount",
        get: function get() {
            return this._fanOutCount;
        }
    }]);

    return WeightInitializer;
}();

exports.default = WeightInitializer;