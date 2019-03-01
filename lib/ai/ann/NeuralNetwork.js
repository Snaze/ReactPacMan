"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DataSourceComponent2 = require("../../DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

require("./NeuralNetwork.css");

var _NeuralNetworkNode = require("./NeuralNetworkNode");

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

var _NeuralNetworkDS = require("../../model/NeuralNetworkDS");

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _math = require("../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import MathUtil from "../../model/ai/MathUtil";

var NeuralNetwork = function (_DataSourceComponent) {
    _inherits(NeuralNetwork, _DataSourceComponent);

    function NeuralNetwork(props) {
        _classCallCheck(this, NeuralNetwork);

        var _this = _possibleConstructorReturn(this, (NeuralNetwork.__proto__ || Object.getPrototypeOf(NeuralNetwork)).call(this, props));

        _this._stroke = "DarkGreen";
        _this._selectColor = "aqua";
        _this._hoverColor = "aqua";
        _this._lineColor = "black";
        _this._fill = {
            active: "green",
            bias: "grey",
            inactive: "red"
        };
        _this._strokeWidth = 4;
        _this._selectedNodeTarget = null;
        _this._inputLines = {};
        _this._outputLines = {};
        _this._lineKeys = [];

        _this._lineOnMouseEnterRef = function (e) {
            return _this._lineOnMouseEnter(e);
        };
        _this._lineOnMouseLeaveRef = function (e) {
            return _this._lineOnMouseLeave(e);
        };
        _this._nodeOnMouseEnterRef = function (e) {
            return _this._nodeOnMouseEnter(e);
        };
        _this._nodeOnMouseLeaveRef = function (e) {
            return _this._nodeOnMouseLeave(e);
        };
        _this._nodeOnMouseClickRef = function (e) {
            return _this._nodeOnMouseClick(e);
        };
        _this._svgOnMouseClickRef = function (e) {
            return _this._svgOnMouseClick(e);
        };

        // this.setState({
        //     selectedNode: null
        // });
        return _this;
    }

    _createClass(NeuralNetwork, [{
        key: "_dataSourceUpdated",
        value: function _dataSourceUpdated(e) {
            if (e.source === "_neuralNetwork") {
                this._colorLines();
            }
        }
    }, {
        key: "_dataSourceChanged",
        value: function _dataSourceChanged() {
            console.log("NeuralNetworkSVG Data Source changed");

            this._colorLines();
            this.forceUpdate();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            _get(NeuralNetwork.prototype.__proto__ || Object.getPrototypeOf(NeuralNetwork.prototype), "componentDidMount", this).call(this);

            this._colorLines();
        }

        // componentWillUnmount() {
        //     super.componentWillUnmount();
        // }

    }, {
        key: "_getWeight",
        value: function _getWeight(layerIndex, nodeIndex, weightIndex) {
            if (typeof this.neuralNetwork.weights[layerIndex] === "undefined" || typeof this.neuralNetwork.weights[layerIndex][nodeIndex] === "undefined" || typeof this.neuralNetwork.weights[layerIndex][nodeIndex][weightIndex] === "undefined") {
                return null;
            }

            return this.neuralNetwork.weights[layerIndex][nodeIndex][weightIndex];
        }
    }, {
        key: "_colorLines",
        value: function _colorLines() {
            if (!document) {
                return;
            }

            var current = void 0;
            var currentWeight = void 0;
            var data = _ArrayUtils2.default.flatten(this.neuralNetwork.weights);
            // let posData = ArrayUtils.filter(data, (item) => item >= 0);
            // let negData = ArrayUtils.filter(data, (item) => item < 0);
            // let posMin = math.min(posData), posMax = math.max(posData);
            // let negMin = math.min(negData), negMax = math.max(negData);
            var absData = _math2.default.abs(data);
            var max = _math2.default.max(absData);
            var min = _math2.default.min(absData);

            var scaledValue = void 0,
                blueValue = void 0,
                greenValue = void 0,
                redValue = void 0,
                color = void 0,
                rgbaString = void 0,
                currentLine = void 0;

            this._lineKeys.forEach(function (lineKey, lineKeyIndex) {
                current = NeuralNetwork.parseLineKey(lineKey);
                currentWeight = this._getWeight(current.dest.layerIdx, current.dest.nodeIdx, current.src.nodeIdx);
                if (currentWeight === null) {
                    currentWeight = 0;
                }

                blueValue = 0;
                greenValue = 0;
                redValue = 0;

                scaledValue = (_math2.default.abs(currentWeight) - min) / (max - min);

                if (currentWeight >= 0) {
                    blueValue = Math.floor(scaledValue * 255);
                } else {
                    redValue = Math.floor(scaledValue * 255);
                }

                rgbaString = "rgba(" + redValue + ", " + greenValue + ", " + blueValue + ", 1)";
                color = NeuralNetwork.rgb2hex(rgbaString);

                currentLine = document.getElementById(lineKey);
                if (!!currentLine) {
                    currentLine.style.stroke = color;
                    currentLine.dataset["originalColor"] = color;
                    // Should be the title
                    currentLine.childNodes[0].innerHTML = currentWeight.toString();
                }
            }.bind(this));

            console.log("_colorLines executed");
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.dataSource !== this.props.dataSource;
        }
    }, {
        key: "getCenterX",
        value: function getCenterX(layerIndex) {
            var numLayers = this.neuralNetwork.nodesPerLayer.length;
            var width = this.props.width;

            return NeuralNetwork.getOptimalLocation(layerIndex, numLayers, width, this.squareDimension);
        }
    }, {
        key: "getCenterY",
        value: function getCenterY(nodeIndex) {
            var height = this.props.height;

            return NeuralNetwork.getOptimalLocation(nodeIndex, this.maxLayerSize, height, this.squareDimension);
        }
    }, {
        key: "_unselectNode",
        value: function _unselectNode() {
            if (!!this._selectedNodeTarget) {
                this._selectedNodeTarget.style.stroke = this._stroke;
                this._selectedNodeTarget = null;
                this._raiseNodeSelectedEvent(null);
            }
        }
    }, {
        key: "_svgOnMouseClick",
        value: function _svgOnMouseClick(e) {
            if (e.target.tagName === "svg") {
                this._setAllLineVisibility("visible");
                this._unselectNode();
            }
        }
    }, {
        key: "_onLeave",
        value: function _onLeave(e, color) {
            e.target.style.stroke = color;
        }
    }, {
        key: "_onEnter",
        value: function _onEnter(e) {
            e.target.style.stroke = this._selectColor;
        }
    }, {
        key: "_lineOnMouseEnter",
        value: function _lineOnMouseEnter(e) {
            if (!e.target.dataset["originalColor"]) {
                e.target.dataset["originalColor"] = e.target.style.stroke;
            }

            e.target.style.stroke = this._selectColor;
        }
    }, {
        key: "_lineOnMouseLeave",
        value: function _lineOnMouseLeave(e) {

            e.target.style.stroke = e.target.dataset["originalColor"];
        }
    }, {
        key: "_nodeOnMouseEnter",
        value: function _nodeOnMouseEnter(e) {
            if (this._isNodeSelected(e.layerIndex, e.nodeIndex)) {
                return;
            }

            this._onEnter(e.originalEvent);
        }
    }, {
        key: "_nodeOnMouseLeave",
        value: function _nodeOnMouseLeave(e) {
            if (this._isNodeSelected(e.layerIndex, e.nodeIndex)) {
                return;
            }

            this._onLeave(e.originalEvent, this._stroke);
        }
    }, {
        key: "_setAllLineVisibility",
        value: function _setAllLineVisibility() {
            var visibility = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "visible";

            if (!document) {
                return;
            }

            var currentLineKey = void 0;
            var currentLine = void 0;

            for (var i = 0; i < this._lineKeys.length; i++) {
                currentLineKey = this._lineKeys[i];
                currentLine = document.getElementById(currentLineKey);

                if (!!currentLine) {
                    currentLine.style.visibility = visibility;
                }
            }
        }
    }, {
        key: "_toggleVisibleLines",
        value: function _toggleVisibleLines(nodeKey) {
            if (!document) {
                return;
            }

            var currentLineKey = void 0;
            var currentLine = void 0;

            for (var i = 0; i < this._lineKeys.length; i++) {
                currentLineKey = this._lineKeys[i];
                currentLine = document.getElementById(currentLineKey);

                if (!!currentLine) {
                    if (!!this._inputLines[nodeKey] && currentLineKey in this._inputLines[nodeKey] || !!this._outputLines[nodeKey] && currentLineKey in this._outputLines[nodeKey]) {
                        currentLine.style.visibility = "visible";
                    } else {
                        currentLine.style.visibility = "hidden";
                    }
                }
            }
        }
    }, {
        key: "_nodeOnMouseClick",
        value: function _nodeOnMouseClick(e) {

            this._unselectNode();

            var selectedNode = NeuralNetwork.createSelectedNodeObject(e.layerIndex, e.nodeIndex);
            var nodeKey = NeuralNetwork.getNodeKey(e.layerIndex, e.nodeIndex);

            this._selectedNodeTarget = e.originalEvent.target;

            this._onEnter(e.originalEvent);
            this._toggleVisibleLines(nodeKey);

            this.setState({
                selectedNode: selectedNode
            });

            this._raiseNodeSelectedEvent(selectedNode);
        }
    }, {
        key: "_raiseNodeSelectedEvent",
        value: function _raiseNodeSelectedEvent(selectedNode) {
            if (!!this.props.onNodeSelected) {
                this.props.onNodeSelected({
                    selectedNode: selectedNode,
                    source: this
                });
            }
        }
    }, {
        key: "_isNodeSelected",
        value: function _isNodeSelected(layerIndex, nodeIndex) {
            return !!this.state.selectedNode && this.state.selectedNode.layerIndex === layerIndex && this.state.selectedNode.nodeIndex === nodeIndex;
        }
    }, {
        key: "getNodesAndLines",
        value: function getNodesAndLines() {
            var nodes = this.getNodes();
            var toRet = [];
            var nodesPerLayer = this.neuralNetwork.nodesPerLayer;
            var nextLayerSize = void 0;
            var srcX = void 0,
                srcY = void 0,
                destX = void 0,
                destY = void 0,
                lineKey = void 0,
                numSrcNodes = void 0;

            for (var layerIdx = 0; layerIdx < nodesPerLayer.length; layerIdx++) {

                numSrcNodes = nodesPerLayer[layerIdx];

                if (this.neuralNetwork.includeBias) {
                    numSrcNodes += 1;
                }

                if (layerIdx + 1 >= nodesPerLayer.length) {
                    nextLayerSize = 0;
                } else {
                    nextLayerSize = nodesPerLayer[layerIdx + 1];
                }

                for (var srcNodeIdx = 0; srcNodeIdx < numSrcNodes; srcNodeIdx++) {

                    srcX = this.getCenterX(layerIdx);
                    srcY = this.getCenterY(srcNodeIdx);

                    if (nextLayerSize > 0) {
                        for (var destNodeIdx = 0; destNodeIdx < nextLayerSize; destNodeIdx++) {
                            destX = this.getCenterX(layerIdx + 1);
                            destY = this.getCenterY(destNodeIdx);

                            lineKey = NeuralNetwork.getLineKey(layerIdx, srcNodeIdx, layerIdx + 1, destNodeIdx);

                            toRet.push(_react2.default.createElement(
                                "line",
                                { key: lineKey,
                                    id: lineKey,
                                    x1: srcX, y1: srcY,
                                    x2: destX, y2: destY,
                                    stroke: "White", opacity: 0.8,
                                    strokeWidth: this._strokeWidth,
                                    onMouseEnter: this._lineOnMouseEnterRef,
                                    onMouseLeave: this._lineOnMouseLeaveRef },
                                _react2.default.createElement(
                                    "title",
                                    null,
                                    lineKey
                                )
                            ));

                            var inputNodeKey = NeuralNetwork.getNodeKey(layerIdx + 1, destNodeIdx);
                            if (!this._inputLines[inputNodeKey]) {
                                this._inputLines[inputNodeKey] = {};
                            }
                            this._inputLines[inputNodeKey][lineKey] = true;

                            var outputNodeKey = NeuralNetwork.getNodeKey(layerIdx, srcNodeIdx);
                            if (!this._outputLines[outputNodeKey]) {
                                this._outputLines[outputNodeKey] = {};
                            }
                            this._outputLines[outputNodeKey][lineKey] = true;

                            this._lineKeys.push(lineKey);
                        }

                        if (this.neuralNetwork.includeBias) {
                            lineKey = NeuralNetwork.getLineKey(layerIdx, srcNodeIdx, layerIdx + 1, nextLayerSize + 1);
                            var _outputNodeKey = NeuralNetwork.getNodeKey(layerIdx, srcNodeIdx);
                            if (!this._outputLines[_outputNodeKey]) {
                                this._outputLines[_outputNodeKey] = {};
                            }
                            this._outputLines[_outputNodeKey][lineKey] = true;

                            this._lineKeys.push(lineKey);
                        }
                    } else if (!this.neuralNetwork.includeBias || this.neuralNetwork.includeBias && srcNodeIdx < numSrcNodes - 1) {
                        destX = this.getCenterX(layerIdx + 1);
                        destY = this.getCenterY(srcNodeIdx);

                        lineKey = NeuralNetwork.getLineKey(layerIdx, srcNodeIdx, layerIdx + 1, srcNodeIdx);
                        toRet.push(_react2.default.createElement(
                            "line",
                            { key: lineKey,
                                id: lineKey,
                                x1: srcX, y1: srcY,
                                x2: destX, y2: destY, opacity: 0.8,
                                stroke: "White", strokeWidth: this._strokeWidth,
                                onMouseEnter: this._lineOnMouseEnterRef,
                                onMouseLeave: this._lineOnMouseLeaveRef },
                            _react2.default.createElement(
                                "title",
                                null,
                                lineKey
                            )
                        ));
                    }
                }
            }

            _ArrayUtils2.default.extend(toRet, nodes);

            return toRet;
        }
    }, {
        key: "getNodes",
        value: function getNodes() {
            var toRet = [];
            var nnn = void 0;
            var key = void 0;
            var toAdd = void 0,
                stroke = this._stroke;
            var numNodesInLayer = void 0,
                fill = void 0;
            var numLayers = this.neuralNetwork.nodes.length;

            for (var layerIndex = 0; layerIndex < numLayers; layerIndex++) {

                numNodesInLayer = this.neuralNetwork.nodes[layerIndex].length;

                if (this.neuralNetwork.includeBias && layerIndex < numLayers - 1) {
                    numNodesInLayer += 1;
                }

                for (var nodeIndex = 0; nodeIndex < numNodesInLayer; nodeIndex++) {
                    if (this._isNodeSelected(layerIndex, nodeIndex)) {
                        stroke = this._selectColor;
                    }

                    if (this.neuralNetwork.includeBias && nodeIndex === numNodesInLayer - 1 && layerIndex < numLayers - 1) {
                        fill = this._fill.bias;
                        nnn = null;
                    } else {
                        fill = this._fill.active;
                        nnn = this.neuralNetwork.nodes[layerIndex][nodeIndex];
                    }

                    key = NeuralNetwork.getNodeKey(layerIndex, nodeIndex);
                    toAdd = _react2.default.createElement(_NeuralNetworkNode2.default, { key: key,
                        id: key,
                        dataSource: nnn,
                        centerX: this.getCenterX(layerIndex),
                        centerY: this.getCenterY(nodeIndex),
                        radius: this.radius,
                        stroke: stroke,
                        strokeWidth: this._strokeWidth,
                        fill: fill,
                        onMouseEnter: this._nodeOnMouseEnterRef,
                        onMouseLeave: this._nodeOnMouseLeaveRef,
                        onMouseClick: this._nodeOnMouseClickRef,
                        layerIndex: layerIndex,
                        nodeIndex: nodeIndex });
                    toRet.push(toAdd);
                }
            }

            return toRet;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "NeuralNetwork", name: "NeuralNetworkSVG", style: { backgroundColor: "Grey" } },
                _react2.default.createElement(
                    "svg",
                    { width: this.props.width, height: this.props.height, onClick: this._svgOnMouseClickRef },
                    this.getNodesAndLines()
                )
            );
        }
    }, {
        key: "neuralNetwork",
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: "maxLayerSize",
        get: function get() {
            var nodesPerLayer = this.neuralNetwork.nodesPerLayer;
            if (this.neuralNetwork.includeBias) {
                nodesPerLayer = _ArrayUtils2.default.copy(nodesPerLayer);
                nodesPerLayer = nodesPerLayer.map(function (item) {
                    return item + 1;
                });
            }

            return Math.max.apply(Math, _toConsumableArray(nodesPerLayer));
        }
    }, {
        key: "squareDimension",
        get: function get() {
            return this.props.height / this.maxLayerSize;
        }
    }, {
        key: "radius",
        get: function get() {
            return this.squareDimension / 2.0 * this.props.radiusScaleFactor;
        }
    }], [{
        key: "rgb2hex",
        value: function rgb2hex(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }
    }, {
        key: "createSelectedNodeObject",
        value: function createSelectedNodeObject(layerIdx, nodeIdx) {
            return {
                layerIndex: layerIdx,
                nodeIndex: nodeIdx
            };
        }
    }, {
        key: "getOptimalLocation",
        value: function getOptimalLocation(index, numItems, size, squareDimension) {
            var maxRowBlockWidth = size / numItems;
            var minRowBlockWidth = size / squareDimension;
            var rowBlockWidth = Math.max(minRowBlockWidth, maxRowBlockWidth);

            var rowBlockXLoc = index * rowBlockWidth;
            return rowBlockXLoc + squareDimension / 2.0;
        }
    }, {
        key: "getNodeKey",
        value: function getNodeKey(layerIndex, nodeIndex) {
            return "nnn_" + layerIndex + "_" + nodeIndex;
        }
    }, {
        key: "getLineKey",
        value: function getLineKey(srcLayerIdx, srcNodeIdx, destLayerIdx, destNodeIdx) {
            return srcLayerIdx + "_" + srcNodeIdx + "__" + destLayerIdx + "_" + destNodeIdx;
        }
    }, {
        key: "parseLineKey",
        value: function parseLineKey(lineKey) {
            var temp = lineKey.split(/_/);
            return {
                src: {
                    layerIdx: parseInt(temp[0], 10),
                    nodeIdx: parseInt(temp[1], 10)
                },
                dest: {
                    layerIdx: parseInt(temp[3], 10),
                    nodeIdx: parseInt(temp[4], 10)
                }
            };
        }
    }]);

    return NeuralNetwork;
}(_DataSourceComponent3.default);

NeuralNetwork.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_NeuralNetworkDS2.default).isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    radiusScaleFactor: _propTypes2.default.number,
    onNodeSelected: _propTypes2.default.func
};

NeuralNetwork.defaultProps = {
    radiusScaleFactor: 0.8,
    onNodeSelected: null
};

exports.default = NeuralNetwork;