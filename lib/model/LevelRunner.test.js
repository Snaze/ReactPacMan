"use strict";

var _LevelRunner = require("./LevelRunner");

var _LevelRunner2 = _interopRequireDefault(_LevelRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("LevelRunner constructor works", function () {
    new _LevelRunner2.default("Level2WithPaths");
});

it("DataSourceBase dispose works", function () {
    var lr = new _LevelRunner2.default("Level2WithPaths");
    lr.dispose();
    lr = null;
});

it("startLevel doesnt bomb", function () {
    // SETUP
    var lr = new _LevelRunner2.default("Level2WithPaths");
    var origLevel = lr.level;

    // CALL
    lr.startLevel("Level2WithPaths");

    // ASSERT
    expect(origLevel === lr.level).toBe(true);
});

it("startLevel doesnt bomb diff level", function () {
    // SETUP
    var lr = new _LevelRunner2.default("Level2WithPaths");
    var origLevel = lr.level;

    // CALL
    lr.startLevel("Level3WithPaths");

    // ASSERT
    expect(origLevel !== lr.level).toBe(true);
});

it("startLevel doesnt bomb same level force reload", function () {
    // SETUP
    var lr = new _LevelRunner2.default("Level2WithPaths");
    var origLevel = lr.level;

    // CALL
    lr.startLevel("Level2WithPaths", true);

    // ASSERT
    expect(origLevel !== lr.level).toBe(true);
});

it("loadLevel sets the level num", function () {
    // SETUP
    var lr = new _LevelRunner2.default("Level2WithPaths");
    var origLevel = lr.level;

    // CALL
    lr.loadLevel("Level3WithPaths", false, 5);

    // ASSERT
    expect(origLevel !== lr.level).toBe(true);
    expect(lr.level.levelNum).toBe(5);
    expect(lr.levelNum).toBe(5);
});

it("loadLevel sets the level num", function () {
    // SETUP
    var lr = new _LevelRunner2.default("Level2WithPaths");
    var origLevel = lr.level;

    // CALL
    lr.loadLevel("Level3WithPaths", false, 5);

    // ASSERT
    expect(origLevel !== lr.level).toBe(true);
    expect(lr.level.levelNum).toBe(5);
    expect(lr.levelNum).toBe(5);
});

it("loadLevel resets the level in the gamefooter", function () {
    // SETUP
    var lr = new _LevelRunner2.default("Level2WithPaths");
    var origLevel = lr.level;

    // CALL
    lr.loadLevel("Level3WithPaths", true, 5);

    // ASSERT
    expect(origLevel !== lr.level).toBe(true);
    expect(origLevel !== lr.gameFooter.level).toBe(true);
});