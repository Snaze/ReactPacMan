"use strict";

var _ActorBase = require("./ActorBase");

var _ActorBase2 = _interopRequireDefault(_ActorBase);

var _BorderType = require("../../model/BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Level = require("../../model/Level");

var _Level2 = _interopRequireDefault(_Level);

var _Location = require("../../model/Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("canMoveInDirection solid rightBorder works", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.RIGHT, true);
    var actorBase = new _ActorBase2.default(theLevel);
    actorBase.location.set(0, 0);

    // CALL
    var moveRightResult = actorBase.canMoveInDirection(new _Location2.default(0, 0), _Direction2.default.RIGHT);
    var moveDownResult = actorBase.canMoveInDirection(new _Location2.default(0, 0), _Direction2.default.DOWN);

    // ASSERT
    expect(moveRightResult).toBe(false);
    expect(moveDownResult).toBe(true);
});

it("canMoveInDirection partial rightBorder works", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.gameMatrix[0][0].setPartialBorder(_BorderType2.default.RIGHT, true);
    var actorBase = new _ActorBase2.default(theLevel);
    actorBase.location.set(0, 0);

    // CALL
    var moveRightResult = actorBase.canMoveInDirection(new _Location2.default(0, 0), _Direction2.default.RIGHT);
    var moveDownResult = actorBase.canMoveInDirection(new _Location2.default(0, 0), _Direction2.default.DOWN);

    // ASSERT
    expect(moveRightResult).toBe(false);
    expect(moveDownResult).toBe(true);
});

it("moveInDirection blocked works", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.RIGHT, true);
    var actorBase = new _ActorBase2.default(theLevel);
    actorBase.location.set(0, 0);

    // CALL
    actorBase.moveInDirection(_Direction2.default.RIGHT);

    // ASSERT
    expect(actorBase.location.isEqualTo(0, 0)).toBe(true);
});

it("moveInDirection not blocked works", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.RIGHT, true);
    var actorBase = new _ActorBase2.default(theLevel);
    actorBase.location.set(0, 0);

    // CALL
    actorBase.moveInDirection(_Direction2.default.DOWN);

    // ASSERT
    expect(actorBase.location.isEqualTo(0, 1)).toBe(true);
});

it("level change unwire events test", function () {
    // SETUP
    var theLevel = new _Level2.default();
    var actorBase = new _ActorBase2.default(theLevel);
    var newLevel = new _Level2.default();
    var fired = false;
    var theCallback = function theCallback(e) {
        fired = true;
    };
    actorBase.level = newLevel;
    actorBase.addOnChangeCallback(theCallback);

    // CALL
    theLevel.editMode = true;

    // ASSERT
    expect(fired).toBe(false);

    // CALL AGAIN
    newLevel.editMode = true;

    // ASSERT
    expect(fired).toBe(true);
});