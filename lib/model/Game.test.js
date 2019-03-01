"use strict";

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Test Constructor Doesnt Bomb", function () {
    // SETUP

    // CALL
    var theGame = new _Game2.default();

    // ASSERT
    expect(theGame !== null).toBe(true);
});

it("test getLevelName", function () {
    // SETUP

    // CALL
    var levelName = _Game2.default.getLevelName(0);
    var levelName2 = _Game2.default.getLevelName(15);

    // ASSERT
    expect(levelName).toBe("Level2WithPaths");
    expect(levelName2).toBe("Level2WithPaths");
});