import NeuralNetworkNode from "./NeuralNetworkNode";
import ActivationFunctions from "./ActivationFunctions";
import { assert } from "../../../utils/Assert";
import math from "../../../../node_modules/mathjs/dist/math";
import ArrayUtils from "../../../utils/ArrayUtils";
import MathUtil from "../MathUtil";
import moment from "../../../../node_modules/moment/moment";
import Normalizer from "./Normalizer";
import NeuralNetworkParameter from "./NeuralNetworkParameter";

class NeuralNetwork {

    constructor(nodesPerLayer,
                includeBias=true,
                activationFunction=ActivationFunctions.sigmoid,
                learningRate=1.0) {
        this._nodesPerLayer = nodesPerLayer;
        this._includeBias = includeBias;
        this._activationFunction = activationFunction;
        this._learningRate = learningRate;
        this._nodes = NeuralNetwork.createNodes(nodesPerLayer, includeBias, activationFunction, learningRate);
        this._output = null;
        this._epoch = 0;
        this._totalError = 0;
        this._normalizer = new Normalizer(activationFunction);
        this._inputsNormalized = false;
        this._debug = true;

        this._trainingParameter = null;
        this._prevWeights = [];
        this._minErrorWeights = null;
        this._minErrorValue = Number.POSITIVE_INFINITY;
        this._minErrorEpoch = this._epoch;
        this._epochInProgress = false;
        this._trainInterval = null;
        this._timerTickRef = (e) => this._timerTick(e);
    }

    setWeights(weights) {
        weights.forEach(function (weightLayer, layerIndex) {
            weightLayer.forEach(function (nodeWeights, nodeIndex) {
                this._nodes[layerIndex][nodeIndex].weights = nodeWeights;
            }.bind(this));
        }.bind(this));
    }

    getWeights() {
        let toRet = [];

        this._nodes.forEach(function (layer, layerIndex) {
            toRet[layerIndex] = [];

            layer.forEach(function (node, nodeIndex) {
                toRet[layerIndex][nodeIndex] = node.weights.slice(0);
            });
        });

        return toRet;
    }

    static createNodes(nodesPerLayer, includeBias, activationFunction, learningRate) {

        let toRet = [];
        let layerNum = 0;
        let prevNumNodes = nodesPerLayer[0];

        nodesPerLayer.forEach(function (numNodes) {

            toRet[layerNum] = [];

            for (let nodeIndex = 0; nodeIndex < numNodes; nodeIndex++) {
                let toSet = new NeuralNetworkNode(prevNumNodes, includeBias, activationFunction);
                toSet.learningRate = learningRate;
                toRet[layerNum][nodeIndex] = toSet;
            }

            layerNum++;
            prevNumNodes = numNodes;
        });

        return toRet;
    }

    /**
     * This will calculate the error based on the output nodes.
     *
     * @param expectedArray A 1D array of values that correspond to each output node.
     * @param actualArray A 1D array of values corresponding to the actual output
     */
    static calculateError(expectedArray, actualArray) {

        assert (expectedArray.length === actualArray.length);

        let toRet = 0;

        for (let i = 0; i < expectedArray.length; i++) {
            toRet += NeuralNetworkNode.calculateError(expectedArray[i], actualArray[i]);
        }

        return toRet;
    }

    static calculateMaxErrorForMiniBatch(expectedMiniBatch, actualMiniBatch) {

        assert (expectedMiniBatch.length === actualMiniBatch.length);
        assert (expectedMiniBatch.length > 0);

        let maxError = Number.NEGATIVE_INFINITY;
        let currentError = null;

        for (let i = 0 ; i < expectedMiniBatch.length; i++) {
            currentError = NeuralNetwork.calculateError(expectedMiniBatch[i], actualMiniBatch[i]);

            maxError = math.max(maxError, currentError);
        }

        return maxError;
    }

    log(toLog) {
        if (!!console && this._debug) {
            console.log(toLog);
        }
    }

