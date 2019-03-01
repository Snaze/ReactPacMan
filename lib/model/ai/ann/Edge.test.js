"use strict";

var _Edge = require("./Edge");

var _Edge2 = _interopRequireDefault(_Edge);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _WeightInitializer = require("./WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("randomizeWeights works", function () {
    var edge = new _Edge2.default("1_1", new _WeightInitializer2.default(_ActivationFunctions2.default.sigmoid, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3));
    edge.randomizeWeight();
    expect(edge.weight !== 0).toBe(true);

    edge = new _Edge2.default("1_1", new _WeightInitializer2.default(_ActivationFunctions2.default.sigmoid, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3));
    edge.randomizeWeight();
    expect(edge.weight !== 0).toBe(true);

    edge = new _Edge2.default("1_1", new _WeightInitializer2.default(_ActivationFunctions2.default.sigmoid, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3));
    edge.randomizeWeight();
    expect(edge.weight !== 0).toBe(true);
});