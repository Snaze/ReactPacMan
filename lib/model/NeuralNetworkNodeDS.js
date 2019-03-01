"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Assert = require("../utils/Assert");

var _NeuralNetworkNode = require("./ai/ann/NeuralNetworkNode");

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

var _math = require("../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ArrayUtils from "../utils/ArrayUtils";


var NeuralNetworkNodeDS = function (_DataSourceBase) {
    _inherits(NeuralNetworkNodeDS, _DataSourceBase);

    function NeuralNetworkNodeDS(neuralNetworkNode) {
        _classCallCheck(this, NeuralNetworkNodeDS);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkNodeDS.__proto__ || Object.getPrototypeOf(NeuralNetworkNodeDS)).call(this));

        _this._neuralNetworkNode = neuralNetworkNode;
        _this._callbackRef = function (e) {
            return _this._callback(e);
        };
        _this._neuralNetworkNode.callback = _this._callbackRef;

        _this._activationInput = _this._neuralNetworkNode.activationInput; // should I clone this?
        _this._output = _this._neuralNetworkNode.output;
        _this._error = _this._neuralNetworkNode.error;
        _this._layerIndex = _this._neuralNetworkNode.layerIndex;
        _this._nodeIndex = _this._neuralNetworkNode.nodeIndex;
        _this._feedForwardExecuting = false;
        _this._backPropExecuting = false;
        _this._animating = false;
        _this._prevInputs = _this._neuralNetworkNode.prevInputs;
        _this._weights = _this._neuralNetworkNode.weights;
        _this._activationFunction = _this._neuralNetworkNode.activationFunction;
        _this._errorHistory = [];
        _this._maxErrorHistoryLength = 10000;
        return _this;
    }

    // TODO: This thing is going to fire a lot.  You may want to make this more performant.


    _createClass(NeuralNetworkNodeDS, [{
        key: "_callback",
        value: function _callback(e) {
            (0, _Assert.assert)(e.source === this._neuralNetworkNode);

            // Limit the updates
            if (e.type !== _NeuralNetworkNode2.default.EVENT_BACK_PROP_COMPLETE) {
                return;
            }

            this._activationInput = this._neuralNetworkNode.activationInput; // should I clone this?
            this._output = this._neuralNetworkNode.output;
            this._error = this._neuralNetworkNode.error;
            this._recordAverageErrorHistory(this._error);

            this._layerIndex = this._neuralNetworkNode.layerIndex;
            this._nodeIndex = this._neuralNetworkNode.nodeIndex;
            this._prevInputs = this._neuralNetworkNode.prevInputs;
            this._weights = this._neuralNetworkNode.weights;
            this._activationFunction = this._neuralNetworkNode.activationFunction;

            this._feedForwardExecuting = e.type === _NeuralNetworkNode2.default.EVENT_FEED_FORWARD_START;
            this._backPropExecuting = e.type === _NeuralNetworkNode2.default.EVENT_BACK_PROP_START;

            // console.log("NeuralNetworkNodeDS callback");
        }
    }, {
        key: "_recordAverageErrorHistory",
        value: function _recordAverageErrorHistory(error) {
            if (this._errorHistory.length >= this._maxErrorHistoryLength) {
                this._errorHistory.shift(); // You may need to find a more performent way to do this
            }

            var averageError = _math2.default.mean(_math2.default.abs(error));

            this._errorHistory.push(averageError);
        }
    }, {
        key: "start",
        value: function start() {
            this.animating = true;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.animating = false;
        }
    }, {
        key: "getActivationInputEquation",
        value: function getActivationInputEquation(index) {
            var numDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

            if (!this.prevInputs || !this.prevInputs[index] || !this.weights) {
                return "";
            }

            if (this.weights.length === 0) {
                (0, _Assert.assert)(this.layerIndex === 0, "weights can only be of length 0 on input layer");
                return this.prevInputs[index][this.nodeIndex].toFixed(numDigits).toString();
            }

            (0, _Assert.assert)(this.prevInputs[index].length === this.weights.length, "Lengths need to match");

            var temp = [];

            this.prevInputs[index].forEach(function (prevInput, i) {
                var toAdd = prevInput.toFixed(numDigits).toString() + " * " + this.weights[i].toFixed(numDigits).toString();
                temp.push(toAdd);
            }.bind(this));

            return temp.join(" + ");
        }
    }, {
        key: "backPropComplete",
        value: function backPropComplete() {
            this._raiseOnChangeCallbacks("_neuralNetworkNode", null, this._neuralNetworkNode);
        }
    }, {
        key: "errorHistory",
        get: function get() {
            return this._errorHistory;
        }
    }, {
        key: "activationInput",
        get: function get() {
            return this._activationInput;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_activationInput", value);
        }
    }, {
        key: "output",
        get: function get() {
            return this._output;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_output", value);
        }
    }, {
        key: "error",
        get: function get() {
            return this._error;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_error", value);
        }
    }, {
        key: "layerIndex",
        get: function get() {
            return this._layerIndex;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_layerIndex", value);
        }
    }, {
        key: "nodeIndex",
        get: function get() {
            return this._nodeIndex;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_nodeIndex", value);
        }
    }, {
        key: "feedForwardExecuting",
        get: function get() {
            return this._feedForwardExecuting;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_feedForwardExecuting", value);
        }
    }, {
        key: "backPropExecuting",
        get: function get() {
            return this._backPropExecuting;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_backPropExecuting", value);
        }
    }, {
        key: "animating",
        get: function get() {
            return this._animating;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_animating", value);
        }
    }, {
        key: "prevInputs",
        get: function get() {
            return this._prevInputs;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_prevInputs", value);
        }
    }, {
        key: "weights",
        get: function get() {
            return this._weights;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_weights", value);
        }
    }, {
        key: "activationFunction",
        get: function get() {
            return this._activationFunction;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_activationFunction", value);
        }
    }, {
        key: "maxActivationInput",
        get: function get() {
            if (!this.activationInput || this.activationInput.length < 0) {
                return null;
            }

            return _math2.default.max(_math2.default.ceil(_math2.default.abs(this.activationInput)));
        }
    }]);

    return NeuralNetworkNodeDS;
}(_DataSourceBase3.default);

exports.default = NeuralNetworkNodeDS;