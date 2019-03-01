"use strict";

var _ConvertBase = require("./ConvertBase");

var _ConvertBase2 = _interopRequireDefault(_ConvertBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("bin2dec", function () {
    // SETUP
    var toConvert = "10000";

    // CALL
    var value = _ConvertBase2.default.bin2dec(toConvert);

    // ASSERT
    expect(parseInt(value, 10)).toBe(16);
});

it("dec2bin", function () {
    // SETUP
    var toConvert = 17;

    // CALL
    var value = _ConvertBase2.default.dec2bin(toConvert);

    // ASSERT
    expect(value).toBe("10001");
});