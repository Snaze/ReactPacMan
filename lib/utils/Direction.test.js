"use strict";

var _Direction = require("./Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("test binary to decimal conversion", function () {
    // SETUP

    // CALL
    var leftBin = _Direction2.default.toBinary(_Direction2.default.LEFT);
    var upBin = _Direction2.default.toBinary(_Direction2.default.UP);
    var rightBin = _Direction2.default.toBinary(_Direction2.default.RIGHT);
    var downBin = _Direction2.default.toBinary(_Direction2.default.DOWN);

    // ASSERT and CALL
    expect(_Direction2.default.decimalToDirection(parseInt(leftBin, 2))).toBe(_Direction2.default.LEFT);
    expect(_Direction2.default.decimalToDirection(parseInt(upBin, 2))).toBe(_Direction2.default.UP);
    expect(_Direction2.default.decimalToDirection(parseInt(rightBin, 2))).toBe(_Direction2.default.RIGHT);
    expect(_Direction2.default.decimalToDirection(parseInt(downBin, 2))).toBe(_Direction2.default.DOWN);
});