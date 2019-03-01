'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _NeuralNetworkVisualizer = require('./NeuralNetworkVisualizer');

var _NeuralNetworkVisualizer2 = _interopRequireDefault(_NeuralNetworkVisualizer);

var _NeuralNetwork = require('../../model/ai/ann/NeuralNetwork');

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _NeuralNetworkDS = require('../../model/NeuralNetworkDS');

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import EdgeStore from "../../model/ai/ann/EdgeStore";
// import ActivationFunctions from "../../model/ai/ann/ActivationFunctions";

it("basic test", function () {
    var div = document.createElement('div');
    var nn = new _NeuralNetwork2.default([2, 2, 1]);
    var nnDS = new _NeuralNetworkDS2.default(nn);

    _reactDom2.default.render(_react2.default.createElement(_NeuralNetworkVisualizer2.default, {
        dataSource: nnDS }), div);
});