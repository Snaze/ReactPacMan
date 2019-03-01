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
 * This is the RMSProp weight update rule for backpropagation.
 *
 * RMSProp
 */
var RMSProp = function () {

    /**
     * This is the constructor for RMSProp.
     * @param layerIndex {Number} This is the layer index of the current node.
     * @param nodeIndex {Number} This is the node index of the current node.
     * @param includeBias {Boolean} This specifies whether or not a bias input is being used.
     * @param edgeStore {EdgeStore} This is the edge store which holds all the NN weights.
     * @param activationFunction {Object} This is the activation function to be used.
     * @param forgetFactor {Number} This number affects how much of the running average to keep.  Larger = more.
     * @param errorFactor {Number} This factor is used simply to avoid divide by zero errors.
     */
    function RMSProp(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction) {
        var forgetFactor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.9;
        var errorFactor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1e-8;

        _classCallCheck(this, RMSProp);

        (0, _Assert.assert)(forgetFactor >= 0 && forgetFactor <= 1, "0 <= forgetFactor <= 1");

        this._layerIndex = layerIndex;
        this._nodeIndex = nodeIndex;
        this._includeBias = includeBias;
        this._edgeStore = edgeStore;
        this._activationFunction = activationFunction;
        this._forgetFactor = forgetFactor;
        this._errorFactor = errorFactor;
        this._meanSquare = null;
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


    _createClass(RMSProp, [{
        key: "getWeightDeltas",
        value: function getWeightDeltas(prevInputs, outputs, nextLayerErrorsMiniBatch, learningRate) {
            // TODO: Refactor this common code back into NeuralNetworkNode
            (0, _Assert.assert)(this._layerIndex > 0, "No need to backpropagate for input node");

            var nodeValues = null,
                currOutput = null,
                nextLayerErrorsOrTargetValue = null;
            var currentError = null,
                errorArray = [],
                allWeightDeltas = [];
            var derivative = void 0,
                temp = void 0,
                gradient = void 0,
                currentMeanSquared = void 0;

            var outputEdges = this._edgeStore.getOutputEdges(this._layerIndex, this._nodeIndex);
            var outgoingWeights = _ArrayUtils2.default.select(outputEdges, function (edge) {
                return edge.prevWeight;
            });
            var numInputEdges = this.numInputEdges;
            var gradientCache = _ArrayUtils2.default.create(prevInputs.length, numInputEdges);

            for (var i = 0; i < prevInputs.length; i++) {

                allWeightDeltas[i] = [];

                nodeValues = prevInputs[i];
                currOutput = outputs[i];
                nextLayerErrorsOrTargetValue = nextLayerErrorsMiniBatch[i];

                (0, _Assert.assert)(!this._includeBias || nodeValues[nodeValues.length - 1] === 1.0);
                (0, _Assert.assert)(nodeValues.length === numInputEdges, "Weight length and node length need to match");

                derivative = this._activationFunction.derivative(currOutput);

                if (nextLayerErrorsOrTargetValue instanceof Array) {
                    temp = _math2.default.dot(nextLayerErrorsOrTargetValue, outgoingWeights);
                } else {
                    temp = _math2.default.subtract(nextLayerErrorsOrTargetValue, currOutput);
                }

                currentError = _math2.default.multiply(derivative, temp);

                for (var w_i = 0; w_i < numInputEdges; w_i++) {
                    gradient = currentError * nodeValues[w_i];
                    gradientCache[i][w_i] = gradient;
                }

                errorArray[i] = currentError;
            }

            var totalGradient = _math2.default.mean(gradientCache, 0);
            var firstPart = _math2.default.multiply(this.forgetFactor, this.meanSquare);
            var invertedForgetFactor = 1 - this.forgetFactor;
            var gradientSquared = totalGradient.map(function (item) {
                return item * item;
            });
            currentMeanSquared = _math2.default.add(firstPart, _math2.default.multiply(invertedForgetFactor, gradientSquared));
            var weightDeltas = currentMeanSquared.map(function (item, index) {
                return -learningRate * (totalGradient[index] / Math.sqrt(item + this.errorFactor));
            }.bind(this));

            this._meanSquare = currentMeanSquared;

            return {
                errorArray: errorArray,
                weightDeltas: weightDeltas
            };
        }

        /**
         * This is the forget factor used in the equation
         * MeanSquare(w, t) = ForgetFactor * MeanSquare(w, t-1) + (1 - ForgetFactor) * gradient_w_i
         * @returns {Number}
         */

    }, {
        key: "forgetFactor",
        get: function get() {
            return this._forgetFactor;
        }

        /**
         * This is simply a number that is added to the denominator if its zero (to prevent divide by zero
         * error.
         * @returns {Number}
         */

    }, {
        key: "errorFactor",
        get: function get() {
            return this._errorFactor;
        }

        /**
         * This returns the number of input edges.
         *
         * @return {Number}
         */

    }, {
        key: "numInputEdges",
        get: function get() {
            return this._edgeStore.getInputEdges(this._layerIndex, this._nodeIndex).length;
        }

        /**
         * This is the MeanSquare error used to find the weight deltas
         *
         * @returns {Array}
         */

    }, {
        key: "meanSquare",
        get: function get() {
            if (this._meanSquare === null) {
                this._meanSquare = _ArrayUtils2.default.create1D(this.numInputEdges, 0);
            }

            return this._meanSquare;
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

    return RMSProp;
}();

exports.default = RMSProp;