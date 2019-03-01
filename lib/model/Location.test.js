"use strict";

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

var _lodash = require("../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Direction = require("../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("toArray works", function () {
    var loc = new _Location2.default(1, 2);

    expect(_lodash2.default.isEqual(loc.toArray(), [2, 1])).toBe(true);
    expect(_lodash2.default.isEqual(loc.toArray(false), [1, 2])).toBe(true);
});

it("toString works", function () {
    var loc = new _Location2.default(1, 2);

    expect(loc.toString()).toBe("(1, 2)");
});

it("fromIndexArray works", function () {
    var indexArray = [1, 2];
    var loc = _Location2.default.fromIndexArray(indexArray);

    expect(loc.x).toBe(2);
    expect(loc.y).toBe(1);

    loc = _Location2.default.fromIndexArray(indexArray, false);

    expect(loc.x).toBe(1);
    expect(loc.y).toBe(2);
});

var testIsAbove = function testIsAbove(lowerLoc, aboveLoc, expectedValue) {
    var maxHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    // CALL
    var retVal = aboveLoc.isAbove(lowerLoc, maxHeight);

    // ASSERT
    expect(retVal).toBe(expectedValue);
};

it("isAbove works - simple case", function () {
    testIsAbove(new _Location2.default(1, 1), new _Location2.default(1, 0), true);
});

it("isAbove works - wrap case", function () {
    testIsAbove(new _Location2.default(1, 0), new _Location2.default(1, 2), true, 3);
});

it("isAbove works - wrong case", function () {
    testIsAbove(new _Location2.default(1, 2), new _Location2.default(1, 0), false);
});

it("isAbove works - wrong case 2", function () {
    testIsAbove(new _Location2.default(1, 2), new _Location2.default(0, 1), false);
});

var testIsLeftOf = function testIsLeftOf(leftLoc, rightLoc, expectedValue) {
    var maxWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    // CALL
    var retVal = leftLoc.isLeftOf(rightLoc, maxWidth);

    // ASSERT
    expect(retVal).toBe(expectedValue);
};

it("isLeftOf works - simple case", function () {
    testIsLeftOf(new _Location2.default(0, 0), new _Location2.default(1, 0), true);
});

it("isLeftOf works - wrap case", function () {
    testIsLeftOf(new _Location2.default(2, 0), new _Location2.default(0, 0), true, 3);
});

it("isLeftOf works - wrong case", function () {
    testIsLeftOf(new _Location2.default(0, 0), new _Location2.default(2, 0), false);
});

it("isLeftOf works - wrong case 2", function () {
    testIsLeftOf(new _Location2.default(0, 1), new _Location2.default(1, 0), false);
});

var testIsRightOf = function testIsRightOf(leftLoc, rightLoc, expectedValue) {
    var maxWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    // CALL
    var retVal = rightLoc.isRightOf(leftLoc, maxWidth);

    // ASSERT
    expect(retVal).toBe(expectedValue);
};

it("isRightOf works - simple case", function () {
    testIsRightOf(new _Location2.default(0, 0), new _Location2.default(1, 0), true);
});

it("isRightOf works - wrap case", function () {
    testIsRightOf(new _Location2.default(2, 0), new _Location2.default(0, 0), true, 3);
});

it("isRightOf works - wrong case", function () {
    testIsRightOf(new _Location2.default(0, 0), new _Location2.default(2, 0), false);
});

it("isRightOf works - wrong case 2", function () {
    testIsRightOf(new _Location2.default(0, 1), new _Location2.default(1, 0), false);
});

var testIsBelow = function testIsBelow(belowLoc, aboveLoc, expectedValue) {
    var maxHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    // CALL
    var retVal = belowLoc.isBelow(aboveLoc, maxHeight);

    // ASSERT
    expect(retVal).toBe(expectedValue);
};

it("isBelow works - simple case", function () {
    testIsBelow(new _Location2.default(0, 1), new _Location2.default(0, 0), true);
});

it("isBelow works - wrap case", function () {
    testIsBelow(new _Location2.default(0, 0), new _Location2.default(0, 2), true, 3);
});

it("isBelow works - wrong case", function () {
    testIsBelow(new _Location2.default(2, 0), new _Location2.default(0, 0), false);
});

it("isBelow works - wrong case 2", function () {
    testIsBelow(new _Location2.default(0, 1), new _Location2.default(1, 0), false);
});

it("test getDirection", function () {
    expect(_Location2.default.getDirection(new _Location2.default(0, 0), new _Location2.default(1, 0)) === _Direction2.default.RIGHT).toBe(true);
    expect(_Location2.default.getDirection(new _Location2.default(1, 0), new _Location2.default(0, 0)) === _Direction2.default.LEFT).toBe(true);
    expect(_Location2.default.getDirection(new _Location2.default(0, 0), new _Location2.default(0, 1)) === _Direction2.default.DOWN).toBe(true);
    expect(_Location2.default.getDirection(new _Location2.default(0, 1), new _Location2.default(0, 0)) === _Direction2.default.UP).toBe(true);
    expect(_Location2.default.getDirection(new _Location2.default(0, 0), new _Location2.default(5, 0)) === _Direction2.default.NONE).toBe(true);
});

it("test distance", function () {
    // SETUP
    var leftLocation = new _Location2.default(0, 0);
    var rightLocation = new _Location2.default(1, 0);

    // CALL
    var result = rightLocation.distance(leftLocation);

    // ASSERT
    expect(result).toBe(1.0);
});

it("manhattanDistance test", function () {
    // SETUP
    var sourceLocation = new _Location2.default(5, 5);
    var destLocation = new _Location2.default(2, 4);

    // CALL
    var distance = sourceLocation.manhattanDistance(destLocation);

    // ASSERT
    expect(distance).toBe(4);
});

it("test getDelta", function () {
    // SETUP
    var otherLocation = new _Location2.default(5, 5);
    var thisLocation = new _Location2.default(4, 5);

    // CALL
    var delta = thisLocation.getDelta(otherLocation);

    // ASSERT
    expect(delta.x).toBe(-1);
    expect(delta.y).toBe(0);
});