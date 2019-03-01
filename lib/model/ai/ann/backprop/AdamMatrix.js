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

var _MatrixUtils = require("../../../../utils/MatrixUtils");

var _MatrixUtils2 = _interopRequireDefault(_MatrixUtils);

var _numeric = require("../../../../../node_modules/numericjs/numeric-1.2.6");

var _numeric2 = _interopRequireDefault(_numeric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is the Adam weight update rule for backpropagation.
 *
 * AdamMatrix
 */
var AdamMatrix = function () {

    /**
     * This is the constructor for Adam.
     * @param layerIndex {Number} This is the layer index of the current node.
     * @param nodeIndex {Number} This is the node index of the current node.
     * @param includeBias {Boolean} This specifies whether or not a bias input is being used.
     * @param edgeStore {EdgeStore} This is the edge store which holds all the NN weights.
     * @param activationFunction {Object} This is the activation function to be used.
     * @param gradientDecay {Number} This is the decay factor for the gradient.
     * @param squaredGradientDecay {Number} This is the decay factor for the gradient.
     * @param errorFactor {Number} This factor is used simply to avoid divide by zero errors.
     */
    function AdamMatrix(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction) {
        var gradientDecay = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.9;
        var squaredGradientDecay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.999;
        var errorFactor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1e-8;

        _classCallCheck(this, AdamMatrix);

        (0, _Assert.assert)(gradientDecay >= 0 && gradientDecay <= 1, "0 <= gradientDecay <= 1");
        (0, _Assert.assert)(squaredGradientDecay >= 0 && squaredGradientDecay <= 1, "0 <= squaredGradientDecay <= 1");

        this._layerIndex = layerIndex;
        this._nodeIndex = nodeIndex;
        this._includeBias = includeBias;
        this._edgeStore = edgeStore;
        this._activationFunction = activationFunction;
        this._gradientDecay = gradientDecay;
        this._inverseGradientDecay = 1.0 - this._gradientDecay;
        this._squaredGradientDecay = squaredGradientDecay;
        this._inverseSquaredGradientDecay = 1.0 - this._squaredGradientDecay;
        this._errorFactor = errorFactor;
        this._gradient = null;
        this._gradientSquared = null;
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


    _createClass(AdamMatrix, [{
        key: "getWeightDeltas",
        value: function getWeightDeltas(prevInputs, outputs, nextLayerErrorsMiniBatch, learningRate) {
            var _this = this;

            // TODO: Refactor this common code back into NeuralNetworkNode
            (0, _Assert.assert)(this._layerIndex > 0, "No need to backpropagate for input node");

            var gradientCache = void 0,
                temp = void 0,
                errorArray = void 0,
                errorDiag = void 0;

            var derivatives2D = outputs.map(function (output) {
                return [_this._activationFunction.derivative(output)];
            });

            if (nextLayerErrorsMiniBatch[0] instanceof Array) {
                var outputEdges = this._edgeStore.getOutputEdges(this._layerIndex, this._nodeIndex);
                var outgoingWeights = _ArrayUtils2.default.select(outputEdges, function (edge) {
                    return edge.prevWeight;
                });
                outgoingWeights = _MatrixUtils2.default.convertTo2D(outgoingWeights);

                temp = _numeric2.default.dot(nextLayerErrorsMiniBatch, outgoingWeights);
            } else {
                // else output array
                var outputs2D = _MatrixUtils2.default.convertTo2D(outputs);
                var nextLayerErrors2D = _MatrixUtils2.default.convertTo2D(nextLayerErrorsMiniBatch);

                temp = _numeric2.default.add(nextLayerErrors2D, _numeric2.default.neg(outputs2D));
            }

            errorArray = _numeric2.default.mul(derivatives2D, temp);
            errorArray = _ArrayUtils2.default.flatten(errorArray);
            errorDiag = _numeric2.default.diag(errorArray);
            gradientCache = _numeric2.default.dot(errorDiag, prevInputs);

            var currentGradient = _math2.default.mean(gradientCache, 0);
            var m_t = this.gradient.map(function (m_t_minus_1, index) {
                return this.gradientDecay * m_t_minus_1 + this.inverseGradientDecay * currentGradient[index];
            }.bind(this));

            var v_t = this.gradientSquared.map(function (v_t_minus_1, index) {
                return this.squaredGradientDecay * v_t_minus_1 + this.inverseSquaredGradientDecay * Math.pow(currentGradient[index], 2);
            }.bind(this));

            var mHat_t = m_t.map(function (mT) {
                return mT / this.inverseGradientDecay;
            }.bind(this));

            var vHat_t = v_t.map(function (vT) {
                return vT / this.inverseSquaredGradientDecay;
            }.bind(this));

            var weightDeltas = mHat_t.map(function (currMHatT, index) {
                return -(learningRate / (Math.sqrt(vHat_t[index]) + this.errorFactor)) * currMHatT;
            }.bind(this));

            this._gradient = m_t;
            this._gradientSquared = v_t;

            return {
                errorArray: errorArray,
                weightDeltas: weightDeltas
            };
        }

        /**
         * The decay factor for the gradient calculation
         * @returns {Number}
         */

    }, {
        key: "gradientDecay",
        get: function get() {
            return this._gradientDecay;
        }

        /**
         * The squared decay factor for the gradient calculation
         * @returns {Number}
         */

    }, {
        key: "squaredGradientDecay",
        get: function get() {
            return this._squaredGradientDecay;
        }

        /**
         * This is (1 - gradientDecay)
         * @returns {Number}
         */

    }, {
        key: "inverseGradientDecay",
        get: function get() {
            return this._inverseGradientDecay;
        }

        /**
         * This is (1 - squaredGradientDecay)
         * @returns {Number}
         */

    }, {
        key: "inverseSquaredGradientDecay",
        get: function get() {
            return this._inverseSquaredGradientDecay;
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
         * This is the previous Gradient used to find the weight deltas
         *
         * @returns {Array}
         */

    }, {
        key: "gradient",
        get: function get() {
            if (this._gradient === null) {
                this._gradient = _ArrayUtils2.default.create1D(this.numInputEdges, 0);
            }

            return this._gradient;
        }

        /**
         * This is the previous Squared Gradient used to find weight deltas
         * @returns {Array}}
         */

    }, {
        key: "gradientSquared",
        get: function get() {
            if (this._gradientSquared === null) {
                this._gradientSquared = _ArrayUtils2.default.create1D(this.numInputEdges, 0);
            }

            return this._gradientSquared;
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

    return AdamMatrix;
}();

exports.default = AdamMatrix;