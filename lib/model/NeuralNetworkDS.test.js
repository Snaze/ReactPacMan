"use strict";

var _NeuralNetworkDS = require("./NeuralNetworkDS");

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

var _NeuralNetwork = require("./ai/ann/NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor test", function () {
    var nn = new _NeuralNetwork2.default([2, 2, 1]);

    var instance = new _NeuralNetworkDS2.default(nn);
    expect(instance !== null).toBe(true);
});