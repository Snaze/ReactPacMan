"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import MathUtil from "../../MathUtil";
// import moment from "../../../../../node_modules/moment/moment";
// import Normalizer from "../Normalizer";
// import WeightInitializer from "../WeightInitializer";
// import Layer from "./Layer";


var _Assert = require("../../../../utils/Assert");

var _ArrayUtils = require("../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _vectorious = require("vectorious");

var _TimeRecorder = require("../../../../utils/TimeRecorder");

var _TimeRecorder2 = _interopRequireDefault(_TimeRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        /**
         * The Constructor for the Neural Network.
         *
         * @param normalizer {Normalizer} This class is responsible for normalization.
         * @param callback {Function} This should be a callback that gets fired at certain points in the NN
         * lifecycle.
         * @param weightInitializer {WeightInitializer} WeightInitializer to initialization network
         * @param includeBias {boolean} true to include bias input into layer.
         * @constructor
         */

    }]);

    function NeuralNetwork(normalizer, weightInitializer) {
        var includeBias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, NeuralNetwork);

        this._normalizer = normalizer;
        this._weightInitializer = weightInitializer;
        this._includeBias = includeBias;
        this._callback = callback;
        this._layers = [];
        this._weights = null;
        this._timeRecorder = new _TimeRecorder2.default();

        this._epoch = 0;
    }

    /**
     * This will add a layer to this NN
     * @param layer {Layer} the layer you wish to add.
     * @returns {NeuralNetwork} this object (builder pattern)
     */


    _createClass(NeuralNetwork, [{
        key: "addLayer",
        value: function addLayer(layer) {
            // layer.hasBias = false;
            //
            // let prevIndex = this._layers.length - 1;
            // if (prevIndex >= 0) {
            //     this._layers[prevIndex].hasBias = this.includeBias;
            // }

            layer.hasBias = this.includeBias;

            this._layers.push(layer);

            return this;
        }

        /**
         * Remove the layer located at the index
         * @param index {Number} the index you wish to remove.
         */

    }, {
        key: "removeLayer",
        value: function removeLayer(index) {
            this._layers = _ArrayUtils2.default.removeByIndex(this._layers, index);
            return this;
        }

        /**
         * Use this method to feedForward the network.
         *
         * n = # of inputs / # of incoming weights per node
         * m = # of records in mini-batch
         * r = # of nodes in next layer / # of error values in next layer / # of outgoing weights
         * p = # of nodes in current layer / "this._numNodes"
         *
         * @param inputMiniBatch {Array} This should be a (m x n) 2D Array containing the
         * normalized miniBatch for this layer.
         * @returns {*|null}
         */

    }, {
        key: "feedForward",
        value: function feedForward(inputMiniBatch) {

            var miniBatchMatrix = void 0,
                currentLayer = void 0,
                currentWeights = void 0,
                prevLayerOutput = void 0;

            this._timeRecorder.recordStart("NN miniBatchMatrix creation");
            miniBatchMatrix = new _vectorious.Matrix(inputMiniBatch);
            this._timeRecorder.recordEnd("NN miniBatchMatrix creation");

            prevLayerOutput = miniBatchMatrix;

            for (var i = 0; i < this.layers.length; i++) {
                currentLayer = this.layers[i];
                currentWeights = this.weights[i];

                this._timeRecorder.recordStart("NN Entire FeedForward");
                prevLayerOutput = currentLayer.feedForward(currentWeights, prevLayerOutput);
                this._timeRecorder.recordEnd("NN Entire FeedForward");
            }

            return prevLayerOutput.toArray();
        }

        /**
         * Use this network to back propagate the network.
         *
         * n = # of inputs / # of incoming weights per node
         * m = # of records in mini-batch
         * r = # of nodes in next layer / # of error values in next layer / # of outgoing weights
         * p = # of nodes in current layer / "this._numNodes"
         *
         * @param expectedOutputs {Array} This should be a (m x p) Array representing
         * the expected outputs of the last layer in the network.  Note that (p === r) in this case.
         */

    }, {
        key: "backPropagate",
        value: function backPropagate(expectedOutputs) {

            var expectedOutputsMatrix = new _vectorious.Matrix(expectedOutputs);
            var totalError = 0,
                lastLayerIndex = this._layers.length - 1,
                inputWeights = null,
                nextLayerErrors = expectedOutputsMatrix,
                newWeights = _ArrayUtils2.default.create1D(this.weights.length, null);
            var currLayer = void 0,
                outputWeights = void 0;

            for (var layerIndex = lastLayerIndex; layerIndex >= 0; layerIndex--) {
                currLayer = this.layers[layerIndex];

                outputWeights = null;

                if (inputWeights !== null) {
                    outputWeights = inputWeights.transpose(); // HMMMMMMMMM
                }

                inputWeights = this.weights[layerIndex];

                newWeights[layerIndex] = currLayer.backProp(inputWeights, outputWeights, nextLayerErrors, this.epoch);
                nextLayerErrors = currLayer.errors;
            }

            this._weights = newWeights;

            this._fireCallback(NeuralNetwork.NEURAL_NETWORK_BACK_PROP_COMPLETE);

            return totalError;
        }

        /**
         * This will create the weights to be used in this neural network.
         *
         * It will return an Array of Matrix objects, where each Matrix object
         * is of size (n x p).
         *
         * n = # of inputs / # of incoming weights per node
         * p = # of nodes in current layer / "this._numNodes"
         *
         * @private
         */

    }, {
        key: "_createWeights",
        value: function _createWeights() {
            (0, _Assert.assert)(this._layers.length >= 2, "You must have at least 2 layers");

            var toRet = [null];
            var prevNodes = this._layers[0].numNodes;
            var currNodes = void 0,
                totalNodes = void 0,
                currArray = void 0,
                currVector = void 0,
                currMatrix = void 0,
                currLayer = void 0;

            for (var i = 1; i < this._layers.length; i++) {
                currLayer = this._layers[i];
                currNodes = currLayer.numNodes;

                if (currLayer.hasBias) {
                    prevNodes++;
                }

                totalNodes = prevNodes * currNodes;

                currArray = [];

                for (var _i = 0; _i < totalNodes; _i++) {
                    currArray[_i] = this._weightInitializer.createRandomWeight(prevNodes, currNodes);
                }

                currVector = new _vectorious.Vector(currArray);
                currMatrix = new _vectorious.Matrix(currVector, { shape: [prevNodes, currNodes] });
                toRet[i] = currMatrix;
                prevNodes = currNodes;
            }

            return toRet;
        }

        /**
         * This will return the weights for all layers of the neural network.  Think of these
         * as input weights for the corresponding layer.  Note that the first layer has no weights
         * so it's weight value is null.
         *
         * @returns {Array} An array of Matrix types
         */

    }, {
        key: "_fireCallback",


        /**
         * This method will fire the callback.
         * @param type {Number} Use one of the static props at the top of this class NEURAL_NETWORK_FEED_FORWARD_*
         * @private
         */
        value: function _fireCallback(type) {
            if (!!this._callback) {
                this._callback({
                    type: type,
                    source: this
                });
            }
        }
    }, {
        key: "weights",
        get: function get() {
            if (this._weights === null) {
                this._weights = this._createWeights();
            }

            return this._weights;
        }

        /**
         * This will set the Array of weights objects.
         *
         * @param value {Array} These are the weights to set.  Note that the first weight must be null (for the input
         * layer).
         */
        ,
        set: function set(value) {
            (0, _Assert.assert)(value[0] === null, "First weights matrix must be null");

            var toSet = [null];

            for (var i = 1; i < value.length; i++) {
                toSet[i] = new _vectorious.Matrix(value[i]);
            }

            this._weights = toSet;
        }

        /**
         * This will return all the layers of this network.  Do not modify this array directly.
         * @returns {Array}
         */

    }, {
        key: "layers",
        get: function get() {
            return this._layers;
        }

        /**
         * This returns the current epoch number.
         * @returns {number} The current epoch number.
         */

    }, {
        key: "epoch",
        get: function get() {
            return this._epoch;
        }

        /**
         * This sets the current epoch number
         * @param value {number} The current epoch number.
         */
        ,
        set: function set(value) {
            this._epoch = value;
        }

        /**
         * This specifies whether or not this NN should include a bias term with a 1 value for all layers
         * @returns {boolean}
         */

    }, {
        key: "includeBias",
        get: function get() {
            return this._includeBias;
        }

        /**
         * This specifies whether or not this NN should include a bias term with a 1 value for all layers
         * @param value {boolean}
         */
        ,
        set: function set(value) {
            this._includeBias = value;
        }
    }]);

    return NeuralNetwork;
}();

exports.default = NeuralNetwork;