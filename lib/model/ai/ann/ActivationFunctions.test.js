"use strict";

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ArrayUtils from "../../../utils/ArrayUtils";

it("sigmoid output works", function () {

    // CALL
    var result = _ActivationFunctions2.default.sigmoid.output(0.755);

    // ASSERT
    expect(Math.round(result * 100) / 100).toBe(0.68);
});

// it ("sigmoid output layer error works", () => {
//
//     // CALL
//     let result = ActivationFunctions.sigmoid.outputError(0.5, 0.69);
//
//     // ASSERT
//     expect(Math.round(result * 10000) / 10000).toBe(-0.0406);
// });

// it ("sigmoid hidden layer error works", () => {
//     // CALL
//     let result = ActivationFunctions.sigmoid.hiddenError([-0.0406], [0.272392], 0.68);
//
//     // ASSERT
//     expect(Math.round(result * 10e5) / 10e5).toBe(-2.406e-3);
// });

it("tanh output test", function () {
    // 0.999987711650796
    // SETUP
    var x = 6;

    // CALL
    var result = _ActivationFunctions2.default.tanh.output(x);

    // ASSERT
    expect(result).toBeCloseTo(0.999987711650796, 10);
});

// it ("tanh output layer error works", () => {
//
//     // CALL
//     let result = ActivationFunctions.tanh.outputError(0.5, 0.69);
//
//     // ASSERT
//     expect(result).toBeCloseTo(-0.099541, 6);
// });

// it ("tanh hidden layer error works", () => {
//     // CALL
//     // These numbers are no longer significant to the tanh flow.... I just copied
//     // and pasted from sigmoid so they have no real relevance to tanh besides
//     // simply being random numbers.
//     let result = ActivationFunctions.tanh.hiddenError([-0.0406], [0.272392], 0.68);
//
//     // ASSERT
//     expect(result).toBeCloseTo(-0.00594538033152, 5);
// });

it("relu output test", function () {

    // ASSERT
    expect(_ActivationFunctions2.default.relu.output(7)).toBeCloseTo(7);
    expect(_ActivationFunctions2.default.relu.output(-7)).toBeCloseTo(0);
});

// it ("relu output layer error works", () => {
//
//     // CALL
//     let result = ActivationFunctions.relu.outputError(1.0, 0.7);
//     let result2 = ActivationFunctions.relu.outputError(-1.0, -0.7);
//
//     // ASSERT
//     expect(result).toBeCloseTo(0.3);
//     expect(result2).toBeCloseTo(0.0);
// });

// it ("relu hidden layer error works", () => {
//
//     // CALL
//     let result = ActivationFunctions.relu.hiddenError([0.3], [0.3], 0.68);
//     let result2 = ActivationFunctions.relu.hiddenError([0.3], [0.3], -0.68);
//
//     // ASSERT
//     expect(result).toBeCloseTo(0.09);
//     expect(result2).toBeCloseTo(0);
//
// });

it("identity works", function () {
    expect(_ActivationFunctions2.default.identity.output(-1)).toBe(-1);
    expect(_ActivationFunctions2.default.identity.output(0)).toBe(0);
    expect(_ActivationFunctions2.default.identity.output(1)).toBe(1);
    expect(_ActivationFunctions2.default.identity.output(2)).toBe(2);
    expect(_ActivationFunctions2.default.identity.output(3)).toBe(3);

    expect(_ActivationFunctions2.default.identity.derivative(-1)).toBe(1);
    expect(_ActivationFunctions2.default.identity.derivative(0)).toBe(1);
    expect(_ActivationFunctions2.default.identity.derivative(1)).toBe(1);
    expect(_ActivationFunctions2.default.identity.derivative(2)).toBe(1);
    expect(_ActivationFunctions2.default.identity.derivative(3)).toBe(1);

    // let result = ActivationFunctions.identity.outputError([1, 2, 3], [1, 2, 3]);
    // expect(ArrayUtils.arrayEquals(result, [0, 0, 0])).toBe(true);
    //
    // result = ActivationFunctions.identity.hiddenError([1, 2, 3], [1, 2, 3], 1);
    // expect(result).toBe(14);
});