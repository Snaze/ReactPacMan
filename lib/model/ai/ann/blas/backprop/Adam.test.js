"use strict";

var _Adam = require("./Adam");

var _Adam2 = _interopRequireDefault(_Adam);

var _vectorious = require("../../../../../../node_modules/vectorious/vectorious");

var _vectorious2 = _interopRequireDefault(_vectorious);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var instance = new _Adam2.default();

    expect(instance !== null).toBe(true);
});

it("getWeightDeltas", function () {
    // SETUP
    var instance = new _Adam2.default();
    var currentGradient = new _vectorious2.default.Matrix([[0.1, 0.2, 0.3], [0.1, 0.2, 0.3], [0.1, 0.2, 0.3]]);
    var learningRate = 0.03;

    // CALL
    var result = instance.getWeightDeltas(currentGradient, learningRate);

    // ASSERT
    expect(result !== null).toBe(true);
});