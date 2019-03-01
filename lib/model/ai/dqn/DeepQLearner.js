"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NeuralNetwork = require("../ann/NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _ActivationFunctions = require("../ann/ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _Assert = require("../../../utils/Assert");

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _MathUtil = require("../MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

var _WeightInitializer = require("../ann/WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

var _BackPropFactory = require("../ann/backprop/BackPropFactory");

var _BackPropFactory2 = _interopRequireDefault(_BackPropFactory);

var _ReplayMemory = require("./ReplayMemory");

var _ReplayMemory2 = _interopRequireDefault(_ReplayMemory);

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _Transition = require("./Transition");

var _Transition2 = _interopRequireDefault(_Transition);

var _moment = require("../../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This will train a Q-Learner whose Q value is approximated by a neural network.
 */
var DeepQLearner = function () {

    /**
     * Constructor for DeepQLearner.
     *
     * @param trainingVectorSize {Number} This is the size of the trainingVector that you will be inputting into the Neural
     * Network.  Note that this will be smaller than what I used to refer to as the "feature vector".  This vector
     * should really just be called the state vector.
     * @param numActions {Number} This is the number of actions that can be performed by the DeepQLearner
     * @param alpha {Number} This is the initial learning rate of the neural network.
     * @param gamma {Number} This is the discount rate.
     * @param rar {Number} This is the Random Action Rate.  (Percent chance to take a random action).
     * @param radr {Number} This is the Random Action Decay Rate.  Each iteration the rar is multiplied by this value.
     * @param verbose {Boolean} This dictates whether or not you want verbose output.
     * @param epochSize {Number} This will increment the epoch and effectively reduce the learning rate.
     * @param numHiddenLayers {Number} The number of hidden layers to use in the neural network.
     * @param maxEpochs {Number} The epoch number where the learning rate bottoms out.  It also specifies how many
     * episodes to perform in the learn method.
     * @param replayMemoryCapacity {Number} This is the capacity of the ReplayMemory object.
     * @param sequenceSize {Number} This will designate how much history to keep in the preprocessed sequence objects.
     * It will also dictate the input size of the Neural Network.
     * @param miniBatchSize {Number} This is the size of the minibatch of transitions to train in the Neural Network in
     * a single feedforward/backprop pass.
     * @param learnTimeBuffer {Number} This is the number of milliseconds to wait in addition to a single run of learnOne
     * until the next call to learnOne is executed (via an interval).
     */
    function DeepQLearner(trainingVectorSize) {
        var numActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.03;
        var gamma = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.9;
        var rar = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.98;
        var radr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.9999;
        var verbose = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
        var epochSize = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1000;
        var numHiddenLayers = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 3;
        var maxEpochs = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1000;
        var replayMemoryCapacity = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 100000;
        var sequenceSize = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 4;
        var miniBatchSize = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 10;
        var learnTimeBuffer = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 100;

        _classCallCheck(this, DeepQLearner);

        (0, _Assert.assert)(radr > 0, "radr must be greater than 0");

        this._trainingVectorSize = trainingVectorSize;
        this._numActions = numActions;
        this._alpha = alpha;
        this._gamma = gamma;
        this._rar = rar;
        this._radr = radr;
        this._verbose = verbose;
        this._epochSize = epochSize;
        this._numHiddenLayers = numHiddenLayers;
        this._queryCount = 0;
        this._maxEpochs = maxEpochs;
        this._totalError = 0;
        this._outputError = 0;
        this._epochNum = 0;
        this._tickNum = 0;
        this._qValues = null;
        this._replayMemoryCapacity = replayMemoryCapacity;
        this._replayMemory = new _ReplayMemory2.default(replayMemoryCapacity);
        this._sequenceSize = sequenceSize;
        this._learning = false;
        this._miniBatchSize = miniBatchSize;
        this._learningInterval = null;
        this._learnTimeBuffer = learnTimeBuffer;
        this._experienceReplayEnabled = true;

        this._nodesPerLayer = DeepQLearner.createNodesPerLayerArray(numActions, trainingVectorSize, numHiddenLayers, sequenceSize);
        this._neuralNetwork = DeepQLearner.createNeuralNetwork(this._nodesPerLayer, this._maxEpochs, this._alpha);
        this._s = 0;
        this._a = 0;
    }

    /**
     * This instantiates the Neural Network
     * @param nodesPerLayer {Array} This is the array that specifies the number of nodes to include
     * in each layer of the NeuralNetwork.
     * @param maxEpochs {Number} This specifies the epoch number where the learning rate reaches its
     * minimum value.
     * @param alpha {Number} Initial learning rate.
     * @returns {NeuralNetwork}
     */


    _createClass(DeepQLearner, [{
        key: "log",
        value: function log(toLog) {
            if (this._verbose && typeof console !== "undefined") {
                console.log(toLog);
            }
        }

        /**
         * Update the state without updating the neural network
         *
         * @param s {Array} The new state represented as an array
         * @returns {Number} The number representing the next action to take.
         */

    }, {
        key: "querySetState",
        value: function querySetState(s) {

            (0, _Assert.assert)(s.length === this._trainingVectorSize, "Invalid State Vector Size");

            var action = this.getAction(s, false);

            this._s = s;
            this._a = action;

            return action;
        }

        /**
         * Update the Q table and return an action.
         *
         * @param sPrime {Array} the array representing state sPrime.
         * @param r {Number} the reward for entering state sPrime.
         * @returns {Number} returns the next action.
         *
         * http://neuro.cs.ut.ee/demystifying-deep-reinforcement-learning/
         */

    }, {
        key: "query",
        value: function query(sPrime, r) {

            (0, _Assert.assert)(sPrime.length === this._trainingVectorSize, "Invalid State Vector Size");

            var qValuesForNextState = this.getQValueForAllActions(sPrime);
            var qValuesForCurrentState = this.getQValueForAllActions(this._s);
            this._qValues = qValuesForCurrentState;

            var randomValue = Math.random();
            var aPrime = void 0;

            if (this._rar >= randomValue) {
                aPrime = Math.floor(Math.random() * this._numActions);
            } else {
                aPrime = _MathUtil2.default.argMax(qValuesForNextState);
            }

            this._rar *= this._radr;

            var qValueForNextState = qValuesForNextState[aPrime];

            var qValueTargets = _ArrayUtils2.default.copy(qValuesForCurrentState);
            var error = qValueTargets[this._a];
            qValueTargets[this._a] = r + this._gamma * qValueForNextState;
            this._outputError = Math.abs(error - qValueTargets[this._a]);

            this._totalError = this._neuralNetwork.backPropagate([qValueTargets]);

            // this.log(`totalError = ${this._totalError}`);
            // this.log(`rar = ${this._rar}`);
            // this.log(`error = ${error}`);

            this._s = sPrime;
            this._a = aPrime;

            this._queryCount++;
            if (this._queryCount % this._epochSize === 0) {
                this._neuralNetwork.epochs = this._neuralNetwork.epochs + 1;
            }

            return aPrime;
        }
    }, {
        key: "getAction",
        value: function getAction(state) {
            var updateRar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


            var randomValue = Math.random();
            var aPrime = void 0;

            if (this._rar >= randomValue) {
                aPrime = Math.floor(Math.random() * this._numActions);
            } else {
                aPrime = this.getActionWithLargestQValue(state);
            }

            if (updateRar) {
                this._rar *= this._radr;
            }

            return aPrime;
        }
    }, {
        key: "getActionWithLargestQValue",
        value: function getActionWithLargestQValue(sPrime) {
            var output = this.getQValueForAllActions(sPrime);
            return _MathUtil2.default.argMax(output); // This should be the action number with the highest q-value
        }
    }, {
        key: "getQValueForAllActions",
        value: function getQValueForAllActions(state) {
            (0, _Assert.assert)(state.length === this.inputSize, "state is the wrong size");

            return this._neuralNetwork.predict([state])[0];
        }

        /**
         * This method will stop the interval causing the DeepQLearner to continue learning.
         */

    }, {
        key: "stopLearning",
        value: function stopLearning() {
            if (this._learningInterval !== null) {
                clearInterval(this._learningInterval);
                this._learningInterval = null;
            }
        }

        /**
         * This will kick off an interval that performs learning (and will be in charge of incrementing the
         * game state.
         *
         * @param executeActionCallback {Function} The deep Q Learner will call this callback to interact with the
         * environment.  This will pass (this, actionNum) and the callback should return {reward_t, state_t+1, isTerminal}
         * @param initialState {Array} This should be an array representing the initial state.
         */

    }, {
        key: "learn",
        value: function learn(executeActionCallback, initialState) {
            (0, _Assert.assert)(executeActionCallback !== null, "executeActionCallback must be a valid function");
            (0, _Assert.assert)(initialState instanceof Array, "initialState should be instance of an Array");

            this._neuralNetwork = DeepQLearner.createNeuralNetwork(this._nodesPerLayer, this._maxEpochs, this._alpha);
            this._replayMemory = new _ReplayMemory2.default(this._replayMemoryCapacity);

            this.stopLearning();

            var startTime = (0, _moment2.default)();
            this.learnOne(executeActionCallback, initialState);
            var endTime = (0, _moment2.default)();

            if (this._maxEpochs <= this._epochNum) {
                // Nothing else to do.  One epoch.
                return;
            }

            var duration = _moment2.default.duration(endTime.diff(startTime));
            var timeBetweenTicks = duration.asMilliseconds() + this._learnTimeBuffer;

            setInterval(function () {
                this.learnOne(executeActionCallback, initialState);

                if (this._maxEpochs <= this._epochNum) {
                    this.stopLearning();
                }
            }.bind(this), timeBetweenTicks);
        }

        /**
         * If the tickNum === 0, then set the current state to a new Sequence populated
         * with the initialState.
         * @param initialState
         * @private
         */

    }, {
        key: "_setInitialState",
        value: function _setInitialState(initialState) {
            if (this._tickNum === 0) {
                this._s = new _Sequence2.default(initialState, this.sequenceSize);
            }
        }

        /**
         * This is the heart of the Deep Q-Learning algorithm.  This method represents Algorithm 1 from
         * "Playing Atari with Deep Reinforcement Learning", which can be found in the /doc folder of this project.
         *
         * @param executeActionCallback {Function} The deep Q Learner will call this callback to interact with the
         * environment.  This will pass (this, actionNum) and the callback should return {reward_t, state_t+1, isTerminal}
         * @param initialState {Array} This should be an array representing the initial state.
         * @returns {Number} Returns the Total Error of the entire Neural Network.
         * @private
         */

    }, {
        key: "_learnOne",
        value: function _learnOne(executeActionCallback, initialState) {
            this._setInitialState(initialState);

            var currentPreProcessedSequence = this.sequence.createPreProcessedSequence();
            var aPrime = this.getAction(currentPreProcessedSequence.toInput(), false);

            var result = executeActionCallback(this, aPrime); // { reward: 1, state: [6], isTerminal: false }
            // this.log(`reward = ${result.reward}`);
            // this.log(`state = ${result.state}`);

            var sequenceTPlus1 = this._s.clone();
            sequenceTPlus1.append(aPrime, result.state);
            var preProcessedTPlus1 = sequenceTPlus1.createPreProcessedSequence();

            this._s = preProcessedTPlus1;
            this._a = aPrime;

            // If experience replay is disabled. Just return -1 here.
            if (!this.experienceReplayEnabled) {
                return -1.0;
            }

            var transition = new _Transition2.default(currentPreProcessedSequence, aPrime, result.reward, preProcessedTPlus1, this._tickNum, 1e-9);

            this.replayMemory.store(transition);

            var miniBatch = this.replayMemory.sampleRandomMinibatch(this._miniBatchSize);

            var targetValues = this.convertMiniBatchToTargetValues(miniBatch, result.isTerminal);
            var predictedValues = this.convertMiniBatchToPredictedValues(miniBatch);

            var temp = this.performGradientDescent(targetValues, predictedValues);
            // this.replayMemory.updateTDErrors(miniBatch, temp.tdErrors);

            var toRet = temp.error;

            if (result.isTerminal) {
                this._incrementEpoch(toRet);
            } else {
                this._tickNum++;
            }

            return toRet;
        }
    }, {
        key: "_incrementEpoch",
        value: function _incrementEpoch(currentError) {
            this._rar *= this._radr;

            var theWeights = this._neuralNetwork.getWeights();
            var theWeightsJSON = JSON.stringify(theWeights);
            if (typeof window !== "undefined" && !!window.localStorage) {
                window.localStorage.setItem("DeepQWeights", theWeightsJSON);
                this.log("DeepQWeights Set");
            }

            // this.log(`Neural Network weights = ${theWeightsJSON}`);
            this._epochNum++;

            this._neuralNetwork.epochs = this._epochNum;
            this.log("rar = " + this._rar);
            this.log("radr = " + this._radr);
            this.log("learningRate = " + this._neuralNetwork.learningRate);
            this.log("Epoch " + this._epochNum + " finished with " + this._tickNum + " ticks.  Total Error = " + currentError);

            this._tickNum = 0;

            if (this._epochNum >= this._maxEpochs) {
                this.log("Max Epoch Reached.  Disabling Experience Replay");
                this.experienceReplayEnabled = false;
            }
        }

        /**
         * This will be called by the interval to perform one iteration of the learning algorithm.
         *
         * @param executeActionCallback {Function} The deep Q Learner will call this callback to interact with the
         * environment.  This will pass (this, actionNum) and the callback should return {reward_t, state_t+1, isTerminal}
         * @param initialState {Array} This should be an array representing the initial state.
         * @returns {number} Returns the total error of all the nodes in the neural network.
         */

    }, {
        key: "learnOne",
        value: function learnOne(executeActionCallback, initialState) {
            var totalError = Number.POSITIVE_INFINITY;

            if (this._learning) {
                return totalError;
            }
            this._learning = true;

            try {
                totalError = this._learnOne(executeActionCallback, initialState);
            } catch (e) {
                this.log(e);
            } finally {
                this._learning = false;
            }

            return totalError;
        }

        /**
         * This method performs the gradient descent step of the Deep Q-Network.  The most important thing
         * to note about calling this method, is that we must have performed the feed forward step for the predicted
         * values most recently (due to how the Neural Network stores previous outputs and errors that are used
         * in the Backpropagation).  I may want to fix that at some point.
         *
         * @param targetValues {Array} Array of arrays of the target value objects which should look like
         * { qValuesForEachAction, maxAction, maxQValue, targetValue }
         * @param predictedValues {Array} Array of arrays of predicated value objects which should look like
         * { qValuesForEachAction, action, qValue }
         * @returns {Number} Returns the absolute value of the total error of all the nodes in the Neural Network/
         */

    }, {
        key: "performGradientDescent",
        value: function performGradientDescent(targetValues, predictedValues) {
            (0, _Assert.assert)(targetValues.length === predictedValues.length, "These need to be the same length");
            var tdErrors = [];
            /**
             * This is creating the expected output for the Neural Network.  All the values are left the
             * same except for the value for the action taken to receive the reward.  We know the value of this
             * action should be the reward for entering the current state plus the discounted future of the optimal
             * policy. targetValue = (r + gamma * max_a( Q(s', a') )
             * @type {Array}
             */
            var outputMiniBatch = predictedValues.map(function (predictedValueObj, index) {
                var targetValueObj = targetValues[index];
                var toRet = predictedValueObj.qValuesForEachAction;
                tdErrors[index] = Math.abs(targetValueObj.targetValue - predictedValueObj.qValuesForEachAction[predictedValueObj.action]);
                toRet[predictedValueObj.action] = targetValueObj.targetValue;

                (0, _Assert.assert)(toRet.length === this.outputSize, "Invalid size of expected output");
                return toRet;
            }.bind(this));

            var error = this._neuralNetwork.backPropagate(outputMiniBatch);
            return {
                error: error,
                tdErrors: tdErrors
            };
        }

        /**
         * This method will convert a miniBatch of Transition objects into predictions
         * from the Neural Network
         * @param miniBatchOfTransitions {Array}
         * @returns {Array} Array of objects containing the predictions along with other information.
         */

    }, {
        key: "convertMiniBatchToPredictedValues",
        value: function convertMiniBatchToPredictedValues(miniBatchOfTransitions) {
            var miniBatchOfActions = [];
            var miniBatch = miniBatchOfTransitions.map(function (transition, index) {
                var toRet = transition.sequenceT.toInput();
                miniBatchOfActions[index] = transition.actionT;

                (0, _Assert.assert)(toRet.length === this.inputSize, "Invalid Input Size");
                (0, _Assert.assert)(transition.actionT >= 0 && transition.actionT < this.numActions, "Invalid ActionT Found");

                return toRet;
            }.bind(this));

            var result = this._neuralNetwork.feedForward(miniBatch);

            return result.map(function (qValuesForEachAction, index) {
                return {
                    qValuesForEachAction: qValuesForEachAction,
                    action: miniBatchOfActions[index],
                    qValue: qValuesForEachAction[miniBatchOfActions[index]]
                };
            });
        }

        /**
         * This will convert an Array of Transition objects into
         * an Array of target values.
         *
         * if Phi_j+1 is terminal --> y_j = r_j
         * if Phi_j+1 is non-terminal --> y_j = r_j + gamma * max_a'( Q(Phi_j+1, a'; Theta) )
         *
         * @param miniBatchOfTransitions {Array} Array of Transition objects.
         * @param isTerminal {Boolean} This specifies whether or not the next sequence j+1 is terminal
         * or not
         * @returns {Array} Returns array of objects containing the target values and other important data.
         */

    }, {
        key: "convertMiniBatchToTargetValues",
        value: function convertMiniBatchToTargetValues(miniBatchOfTransitions, isTerminal) {

            // if (isTerminal) {
            //     return miniBatchOfTransitions.map(function (transition) {
            //         return transition.rewardT;
            //     });
            // }

            var miniBatch = miniBatchOfTransitions.map(function (transition) {
                var toRet = transition.sequenceTPlus1.toInput();
                (0, _Assert.assert)(toRet.length === this.inputSize, "Invalid Input Size");
                return toRet;
            }.bind(this));

            // This should output miniBatch x _sequenceSize Array
            var result = this._neuralNetwork.feedForward(miniBatch);
            var gamma = this.gamma;

            return result.map(function (qValuesForEachAction, index) {
                var maxAction = _MathUtil2.default.argMax(qValuesForEachAction);
                var maxQ = qValuesForEachAction[maxAction];
                var currentTransition = miniBatchOfTransitions[index];

                var targetValue = currentTransition.rewardT;
                if (!isTerminal) {
                    targetValue += gamma * maxQ;
                }

                return {
                    qValuesForEachAction: qValuesForEachAction,
                    maxAction: maxAction,
                    maxQValue: maxQ,
                    targetValue: targetValue
                };
            });
        }
    }, {
        key: "outputSize",
        get: function get() {
            return this._nodesPerLayer[this._nodesPerLayer.length - 1];
        }
    }, {
        key: "inputSize",
        get: function get() {
            return this._nodesPerLayer[0];
        }
    }, {
        key: "trainingVectorSize",
        get: function get() {
            return this._trainingVectorSize;
        }
    }, {
        key: "numActions",
        get: function get() {
            return this._numActions;
        }
    }, {
        key: "alpha",
        get: function get() {
            return this._alpha;
        }
    }, {
        key: "gamma",
        get: function get() {
            return this._gamma;
        }
    }, {
        key: "rar",
        get: function get() {
            return this._rar;
        },
        set: function set(value) {
            this._rar = value;
        }
    }, {
        key: "radr",
        get: function get() {
            return this._radr;
        }
    }, {
        key: "verbose",
        get: function get() {
            return this._verbose;
        }
    }, {
        key: "epochSize",
        get: function get() {
            return this._epochSize;
        }
    }, {
        key: "numHiddenLayers",
        get: function get() {
            return this._numHiddenLayers;
        }
    }, {
        key: "epochs",
        get: function get() {
            return this._neuralNetwork.epochs;
        }
    }, {
        key: "weights",
        get: function get() {
            return this._neuralNetwork.getWeights();
        },
        set: function set(value) {
            this._neuralNetwork.setWeights(value);
        }
    }, {
        key: "totalError",
        get: function get() {
            return this._totalError;
        }
    }, {
        key: "outputError",
        get: function get() {
            return this._outputError;
        }
    }, {
        key: "qValues",
        get: function get() {
            return this._qValues;
        }
    }, {
        key: "sequence",
        get: function get() {
            return this._s;
        }
    }, {
        key: "sequenceSize",
        get: function get() {
            return this._sequenceSize;
        }
    }, {
        key: "replayMemory",
        get: function get() {
            return this._replayMemory;
        }
    }, {
        key: "epochNum",
        get: function get() {
            return this._epochNum;
        }
    }, {
        key: "tickNum",
        get: function get() {
            return this._tickNum;
        }

        /**
         * Use this property to control whether the NN should continue learning based on Experience Replay
         * or the Learner should kicks off actions based on the optimal action value of the NN
         * (without continuing to train).
         *
         * @returns {boolean}
         */

    }, {
        key: "experienceReplayEnabled",
        get: function get() {
            return this._experienceReplayEnabled;
        }

        /**
         * Use this property to control whether the NN should continue learning based on Experience Replay
         * or the Learner should kicks off actions based on the optimal action value of the NN
         * (without continuing to train).
         *
         * @param value {boolean}
         */
        ,
        set: function set(value) {
            this._experienceReplayEnabled = value;
        }
    }], [{
        key: "createNeuralNetwork",
        value: function createNeuralNetwork(nodesPerLayer, maxEpochs) {
            var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.03;

            var toRet = new _NeuralNetwork2.default(nodesPerLayer, true, _ActivationFunctions2.default.lrelu, alpha, _WeightInitializer2.default.COMPRESSED_NORMAL, null, true, 0.001, _BackPropFactory2.default.BACK_PROP_TYPE_ADAM_MATRIX);
            toRet.maxEpochs = maxEpochs;

            if (typeof window !== "undefined" && !!window.localStorage) {

                var theWeightsJSON = window.localStorage.getItem("DeepQWeights");
                if (!!theWeightsJSON) {
                    var theWeights = JSON.parse(theWeightsJSON);
                    toRet.setWeights(theWeights);
                    if (!!console) {
                        console.log("Weights Loaded from Storage");
                    }
                }
            }
            if (typeof window !== "undefined") {
                window.neuralNetwork = toRet;
                if (!!console) {
                    console.log("window.neuralNetwork created");
                }

                window.deepQLearner = this;
            }

            return toRet;
        }

        /**
         * This will create the "NodePerLayer" array to pass into the neural network constructor.
         *
         * @param numActions {Number} This is the number of actions that can be performed.
         * @param trainingVectorSize {Number} This is the size of the trainingVector.
         * @param numHiddenLayers {Number} This is the number of hidden layers you want.
         * @param sequenceSize {Number} This is the number sequences that will be input into
         * the neural network.
         * @returns {Array} This is the "NodesPerLayer" array to pass into the neural network.
         */

    }, {
        key: "createNodesPerLayerArray",
        value: function createNodesPerLayerArray(numActions, trainingVectorSize, numHiddenLayers, sequenceSize) {
            (0, _Assert.assert)(numHiddenLayers > 0, "numHiddenLayers must be greater than 0");

            var toRet = [];
            var numInputBits = trainingVectorSize * sequenceSize;

            toRet.push(numInputBits);

            while (numHiddenLayers > 0) {
                toRet.push(numInputBits);
                numHiddenLayers--;
            }

            toRet.push(numActions);

            return toRet;
        }
    }]);

    return DeepQLearner;
}();

exports.default = DeepQLearner;