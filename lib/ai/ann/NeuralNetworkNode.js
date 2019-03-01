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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NeuralNetworkNodeDS = require("../../model/NeuralNetworkNodeDS");

var _NeuralNetworkNodeDS2 = _interopRequireDefault(_NeuralNetworkNodeDS);

var _moment = require("../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeuralNetworkNode = function (_DataSourceComponent) {
    _inherits(NeuralNetworkNode, _DataSourceComponent);

    function NeuralNetworkNode(props) {
        _classCallCheck(this, NeuralNetworkNode);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkNode.__proto__ || Object.getPrototypeOf(NeuralNetworkNode)).call(this, props));

        _this._onMouseEnterRef = function (e) {
            return _this._onMouseEnter(e);
        };
        _this._onMouseLeaveRef = function (e) {
            return _this._onMouseLeave(e);
        };
        _this._onMouseClickRef = function (e) {
            return _this._onMouseClick(e);
        };
        _this._animationCircle = null;
        _this._lastUpdate = (0, _moment2.default)();
        return _this;
    }

    _createClass(NeuralNetworkNode, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return false;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            _get(NeuralNetworkNode.prototype.__proto__ || Object.getPrototypeOf(NeuralNetworkNode.prototype), "componentDidMount", this).call(this);

            if (!!document) {
                this._animationCircle = document.getElementsByName(this.animationCircleKey)[0];
            }
        }
    }, {
        key: "_dataSourceUpdated",
        value: function _dataSourceUpdated(e) {
            _get(NeuralNetworkNode.prototype.__proto__ || Object.getPrototypeOf(NeuralNetworkNode.prototype), "_dataSourceUpdated", this).call(this, e);

            // // if (this._lastUpdate < moment().add(-4, "s")) {
            // if (e.source === "_feedForwardExecuting") {
            //     this._animationCircle.style.visibility = this.neuralNetworkNode.feedForwardExecuting ? "visible" : "hidden";
            //     // console.log(`this._animationCircle.style.visibility = ${this._animationCircle.style.visibility}`);
            // } else if (e.source === "_backPropExecuting") {
            //     this._animationCircle.style.visibility = this.neuralNetworkNode.backPropExecuting ? "visible" : "hidden";
            //     // console.log(`this._animationCircle.style.visibility = ${this._animationCircle.style.visibility}`);
            // }
            // //
            // //     this._lastUpdate = moment();
            // // }

            if (e.source === "_animating") {
                this._animationCircle.style.visibility = this.animationVisibility;
            }
        }
    }, {
        key: "_onMouseEnter",
        value: function _onMouseEnter(e) {
            if (!!this.props.onMouseEnter) {
                this.props.onMouseEnter({
                    nodeIndex: this.neuralNetworkNode.nodeIndex,
                    layerIndex: this.neuralNetworkNode.layerIndex,
                    originalEvent: e
                });
            }
        }
    }, {
        key: "_onMouseLeave",
        value: function _onMouseLeave(e) {
            if (!!this.props.onMouseLeave) {
                this.props.onMouseLeave({
                    nodeIndex: this.neuralNetworkNode.nodeIndex,
                    layerIndex: this.neuralNetworkNode.layerIndex,
                    originalEvent: e
                });
            }
        }
    }, {
        key: "_onMouseClick",
        value: function _onMouseClick(e) {
            if (!!this.props.onMouseClick) {
                this.props.onMouseClick({
                    nodeIndex: this.neuralNetworkNode.nodeIndex,
                    layerIndex: this.neuralNetworkNode.layerIndex,
                    originalEvent: e
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                null,
                _react2.default.createElement("circle", {
                    cx: this.props.centerX,
                    cy: this.props.centerY,
                    r: this.props.radius,
                    stroke: this.props.stroke,
                    strokeWidth: this.props.strokeWidth,
                    fill: this.props.fill,
                    onMouseEnter: this._onMouseEnterRef,
                    onMouseLeave: this._onMouseLeaveRef,
                    onClick: this._onMouseClickRef }),
                _react2.default.createElement(
                    "circle",
                    {
                        name: this.animationCircleKey,
                        cx: this.props.centerX,
                        cy: this.props.centerY,
                        visibility: this.animationVisibility,
                        pointerEvents: "none",
                        r: 0,
                        stroke: "orange",
                        strokeWidth: this.props.strokeWidth,
                        fill: "none" },
                    _react2.default.createElement("animate", {
                        attributeName: "r",
                        from: 0,
                        to: this.props.radius / 4.0,
                        dur: "500ms",
                        repeatCount: "indefinite" })
                )
            );
        }
    }, {
        key: "animationVisibility",
        get: function get() {
            if (this.neuralNetworkNode.animating) {
                return "visible";
            }

            return "hidden";
        }
    }, {
        key: "neuralNetworkNode",
        get: function get() {
            if (this.dataSource !== null) {
                return this.dataSource;
            }

            return {
                nodeIndex: this.props.nodeIndex,
                layerIndex: this.props.layerIndex
            };
        }
    }, {
        key: "animationCircleKey",
        get: function get() {
            return "svgCircle_" + this.neuralNetworkNode.layerIndex + "_" + this.neuralNetworkNode.nodeIndex;
        }
    }]);

    return NeuralNetworkNode;
}(_DataSourceComponent3.default);

NeuralNetworkNode.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_NeuralNetworkNodeDS2.default),
    centerX: _propTypes2.default.number.isRequired,
    centerY: _propTypes2.default.number.isRequired,
    radius: _propTypes2.default.number.isRequired,
    strokeWidth: _propTypes2.default.number,
    stroke: _propTypes2.default.string,
    onMouseEnter: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onMouseClick: _propTypes2.default.func,
    selected: _propTypes2.default.bool,
    fill: _propTypes2.default.string,
    layerIndex: _propTypes2.default.number,
    nodeIndex: _propTypes2.default.number
};

NeuralNetworkNode.defaultProps = {
    strokeWidth: 4,
    stroke: "DarkGreen",
    fill: "Green",
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseClick: null,
    selected: false
};

exports.default = NeuralNetworkNode;