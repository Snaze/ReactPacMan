"use strict";

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var toCheck = new _Sequence2.default();

    expect(toCheck !== null).toBe(true);
});

it("append", function () {
    // SETUP
    var toCheck = new _Sequence2.default([1]);

    // CALL
    toCheck.append(0, [2]);

    // ASSERT
    expect(toCheck.states.length).toBe(2);
    expect(_ArrayUtils2.default.arrayEquals(toCheck.states[0], [1])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(toCheck.states[1], [2])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(toCheck.actions, [0])).toBe(true);
});

it("createPreprocessedState", function () {
    // SETUP
    var toCheck1 = new _Sequence2.default([0], 5);
    var toCheck2 = new _Sequence2.default([0], 5);
    toCheck2.append(0, [1]);
    var toCheck3 = new _Sequence2.default([0], 5);
    toCheck3.append(0, [1]);
    toCheck3.append(1, [2]);
    toCheck3.append(2, [3]);
    toCheck3.append(3, [4]);
    toCheck3.append(4, [5]);
    toCheck3.append(5, [6]);

    // CALL
    var result1 = toCheck1.createPreProcessedSequence();
    var result2 = toCheck2.createPreProcessedSequence();
    var result3 = toCheck3.createPreProcessedSequence();

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals(result1.states[0], [0])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(result2.states[0], [0])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(result2.states[1], [1])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(result2.actions, [0])).toBe(true);
    var states = _ArrayUtils2.default.flatten(result3.states);
    var actions = _ArrayUtils2.default.flatten(result3.actions);
    expect(_ArrayUtils2.default.arrayEquals(states, [2, 3, 4, 5, 6])).toBe(true);
    expect(_ArrayUtils2.default.arrayEquals(actions, [2, 3, 4, 5])).toBe(true);
});

it("clone", function () {
    // SETUP
    var sequence = new _Sequence2.default([0]);
    sequence.append(0, [1]);

    // CALL
    var otherSequence = sequence.clone();

    // ASSERT
    expect(otherSequence.states.length).toBe(2);
    expect(otherSequence.states[0][0]).toBe(0);
    expect(otherSequence.states[1][0]).toBe(1);
    expect(otherSequence.actions.length).toBe(1);
    expect(otherSequence.actions[0]).toBe(0);
});

it("toInput", function () {
    // SETUP
    var sequence = new _Sequence2.default([0], 4);
    sequence.append(0, [1]);
    sequence.append(1, [2]);
    sequence.append(2, [3]);
    sequence.append(3, [4]);
    sequence.append(4, [5]);
    sequence = sequence.createPreProcessedSequence();

    // CALL
    var input = sequence.toInput();

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals([2, 3, 4, 5], input)).toBe(true);
});

it("toInput on undersized Sequence", function () {
    // SETUP
    var sequence = new _Sequence2.default([1], 4);

    // CALL
    var input = sequence.toInput();

    // ASSERT
    expect(_ArrayUtils2.default.arrayEquals([0, 0, 0, 1], input)).toBe(true);
});

it("toKey", function () {
    // SETUP
    var sequence = new _Sequence2.default([1], 4);

    // CALL
    var key = sequence.toKey();

    // ASSERT
    expect(key).toBe("0001");
});