"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require("../../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

var _Assert = require("../../../../utils/Assert");

var _ArrayUtils = require("../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the standard vanilla weight update rule for backpropagation.
 *
 * Stochastic Gradient Descent
 */
var SGD = function () {

    /**
     * This is the constructor for SGD.
     * @param layerIndex {Number} This is the layer index of the current node.
     * @param nodeIndex {Number} This is the node index of the current node.
     * @param includeBias {Boolean} This specifies whether or not a bias input is being used.
     * @param edgeStore {EdgeStore} This is the edge store which holds all the NN weights.
     * @param activationFunction {Object} This is the activation function to be used.
     */
    function SGD(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction) {
        _classCallCheck(this, SGD);

        this._layerIndex = layerIndex;
        this._nodeIndex = nodeIndex;
        this._includeBias = includeBias;
        this._edgeStore = edgeStore;
        this._activationFunction = activationFunction;
    }

    /**
     * This will retrieve the weight deltas for 1 iteration of back propagation.
     *
     * @param prevInputs {Array} This should be a mini-batch of the previous input.
     * @param outputs {Array} THis should be the previous outputs.
     * @param nextLayerErrorsMiniBatch {Array} This should be the errors for each node
     * in the next layer.
     * @param learningRate {Number} This should be the current learning rate.
     * @returns {{errorArray: Array, weightDeltas: Array}}
     */


    _createClass(SGD, [{
        key: "getWeightDeltas",
        value: function getWeightDeltas(prevInputs, outputs, nextLayerErrorsMiniBatch, learningRate) {
            // TODO: Refactor this common code back into NeuralNetworkNode
            var nodeValues = null,
                currOutput = null,
                nextLayerErrorsOrTargetValue = null;
            var currentError = null,
                errorArray = [],
                allWeightDeltas = [];
            var derivative = void 0,
                temp = void 0,
                gradient = void 0;

            var outputEdges = this._edgeStore.getOutputEdges(this._layerIndex, this._nodeIndex);
            var outgoingWeights = _ArrayUtils2.default.select(outputEdges, function (edge) {
                return edge.prevWeight;
            });
            var inputEdges = this._edgeStore.getInputEdges(this._layerIndex, this._nodeIndex);

            for (var i = 0; i < prevInputs.length; i++) {

                allWeightDeltas[i] = [];

                nodeValues = prevInputs[i];
                currOutput = outputs[i];
                nextLayerErrorsOrTargetValue = nextLayerErrorsMiniBatch[i];

                (0, _Assert.assert)(!this._includeBias || nodeValues[nodeValues.length - 1] === 1.0);
                (0, _Assert.assert)(nodeValues.length === inputEdges.length, "Weight length and node length need to match");

                derivative = this._activationFunction.derivative(currOutput);

                if (nextLayerErrorsOrTargetValue instanceof Array) {
                    temp = _math2.default.dot(nextLayerErrorsOrTargetValue, outgoingWeights);
                } else {
                    temp = _math2.default.subtract(nextLayerErrorsOrTargetValue, currOutput);
                }

                currentError = _math2.default.multiply(derivative, temp);

                for (var w_i = 0; w_i < inputEdges.length; w_i++) {
                    gradient = currentError * nodeValues[w_i];
                    allWeightDeltas[i][w_i] = -1 * learningRate * gradient;
                }

                errorArray[i] = currentError;
            }

            var weightDeltas = _math2.default.mean(allWeightDeltas, 0);
            return {
                errorArray: errorArray,
                weightDeltas: weightDeltas
            };
        }

        /**
         * This is the layer index.
         * @returns {Number}
         */

    }, {
        key: "layerIndex",
        get: function get() {
            return this._layerIndex;
        }

        /**
         * This is the node index.
         * @returns {Number}
         */

    }, {
        key: "nodeIndex",
        get: function get() {
            return this._nodeIndex;
        }

        /**
         * This specifies if a bias is used.
         * @returns {Boolean}
         */

    }, {
        key: "includeBias",
        get: function get() {
            return this._includeBias;
        }

        /**
         * This is the EdgeStore
         * @returns {EdgeStore}
         */

    }, {
        key: "edgeStore",
        get: function get() {
            return this._edgeStore;
        }

        /**
         * This is the activation function.
         * @returns {Object}
         */

    }, {
        key: "activationFunction",
        get: function get() {
            return this._activationFunction;
        }
    }]);

    return SGD;
}();

exports.default = SGD;