"use strict";

var _BinaryMatrix = require("./BinaryMatrix");

var _BinaryMatrix2 = _interopRequireDefault(_BinaryMatrix);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

var _lodash = require("../../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("test Constructor works", function () {
    // SETUP
    var toSet = [];
    toSet[0] = [];
    toSet[1] = [];
    toSet[0][0] = "000000000";
    toSet[0][1] = "000000001";
    toSet[1][0] = "000000010";
    toSet[1][1] = "000000011";

    // CALL
    var toCheck = new _BinaryMatrix2.default(toSet);

    // ASSERT
    expect(toCheck !== null).toBe(true);
});

it("test createNumericMatrix", function () {
    // SETUP
    var toConvert = [];
    toConvert[0] = [];
    toConvert[1] = [];
    toConvert[0][0] = "000000000";
    toConvert[0][1] = "000000001";
    toConvert[1][0] = "000000010";
    toConvert[1][1] = "000000011";
    toConvert = _lodash2.default.flattenDeep(toConvert);

    // CALL
    var toCheck = _BinaryMatrix2.default.createNumericMatrix(toConvert);

    // ASSERT
    expect(toCheck[0]).toBe(0);
    expect(toCheck[1]).toBe(1);
    expect(toCheck[2]).toBe(2);
    expect(toCheck[3]).toBe(3);
});

it("test getIndex(x, y)", function () {
    // SETUP
    var toConvert = [];
    toConvert[0] = [];
    toConvert[1] = [];
    toConvert[0][0] = "000000000";
    toConvert[0][1] = "000000001";
    toConvert[1][0] = "000000010";
    toConvert[1][1] = "000000011";
    var toTest = new _BinaryMatrix2.default(toConvert, 2);

    // CALL
    // let theIndex = toTest.getIndex(1, 1);

    // ASSERT
    expect(toTest.getBinaryValue(1, 1)).toBe("000000011");
});

it("test getDecimalValue", function () {
    // SETUP
    var toConvert = [];
    toConvert[0] = [];
    toConvert[1] = [];
    toConvert[0][0] = "000000000";
    toConvert[0][1] = "000000001";
    toConvert[1][0] = "000000010";
    toConvert[1][1] = "000000011";
    var toTest = new _BinaryMatrix2.default(toConvert, 2);

    // CALL
    // let theIndex = toTest.getIndex(1, 1);

    // ASSERT
    expect(toTest.getDecimalValue(1, 1)).toBe(3);
});

it("test setBinaryValueAtLocation", function () {
    // SETUP
    var toSet = [];
    toSet[0] = [];
    toSet[1] = [];
    toSet[0][0] = "000000000";
    toSet[0][1] = "000000000";
    toSet[1][0] = "000000000";
    toSet[1][1] = "000000000";
    var binaryMatrix = new _BinaryMatrix2.default(toSet);
    var location_0_0 = new _Location2.default(0, 0);
    var location_0_1 = new _Location2.default(0, 1);

    // CALL and ASSERT
    binaryMatrix.setBinaryValueAtLocation("powerUp", location_0_0, 8, "1");

    expect(binaryMatrix.getDecimalValue(location_0_0.x, location_0_0.y)).toBe(1);
    expect(binaryMatrix.getBinaryValue(location_0_0.x, location_0_0.y)).toBe("000000001");

    // CALL and ASSERT
    binaryMatrix.setBinaryValueAtLocation("powerUp", location_0_1, 8, "1");

    expect(binaryMatrix.getDecimalValue(location_0_0.x, location_0_0.y)).toBe(0);
    expect(binaryMatrix.getBinaryValue(location_0_0.x, location_0_0.y)).toBe("000000000");
    expect(binaryMatrix.getDecimalValue(location_0_1.x, location_0_1.y)).toBe(1);
    expect(binaryMatrix.getBinaryValue(location_0_1.x, location_0_1.y)).toBe("000000001");
});

it("test setBinaryHeaderValue", function () {
    // SETUP
    var toSet = [];
    toSet[0] = [];
    toSet[1] = [];
    toSet[0][0] = "000000000";
    toSet[0][1] = "000000000";
    toSet[1][0] = "000000000";
    toSet[1][1] = "000000000";
    var binaryMatrix = new _BinaryMatrix2.default(toSet, 1);

    // CALL
    binaryMatrix.setBinaryHeaderValue(0, "11");

    // ASSERT
    expect(binaryMatrix.numMatrix[0]).toBe(3);
});