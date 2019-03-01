"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("../../../utils/Assert");

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _math = require("../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _LearningRate = require("./LearningRate");

var _LearningRate2 = _interopRequireDefault(_LearningRate);

var _BackPropFactory = require("./backprop/BackPropFactory");

var _BackPropFactory2 = _interopRequireDefault(_BackPropFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var event_feed_forward_start = 0;
var event_feed_forward_complete = 1;
var event_back_prop_start = 2;
var event_back_prop_complete = 3;

var NeuralNetworkNode = function () {
    _createClass(NeuralNetworkNode, null, [{
        key: "EVENT_FEED_FORWARD_START",
        get: function get() {
            return event_feed_forward_start;
        }
    }, {
        key: "EVENT_FEED_FORWARD_COMPLETE",
        get: function get() {
            return event_feed_forward_complete;
        }
    }, {
        key: "EVENT_BACK_PROP_START",
        get: function get() {
            return event_back_prop_start;
        }
    }, {
        key: "EVENT_BACK_PROP_COMPLETE",
        get: function get() {
            return event_back_prop_complete;
        }
    }]);

    function NeuralNetworkNode(layerIndex, nodeIndex, edgeStore, numWeights) {
        var includeBias = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var activationFunction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _ActivationFunctions2.default.sigmoid;
        var callback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
        var backPropType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _BackPropFactory2.default.BACK_PROP_TYPE_SGD;

        _classCallCheck(this, NeuralNetworkNode);

        this._layerIndex = layerIndex;
        this._nodeIndex = nodeIndex;
        this._edgeStore = edgeStore;
        this._numWeights = numWeights;
        this._includeBias = includeBias;
        this._activationFunction = activationFunction;
        this._output = null;
        this._activationInput = null;
        this._error = null;
        this._learningRate = new _LearningRate2.default(1.0, 0.01, 100);
        this._prevInputs = null;
        this._callback = callback;
        this._backPropType = backPropType;
        this._backProp = null;

        if (includeBias) {
            this._numWeights++;
        }

        this._weightDeltas = _ArrayUtils2.default.create1D(this._numWeights, 0);
    }

    _createClass(NeuralNetworkNode, [{
        key: "_executeCallback",
        value: function _executeCallback(type) {
            if (!!this._callback) {
                this._callback({
                    type: type,
                    source: this
                });
            }
        }

        /**
         * This will feedForward the network and give you a prediction
         *
         * @param nodeValueMiniBatch 2D array of node inputs
         *
         * @returns {null|Array} array of outputs.
         */

    }, {
        key: "feedForward",
        value: function feedForward(nodeValueMiniBatch) {

            this._executeCallback(NeuralNetworkNode.EVENT_FEED_FORWARD_START);

            if (this._layerIndex === 0) {
                this._output = _ArrayUtils2.default.getColumn(nodeValueMiniBatch, this._nodeIndex);
                this._prevInputs = nodeValueMiniBatch;

                this._executeCallback(NeuralNetworkNode.EVENT_FEED_FORWARD_COMPLETE);
                return this._output;
            }

            this._output = [];
            this._activationInput = [];
            var nodeValues = null;
            var activationInput = void 0;

            for (var i = 0; i < nodeValueMiniBatch.length; i++) {
                nodeValues = nodeValueMiniBatch[i];

                if (this.includeBias && nodeValues.length + 1 === this.weights.length) {
                    nodeValues.push(1.0);
                }

                (0, _Assert.assert)(!this.includeBias || nodeValues[nodeValues.length - 1] === 1.0);
                (0, _Assert.assert)(nodeValues.length === this.weights.length, "Weight length and node length need to match");
                activationInput = _math2.default.dot(nodeValues, this.weights);

                this._activationInput[i] = activationInput;
                this._output[i] = this._activationFunction.output(activationInput);
            }

            this._prevInputs = nodeValueMiniBatch;

            this._executeCallback(NeuralNetworkNode.EVENT_FEED_FORWARD_COMPLETE);

            return this._output;
        }

        /**
         * This should be called to backPropagate.
         *
         * @param nextLayerErrorsMiniBatch {Array} This should be an array consisting of the target values or errors.
         * @param epoch {Number} This should be the current epoch number.
         *
         * @returns The error of this node.
         */

    }, {
        key: "backPropagate",
        value: function backPropagate(nextLayerErrorsMiniBatch) {
            var epoch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            (0, _Assert.assert)(this._prevInputs.length === nextLayerErrorsMiniBatch.length, "Inputs and nextLayerErrorsOrTargetValue MiniBatch lengths need to match");

            this._executeCallback(NeuralNetworkNode.EVENT_BACK_PROP_START);

            if (this._layerIndex === 0) {
                this._error = _ArrayUtils2.default.create1D(this._prevInputs.length, 0);
                this._executeCallback(NeuralNetworkNode.EVENT_BACK_PROP_COMPLETE);
                return this._error;
            }

            var learningRate = this.learningRate.getLearningRate(epoch);
            var result = this.backProp.getWeightDeltas(this._prevInputs, this._output, nextLayerErrorsMiniBatch, learningRate);

            var errorArray = result.errorArray;
            this._weightDeltas = result.weightDeltas;

            this.weights = _math2.default.subtract(this.weights, this._weightDeltas);
            this._error = errorArray;

            this._executeCallback(NeuralNetworkNode.EVENT_BACK_PROP_COMPLETE);

            return this._error;
        }
    }, {
        key: "numWeights",
        get: function get() {
            return this._numWeights;
        }
    }, {
        key: "weights",
        get: function get() {
            var edges = this._edgeStore.getInputEdges(this._layerIndex, this._nodeIndex);
            return _ArrayUtils2.default.select(edges, function (edge) {
                return edge.weight;
            });
        },
        set: function set(value) {
            (0, _Assert.assert)(value.length === this._numWeights);

            var edges = this._edgeStore.getInputEdges(this._layerIndex, this._nodeIndex);
            _ArrayUtils2.default.update(edges, function (item, index) {
                return item.weight = value[index];
            });
        }
    }, {
        key: "prevWeights",
        get: function get() {
            var edges = this._edgeStore.getInputEdges(this._layerIndex, this._nodeIndex);
            return _ArrayUtils2.default.select(edges, function (edge) {
                return edge.prevWeight;
            });
        }
    }, {
        key: "includeBias",
        get: function get() {
            return this._includeBias;
        }
    }, {
        key: "activationFunction",
        get: function get() {
            return this._activationFunction;
        }
    }, {
        key: "output",
        get: function get() {
            return this._output;
        }
    }, {
        key: "activationInput",
        get: function get() {
            return this._activationInput;
        }
    }, {
        key: "error",
        get: function get() {
            return this._error;
        }
    }, {
        key: "weightDeltas",
        get: function get() {
            return this._weightDeltas;
        }

        /**
         *
         * @returns {null|LearningRate}
         */

    }, {
        key: "learningRate",
        get: function get() {
            return this._learningRate;
        }

        /**
         *
         * @param value {null|LearningRate}
         */
        ,
        set: function set(value) {
            this._learningRate = value;
        }
    }, {
        key: "layerIndex",
        get: function get() {
            return this._layerIndex;
        }
    }, {
        key: "nodeIndex",
        get: function get() {
            return this._nodeIndex;
        }
    }, {
        key: "edgeStore",
        get: function get() {
            return this._edgeStore;
        }
    }, {
        key: "callback",
        get: function get() {
            return this._callback;
        },
        set: function set(value) {
            this._callback = value;
        }
    }, {
        key: "prevInputs",
        get: function get() {
            return this._prevInputs;
        }
    }, {
        key: "backPropType",
        get: function get() {
            return this._backPropType;
        },
        set: function set(value) {
            if (this._backPropType !== value) {
                this._backProp = null;
                this._backPropType = value;
            }
        }
    }, {
        key: "backProp",
        get: function get() {
            if (this._backProp === null) {
                this._backProp = _BackPropFactory2.default.create(this.backPropType, this.layerIndex, this.nodeIndex, this.includeBias, this.edgeStore, this.activationFunction);
            }

            return this._backProp;
        }
    }], [{
        key: "createArrayWithValue",
        value: function createArrayWithValue(length) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var toRet = [];
            toRet.length = length;
            toRet.fill(value);
            return toRet;
        }
    }, {
        key: "calculateError",
        value: function calculateError(expected, actual) {
            return _math2.default.chain(0.5).multiply(_math2.default.pow(_math2.default.subtract(expected, actual), 2)).done();
        }
    }]);

    return NeuralNetworkNode;
}();

exports.default = NeuralNetworkNode;