    /**
     *
     * @param trainingParameter {NeuralNetworkParameter} All the params to train with.
     * @returns {number} Ignore this value.  It's for the unit tests. TODO: clean this up.
     */
    train(trainingParameter) {

        assert (trainingParameter.inputs.length === trainingParameter.expectedOutputs.length, "inputs.length must equals expectedOutputs.length");

        // this._inputs = inputs;
        // this._expectedOutputs = expectedOutputs;
        this._trainingParameter = trainingParameter;
        this._minErrorWeights = null;
        this._minErrorValue = Number.POSITIVE_INFINITY;
        this._minErrorEpoch = this._epoch;
        this._epoch = 0;
        this._inputsNormalized = this._trainingParameter.normalizeInputs;

        if (this._trainingParameter.normalizeInputs) {
            this._trainingParameter.inputs = this._normalizer.normalize(this._trainingParameter.inputs, true);
        }

        let startTime = moment();
        this.trainOne(trainingParameter);
        let endTime = moment();

        let duration = moment.duration(endTime.diff(startTime));
        let milliSecDuration = duration.asMilliseconds() + 200; // + 200 for buffer
        // let milliSecDuration = 5000;
        this.log(`Training at every ${milliSecDuration}ms interval`);

        // This is dumb
        let error = 0;

        this.stopTimer();
        this._trainInterval = setInterval(function (e) {
            error = this._timerTickRef(trainingParameter);
        }.bind(this), milliSecDuration);

        return error;
    }

    stopTimer(callback) {
        if (this._trainInterval !== null) {
            clearInterval(this._trainInterval);
            this._trainInterval = null;
        }

        if (this._minErrorWeights !== null) {
            this.log(`setting weights found at error = ${this._minErrorValue} found at epoch ${this._minErrorEpoch}`);
            this.setWeights(this._minErrorWeights);
            this._minErrorWeights = null;
        }

        if (!!callback) {
            callback(this);
        }
    }

    /**
     *
     * @param trainParameter {NeuralNetworkParameter}
     * @returns {*}
     * @private
     */
    _timerTick(trainParameter) {
        if (this._epochInProgress) {
            return;
        }
        let startTime = moment();

        this._epochInProgress = true;
        let maxErrorForEpoch;

        try {
            let maxEpochs = trainParameter.maxEpochs;
            let minError = trainParameter.minError;
            let minWeightDelta = trainParameter.minWeightDelta;

            let currWeights;
            let weightDelta = null;

            maxErrorForEpoch = this.trainOne(trainParameter);

            this.log(`maxError = ${maxErrorForEpoch}`);
            this.log(`epoch = ${this._epoch}`);

            if (minWeightDelta !== null)
            {
                currWeights = ArrayUtils.flatten(this.getWeights());

                if (this._prevWeights !== null) {
                    weightDelta = MathUtil.distance(this._prevWeights, currWeights);

                    this.log(`weightDelta = ${weightDelta}`);

                    if (weightDelta < minWeightDelta) {
                        this.stopTimer(trainParameter.finishedTrainingCallback);
                        return;
                    }
                }

                this._prevWeights = currWeights;
            }

            if ((minError !== null && maxErrorForEpoch <= minError) ||
                (maxEpochs !== null && maxEpochs <= this._epoch)) {

                this.stopTimer(trainParameter.finishedTrainingCallback);

            }

        } catch (e) {
            if (!!console) {
                console.log(e);
            }
        } finally {
            this._epochInProgress = false;
        }

        let endTime = moment();
        let duration = moment.duration(endTime.diff(startTime));
        let milliSecDuration = duration.asMilliseconds();
        this.log(`TimerTick took ${milliSecDuration}ms`);

        return maxErrorForEpoch;
    }

    /**
     *
     * @param trainingData {NeuralNetworkParameter}
     * @returns {Number}
     */
    trainOne(trainingData) {
        let inputs = trainingData._inputs;
        let expectedOutputs = trainingData._expectedOutputs;

        let miniBatchSize = trainingData.miniBatchSize;
        let cacheMinError = trainingData.cacheMinError;

        let range = ArrayUtils.range(inputs.length);
        let shuffledRange = ArrayUtils.shuffle(range);
        let miniBatchIndices = null;
        let miniBatchInputs = null;
        let miniBatchOutputs = null;
        let maxErrorForEpoch = Number.NEGATIVE_INFINITY;
        let currentError = null;

        assert (inputs.length === expectedOutputs.length, "inputs.length must equals expectedOutputs.length");

        for (let i = 0; i < shuffledRange.length; i += miniBatchSize) {
            miniBatchIndices = ArrayUtils.take(shuffledRange, miniBatchSize, i);
            miniBatchInputs = ArrayUtils.select(inputs, miniBatchIndices);
            miniBatchOutputs = ArrayUtils.select(expectedOutputs, miniBatchIndices);

            let miniBatchPredictedOutputs = this.feedForward(miniBatchInputs);
            // this.feedForward(miniBatchInputs);
            this.backPropagate(miniBatchOutputs);

            currentError = NeuralNetwork.calculateMaxErrorForMiniBatch(miniBatchOutputs, miniBatchPredictedOutputs);

            maxErrorForEpoch = math.max(maxErrorForEpoch, currentError);
        }

        if (maxErrorForEpoch < this._minErrorValue) {
            this._minErrorValue = maxErrorForEpoch;
            this._minErrorEpoch = this._epoch;

            if (cacheMinError) {
                this._minErrorWeights = this.getWeights();
            }
        }

        this._epoch++;

        if (!!trainingData.epochCompleteCallback) {
            trainingData.epochCompleteCallback(this);
        }

        return maxErrorForEpoch;
    }

