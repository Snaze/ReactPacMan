"use strict";

var _Ghost = require("./Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _GhostBrainManual = require("./GhostBrains/GhostBrainManual");

var _GhostBrainManual2 = _interopRequireDefault(_GhostBrainManual);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Ghost constructor works", function () {

    var level = new _Level2.default();
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    var ghost = new _Ghost2.default(level, _Ghost2.default.RED, player);

    expect(ghost !== null).toBe(true);
});

var testGhostConstructorForSpawnLocation = function testGhostConstructorForSpawnLocation(ghostColor, levelProp) {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel[levelProp].set(1, 1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // CALL
    var theGhost = new _Ghost2.default(theLevel, ghostColor, player);

    // ASSERT
    expect(theGhost.location.isEqualTo(1, 1)).toBe(true);
    expect(theGhost._spawnLocation.isEqualTo(1, 1)).toBe(true);
};

it("Ghost Constructor Sets initial location to redGhostSpawn", function () {
    testGhostConstructorForSpawnLocation(_Ghost2.default.RED, "ghostRedLocation");
});

it("Ghost Constructor Sets initial location to blueGhostSpawn", function () {
    testGhostConstructorForSpawnLocation(_Ghost2.default.BLUE, "ghostBlueLocation");
});

it("Ghost Constructor Sets initial location to pinkGhostSpawn", function () {
    testGhostConstructorForSpawnLocation(_Ghost2.default.PINK, "ghostPinkLocation");
});

it("Ghost Constructor Sets initial location to orangeGhostSpawn", function () {
    testGhostConstructorForSpawnLocation(_Ghost2.default.ORANGE, "ghostOrangeLocation");
});

it("moveBackToSpawn", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.ghostRedLocation.set(1, 1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghost = new _Ghost2.default(theLevel, _Ghost2.default.RED, player);

    // CALL
    ghost.moveBackToSpawn();

    // ASSERT
    expect(ghost.location.equals(ghost._spawnLocation)).toBe(true);
    expect(ghost._spawnLocation.isEqualTo(1, 1)).toBe(true);
});

var testGhostSpawnLocationChange = function testGhostSpawnLocationChange(ghostColor, propName) {
    var editMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // SETUP
    var theLevel = new _Level2.default();
    theLevel[propName].set(1, 1);
    theLevel.editMode = editMode;
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    var ghost = new _Ghost2.default(theLevel, ghostColor, player);
    ghost.editMode = editMode;
    var originalLocation = ghost.location.clone();

    // CALL
    theLevel[propName].set(1, 2);

    // ASSERT
    expect(ghost._spawnLocation.isEqualTo(1, 2)).toBe(true);
    if (!editMode) {
        expect(ghost.location.equals(originalLocation)).toBe(true);
    } else {
        expect(ghost.location.isEqualTo(1, 2)).toBe(true);
    }
};

it("ghost spawn location updates on _nestedDataSourceChanged", function () {
    testGhostSpawnLocationChange(_Ghost2.default.RED, "ghostRedLocation", false);
    testGhostSpawnLocationChange(_Ghost2.default.BLUE, "ghostBlueLocation", false);
    testGhostSpawnLocationChange(_Ghost2.default.ORANGE, "ghostOrangeLocation", false);
    testGhostSpawnLocationChange(_Ghost2.default.PINK, "ghostPinkLocation", false);
});

it("ghost spawn location updates on _nestedDataSourceChanged in editMode", function () {
    testGhostSpawnLocationChange(_Ghost2.default.RED, "ghostRedLocation", true);
    testGhostSpawnLocationChange(_Ghost2.default.BLUE, "ghostBlueLocation", true);
    testGhostSpawnLocationChange(_Ghost2.default.ORANGE, "ghostOrangeLocation", true);
    testGhostSpawnLocationChange(_Ghost2.default.PINK, "ghostPinkLocation", true);
});

it("ghost timer tick doesn't bomb is location is invalid", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.set(-1, -1);
    theLevel.ghostRedLocation.set(-1, -1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghost = new _Ghost2.default(theLevel, _Ghost2.default.RED, player);

    // CALL
    ghost.timerTick({});
});

// TODO: Fill out movement unit tests (test timerTick(e))

it("reset locations when setting a new level", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.ghostRedLocation.set(2, 2);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghostRed = new _Ghost2.default(theLevel, _Ghost2.default.RED, thePlayer);
    var secondLevel = new _Level2.default(3, 3);
    secondLevel.ghostRedLocation.set(1, 1);

    // CALL
    ghostRed.level = secondLevel;

    // ASSERT
    expect(ghostRed.location.isEqualTo(1, 1)).toBe(true);
    expect(ghostRed.spawnLocation.isEqualTo(1, 1)).toBe(true);
    expect(ghostRed.prevLocation.isEqualTo(1, 1)).toBe(true);
});

