"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Edge = require("./Edge");

var _Edge2 = _interopRequireDefault(_Edge);

var _WeightInitializer = require("./WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EdgeStore = function () {
    function EdgeStore(nodesPerLayer, includeBias, activationFunction) {
        var initializationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _WeightInitializer2.default.COMPRESSED_NORMAL;

        _classCallCheck(this, EdgeStore);

        this._nodesPerLayer = _ArrayUtils2.default.copy(nodesPerLayer);
        this._nodesInNextLayer = EdgeStore.createNodesInNextLayer(this._nodesPerLayer);
        this._nodesInPrevLayer = EdgeStore.createNodesInPrevLayer(this._nodesPerLayer);
        this._activationFunction = activationFunction;
        this._initializationType = initializationType;
        this._includeBias = includeBias;
        this._inputEdges = null;
        this._outputEdges = null;
        this._edgeCache = null;
    }

    _createClass(EdgeStore, [{
        key: "getNodesInPrevLayer",
        value: function getNodesInPrevLayer(index) {
            if (this._includeBias && index !== 0) {
                return this._nodesInPrevLayer[index] + 1;
            }

            return this._nodesInPrevLayer[index];
        }
    }, {
        key: "getNodesInNextLayer",
        value: function getNodesInNextLayer(index) {
            return this._nodesInNextLayer[index];
        }
    }, {
        key: "createEdges",
        value: function createEdges() {
            var edgeCache = {};
            var inputEdges = [];
            var outputEdges = [];
            var currNumNodes = null;
            var currentEdge = null;
            var numPrevEdges = 0;
            var numNextEdges = 0;
            var edgeId = void 0;
            var weightInitializer = void 0;

            for (var layerIdx = 0; layerIdx < this._nodesPerLayer.length; layerIdx++) {
                currNumNodes = this._nodesPerLayer[layerIdx];
                inputEdges[layerIdx] = [];
                outputEdges[layerIdx] = [];

                for (var nodeIdx = 0; nodeIdx < currNumNodes; nodeIdx++) {

                    inputEdges[layerIdx][nodeIdx] = [];
                    outputEdges[layerIdx][nodeIdx] = [];

                    numPrevEdges = this.getNodesInPrevLayer(layerIdx);
                    numNextEdges = this.getNodesInNextLayer(layerIdx);

                    for (var inputNodeIdx = 0; inputNodeIdx < numPrevEdges; inputNodeIdx++) {
                        edgeId = layerIdx - 1 + "_" + inputNodeIdx + "__" + layerIdx + "_" + nodeIdx;

                        if (edgeId in edgeCache) {
                            currentEdge = edgeCache[edgeId];
                        } else {
                            weightInitializer = new _WeightInitializer2.default(this._activationFunction, this._initializationType, numPrevEdges, currNumNodes);
                            currentEdge = new _Edge2.default(edgeId, weightInitializer);
                            currentEdge.randomizeWeight();
                            edgeCache[edgeId] = currentEdge;
                        }

                        inputEdges[layerIdx][nodeIdx][inputNodeIdx] = currentEdge;
                    }

                    for (var outputNodeIdx = 0; outputNodeIdx < numNextEdges; outputNodeIdx++) {
                        edgeId = layerIdx + "_" + nodeIdx + "__" + (layerIdx + 1) + "_" + outputNodeIdx;

                        if (edgeId in edgeCache) {
                            currentEdge = edgeCache[edgeId];
                        } else {
                            weightInitializer = new _WeightInitializer2.default(this._activationFunction, this._initializationType, currNumNodes, numNextEdges);
                            currentEdge = new _Edge2.default(edgeId, weightInitializer);
                            currentEdge.randomizeWeight();
                            edgeCache[edgeId] = currentEdge;
                        }

                        outputEdges[layerIdx][nodeIdx][outputNodeIdx] = currentEdge;
                    }
                }
            }

            this._inputEdges = inputEdges;
            this._outputEdges = outputEdges;
            this._edgeCache = edgeCache;
        }
    }, {
        key: "getInputEdges",
        value: function getInputEdges(layerIndex, nodeIndex) {
            if (this._inputEdges === null) {
                this.createEdges();
            }

            return this._inputEdges[layerIndex][nodeIndex];
        }
    }, {
        key: "getOutputEdges",
        value: function getOutputEdges(layerIndex, nodeIndex) {
            if (this._outputEdges === null) {
                this.createEdges();
            }

            return this._outputEdges[layerIndex][nodeIndex];
        }
    }, {
        key: "edgeCache",
        get: function get() {
            if (this._edgeCache === null) {
                this.createEdges();
            }

            return this._edgeCache;
        }
    }], [{
        key: "createNodesInPrevLayer",
        value: function createNodesInPrevLayer(nodesPerLayer) {
            // let copiedArray = ArrayUtils.copy(nodesPerLayer);
            var copiedArray = _ArrayUtils2.default.removeByIndex(nodesPerLayer, nodesPerLayer.length - 1);
            return _ArrayUtils2.default.extend([0], copiedArray);
        }
    }, {
        key: "createNodesInNextLayer",
        value: function createNodesInNextLayer(nodesPerLayer) {
            // let copiedArray = ArrayUtils.copy(nodesPerLayer);
            var copiedArray = _ArrayUtils2.default.removeByIndex(nodesPerLayer, 0);
            copiedArray.push(0);
            return copiedArray;
        }
    }]);

    return EdgeStore;
}();

exports.default = EdgeStore;