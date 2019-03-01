"use strict";

var _Transition = require("./Transition");

var _Transition2 = _interopRequireDefault(_Transition);

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var toCheck = new _Transition2.default(null, 1, 1, null, 1);

    expect(toCheck !== null).toBe(true);
});

it("toKey", function () {
    var sequence1 = new _Sequence2.default([1], 4);
    var sequence2 = new _Sequence2.default([1], 4);
    sequence2.append(1, [2]);
    var reward = 1;
    var action = 1;
    var transition = new _Transition2.default(sequence1, action, reward, sequence2, 1, 0);

    // CALL
    var key = transition.toKey();

    // ASSERT
    expect(key).toBe("0001_0012_1_1");
});