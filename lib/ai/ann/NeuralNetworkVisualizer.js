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

var _NeuralNetworkDS = require("../../model/NeuralNetworkDS");

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

require("./NeuralNetworkVisualizer.css");

var _NeuralNetwork = require("./NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _NeuralNetworkNodeDetail = require("./NeuralNetworkNodeDetail");

var _NeuralNetworkNodeDetail2 = _interopRequireDefault(_NeuralNetworkNodeDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import moment from "../../../node_modules/moment/moment";

// import { assert } from "../../utils/Assert";


var NeuralNetworkVisualizer = function (_DataSourceComponent) {
    _inherits(NeuralNetworkVisualizer, _DataSourceComponent);

    function NeuralNetworkVisualizer(props) {
        _classCallCheck(this, NeuralNetworkVisualizer);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkVisualizer.__proto__ || Object.getPrototypeOf(NeuralNetworkVisualizer)).call(this, props));

        _this._onNodeSelectedRef = function (e) {
            return _this._onNodeSelected(e);
        };
        return _this;
    }

    _createClass(NeuralNetworkVisualizer, [{
        key: "_dataSourceChanged",
        value: function _dataSourceChanged() {
            _get(NeuralNetworkVisualizer.prototype.__proto__ || Object.getPrototypeOf(NeuralNetworkVisualizer.prototype), "_dataSourceChanged", this).call(this);

            console.log("NeuralNetworkVisualizer dataSourceChanged");
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            _get(NeuralNetworkVisualizer.prototype.__proto__ || Object.getPrototypeOf(NeuralNetworkVisualizer.prototype), "componentDidMount", this).call(this);

            this.setState({
                selectedNNN: null
            });
        }
    }, {
        key: "_onNodeSelected",
        value: function _onNodeSelected(e) {
            if (!e.selectedNode) {
                this.setState({
                    selectedNNN: null
                });

                return;
            }

            var selectedNode = this.nn.getNeuralNetworkNode(e.selectedNode.layerIndex, e.selectedNode.nodeIndex);
            this.setState({
                selectedNNN: selectedNode
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "table",
                { className: "NeuralNetworkVisualizer" },
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { className: "NeuralNetworkVisualizerTableCell" },
                            _react2.default.createElement(_NeuralNetwork2.default, {
                                dataSource: this.nn,
                                width: this.svgWidth,
                                height: this.svgHeight,
                                onNodeSelected: this._onNodeSelectedRef
                            })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "NeuralNetworkVisualizerTableCell" },
                            _react2.default.createElement(_NeuralNetworkNodeDetail2.default, { dataSource: this.state.selectedNNN })
                        )
                    )
                )
            );
        }
    }, {
        key: "neuralNetwork",
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: "nn",
        get: function get() {
            return this.neuralNetwork;
        }
    }, {
        key: "svgWidth",
        get: function get() {
            return this.props.svgPercent * this.props.width;
        }
    }, {
        key: "svgHeight",
        get: function get() {
            return this.props.svgPercent * this.props.height;
        }
    }, {
        key: "detailWidth",
        get: function get() {
            return (1 - this.props.svgPercent) * this.props.width;
        }
    }, {
        key: "detailHeight",
        get: function get() {
            return (1 - this.props.svgPercent) * this.props.height;
        }
    }]);

    return NeuralNetworkVisualizer;
}(_DataSourceComponent3.default);

NeuralNetworkVisualizer.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_NeuralNetworkDS2.default),
    // TODO: make the widths and heights work with percentages
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    svgPercent: _propTypes2.default.number
};

NeuralNetworkVisualizer.defaultProps = {
    width: 800,
    height: 640,
    svgPercent: 0.75
};

exports.default = NeuralNetworkVisualizer;