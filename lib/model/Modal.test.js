"use strict";

var _Modal = require("./Modal");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor works", function () {

    // CALL
    var theModal = new _Modal2.default();

    // ASSERT
    expect(theModal !== null).toBe(true);
});