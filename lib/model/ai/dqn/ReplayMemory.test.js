"use strict";

var _ReplayMemory = require("./ReplayMemory");

var _ReplayMemory2 = _interopRequireDefault(_ReplayMemory);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _Transition = require("./Transition");

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This will create a dummy transition for testing.
 *
 * @param fromArray {Array}
 * @param toArray {Array}
 * @returns {Transition}
 */
var createDummyTransition = function createDummyTransition(fromArray, toArray) {
    var sequence1 = new _Sequence2.default(fromArray);
    var sequence2 = new _Sequence2.default(fromArray);
    sequence2.append(1, toArray);
    var reward = 1;
    var action = 1;
    return new _Transition2.default(sequence1, action, reward, sequence2, 1, 0);
};

it("constructor", function () {
    var test = new _ReplayMemory2.default();
    expect(test !== null).toBe(true);
});

it("store", function () {
    // SETUP
    var toCheck = new _ReplayMemory2.default(2);

    // CALL and ASSERT
    toCheck.store(0);
    toCheck.store(1);
    toCheck.store(2);

    // ASSERT
    expect(toCheck.index).toBe(1);
    expect(toCheck.maxIndex).toBe(2);
    expect(_ArrayUtils2.default.arrayEquals(toCheck._data, [2, 1])).toBe(true);
});

it("store only unique", function () {
    // SETUP
    var toCheck = new _ReplayMemory2.default(2);
    var transition1 = createDummyTransition([1], [2]);
    var transition2 = createDummyTransition([2], [3]);

    // CALL and ASSERT
    toCheck.store(transition1);
    toCheck.store(transition1);
    toCheck.store(transition2);

    // ASSERT
    expect(toCheck._data[0]).toBe(transition1);
    expect(toCheck._data[1]).toBe(transition2);
});

it("sample random minibatch 1", function () {
    // SETUP
    var toCheck = new _ReplayMemory2.default(2);
    toCheck.store(0);
    toCheck.store(1);

    // CALL
    var result = toCheck.sampleRandomMinibatch(10);

    // ASSERT
    expect(_ArrayUtils2.default.isIn(result, 0)).toBe(true);
    expect(_ArrayUtils2.default.isIn(result, 1)).toBe(true);
    expect(result.length).toBe(10);
});

it("sample random minibatch 2", function () {
    // SETUP
    var toCheck = new _ReplayMemory2.default(1000);
    toCheck.store(0);
    toCheck.store(1);

    // CALL
    var result = toCheck.sampleRandomMinibatch(10);

    // ASSERT
    expect(_ArrayUtils2.default.isIn(result, 0)).toBe(true);
    expect(_ArrayUtils2.default.isIn(result, 1)).toBe(true);
    expect(result.length).toBe(10);
});

// it ("sample random minibatch - normal scenario", () => {
//     // SETUP
//     let toCheck = new ReplayMemory(5);
//     toCheck.store(0);
//     toCheck.store(1);
//
//     // CALL
//     let result = toCheck.sampleRandomMinibatch(10);
//
//     // ASSERT
//     expect(ArrayUtils.isIn(result, 0)).toBe(true);
//     expect(ArrayUtils.isIn(result, 1)).toBe(true);
//     expect(result.length).toBe(2);
// });