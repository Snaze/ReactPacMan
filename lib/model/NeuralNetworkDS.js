"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _NeuralNetwork = require("./ai/ann/NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _NeuralNetworkNodeDS = require("./NeuralNetworkNodeDS");

var _NeuralNetworkNodeDS2 = _interopRequireDefault(_NeuralNetworkNodeDS);

var _ArrayUtils = require("../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeuralNetworkDS = function (_DataSourceBase) {
    _inherits(NeuralNetworkDS, _DataSourceBase);

    function NeuralNetworkDS(neuralNetwork) {
        _classCallCheck(this, NeuralNetworkDS);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkDS.__proto__ || Object.getPrototypeOf(NeuralNetworkDS)).call(this));

        _this._nnCallbackRef = function (e) {
            return _this._nnCallback(e);
        };
        _this._updateFromSourceRef = function (e) {
            return _this._updateFromSource(e);
        };

        _this._neuralNetwork = neuralNetwork;
        _this._neuralNetworkOriginalCallback = _this._neuralNetwork.callback;
        _this._neuralNetwork.callback = _this._nnCallbackRef;
        _this._nodes = NeuralNetworkDS.createNeuralNetworkNodes(neuralNetwork);

        _this._totalError = neuralNetwork.totalError;
        _this._epochs = neuralNetwork.epochs;
        _this._nodesPerLayer = neuralNetwork.nodesPerLayer;
        _this._includeBias = neuralNetwork.includeBias;
        _this._weights = neuralNetwork.getWeights();

        _this._callbackFunctions = {};
        _this._callbackFunctions[_NeuralNetwork2.default.NEURAL_NETWORK_FEED_FORWARD_COMPLETE] = _this._updateFromSourceRef;
        _this._callbackFunctions[_NeuralNetwork2.default.NEURAL_NETWORK_EPOCH_COMPLETE] = _this._updateFromSourceRef;
        _this._callbackFunctions[_NeuralNetwork2.default.NEURAL_NETWORK_BACK_PROP_COMPLETE] = _this._updateFromSourceRef;
        _this._callbackFunctions[_NeuralNetwork2.default.NEURAL_NETWORK_TRAINING_COMPLETE] = _this._updateFromSourceRef;
        return _this;
    }

    _createClass(NeuralNetworkDS, [{
        key: "_nnCallback",
        value: function _nnCallback(e) {
            if (!!this._neuralNetworkOriginalCallback) {
                this._neuralNetworkOriginalCallback(e);
            }

            if (!!this._callbackFunctions[e.type]) {
                // Limit the updates
                if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_EPOCH_COMPLETE) {

                    this._callbackFunctions[e.type](e.source);
                    _ArrayUtils2.default.traverse2D(this._nodes, function (node) {
                        return node.backPropComplete();
                    });
                }

                // console.log("!!this._callbackFunctions[e.type]");
            } else {
                throw new Error("Unknown Neural Network Event");
            }

            // console.log("_nnCallback callback");
        }
    }, {
        key: "_updateFromSource",
        value: function _updateFromSource(nn) {
            this._totalError = nn.totalError;
            this._epochs = nn.epochs;
            this._nodesPerLayer = nn.nodesPerLayer;
            this._includeBias = nn.includeBias;
            this._weights = nn.getWeights();
            this._raiseOnChangeCallbacks("_neuralNetwork", null, this.neuralNetwork);
        }
    }, {
        key: "train",


        /**
         *
         * @param nnParameter {NeuralNetworkParameter}
         */
        value: function train(nnParameter) {

            var originalCallback = this.neuralNetwork.callback;

            this.neuralNetwork.callback = function (e) {
                if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_TRAINING_COMPLETE) {
                    this.stop();

                    if (!!originalCallback) {
                        // TODO: WHOA THIS IS WHACK - Add an add / remove handler for this event on the NN object
                        originalCallback(e);
                        this.neuralNetwork.callback = originalCallback;
                    }
                } else {
                    originalCallback(e);
                }
            }.bind(this);

            this.neuralNetwork.train(nnParameter);
            _ArrayUtils2.default.traverse2D(this._nodes, function (item) {
                return item.start();
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            this._neuralNetwork.stopTimer();

            _ArrayUtils2.default.traverse2D(this._nodes, function (item) {
                return item.stop();
            });
        }
    }, {
        key: "getNeuralNetworkNode",
        value: function getNeuralNetworkNode(layerIndex, nodeIndex) {
            return this._nodes[layerIndex][nodeIndex];
        }
    }, {
        key: "neuralNetwork",
        get: function get() {
            return this._neuralNetwork;
        }
    }, {
        key: "totalError",
        get: function get() {
            return this._totalError;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_totalError", value);
        }
    }, {
        key: "epochs",
        get: function get() {
            return this._epochs;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_epochs", value);
        }
    }, {
        key: "nodes",
        get: function get() {
            return this._nodes;
        }
    }, {
        key: "nodesPerLayer",
        get: function get() {
            return this._nodesPerLayer;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_nodesPerLayer", value);
        }
    }, {
        key: "includeBias",
        get: function get() {
            return this._includeBias;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_includeBias", value);
        }
    }, {
        key: "weights",
        get: function get() {
            return this._weights;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_weights", value);
        }
    }], [{
        key: "createNeuralNetworkNodes",
        value: function createNeuralNetworkNodes(nn) {
            var toRet = [];

            nn.iterateOverNodes(function (node, nodeIndex, layerIndex) {
                if (typeof toRet[layerIndex] === "undefined") {
                    toRet[layerIndex] = [];
                }

                toRet[layerIndex][nodeIndex] = new _NeuralNetworkNodeDS2.default(node);
            });

            return toRet;
        }
    }]);

    return NeuralNetworkDS;
}(_DataSourceBase3.default);

exports.default = NeuralNetworkDS;