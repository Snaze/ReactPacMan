"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NeuralNetworkNode = require("./NeuralNetworkNode");

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _Assert = require("../../../utils/Assert");

var _math = require("../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _MathUtil = require("../MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

var _moment = require("../../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _Normalizer = require("./Normalizer");

var _Normalizer2 = _interopRequireDefault(_Normalizer);

var _EdgeStore = require("./EdgeStore");

var _EdgeStore2 = _interopRequireDefault(_EdgeStore);

var _WeightInitializer = require("./WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

var _LearningRate = require("./LearningRate");

var _LearningRate2 = _interopRequireDefault(_LearningRate);

var _BackPropFactory = require("./backprop/BackPropFactory");

var _BackPropFactory2 = _interopRequireDefault(_BackPropFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import NeuralNetworkParameter from "./NeuralNetworkParameter";

var neural_network_feed_forward_complete = 0;
var neural_network_back_prop_complete = 1;
var neural_network_epoch_complete = 2;
var neural_network_training_complete = 3;
var all = [neural_network_feed_forward_complete, neural_network_back_prop_complete, neural_network_epoch_complete, neural_network_training_complete];

var NeuralNetwork = function () {
    _createClass(NeuralNetwork, null, [{
        key: "NEURAL_NETWORK_FEED_FORWARD_COMPLETE",
        get: function get() {
            return neural_network_feed_forward_complete;
        }
    }, {
        key: "NEURAL_NETWORK_BACK_PROP_COMPLETE",
        get: function get() {
            return neural_network_back_prop_complete;
        }
    }, {
        key: "NEURAL_NETWORK_EPOCH_COMPLETE",
        get: function get() {
            return neural_network_epoch_complete;
        }
    }, {
        key: "NEURAL_NETWORK_TRAINING_COMPLETE",
        get: function get() {
            return neural_network_training_complete;
        }
    }, {
        key: "ALL_CALLBACKS",
        get: function get() {
            return all;
        }
    }]);

    function NeuralNetwork(nodesPerLayer) {
        var includeBias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var activationFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ActivationFunctions2.default.sigmoid;
        var learningRate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;
        var weightInitializationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _WeightInitializer2.default.COMPRESSED_NORMAL;
        var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
        var linearRegression = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

        var _this = this;

        var finalLearningRate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1e-3;
        var backPropType = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : _BackPropFactory2.default.BACK_PROP_TYPE_SGD;

        _classCallCheck(this, NeuralNetwork);

        this._nodesPerLayer = nodesPerLayer;
        this._includeBias = includeBias;
        this._activationFunction = activationFunction;
        this._learningRate = new _LearningRate2.default(learningRate, finalLearningRate, 100);
        this._edgeStore = new _EdgeStore2.default(nodesPerLayer, includeBias, activationFunction, weightInitializationType);
        this._output = null;
        this._epoch = 0;
        this._totalError = 0;
        this._normalizer = new _Normalizer2.default(activationFunction);
        this._inputsNormalized = false;
        this._debug = false;
        this._callback = callback;
        this._linearRegression = linearRegression;
        this._backPropType = backPropType;

        this._trainingParameter = null;
        this._prevWeights = [];
        this._minErrorWeights = null;
        this._minErrorValue = Number.POSITIVE_INFINITY;
        this._minErrorEpoch = this._epoch;
        this._epochInProgress = false;
        this._trainInterval = null;
        this._timerTickRef = function (e) {
            return _this._timerTick(e);
        };
        this._nodeCallbackRef = function (e) {
            return _this._nodeCallback(e);
        };

        this._nodes = NeuralNetwork.createNodes(nodesPerLayer, includeBias, activationFunction, this._learningRate, this._edgeStore, this._nodeCallbackRef, this._linearRegression, this._backPropType);
    }

    _createClass(NeuralNetwork, [{
        key: "setWeights",
        value: function setWeights(weights) {
            weights.forEach(function (weightLayer, layerIndex) {
                weightLayer.forEach(function (nodeWeights, nodeIndex) {
                    this._nodes[layerIndex][nodeIndex].weights = nodeWeights;
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: "getWeights",
        value: function getWeights() {
            var toRet = [];

            this._nodes.forEach(function (layer, layerIndex) {
                toRet[layerIndex] = [];

                layer.forEach(function (node, nodeIndex) {
                    toRet[layerIndex][nodeIndex] = node.weights.slice(0);
                });
            });

            return toRet;
        }
    }, {
        key: "log",
        value: function log(toLog) {
            if (!!console && this._debug) {
                console.log(toLog);
            }
        }

        /**
         *
         * @param trainingParameter {NeuralNetworkParameter} All the params to train with.
         * @returns {number} Ignore this value.  It's for the unit tests. TODO: clean this up.
         */

    }, {
        key: "train",
        value: function train(trainingParameter) {

            (0, _Assert.assert)(trainingParameter.inputs.length === trainingParameter.expectedOutputs.length, "inputs.length must equals expectedOutputs.length");

            // this._inputs = inputs;
            // this._expectedOutputs = expectedOutputs;
            this._trainingParameter = trainingParameter;
            this._learningRate.numEpochs = this._trainingParameter.maxEpochs;
            this._minErrorWeights = null;
            this._minErrorValue = Number.POSITIVE_INFINITY;
            this._minErrorEpoch = this._epoch;
            this._epoch = 0;
            this._inputsNormalized = this._trainingParameter.normalizeInputs;

            if (this._trainingParameter.normalizeInputs) {
                this._trainingParameter.inputs = this._normalizer.normalize(this._trainingParameter.inputs, true);
            }

            var startTime = (0, _moment2.default)();
            var error = this.trainOne(trainingParameter);
            var endTime = (0, _moment2.default)();

            if (trainingParameter.maxEpochs <= this._epoch) {
                this.stopTimer(NeuralNetwork.NEURAL_NETWORK_TRAINING_COMPLETE);
                return error;
            }

            var duration = _moment2.default.duration(endTime.diff(startTime));
            var milliSecDuration = duration.asMilliseconds() + 200; // + 200 for buffer
            // let milliSecDuration = 5000;
            this.log("Training at every " + milliSecDuration + "ms interval");

            error = 0;

            this.stopTimer();
            this._trainInterval = setInterval(function (e) {
                error = this._timerTickRef(trainingParameter);
            }.bind(this), milliSecDuration);

            return error;
        }
    }, {
        key: "stopTimer",
        value: function stopTimer() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (this._trainInterval !== null) {
                clearInterval(this._trainInterval);
                this._trainInterval = null;
            }

            if (this._minErrorWeights !== null) {
                this.log("setting weights found at error = " + this._minErrorValue + " found at epoch " + this._minErrorEpoch);
                this.setWeights(this._minErrorWeights);
                this._minErrorWeights = null;
            }

            if (!!this._callback && type !== null) {
                this._callback({
                    type: type,
                    source: this
                });
            }
        }

        /**
         *
         * @param trainParameter {NeuralNetworkParameter}
         * @returns {*}
         * @private
         */

    }, {
        key: "_timerTick",
        value: function _timerTick(trainParameter) {
            if (this._epochInProgress) {
                return;
            }
            var startTime = (0, _moment2.default)();

            this._epochInProgress = true;
            var maxErrorForEpoch = void 0;

            try {
                var maxEpochs = trainParameter.maxEpochs;
                var minError = trainParameter.minError;
                var minWeightDelta = trainParameter.minWeightDelta;

                var currWeights = void 0;
                var weightDelta = null;

                maxErrorForEpoch = this.trainOne(trainParameter);

                this.log("maxError = " + maxErrorForEpoch);
                this.log("epoch = " + this._epoch);

                if (minWeightDelta !== null) {
                    currWeights = _ArrayUtils2.default.flatten(this.getWeights());

                    if (this._prevWeights !== null) {
                        weightDelta = _MathUtil2.default.distance(this._prevWeights, currWeights);

                        this.log("weightDelta = " + weightDelta);

                        if (weightDelta < minWeightDelta) {
                            this.stopTimer(NeuralNetwork.NEURAL_NETWORK_TRAINING_COMPLETE);
                            return;
                        }
                    }

                    this._prevWeights = currWeights;
                }

                if (minError !== null && maxErrorForEpoch <= minError || maxEpochs !== null && maxEpochs <= this._epoch) {

                    this.stopTimer(NeuralNetwork.NEURAL_NETWORK_TRAINING_COMPLETE);
                }
            } catch (e) {
                if (!!console) {
                    console.log(e);
                }
            } finally {
                this._epochInProgress = false;
            }

            var endTime = (0, _moment2.default)();
            var duration = _moment2.default.duration(endTime.diff(startTime));
            var milliSecDuration = duration.asMilliseconds();
            this.log("TimerTick took " + milliSecDuration + "ms");

            return maxErrorForEpoch;
        }

        /**
         *
         * @param trainingData {NeuralNetworkParameter}
         * @returns {Number}
         */

    }, {
        key: "trainOne",
        value: function trainOne(trainingData) {
            var inputs = trainingData._inputs;
            var expectedOutputs = trainingData._expectedOutputs;

            var miniBatchSize = trainingData.miniBatchSize;
            var cacheMinError = trainingData.cacheMinError;

            var range = _ArrayUtils2.default.range(inputs.length);
            var shuffledRange = _ArrayUtils2.default.shuffle(range);
            var miniBatchIndices = null;
            var miniBatchInputs = null;
            var miniBatchOutputs = null;
            var maxErrorForEpoch = Number.NEGATIVE_INFINITY;
            var currentError = null;

            (0, _Assert.assert)(inputs.length === expectedOutputs.length, "inputs.length must equals expectedOutputs.length");

            for (var i = 0; i < shuffledRange.length; i += miniBatchSize) {
                miniBatchIndices = _ArrayUtils2.default.take(shuffledRange, miniBatchSize, i);
                miniBatchInputs = _ArrayUtils2.default.selectByIndices(inputs, miniBatchIndices);
                miniBatchOutputs = _ArrayUtils2.default.selectByIndices(expectedOutputs, miniBatchIndices);

                var miniBatchPredictedOutputs = this.feedForward(miniBatchInputs);
                this.backPropagate(miniBatchOutputs);

                currentError = NeuralNetwork.calculateMaxErrorForMiniBatch(miniBatchOutputs, miniBatchPredictedOutputs);

                maxErrorForEpoch = _math2.default.max(maxErrorForEpoch, currentError);
            }

            if (maxErrorForEpoch < this._minErrorValue) {
                this._minErrorValue = maxErrorForEpoch;
                this._minErrorEpoch = this._epoch;

                if (cacheMinError) {
                    this._minErrorWeights = this.getWeights();
                }
            }

            this._epoch++;

            if (!!this._callback) {
                this._callback({
                    type: NeuralNetwork.NEURAL_NETWORK_EPOCH_COMPLETE,
                    source: this
                });
            }

            return maxErrorForEpoch;
        }
    }, {
        key: "feedForward",
        value: function feedForward(inputMiniBatch) {

            var prevLayerOutput = inputMiniBatch;
            var layer = null;
            var node = null;
            var layerOutput = null;

            for (var layerIndex = 0; layerIndex < this._nodes.length; layerIndex++) {
                layer = this._nodes[layerIndex];
                layerOutput = [];

                for (var nodeIndex = 0; nodeIndex < layer.length; nodeIndex++) {
                    node = layer[nodeIndex];

                    layerOutput[nodeIndex] = node.feedForward(prevLayerOutput);
                }

                prevLayerOutput = _ArrayUtils2.default.transpose(layerOutput);
            }

            this._output = prevLayerOutput;

            if (!!this._callback) {
                this._callback({
                    type: NeuralNetwork.NEURAL_NETWORK_FEED_FORWARD_COMPLETE,
                    source: this
                });
            }

            return this._output;
        }
    }, {
        key: "predict",
        value: function predict(inputMiniBatch) {
            if (this._inputsNormalized) {
                inputMiniBatch = this._normalizer.normalize(inputMiniBatch);
            }

            return this.feedForward(inputMiniBatch);
        }

        /**
         * This should be used to backPropagate which makes the NN learn.
         *
         * @param expectedOutputs An array representing what the actual value of the Neural Network should be.
         * @returns {Number} Returns the absolute value of total error of all nodes.
         */

    }, {
        key: "backPropagate",
        value: function backPropagate(expectedOutputs) {

            this._totalError = 0;
            var lastLayerIndex = this._nodes.length - 1;

            // This is the error for each node in the next layer.
            var nextLayerErrors = null;
            var thisLayerErrors = null;

            for (var layerIndex = lastLayerIndex; layerIndex >= 0; layerIndex--) {
                thisLayerErrors = [];

                for (var nodeIndex = 0; nodeIndex < this._nodes[layerIndex].length; nodeIndex++) {
                    var node = this._nodes[layerIndex][nodeIndex];

                    if (lastLayerIndex === layerIndex) {
                        // Must be output layer
                        nextLayerErrors = _ArrayUtils2.default.getColumn(expectedOutputs, nodeIndex);
                    }

                    thisLayerErrors[nodeIndex] = node.backPropagate(nextLayerErrors, this._epoch);
                }

                nextLayerErrors = _ArrayUtils2.default.transpose(thisLayerErrors);

                this._totalError += _math2.default.sum(_math2.default.abs(_math2.default.mean(nextLayerErrors, 0)));
            }

            if (!!this._callback) {
                this._callback({
                    type: NeuralNetwork.NEURAL_NETWORK_BACK_PROP_COMPLETE,
                    source: this
                });
            }

            return this._totalError;
        }
    }, {
        key: "iterateOverNodes",


        /**
         * Iterates over all the nodes.
         *
         * @param theFunction Function with the following signature theFunction(node, nodeIndex, layerIndex);
         */
        value: function iterateOverNodes(theFunction) {
            this._nodes.forEach(function (layer, layerIndex) {
                layer.forEach(function (node, nodeIndex) {
                    theFunction(node, nodeIndex, layerIndex);
                });
            });
        }
    }, {
        key: "nodesPerLayer",
        get: function get() {
            return this._nodesPerLayer;
        }
    }, {
        key: "epochs",
        get: function get() {
            return this._epoch;
        },
        set: function set(value) {
            (0, _Assert.assert)(value >= 0);

            this._epoch = value;
        }

        /**
         * Returns the maxEpochs from the learning rate object.
         *
         * @returns {Number}
         */

    }, {
        key: "maxEpochs",
        get: function get() {
            return this._learningRate.numEpochs;
        }

        /**
         * Use this if you are manually feeding forward and back propagating.  If you are using the
         * train method, pass in maxEpochs via the parameter.
         *
         * TODO: Refactor the train method to use this.
         *
         * @param value {Number} the maximum number epochs.
         */
        ,
        set: function set(value) {
            (0, _Assert.assert)(value >= 0);

            this._learningRate.numEpochs = value;
        }
    }, {
        key: "totalError",
        get: function get() {
            return this._totalError;
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
        key: "includeBias",
        get: function get() {
            return this._includeBias;
        }
    }, {
        key: "learningRate",
        get: function get() {
            return this._learningRate.getLearningRate(this._epoch);
        }

        /**
         * This represents the backpropagation type being used.
         * @returns {String}
         */

    }, {
        key: "backPropType",
        get: function get() {
            return this._backPropType;
        }

        /**
         * This will set the back prop type for the entire network
         * @param value {String}
         */
        ,
        set: function set(value) {
            this._backPropType = value;
            this.iterateOverNodes(function (node) {
                node.backPropType = value;
            });
        }
    }], [{
        key: "createNodes",
        value: function createNodes(nodesPerLayer, includeBias, activationFunction, learningRate, edgeStore) {
            var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
            var linearRegression = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var backPropType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _BackPropFactory2.default.BACK_PROP_TYPE_SGD;


            var toRet = [];
            var prevNumNodes = 0;

            for (var layerIdx = 0; layerIdx < nodesPerLayer.length; layerIdx++) {
                var numNodes = nodesPerLayer[layerIdx];
                var bias = layerIdx === 0 ? false : includeBias;

                toRet[layerIdx] = [];

                for (var nodeIndex = 0; nodeIndex < numNodes; nodeIndex++) {
                    var toSet = void 0;

                    if (linearRegression && layerIdx === nodesPerLayer[nodesPerLayer.length - 1]) {
                        toSet = new _NeuralNetworkNode2.default(layerIdx, nodeIndex, edgeStore, prevNumNodes, bias, _ActivationFunctions2.default.identity, null, backPropType);
                    } else {
                        toSet = new _NeuralNetworkNode2.default(layerIdx, nodeIndex, edgeStore, prevNumNodes, bias, activationFunction, null, backPropType);
                    }

                    toSet.learningRate = learningRate;
                    toRet[layerIdx][nodeIndex] = toSet;
                }

                prevNumNodes = numNodes;
            }

            return toRet;
        }

        /**
         * This will calculate the error based on the output nodes.
         *
         * @param expectedArray A 1D array of values that correspond to each output node.
         * @param actualArray A 1D array of values corresponding to the actual output
         */

    }, {
        key: "calculateError",
        value: function calculateError(expectedArray, actualArray) {

            (0, _Assert.assert)(expectedArray.length === actualArray.length);

            var toRet = 0;

            for (var i = 0; i < expectedArray.length; i++) {
                toRet += _NeuralNetworkNode2.default.calculateError(expectedArray[i], actualArray[i]);
            }

            return toRet;
        }
    }, {
        key: "calculateMaxErrorForMiniBatch",
        value: function calculateMaxErrorForMiniBatch(expectedMiniBatch, actualMiniBatch) {

            (0, _Assert.assert)(expectedMiniBatch.length === actualMiniBatch.length);
            (0, _Assert.assert)(expectedMiniBatch.length > 0);

            var maxError = Number.NEGATIVE_INFINITY;
            var currentError = null;

            for (var i = 0; i < expectedMiniBatch.length; i++) {
                currentError = NeuralNetwork.calculateError(expectedMiniBatch[i], actualMiniBatch[i]);

                maxError = _math2.default.max(maxError, currentError);
            }

            return maxError;
        }
    }]);

    return NeuralNetwork;
}();

exports.default = NeuralNetwork;