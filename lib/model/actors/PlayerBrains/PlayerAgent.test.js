"use strict";

var _PlayerAgent = require("./PlayerAgent");

var _PlayerAgent2 = _interopRequireDefault(_PlayerAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("test constructor", function () {

    // CALL
    var theAgent = new _PlayerAgent2.default(8);

    // ASSERT
    expect(theAgent !== null).toBe(true);
});