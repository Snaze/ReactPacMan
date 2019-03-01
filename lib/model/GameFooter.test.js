"use strict";

var _GameFooter = require("./GameFooter");

var _GameFooter2 = _interopRequireDefault(_GameFooter);

var _Player = require("./actors/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Level = require("./Level");

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("get powerups works", function () {
    // SETUP
    var level = new _Level2.default(10, 10, 1);
    var player1 = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    var player2 = new _Player2.default(level, _Player2.default.MRS_PAC_MAN);
    var gf = new _GameFooter2.default(player1, player2, level, _GameFooter2.default.ACTIVE_PLAYER_1);

    // CALL
    var powerups = gf.powerUps;

    // ASSERT
    expect(powerups.length).toBe(1);
    expect(powerups[0]).toBe("Cherry");
});

it("get powerups works for level > 7", function () {
    // SETUP
    var level = new _Level2.default(10, 10, 8);
    var player1 = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    var player2 = new _Player2.default(level, _Player2.default.MRS_PAC_MAN);
    var gf = new _GameFooter2.default(player1, player2, level, _GameFooter2.default.ACTIVE_PLAYER_1);

    // CALL
    var powerups = gf.powerUps;

    // ASSERT
    expect(powerups.length).toBe(7);
    expect(powerups[0]).toBe("Cherry");
    expect(powerups[1]).toBe("Strawberry");
    expect(powerups[2]).toBe("Orange");
    expect(powerups[3]).toBe("Pretzel");
    expect(powerups[4]).toBe("Apple");
    expect(powerups[5]).toBe("Pear");
    expect(powerups[6]).toBe("Banana");
});