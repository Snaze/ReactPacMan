"use strict";

var _EdgeStore = require("./EdgeStore");

var _EdgeStore2 = _interopRequireDefault(_EdgeStore);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _Edge = require("./Edge");

var _Edge2 = _interopRequireDefault(_Edge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("createNodesInPrevLayer", function () {
    // SETUP
    var numNodesInLayers = [2, 2, 1];

    // CALL
    var toCheck = _EdgeStore2.default.createNodesInPrevLayer(numNodesInLayers);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(toCheck, [0, 2, 2])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(numNodesInLayers, [2, 2, 1])).toBe(true);
});

it("createNodesInNextLayer", function () {
    // SETUP
    var numNodesInLayers = [2, 2, 1];

    // CALL
    var toCheck = _EdgeStore2.default.createNodesInNextLayer(numNodesInLayers);

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(toCheck, [2, 1, 0])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(numNodesInLayers, [2, 2, 1])).toBe(true);
});

var checkEdge = function checkEdge(edgeStore, layerIdx, nodeIdx, numInput, numOutput) {
    var inputEdges = edgeStore.getInputEdges(layerIdx, nodeIdx);
    var outputEdges = edgeStore.getOutputEdges(layerIdx, nodeIdx);

    expect(inputEdges.length).toBe(numInput);
    inputEdges.forEach(function (edge) {
        expect(edge).toBeInstanceOf(_Edge2.default);
        expect(edge.weight !== 0).toBe(true);
    });

    expect(outputEdges.length).toBe(numOutput);
    outputEdges.forEach(function (edge) {
        expect(edge).toBeInstanceOf(_Edge2.default);
        expect(edge.weight !== 0).toBe(true);
    });
};

it("createEdges works", function () {
    // SETUP
    var nodesPerLayer = [2, 2, 1];
    var edgeStore = new _EdgeStore2.default(nodesPerLayer, false, _ActivationFunctions2.default.sigmoid);

    // CALL
    edgeStore.createEdges();

    // ASSERT
    checkEdge(edgeStore, 0, 0, 0, 2);
    checkEdge(edgeStore, 0, 1, 0, 2);

    checkEdge(edgeStore, 1, 0, 2, 1);
    checkEdge(edgeStore, 1, 1, 2, 1);

    checkEdge(edgeStore, 2, 0, 2, 0);

    var outputEdges = edgeStore.getOutputEdges(0, 0);
    var inputEdges = edgeStore.getInputEdges(1, 0);
    expect(inputEdges[0]).toBe(outputEdges[0]);

    outputEdges = edgeStore.getOutputEdges(1, 1);
    inputEdges = edgeStore.getInputEdges(2, 0);
    expect(inputEdges[1]).toBe(outputEdges[0]);

    var distinctEdges = [];
    for (var prop in edgeStore.edgeCache) {
        if (edgeStore.edgeCache.hasOwnProperty(prop)) {
            distinctEdges.push(edgeStore.edgeCache[prop]);
        }
    }
    expect(distinctEdges.length).toBe(6);
    distinctEdges = _ArrayUtils2.default.filter(distinctEdges, function (edge) {
        return edge !== distinctEdges[0];
    });
    expect(distinctEdges.length).toBe(5);
});

it("createEdge works with bias", function () {
    // SETUP
    var edgeStore = new _EdgeStore2.default([2, 2, 1], true, _ActivationFunctions2.default.sigmoid);

    // CALL
    edgeStore.createEdges();

    // ASSERT
    checkEdge(edgeStore, 0, 0, 0, 2);
    checkEdge(edgeStore, 0, 1, 0, 2);
    checkEdge(edgeStore, 1, 0, 3, 1);
    checkEdge(edgeStore, 1, 1, 3, 1);
    checkEdge(edgeStore, 2, 0, 3, 0);
});