'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _NeuralNetwork = require('./NeuralNetwork');

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _NeuralNetwork3 = require('../../model/ai/ann/NeuralNetwork');

var _NeuralNetwork4 = _interopRequireDefault(_NeuralNetwork3);

var _NeuralNetworkDS = require('../../model/NeuralNetworkDS');

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

var _NeuralNetworkParameter = require('../../model/ai/ann/NeuralNetworkParameter');

var _NeuralNetworkParameter2 = _interopRequireDefault(_NeuralNetworkParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var nn = new _NeuralNetwork4.default([3, 3, 3]);
    var nnDS = new _NeuralNetworkDS2.default(nn);

    _reactDom2.default.render(_react2.default.createElement(_NeuralNetwork2.default, { dataSource: nnDS, width: 640, height: 512 }), div);
});

it("getOptimalLocation works", function () {
    var toCheck = _NeuralNetwork2.default.getOptimalLocation(1, 4, 128, 16);

    expect(toCheck).toBeCloseTo(40);
});

it("test line key", function () {
    // SETUP
    var sourceNode = 2;
    var sourceLayer = 1;
    var destNode = 4;
    var destLayer = 3;

    // CALL
    var lineKey = _NeuralNetwork2.default.getLineKey(sourceLayer, sourceNode, destLayer, destNode);
    var retrieved = _NeuralNetwork2.default.parseLineKey(lineKey);

    // ASSERT
    expect(lineKey).toBe(sourceLayer + '_' + sourceNode + '__' + destLayer + '_' + destNode);
    expect(retrieved.src.layerIdx).toBe(sourceLayer);
    expect(retrieved.src.nodeIdx).toBe(sourceNode);
    expect(retrieved.dest.layerIdx).toBe(destLayer);
    expect(retrieved.dest.nodeIdx).toBe(destNode);
});

it("_colorLines is called after each backprop is complete", function () {
    // SETUP
    jest.useFakeTimers();

    var div = document.createElement('div');
    var nn = new _NeuralNetwork4.default([2, 2, 2]);
    var nnDS = new _NeuralNetworkDS2.default(nn);
    var numCalled = 0;

    var temp = _reactDom2.default.render(_react2.default.createElement(_NeuralNetwork2.default, { dataSource: nnDS, width: 640, height: 512 }), div);

    temp._colorLines = function () {
        numCalled++;
    };
    var trainData = [[1, 1]];
    var trainLabel = [[1.0, -1.0]];
    var nntp = new _NeuralNetworkParameter2.default();
    nntp.inputs = trainData;
    nntp.expectedOutputs = trainLabel;
    nntp.maxEpochs = 5;

    // CALL
    nn.train(nntp);

    jest.runAllTimers();

    // ASSERT
    expect(numCalled).toBeGreaterThan(4);

    jest.useRealTimers();
});