"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import LearningRate from "../LearningRate";


var _ActivationFunctions = require("../ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _Assert = require("../../../../utils/Assert");

var _ArrayUtils = require("../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _vectorious = require("vectorious");

var _MatrixUtils = require("../../../../utils/MatrixUtils");

var _MatrixUtils2 = _interopRequireDefault(_MatrixUtils);

var _math = require("../../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

var _TimeRecorder = require("../../../../utils/TimeRecorder");

var _TimeRecorder2 = _interopRequireDefault(_TimeRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents a single Layer in the Neural Network.
 *
 * I will use some variables in the comments of this class.  The variables are as follows:
 *
 * n = # of inputs / # of incoming weights per node
 * m = # of records in mini-batch
 * r = # of nodes in next layer / # of error values in next layer / # of outgoing weights
 * p = # of nodes in current layer / "this._numNodes"
 *
 */
var Layer = function () {

    /**
     * This is the constructor for the NN Layer.
     *
     * @param numNodes {Number} The number of nodes in this layer.
     * @param activationFunction {Object} The activation function
     * @param learningRate {LearningRate} Learning Rate object to decay learning rate.
     * @param backPropStrategy {Object} Back Prop instance from the blas/backprop folder
     */
    function Layer(numNodes) {
        var activationFunction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ActivationFunctions2.default.lrelu;
        var learningRate = arguments[2];
        var backPropStrategy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, Layer);

        this._numNodes = numNodes;
        this._activationFunction = activationFunction;
        this._learningRate = learningRate;
        this._backPropStrategy = backPropStrategy;

        this._inputs = null; // Previous inputs used on FeedForward
        this._outputs = null; // Previous outputs produced by feedForward
        this._errors = null; // Previous errors produced by backProp
        this._hasBias = false;
        this._outputAugmentMatrix = null;
        this._timeRecorder = new _TimeRecorder2.default();
    }

    _createClass(Layer, [{
        key: "augmentOutputWithOnes",
        value: function augmentOutputWithOnes(outputMatrix) {
            if (this._outputAugmentMatrix === null || this._outputAugmentMatrix.shape[0] !== outputMatrix.shape[0]) {
                this._outputAugmentMatrix = _vectorious.Matrix.ones(outputMatrix.shape[0], 1);
            }

            outputMatrix.augment(this._outputAugmentMatrix);
        }

        /**
         * Use this method to feed forward the current layer.
         *
         * n = # of inputs / # of incoming weights per node
         * m = # of records in mini-batch
         * r = # of nodes in next layer / # of error values in next layer / # of outgoing weights
         * p = # of nodes in current layer / "this._numNodes"
         *
         * @param inputWeights {Matrix} This should be a (n x p) 2D Array containing
         * the input weights for this layer.  This means each column represents the weights for a particular
         * node.
         * @param miniBatch {Matrix} This should be a (m x n) 2D Array containing the
         * normalized miniBatch for this layer.
         * @returns {Matrix} This will return a (m x p) 2D Array containing the output
         * for each element of the minibatch for each node of the current layer.
         */

    }, {
        key: "feedForward",
        value: function feedForward(inputWeights, miniBatch) {
            var _this = this;

            var tempResult = void 0;

            this._inputs = miniBatch;

            if (inputWeights === null) {
                (0, _Assert.assert)(!this.hasBias && miniBatch.shape[1] === this._numNodes || this.hasBias && miniBatch.shape[1] === this._numNodes + 1, "Invalid miniBatch size for input layer");

                this._outputs = miniBatch;
                return this._outputs;
            }

            // assert (this._inputs.shape[1] === inputWeights.shape[0], "Invalid matrix sizes");

            // This should be (m x n) x (n x p) = (m x p)
            this._timeRecorder.recordStart("Layer Matrix Multiply");
            tempResult = _vectorious.Matrix.multiply(this._inputs, inputWeights);
            this._timeRecorder.recordEnd("Layer Matrix Multiply");

            // Now simply apply the activation function and return
            this._timeRecorder.recordStart("Layer Mapping");
            this._outputs = tempResult.map(function (x) {
                return _this._activationFunction.output(x);
            });
            this._timeRecorder.recordEnd("Layer Mapping");

            if (this.hasBias) {
                this._timeRecorder.recordStart("Augment");
                this.augmentOutputWithOnes(this._outputs);
                this._timeRecorder.recordEnd("Augment");
            }

            return this._outputs;
        }

        /**
         * Use this method to perform back prop on the current layer.  Note that this method depends
         * on the previous inputs / outputs used / generated for the last feedForward call.
         *
         * n = # of inputs / # of incoming weights per node
         * m = # of records in mini-batch
         * r = # of nodes in next layer / # of error values in next layer / # of outgoing weights
         * p = # of nodes in current layer / "this._numNodes"
         *
         * @param inputWeights {Matrix|null} This should be a (n x p) Matrix representing the
         * weights coming into each node in this layer.  Use a value of null if this is the input layer.
         * @param outputWeights {Matrix|null} This should be a (r x p) Matrix representing the
         * weights leaving each node in this layer.  Use a value of null if this is the output layer.
         * @param nextLayerErrorsMiniBatch {Matrix} This should be a (m x r) Matrix representing
         * the error value for each node in the previous layer for each record of the miniBatch.
         * @param epoch {Number} This should be the epoch number
         */

    }, {
        key: "backProp",
        value: function backProp(inputWeights, outputWeights, nextLayerErrorsMiniBatch, epoch) {
            var _this2 = this;

            if (inputWeights === null) {
                if (this._errors === null) {
                    this._errors = _vectorious.Matrix.zeros(this._outputs.shape[0], this._outputs.shape[1]);
                }
                // Input layer.
                return null;
            }

            // (m x p)
            var derivatives = this._outputs.map(function (item) {
                return _this2._activationFunction.derivative(item);
            });

            // (m x p)
            var temp = void 0;

            if (outputWeights === null) {
                (0, _Assert.assert)(_ArrayUtils2.default.arrayEquals(nextLayerErrorsMiniBatch.shape, this._outputs.shape), "This is an output layer so nextLayerErrorsMiniBatch and this._outputs should have the same shape");
                temp = _vectorious.Matrix.subtract(nextLayerErrorsMiniBatch, this._outputs);
            } else {
                (0, _Assert.assert)(_ArrayUtils2.default.arrayEquals(nextLayerErrorsMiniBatch.shape[1], outputWeights.shape[0]), "nextLayerErrorsMiniBatch --> (m x r) x (r x p) <-- outputWeights");
                temp = _vectorious.Matrix.multiply(nextLayerErrorsMiniBatch, outputWeights);
            }

            // (m x p)
            var tempErrors = _vectorious.Matrix.product(derivatives, temp);
            var errorMatrixArray = tempErrors.toArray();
            if (this.hasBias) {
                // The last column is error for the bias term which we don't need
                _MatrixUtils2.default.popColumn(errorMatrixArray);
            }
            this._errors = new _vectorious.Matrix(errorMatrixArray);
            var p = this._errors.shape[1];
            var currentErrorCol = void 0,
                currentErrorDiag = void 0,
                gradients = void 0,
                avgGradient = void 0,
                currentGradient = [],
                learningRate = this.learningRate.getLearningRate(epoch);

            // Check to see if there is a better way to do this.
            for (var nodeIndex = 0; nodeIndex < p; nodeIndex++) {

                // This should be length = m
                currentErrorCol = _ArrayUtils2.default.getColumn(errorMatrixArray, nodeIndex);

                // This should be (m x m)
                currentErrorDiag = new _vectorious.Matrix(_MatrixUtils2.default.toDiagonal(currentErrorCol));

                // This should be (m x m) x (m x n) = (m x n)
                gradients = _vectorious.Matrix.multiply(currentErrorDiag, this._inputs);

                // This should be an array of size n
                avgGradient = _math2.default.mean(gradients.toArray(), 0);

                // At the end of this loop, the currentGradient will be (p x n).  (numNodes x numWeights)
                currentGradient.push(avgGradient);
            }

            currentGradient = new _vectorious.Matrix(currentGradient).transpose();
            var newInputWeights = void 0;

            if (this._backPropStrategy === null) {
                // If no special strategy, just do Vanilla Gradient Descent
                newInputWeights = _vectorious.Matrix.subtract(inputWeights, currentGradient.scale(-learningRate));
            } else {
                var weightDeltas = this._backPropStrategy.getWeightDeltas(currentGradient, learningRate);
                newInputWeights = _vectorious.Matrix.subtract(inputWeights, weightDeltas);
            }

            return newInputWeights;
        }

        /**
         * This value indicates when the Learning Rate finished decaying
         * @returns {Number}
         */

    }, {
        key: "maxEpochs",
        get: function get() {
            return this._learningRate.numEpochs;
        }

        /**
         * This value indicates when the LearningRate stops decaying.
         * @param value {Number}
         */
        ,
        set: function set(value) {
            this._learningRate.numEpochs = value;
        }

        /**
         * This is the number of nodes in the current layer.
         * @returns {Number}
         */

    }, {
        key: "numNodes",
        get: function get() {
            return this._numNodes;
        }

        /**
         * This is the number of nodes in the current layer.  Be careful where you modify
         * this value.  Really, it should only be modified before a layer is added to a Network.
         * @param value {Number}
         */
        ,
        set: function set(value) {
            this._numNodes = value;
        }

        /**
         * This is the current activation function being used.
         * @returns {Object}
         */

    }, {
        key: "activationFunction",
        get: function get() {
            return this._activationFunction;
        }

        /**
         * This is the LearningRate object being used.
         * @returns {LearningRate}
         */

    }, {
        key: "learningRate",
        get: function get() {
            return this._learningRate;
        }

        /**
         * Instance of Back Prop Strategy (item in backprop folder)
         * @returns {Object|null}
         */

    }, {
        key: "backPropStrategy",
        get: function get() {
            return this._backPropStrategy;
        }

        /**
         * This is the last inputs used on the feed forward pass.
         * @returns {Matrix|null}
         */

    }, {
        key: "inputs",
        get: function get() {
            return this._inputs;
        }

        /**
         * This is the last outputs produced on the feed forward pass.
         * @returns {Matrix|null}
         */

    }, {
        key: "outputs",
        get: function get() {
            return this._outputs;
        }

        /**
         * This is the last errors produced on the back prop pass.
         * @returns {Matrix|null}
         */

    }, {
        key: "errors",
        get: function get() {
            return this._errors;
        }

        /**
         * This parameter designates whether the last node is really a bias node
         * @returns {boolean}
         */

    }, {
        key: "hasBias",
        get: function get() {
            return this._hasBias;
        }

        /**
         * This parameter designates whether the last node is really a bias node
         * @param value {boolean}
         */
        ,
        set: function set(value) {
            this._hasBias = value;
        }
    }]);

    return Layer;
}();

exports.default = Layer;