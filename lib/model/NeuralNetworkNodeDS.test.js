"use strict";

var _NeuralNetworkNodeDS = require("./NeuralNetworkNodeDS");

var _NeuralNetworkNodeDS2 = _interopRequireDefault(_NeuralNetworkNodeDS);

var _NeuralNetworkNode = require("./ai/ann/NeuralNetworkNode");

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

var _EdgeStore = require("./ai/ann/EdgeStore");

var _EdgeStore2 = _interopRequireDefault(_EdgeStore);

var _ActivationFunctions = require("./ai/ann/ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _ArrayUtils = require("../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var edgeStore = new _EdgeStore2.default([3, 3, 3], true, _ActivationFunctions2.default.sigmoid);
    var nnn = new _NeuralNetworkNode2.default(0, 0, edgeStore, 3);
    var instance = new _NeuralNetworkNodeDS2.default(nnn);

    expect(instance !== null).toBe(true);
});

it("test getActivationInputEquation", function () {
    // SETUP
    var edgeStore = new _EdgeStore2.default([2, 2, 2], false, _ActivationFunctions2.default.sigmoid);
    var nnn = new _NeuralNetworkNode2.default(1, 0, edgeStore, 2, false);
    nnn.weights = [0.5, 0.4];
    nnn._prevInputs = [[0.5, 0.4]];
    var instance = new _NeuralNetworkNodeDS2.default(nnn);

    // CALL
    var toCheck = instance.getActivationInputEquation(0);

    // ASSERT
    expect(toCheck).toBe("0.5000 * 0.5000 + 0.4000 * 0.4000");
});

it("test getActivationInputEquation input node", function () {
    // SETUP
    var edgeStore = new _EdgeStore2.default([2, 2, 2], false, _ActivationFunctions2.default.sigmoid);
    var nnn = new _NeuralNetworkNode2.default(0, 0, edgeStore, 2, false);
    // nnn.weights = [];
    nnn._prevInputs = [[0.5, 0.4]];
    var instance = new _NeuralNetworkNodeDS2.default(nnn);

    // CALL
    var toCheck = instance.getActivationInputEquation(0);

    // ASSERT
    expect(toCheck).toBe("0.5000");
});

it("_recordAverageErrorHistory", function () {
    // SETUP
    var edgeStore = new _EdgeStore2.default([3, 3, 3], true, _ActivationFunctions2.default.sigmoid);
    var nnn = new _NeuralNetworkNode2.default(0, 0, edgeStore, 3);
    var instance = new _NeuralNetworkNodeDS2.default(nnn);
    instance._maxErrorHistoryLength = 5;

    // CALL
    instance._recordAverageErrorHistory([5]);
    instance._recordAverageErrorHistory([6]);
    instance._recordAverageErrorHistory([7]);
    instance._recordAverageErrorHistory([8]);
    instance._recordAverageErrorHistory([9]);
    instance._recordAverageErrorHistory([10]);

    // ASSERT
    expect(instance._errorHistory.length).toBe(5);
    expect(_ArrayUtils2.default.arrayEquals(instance.errorHistory, [6, 7, 8, 9, 10])).toBe(true);

    instance._recordAverageErrorHistory([11]);
    expect(instance._errorHistory.length).toBe(5);
    expect(_ArrayUtils2.default.arrayEquals(instance.errorHistory, [7, 8, 9, 10, 11])).toBe(true);
});