"use strict";

var _LevelFactory = require("./LevelFactory");

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("LevelFactory doesnt bomb", function () {
    // SETUP

    // CALL
    var theLevel = _LevelFactory2.default.createLevel("level2withpaths");

    // ASSERT
    expect(theLevel !== null).toBe(true);
});