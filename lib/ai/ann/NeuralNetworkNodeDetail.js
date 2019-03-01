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

require("./NeuralNetworkNodeDetail.css");

var _Assert = require("../../utils/Assert");

var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _ActivationFunctionChart = require("./charts/ActivationFunctionChart");

var _ActivationFunctionChart2 = _interopRequireDefault(_ActivationFunctionChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import math from "../../../node_modules/mathjs/dist/math";

var NeuralNetworkNodeDetail = function (_DataSourceComponent) {
    _inherits(NeuralNetworkNodeDetail, _DataSourceComponent);

    function NeuralNetworkNodeDetail(props) {
        _classCallCheck(this, NeuralNetworkNodeDetail);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkNodeDetail.__proto__ || Object.getPrototypeOf(NeuralNetworkNodeDetail)).call(this, props));

        _this._radioButtonChangeRef = function (e) {
            return _this._radioButtonChange(e);
        };
        _this._buttonClickRef = function (e) {
            return _this._buttonClick(e);
        };
        return _this;
    }

    _createClass(NeuralNetworkNodeDetail, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            _get(NeuralNetworkNodeDetail.prototype.__proto__ || Object.getPrototypeOf(NeuralNetworkNodeDetail.prototype), "componentDidMount", this).call(this);

            this.setState({
                selectedIndex: 0,
                errorScale: 1e3,
                errorGridScale: 1e3,
                errorGridNotchSize: 1e2 // This always needs to be 1 less than errorGridScale
            });
        }
    }, {
        key: "getEquation",
        value: function getEquation() {
            if (!this.nnn) {
                return "";
            }

            return this.nnn.getActivationInputEquation(this.state.selectedIndex, this.props.precision);
        }
    }, {
        key: "getScale",
        value: function getScale() {
            if (!this.nnn || !this.nnn.activationInput || this.nnn.activationInput.length < 0) {
                return 2;
            }

            return Math.min(Math.max(this.nnn.maxActivationInput, 2), 16);
        }
    }, {
        key: "_radioButtonChange",
        value: function _radioButtonChange(e) {
            if (e.target.checked) {
                var selectedIndex = parseInt(e.target.dataset["index"], 10);
                this.setState({
                    selectedIndex: selectedIndex
                });
            }
        }
    }, {
        key: "getRowClass",
        value: function getRowClass(index) {
            if (index % 2 === 0) {
                return "NeuralNetworkNodeDetailEvenRow";
            }

            return "NeuralNetworkNodeDetailOddRow";
        }
    }, {
        key: "getActivationInput",
        value: function getActivationInput(index) {
            if (!this.nnn || !this.nnn.activationInput || index >= this.nnn.activationInput.length) {
                return null;
            }

            return this.nnn.activationInput[index];
        }
    }, {
        key: "getActivationFunction",
        value: function getActivationFunction() {
            if (!this.nnn || !this.nnn.activationFunction) {
                return null;
            }

            return this.nnn.activationFunction.output;
        }
    }, {
        key: "getActivationDerivativeFunction",
        value: function getActivationDerivativeFunction() {
            if (!this.nnn || !this.nnn.activationFunction) {
                return null;
            }

            return function (x) {
                var output = this.nnn.activationFunction.output(x);
                return this.nnn.activationFunction.derivative(output);
            }.bind(this);
        }
    }, {
        key: "getErrorHistoryFunction",
        value: function getErrorHistoryFunction() {
            if (!this.nnn || !this.nnn.errorHistory) {
                return null;
            }

            return function (x) {
                if (typeof this.nnn.errorHistory[x] === "undefined") {
                    return null;
                }

                return this.nnn.errorHistory[x] * this.state.errorScale;
            }.bind(this);
        }
    }, {
        key: "calculateDerivative",
        value: function calculateDerivative(x) {
            var theFunction = this.getActivationDerivativeFunction();
            if (!theFunction) {
                return 0.0;
            }

            return theFunction(x);
        }
    }, {
        key: "getErrorScaleString",
        value: function getErrorScaleString() {
            if (typeof this.state.errorScale === "undefined") {
                return "";
            }

            return this.state.errorScale.toExponential();
        }
    }, {
        key: "getErrorGridScaleString",
        value: function getErrorGridScaleString() {
            if (typeof this.state.errorGridScale === "undefined") {
                return "";
            }

            return this.state.errorGridScale.toExponential();
        }
    }, {
        key: "getErrorGridScale",
        value: function getErrorGridScale() {
            if (typeof this.state.errorGridScale === "undefined") {
                return 1e5;
            }

            return this.state.errorGridScale;
        }
    }, {
        key: "getErrorGridNotchSize",
        value: function getErrorGridNotchSize() {
            if (typeof this.state.errorGridNotchSize === "undefined") {
                return 1e4;
            }

            return this.state.errorGridNotchSize;
        }
    }, {
        key: "_buttonClick",
        value: function _buttonClick(e) {
            if (e.target.name === "btnIncrement") {
                this.setState({
                    errorScale: this.state.errorScale * 10
                });
            } else if (e.target.name === "btnDecrement") {
                this.setState({
                    errorScale: this.state.errorScale / 10
                });
            } else if (e.target.name === "btnDecrementGridScale") {
                this.setState({
                    errorGridScale: this.state.errorGridScale / 10,
                    errorGridNotchSize: this.state.errorGridNotchSize / 10

                });
            } else if (e.target.name === "btnIncrementGridScale") {
                this.setState({
                    errorGridScale: this.state.errorGridScale * 10,
                    errorGridNotchSize: this.state.errorGridNotchSize * 10
                });
            } else {
                throw new Error("Unknown button");
            }
        }
    }, {
        key: "getTableRows",
        value: function getTableRows() {
            var toRet = [];

            if (!this.nnn) {
                return toRet;
            }

            var activationInput = !!this.nnn.activationInput ? this.nnn.activationInput : [];
            var output = !!this.nnn.output ? this.nnn.output : [];
            var error = !!this.nnn.error ? this.nnn.error : [];

            if (this.nnn.layerIndex === 0) {
                _ArrayUtils2.default.expand(activationInput, output.length - 1, 0);
            }

            (0, _Assert.assert)(activationInput.length === output.length, "NNN Activation Input and Output need to have same lengths");
            (0, _Assert.assert)(activationInput.length === error.length, "NNN Activation Input and Error need to have same lengths");

            activationInput.forEach(function (activationInput, index) {
                var currentOutput = output[index];
                var currentError = error[index];
                var toAdd = _react2.default.createElement(
                    "tr",
                    { className: "NeuralNetworkNodeDetailTopCell " + this.getRowClass(index),
                        key: NeuralNetworkNodeDetail.getTableRowKey(index) },
                    _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement("input", { type: "radio", checked: this.state.selectedIndex === index,
                            radioGroup: "NeuralNetworkNodeDetail", "data-index": index,
                            onChange: this._radioButtonChangeRef })
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "NeuralNetworkNodeDetailNumericCell" },
                        index
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "NeuralNetworkNodeDetailNumericCell" },
                        activationInput.toFixed(this.props.precision).toString()
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "NeuralNetworkNodeDetailNumericCell" },
                        currentOutput.toFixed(this.props.precision).toString()
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "NeuralNetworkNodeDetailNumericCell" },
                        this.calculateDerivative(activationInput).toFixed(this.props.precision).toString()
                    ),
                    _react2.default.createElement(
                        "td",
                        { className: "NeuralNetworkNodeDetailNumericCell" },
                        currentError.toFixed(this.props.precision).toString()
                    )
                );

                toRet.push(toAdd);
            }.bind(this));

            return toRet;
        }
    }, {
        key: "render",
        value: function render() {
            // console.log("NeuralNetworkNodeDetail render");

            return _react2.default.createElement(
                "table",
                { className: "NeuralNetworkNodeDetail" },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            { className: "NeuralNetworkNodeDetailMainHeader" },
                            "Node (Layer=",
                            this.layerIndex,
                            ", Node=",
                            this.nodeIndex,
                            ")"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        { className: "NeuralNetworkNodeDetailTopCell" },
                        _react2.default.createElement(
                            "td",
                            { className: "NeuralNetworkNodeDetailNumericCell" },
                            _react2.default.createElement(
                                "b",
                                null,
                                "Activation Input Calculation (for Mini-Batch Element ",
                                this.state.selectedIndex,
                                "):"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "NeuralNetworkNodeDetailTopCell" },
                        _react2.default.createElement(
                            "td",
                            { className: "NeuralNetworkNodeDetailTopCell" },
                            _react2.default.createElement("textarea", { cols: 60, rows: 3, name: "txtActivationInput",
                                readOnly: true, title: "Activation Input Calculation",
                                value: this.getEquation() })
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "NeuralNetworkNodeDetailTopCell" },
                        _react2.default.createElement(
                            "td",
                            { className: "NeuralNetworkNodeDetailTopCell" },
                            _react2.default.createElement(
                                "table",
                                { className: "NeuralNetworkNodeDetailChartTable" },
                                _react2.default.createElement(
                                    "thead",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            "A.F."
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            "A.F. Derivative"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            null,
                                            "Error"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_ActivationFunctionChart2.default, { width: 128, height: 128,
                                                x: this.getActivationInput(this.state.selectedIndex),
                                                lineFunction: this.getActivationFunction(),
                                                scale: this.getScale(), notchLength: 4 })
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_ActivationFunctionChart2.default, { width: 128, height: 128,
                                                x: this.getActivationInput(this.state.selectedIndex),
                                                lineFunction: this.getActivationDerivativeFunction(),
                                                scale: this.getScale(), notchLength: 4 })
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_ActivationFunctionChart2.default, { width: 128, height: 128,
                                                x: null,
                                                lineFunction: this.getErrorHistoryFunction(),
                                                scale: this.getErrorGridScale(), startPoint: 0,
                                                notchIncrement: this.getErrorGridNotchSize(), notchLength: 4 })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement("td", null),
                                        _react2.default.createElement("td", null),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(
                                                "table",
                                                { className: "NeuralNetworkNodeDetailChartTable" },
                                                _react2.default.createElement(
                                                    "tbody",
                                                    null,
                                                    _react2.default.createElement(
                                                        "tr",
                                                        null,
                                                        _react2.default.createElement(
                                                            "td",
                                                            null,
                                                            _react2.default.createElement(
                                                                "button",
                                                                { name: "btnDecrement", onClick: this._buttonClickRef },
                                                                "v"
                                                            )
                                                        ),
                                                        _react2.default.createElement(
                                                            "td",
                                                            null,
                                                            "Scale: ",
                                                            this.getErrorScaleString()
                                                        ),
                                                        _react2.default.createElement(
                                                            "td",
                                                            null,
                                                            _react2.default.createElement(
                                                                "button",
                                                                { name: "btnIncrement", onClick: this._buttonClickRef },
                                                                "^"
                                                            )
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        "tr",
                                                        null,
                                                        _react2.default.createElement(
                                                            "td",
                                                            null,
                                                            _react2.default.createElement(
                                                                "button",
                                                                { name: "btnDecrementGridScale", onClick: this._buttonClickRef },
                                                                "v"
                                                            )
                                                        ),
                                                        _react2.default.createElement(
                                                            "td",
                                                            null,
                                                            "Tick: ",
                                                            this.getErrorGridScaleString()
                                                        ),
                                                        _react2.default.createElement(
                                                            "td",
                                                            null,
                                                            _react2.default.createElement(
                                                                "button",
                                                                { name: "btnIncrementGridScale", onClick: this._buttonClickRef },
                                                                "^"
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "NeuralNetworkNodeDetailTopCell" },
                        _react2.default.createElement(
                            "td",
                            { className: "NeuralNetworkNodeDetailTopCell" },
                            _react2.default.createElement(
                                "table",
                                { className: "NeuralNetworkNodeDetailInnerTable", cellPadding: 8, cellSpacing: 0 },
                                _react2.default.createElement(
                                    "thead",
                                    { className: "NeuralNetworkNodeDetailInnerTableHeader" },
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement("th", { className: "NeuralNetworkNodeDetailNumericCellHeader" }),
                                        _react2.default.createElement(
                                            "th",
                                            { className: "NeuralNetworkNodeDetailNumericCellHeader" },
                                            "Index"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { className: "NeuralNetworkNodeDetailNumericCellHeader" },
                                            "Activation Input"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { className: "NeuralNetworkNodeDetailNumericCellHeader" },
                                            "Output"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { className: "NeuralNetworkNodeDetailNumericCellHeader" },
                                            "Derivative"
                                        ),
                                        _react2.default.createElement(
                                            "th",
                                            { className: "NeuralNetworkNodeDetailNumericCellHeader" },
                                            "Error"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    this.getTableRows()
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "neuralNetworkNode",
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: "nnn",
        get: function get() {
            return this.neuralNetworkNode;
        }
    }, {
        key: "layerIndex",
        get: function get() {
            if (!!this.nnn) {
                return this.nnn.layerIndex.toString();
            }

            return "";
        }
    }, {
        key: "nodeIndex",
        get: function get() {
            if (!!this.nnn) {
                return this.nnn.nodeIndex.toString();
            }

            return "";
        }
    }], [{
        key: "getTableRowKey",
        value: function getTableRowKey(index) {
            return "NeuralNetworkNodeDetailRow_" + index;
        }
    }]);

    return NeuralNetworkNodeDetail;
}(_DataSourceComponent3.default);

NeuralNetworkNodeDetail.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_NeuralNetworkNodeDS2.default),
    precision: _propTypes2.default.number
};

NeuralNetworkNodeDetail.defaultProps = {
    precision: 8
};

exports.default = NeuralNetworkNodeDetail;