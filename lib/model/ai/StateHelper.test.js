"use strict";

var _StateHelper = require("./StateHelper");

var _StateHelper2 = _interopRequireDefault(_StateHelper);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _Dot = require("../Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _GameObjectContainer = require("../GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _PowerUp = require("../actors/PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setTwoWayBorder = function setTwoWayBorder(level, x, y, direction, value) {

    var cell = level.getCell(x, y);
    var otherLocation = new _Location2.default(x, y);
    otherLocation.moveInDirection(direction, level.height, level.width);
    var otherCell = level.getCellByLocation(otherLocation);

    cell.setSolidBorder(direction, value);
    otherCell.setSolidBorder(_Direction2.default.getOpposite(direction), value);
};

var createTestLevel = function createTestLevel() {
    var toRet = new _Level2.default(5, 5);

    setTwoWayBorder(toRet, 2, 0, _Direction2.default.LEFT, true);
    setTwoWayBorder(toRet, 2, 0, _Direction2.default.UP, true);
    setTwoWayBorder(toRet, 2, 0, _Direction2.default.RIGHT, true);
    toRet.getCell(2, 0).dotType = _Dot2.default.BIG;

    setTwoWayBorder(toRet, 2, 1, _Direction2.default.LEFT, true);
    setTwoWayBorder(toRet, 2, 1, _Direction2.default.RIGHT, true);
    toRet.getCell(2, 1).dotType = _Dot2.default.LITTLE;

    toRet.getCell(2, 2).isPlayerSpawn = true;

    setTwoWayBorder(toRet, 2, 3, _Direction2.default.LEFT, true);
    setTwoWayBorder(toRet, 2, 3, _Direction2.default.RIGHT, true);
    toRet.getCell(2, 3).dotType = _Dot2.default.LITTLE;

    setTwoWayBorder(toRet, 2, 4, _Direction2.default.LEFT, true);
    setTwoWayBorder(toRet, 2, 4, _Direction2.default.RIGHT, true);
    setTwoWayBorder(toRet, 2, 4, _Direction2.default.DOWN, true);
    toRet.getCell(2, 4).dotType = _Dot2.default.LITTLE;
    toRet.getCell(2, 4).isGhostRedSpawn = true;

    setTwoWayBorder(toRet, 1, 2, _Direction2.default.UP, true);
    setTwoWayBorder(toRet, 1, 2, _Direction2.default.DOWN, true);
    toRet.getCell(1, 2).solidBorder.top = true;
    toRet.getCell(1, 2).solidBorder.bottom = true;
    toRet.getCell(1, 2).dotType = _Dot2.default.LITTLE;

    setTwoWayBorder(toRet, 0, 2, _Direction2.default.UP, true);
    setTwoWayBorder(toRet, 0, 2, _Direction2.default.DOWN, true);
    setTwoWayBorder(toRet, 0, 2, _Direction2.default.LEFT, true);
    toRet.getCell(0, 2).dotType = _Dot2.default.LITTLE;

    setTwoWayBorder(toRet, 3, 2, _Direction2.default.UP, true);
    setTwoWayBorder(toRet, 3, 2, _Direction2.default.DOWN, true);
    toRet.getCell(3, 2).dotType = _Dot2.default.LITTLE;

    setTwoWayBorder(toRet, 4, 2, _Direction2.default.UP, true);
    setTwoWayBorder(toRet, 4, 2, _Direction2.default.DOWN, true);
    setTwoWayBorder(toRet, 4, 2, _Direction2.default.RIGHT, true);
    toRet.getCell(4, 2).dotType = _Dot2.default.LITTLE;

    return toRet;
};

var createTestGameObjectContainer = function createTestGameObjectContainer() {
    var level = createTestLevel();
    var goc = new _GameObjectContainer2.default(level);
    goc.powerUp.location.set(4, 2);
    goc.powerUp.powerUpType = _PowerUp2.default.POWER_UP_STRAWBERRY;

    return goc;
};

it("getGhostHeuristic max distance", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();
    var level = createTestLevel();
    var goc = new _GameObjectContainer2.default(level);

    // CALL
    var heuristic = stateHelper.getGhostHeuristic(stateHelper.searchDepth, goc.ghostRed, goc);

    // ASSERT
    expect(heuristic).toBe(0);
});

it("getGhostHeuristic min distance", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();
    var level = createTestLevel();
    var goc = new _GameObjectContainer2.default(level);

    // CALL
    var heuristic = stateHelper.getGhostHeuristic(0, goc.ghostRed, goc);

    // ASSERT
    expect(heuristic).toBe(stateHelper.deathValue);
});

it("getGhostHeuristic middle distance", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();
    var level = createTestLevel();
    var goc = new _GameObjectContainer2.default(level);

    // CALL
    var heuristic = stateHelper.getGhostHeuristic(Math.floor(stateHelper.searchDepth / 2), goc.ghostRed, goc);

    // ASSERT
    expect(heuristic < 0 && heuristic > stateHelper.deathValue).toBe(true);
});

it("getPowerUpHeuristic max distance", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();

    // CALL
    var heuristic = stateHelper.getDiscountedHeuristic(stateHelper.searchDepth, 100);

    // ASSERT
    expect(heuristic).toBe(0);
});

it("getPowerUpHeuristic min distance", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();

    // CALL
    var heuristic = stateHelper.getDiscountedHeuristic(0, 100);

    // ASSERT
    expect(heuristic).toBe(100);
});

it("getPowerUpHeuristic mid distance", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();

    // CALL
    var heuristic = stateHelper.getDiscountedHeuristic(Math.floor(stateHelper.searchDepth / 2), 100);

    // ASSERT
    expect(heuristic > 0 && heuristic < 100).toBe(true);
});

it("test getHeuristic", function () {
    // SETUP
    var goc = createTestGameObjectContainer();
    var stateHelper = new _StateHelper2.default();
    var startLocation = goc.player.location.clone().moveInDirection(_Direction2.default.UP, goc.level.width, goc.level.height);

    // CALL
    var topHeuristic = stateHelper.getHeuristic(goc, startLocation);

    // ASSERT
    expect(topHeuristic > 0).toBe(true);
});

it("test getStateNumber", function () {
    // SETUP
    var goc = createTestGameObjectContainer();
    var stateHelper = new _StateHelper2.default();

    // CALL
    var theStateNumber = stateHelper.getStateNumber(goc);

    // ASSERT
    expect(theStateNumber > 0 && theStateNumber <= _StateHelper2.default.NUM_STATES).toBe(true);
});

it("test getBinnedHeuristics", function () {
    // SETUP
    var stateHelper = new _StateHelper2.default();
    var heuristics = [null, 0, 0, null];
    var min = 0;
    var max = 0;

    // CALL
    var binnedHeuristics = stateHelper.getBinnedHeuristics(heuristics, min, max);

    // ASSERT
    binnedHeuristics.forEach(function (bh) {
        expect(bh !== "NaN").toBe(true);
    });
});