    feedForward(inputMiniBatch) {

        let prevLayerOutput = inputMiniBatch;
        let layer = null;
        let node = null;
        let layerOutput = null;

        for (let layerIndex = 0; layerIndex < this._nodes.length; layerIndex++) {
            layer = this._nodes[layerIndex];
            layerOutput = [];

            for (let nodeIndex = 0; nodeIndex < layer.length; nodeIndex++) {
                node = layer[nodeIndex];

                layerOutput[nodeIndex] = node.feedForward(prevLayerOutput);
            }

            prevLayerOutput = ArrayUtils.transpose(layerOutput);
        }

        this._output = prevLayerOutput;

        return this._output;
    }

    predict(inputMiniBatch) {
        if (this._inputsNormalized) {
            inputMiniBatch = this._normalizer.normalize(inputMiniBatch);
        }

        return this.feedForward(inputMiniBatch);
    }

    /**
     * This should be used to backPropagate which makes the NN learn.
     *
     * @param expectedOutputs An array representing what the actual value of the Neural Network should be.
     */
    backPropagate(expectedOutputs) {

        this._totalError = 0;
        let lastLayerIndex = (this._nodes.length - 1);

        // This is the error for each node in the next layer.
        let nextLayerErrors = null;
        let thisLayerErrors = null;

        // This contains all the outgoing weight values mapped to each node
        let nextOutgoingWeights = null;
        let thisOutgoingWeights = null;

        for (let layerIndex = lastLayerIndex; layerIndex >= 0; layerIndex--) {
            thisLayerErrors = [];
            thisOutgoingWeights = [];

            for (let nodeIndex = 0; nodeIndex < this._nodes[layerIndex].length; nodeIndex++) {
                let node = this._nodes[layerIndex][nodeIndex];

                // This updates the weights of the node
                if (layerIndex === lastLayerIndex) {
                    let expectedOutputCol = ArrayUtils.getColumn(expectedOutputs, nodeIndex);
                    thisLayerErrors[nodeIndex] = node.backPropagateOutputNode(expectedOutputCol);
                } else {
                    thisLayerErrors[nodeIndex] = node.backPropagateHiddenNode(nextLayerErrors,
                        nextOutgoingWeights[nodeIndex]);
                }

                // This consolidates the weights into outgoing weights of the previous layer
                for (let prevNodeIndex = 0; prevNodeIndex < node.prevWeights.length; prevNodeIndex++) {

                    if (!thisOutgoingWeights[prevNodeIndex]) {
                        thisOutgoingWeights[prevNodeIndex] = [];
                    }

                    thisOutgoingWeights[prevNodeIndex][nodeIndex] = node.prevWeights[prevNodeIndex];
                }
            }

            nextOutgoingWeights = thisOutgoingWeights;
            nextLayerErrors = ArrayUtils.transpose(thisLayerErrors);

            this._totalError += math.sum(math.mean(math.abs(nextLayerErrors), 0));
        }

        return this._totalError;
    }

    get epochs() {
        return this._epoch;
    }

    get totalError() {
        return this._totalError;
    }

    /**
     * Iterates over all the nodes.
     *
     * @param theFunction Function with the following signature theFunction(node, nodeIndex, layerIndex);
     */
    iterateOverNodes(theFunction) {
        this._nodes.forEach(function (layer, layerIndex) {
            layer.forEach(function (node, nodeIndex) {
                theFunction (node, nodeIndex, layerIndex);
            });
        });
    }
}

export default NeuralNetwork;