it("reset ghost brain when setting a new level", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.ghostRedLocation.set(2, 2);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghostRed = new _Ghost2.default(theLevel, _Ghost2.default.RED, thePlayer);
    ghostRed._ghostBrain.enterState(_GhostBrainManual2.default.GHOST_STATE_ATTACK);
    var secondLevel = new _Level2.default(3, 3);
    secondLevel.ghostRedLocation.set(1, 1);

    // CALL
    ghostRed.level = secondLevel;

    // ASSERT
    expect(ghostRed._ghostBrain._currentState === _GhostBrainManual2.default.GHOST_STATE_HOLDING_PIN).toBe(true);
});

it("toFeatureVector", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.ghostRedLocation.set(2, 2);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghostRed = new _Ghost2.default(theLevel, _Ghost2.default.RED, thePlayer);
    ghostRed.prevLocation.set(2, 2);
    ghostRed.location.set(2, 1);
    ghostRed.isAlive = true;
    ghostRed.direction = _Direction2.default.UP;
    ghostRed._prevKilledByAttackModeId = 3;
    ghostRed.brainState = _GhostBrainManual2.default.GHOST_STATE_WANDER;
    ghostRed._ghostBrain.destinationLocation = new _Location2.default(2, 0);

    // toRet.push(this.location.x);                    // location                 0
    // toRet.push(this.location.y);                    // location                 1
    // toRet.push(delta.x);                            //                          2
    // toRet.push(delta.y);                            //                          3
    // toRet.push(this.isAlive ? 1 : 0);               // isAlive                  4
    // toRet.push(this.prevLocation.x);                // prevLocation             5
    // toRet.push(this.prevLocation.y);                // prevLocation             6
    // toRet.push(Direction.directionToDecimal(this.direction)); // direction      7
    // toRet.push(this._prevKilledByAttackModeId);     // prevKilledByAttackModeId 8
    // toRet.push(this.brainState);                    // brainState               9
    // toRet.push(this._ghostBrain.destinationLocation.x); // destinationLocationX 10
    // toRet.push(this._ghostBrain.destinationLocation.y); // destinationLocationY 11

    // CALL
    var featureVector = ghostRed.toFeatureVector();

    // ASSERT
    expect(featureVector.length).toBe(12);
    expect(featureVector[0]).toBe(2);
    expect(featureVector[1]).toBe(1);
    expect(featureVector[2]).toBe(0);
    expect(featureVector[3]).toBe(-1);
    expect(featureVector[4]).toBe(1);
    expect(featureVector[5]).toBe(2);
    expect(featureVector[6]).toBe(2);
    expect(featureVector[7]).toBe(_Direction2.default.directionToDecimal(_Direction2.default.UP));
    expect(featureVector[8]).toBe(3);
    expect(featureVector[9]).toBe(_GhostBrainManual2.default.GHOST_STATE_WANDER);
    expect(featureVector[10]).toBe(2);
    expect(featureVector[11]).toBe(0);
});

it("setFeatureVector", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.ghostRedLocation.set(2, 2);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghostRed = new _Ghost2.default(theLevel, _Ghost2.default.RED, thePlayer);
    ghostRed.prevLocation.set(2, 2);
    ghostRed.location.set(2, 1);
    ghostRed.isAlive = true;
    ghostRed.direction = _Direction2.default.UP;
    ghostRed._prevKilledByAttackModeId = 3;
    ghostRed.brainState = _GhostBrainManual2.default.GHOST_STATE_WANDER;
    ghostRed._ghostBrain.destinationLocation = new _Location2.default(2, 0);
    var featureVector = ghostRed.toFeatureVector();
    var otherGhost = new _Ghost2.default(theLevel, _Ghost2.default.BLUE, thePlayer);

    // CALL
    otherGhost.setFeatureVector(featureVector);

    // ASSERT
    expect(otherGhost.location.equals(ghostRed.location)).toBe(true);
    expect(otherGhost.prevLocation.equals(ghostRed.prevLocation)).toBe(true);
    expect(otherGhost.isAlive).toBe(ghostRed.isAlive);
    expect(otherGhost.direction).toBe(ghostRed.direction);
    expect(otherGhost._prevKilledByAttackModeId).toBe(ghostRed._prevKilledByAttackModeId);
    expect(otherGhost.brainState).toBe(ghostRed.brainState);
    expect(otherGhost._ghostBrain.destinationLocation.equals(ghostRed._ghostBrain.destinationLocation)).toBe(true);
});

it("featureVectorLength", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.ghostRedLocation.set(2, 2);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var ghostRed = new _Ghost2.default(theLevel, _Ghost2.default.RED, thePlayer);
    ghostRed.prevLocation.set(2, 2);
    ghostRed.location.set(2, 1);
    ghostRed.isAlive = true;
    ghostRed.direction = _Direction2.default.UP;
    ghostRed._prevKilledByAttackModeId = 3;
    ghostRed.brainState = _GhostBrainManual2.default.GHOST_STATE_WANDER;
    ghostRed._ghostBrain.destinationLocation = new _Location2.default(2, 0);

    var featureVector = ghostRed.toFeatureVector();

    // CALL
    var length = _Ghost2.default.featureVectorLength;

    // ASSERT
    expect(length).toBe(featureVector.length);
});