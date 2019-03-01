"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./NeuralNetworkVisualizerTest.css");

var _NeuralNetwork = require("../model/ai/ann/NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

require("./NeuralNetworkTest.css");

var _ActivationFunctions = require("../model/ai/ann/ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _NeuralNetworkVisualizer = require("../ai/ann/NeuralNetworkVisualizer");

var _NeuralNetworkVisualizer2 = _interopRequireDefault(_NeuralNetworkVisualizer);

var _NeuralNetworkDS = require("../model/NeuralNetworkDS");

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

var _NeuralNetworkParameter = require("../model/ai/ann/NeuralNetworkParameter");

var _NeuralNetworkParameter2 = _interopRequireDefault(_NeuralNetworkParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import WeightInitializer from "../model/ai/ann/WeightInitializer";
// import ArrayUtils from "../utils/ArrayUtils";
// import {default as NeuralNetworkSVG} from "../ai/ann/NeuralNetwork";


var NeuralNetworkVisualizerTest = function (_Component) {
    _inherits(NeuralNetworkVisualizerTest, _Component);

    function NeuralNetworkVisualizerTest(props) {
        _classCallCheck(this, NeuralNetworkVisualizerTest);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkVisualizerTest.__proto__ || Object.getPrototypeOf(NeuralNetworkVisualizerTest)).call(this, props));

        _this._buttonClickRef = function (e) {
            return _this._buttonClick(e);
        };

        _this.state = {
            neuralNetworkDS: NeuralNetworkVisualizerTest.createNNDS()
        };
        return _this;
    }

    _createClass(NeuralNetworkVisualizerTest, [{
        key: "_train",
        value: function _train(nnDS) {
            var toTrainWith = [];
            var labels = [];

            for (var i = 0; i < 1000; i++) {
                if (i % 2 === 0) {
                    toTrainWith.push([1.0, -1.0]);
                    labels.push([1.0, -1.0]);
                } else {
                    toTrainWith.push([-1.0, 1.0]);
                    labels.push([-1.0, 1.0]);
                }
            }

            var nntp = new _NeuralNetworkParameter2.default();
            nntp.inputs = toTrainWith;
            nntp.expectedOutputs = labels;
            nntp.maxEpochs = 100;

            nnDS.train(nntp);
        }
    }, {
        key: "_buttonClick",
        value: function _buttonClick(e) {
            if (e.target.name === "btnTrain") {
                this._train(this.state.neuralNetworkDS);
            } else if (e.target.name === "btnReset") {
                this.state.neuralNetworkDS.stop();

                this.setState({
                    neuralNetworkDS: NeuralNetworkVisualizerTest.createNNDS()
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "NeuralNetworkVisualizerTest" },
                _react2.default.createElement(_NeuralNetworkVisualizer2.default, { dataSource: this.state.neuralNetworkDS }),
                _react2.default.createElement(
                    "button",
                    { onClick: this._buttonClickRef, name: "btnTrain" },
                    "TRAIN"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this._buttonClickRef, name: "btnReset" },
                    "RESET"
                )
            );
        }
    }], [{
        key: "createNNDS",
        value: function createNNDS() {
            var nn = new _NeuralNetwork2.default([2, 3, 2], true, _ActivationFunctions2.default.sigmoid, 0.15);
            return new _NeuralNetworkDS2.default(nn);
        }
    }]);

    return NeuralNetworkVisualizerTest;
}(_react.Component);

exports.default = NeuralNetworkVisualizerTest;