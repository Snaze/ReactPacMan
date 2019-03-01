"use strict";

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

var _Dot = require("../Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _moment = require("../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Player gender is valid", function () {

    expect(_Player2.default.genderIsValid(_Player2.default.MR_PAC_MAN)).toBe(true);
    expect(_Player2.default.genderIsValid(_Player2.default.MRS_PAC_MAN)).toBe(true);
    expect(_Player2.default.genderIsValid(3)).toBe(false);
});

it("Player Constructor Sets initial location to playerSpawn", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.set(1, 1);

    // CALL
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // ASSERT
    expect(thePlayer.location.isEqualTo(1, 1)).toBe(true);
    expect(thePlayer._spawnLocation.isEqualTo(1, 1)).toBe(true);
});

it("moveBackToSpawn", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.set(1, 1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // CALL
    player.moveBackToSpawn();

    // ASSERT
    expect(player.location.equals(player._spawnLocation)).toBe(true);
    expect(player._spawnLocation.isEqualTo(1, 1)).toBe(true);
});

it("player spawn location updates on _nestedDataSourceChanged", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.set(1, 1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var originalLocation = player.location.clone();

    // CALL
    theLevel.playerSpawnLocation.set(1, 2);

    // ASSERT
    expect(player._spawnLocation.isEqualTo(1, 2)).toBe(true);
    expect(player.location.equals(originalLocation)).toBe(true);
});

it("player spawn location updates on _nestedDataSourceChanged in editMode", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.set(1, 1);
    theLevel.editMode = true;
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    player.editMode = true;
    // let originalLocation = player.location.clone();

    // CALL
    theLevel.playerSpawnLocation.set(1, 2);

    // ASSERT
    expect(player._spawnLocation.isEqualTo(1, 2)).toBe(true);
    expect(player.location.isEqualTo(1, 2)).toBe(true);
});

it("handleLocationChange should increment attackModeId", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.set(0, 1);
    var theCell = theLevel.getCellByLocation(new _Location2.default(1, 1));
    theCell.dotType = _Dot2.default.BIG;
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var origAttackModeId = player.attackModeId;

    // CALL
    player.handleLocationChanged(new _Location2.default(1, 1));

    // ASSERT
    expect(player.attackModeId).toBe(origAttackModeId + 1);
});

// it ("handleLocationChange should not increment attackModeId when its already active", () => {
//     // SETUP
//     let theLevel = new Level();
//     theLevel.playerSpawnLocation.set(0, 1);
//     let theCell = theLevel.getCellByLocation(new Location(1, 1));
//     theCell.dotType = Dot.BIG;
//     let player = new Player(theLevel, Player.MR_PAC_MAN);
//     player._attackModeFinishTime = moment().add(120, "s");
//     let origAttackModeId = player.attackModeId;
//
//     // CALL
//     player.handleLocationChanged(new Location(1, 1));
//
//     // ASSERT
//     expect(player.attackModeId).toBe(origAttackModeId);
// });

it("handleLocationChange should reset location if cell doesn't exist", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    theLevel.playerSpawnLocation.set(0, 0);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    expect(player.location.isEqualTo(0, 0)).toBe(true);

    // CALL
    player.handleLocationChanged(new _Location2.default(1, 1));

    // ASSERT
    expect(player.location.isEqualTo(-1, -1)).toBe(true);
});

it("handleLocationChange shouldnt bomb if the location is -1, -1", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    theLevel.playerSpawnLocation.set(0, 0);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    expect(player.location.isEqualTo(0, 0)).toBe(true);
    player.location.set(-1, -1);

    // CALL
    player.handleLocationChanged(player.location);

    // ASSERT
    expect(player.location.isEqualTo(-1, -1)).toBe(true);
});

it("timerTick doesn't bomb if the player's location isn't set", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    theLevel.playerSpawnLocation.set(-1, -1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    player.aiMode = false;

    expect(player.location.isEqualTo(-1, -1)).toBe(true);

    // CALL
    player.timerTick({});
});

it("setting isAlive to false resets _attackModeFinishTime", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    theLevel.playerSpawnLocation.set(0, 0);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");

    // CALL
    player.isAlive = false;

    // ASSERT
    expect(player._attackModeFinishTime <= (0, _moment2.default)()).toBe(true);
});

it("when the level changes reset the player's location and dotsEaten", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.playerSpawnLocation.set(1, 1);
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    player._dotsEaten = 2;
    var theLevel2 = new _Level2.default(3, 3);
    theLevel2.playerSpawnLocation.set(2, 2);

    // CALL
    player.level = theLevel2;

    // ASSERT
    expect(player.location.isEqualTo(2, 2)).toBe(true);
    expect(player.spawnLocation.isEqualTo(2, 2)).toBe(true);
    expect(player.dotsEaten).toBe(0);
});

it("when the level changes the cell transition duration should be updated", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = 5;
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    var theLevelMin = new _Level2.default(3, 3);
    theLevelMin.levelNum = 1;
    var theLevelMax = new _Level2.default(3, 3);
    theLevelMax.levelNum = 17;
    var theLevelMid = new _Level2.default(3, 3);
    theLevelMid.levelNum = 10;

    // CALL and ASSERT
    player.level = theLevelMin;
    expect(player.cellTransitionDuration === _Player2.default.MAX_CELL_DURATION).toBe(true);

    // CALL and ASSERT
    player.level = theLevelMax;
    expect(player.cellTransitionDuration === _Player2.default.MIN_CELL_DURATION).toBe(true);

    // CALL and ASSERT
    player.level = theLevelMid;
    expect(player.cellTransitionDuration > _Player2.default.MIN_CELL_DURATION).toBe(true);
    expect(player.cellTransitionDuration < _Player2.default.MAX_CELL_DURATION).toBe(true);
});

it("player constructor should set cellDuration maxRange", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = 1;

    // CALL
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // ASSERT
    expect(player.cellTransitionDuration).toBe(_Player2.default.MAX_CELL_DURATION);
});

it("player constructor should set cellDuration minRange", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = 17;

    // CALL
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // ASSERT
    expect(player.cellTransitionDuration).toBe(_Player2.default.MIN_CELL_DURATION);
});

it("player constructor should set cellDuration midRange", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = 2;

    // CALL
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // ASSERT
    expect(player.cellTransitionDuration < _Player2.default.MAX_CELL_DURATION).toBe(true);
    expect(player.cellTransitionDuration > _Player2.default.MIN_CELL_DURATION).toBe(true);
});

it("setting level should reset the attackModeFinishTime", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = 2;
    var player = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");

    // CALL
    player.level = new _Level2.default(2, 2);

    // ASSERT
    expect(player._attackModeFinishTime < (0, _moment2.default)()).toBe(true);
});

it("test getAttackDuration()", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);

    // CALL
    theLevel.levelNum = 1;
    var maxAttackDuration = _Player2.default.getAttackDuration(theLevel);

    theLevel.levelNum = _Level2.default.TOTAL_LEVELS;
    var minAttackDuration = _Player2.default.getAttackDuration(theLevel);

    theLevel.levelNum = Math.floor(_Level2.default.TOTAL_LEVELS / 2);
    var midAttackDuration = _Player2.default.getAttackDuration(theLevel);

    // ASSERT
    expect(maxAttackDuration).toBe(_Player2.default.MAX_ATTACK_DURATION);
    expect(minAttackDuration).toBe(_Player2.default.MIN_ATTACK_DURATION);
    expect(_Player2.default.MAX_ATTACK_DURATION > midAttackDuration && _Player2.default.MIN_ATTACK_DURATION < midAttackDuration).toBe(true);
});

var testEatBigDot = function testEatBigDot(levelNum, attackFinishTime) {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = levelNum;
    var theCell = theLevel.getCell(0, 0);
    theCell.dotType = _Dot2.default.BIG;
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    thePlayer.location.set(0, 0);

    // CALL
    thePlayer._eatBigDot(theCell);

    // ASSERT
    expect(thePlayer.attackModeFinishTime >= attackFinishTime).toBe(true);
};

it("test eatBigDot", function () {
    testEatBigDot(1, (0, _moment2.default)().add(_Player2.default.MAX_ATTACK_DURATION, "s"));
    testEatBigDot(Math.floor(_Level2.default.TOTAL_LEVELS / 2), (0, _moment2.default)().add(_Player2.default.MIN_ATTACK_DURATION, "s"));
    testEatBigDot(_Level2.default.TOTAL_LEVELS, (0, _moment2.default)().add(_Player2.default.MIN_ATTACK_DURATION, "s"));
});

var testScoreOver10000Increment = function testScoreOver10000Increment(sourceScore, destScore, shouldIncrement) {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    theLevel.levelNum = 1;
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    thePlayer._score = sourceScore;
    thePlayer._numLives = 1;
    thePlayer.aiMode = false;

    // CALL
    thePlayer.score = destScore;

    // ASSERT
    expect(thePlayer.numLives > 1).toBe(shouldIncrement);
};

it("every 10,000 points pac man gets a new life", function () {
    testScoreOver10000Increment(9960, 10010, true);
    testScoreOver10000Increment(9900, 9950, false);
    testScoreOver10000Increment(29950, 30200, true);
    testScoreOver10000Increment(0, 100, false);
});

it("currentReward works", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    thePlayer.aiMode = true;

    // CALL
    thePlayer.score += 50;

    // ASSERT
    expect(thePlayer._currentReward).toBeCloseTo(0.01);
});

it("toFeatureVector", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    thePlayer.aiMode = true;
    thePlayer.location.set(2, 3);
    thePlayer.prevLocation.set(1, 3);
    thePlayer.isAlive = true;
    thePlayer.score = 1000;
    thePlayer._dotsEaten = 5;
    thePlayer._attackModeId = 4;
    thePlayer.numLives = 3;
    thePlayer._attackModeFinishTime = (0, _moment2.default)().add(2.5, "s");
    thePlayer.direction = _Direction2.default.RIGHT;

    // CALL
    var featureVector = thePlayer.toFeatureVector();

    // ASSERT
    expect(featureVector.length).toBe(13);
    expect(featureVector[0]).toBe(2);
    expect(featureVector[1]).toBe(3);
    expect(featureVector[2]).toBe(1);
    expect(featureVector[3]).toBe(0);
    expect(featureVector[4]).toBe(1);
    expect(Math.floor(featureVector[5] / 1000)).toBe(2);
    expect(featureVector[6]).toBe(1000);
    expect(featureVector[7]).toBe(5);
    expect(featureVector[8]).toBe(4);
    expect(featureVector[9]).toBe(3);
    expect(featureVector[10]).toBe(1);
    expect(featureVector[11]).toBe(3);
    expect(featureVector[12]).toBe(_Direction2.default.directionToDecimal(_Direction2.default.RIGHT));
});

it("setFeatureVector", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    thePlayer.aiMode = true;
    thePlayer.location.set(2, 3);
    thePlayer.prevLocation.set(1, 3);
    thePlayer.isAlive = true;
    thePlayer.score = 1000;
    thePlayer._dotsEaten = 5;
    thePlayer._attackModeId = 4;
    thePlayer.numLives = 3;
    thePlayer._attackModeFinishTime = (0, _moment2.default)().add(2.5, "s");
    var featureVector = thePlayer.toFeatureVector();
    var otherPlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);

    // CALL
    otherPlayer.setFeatureVector(featureVector);

    // ASSERT
    expect(otherPlayer.location.equals(thePlayer.location)).toBe(true);
    expect(otherPlayer.prevLocation.equals(thePlayer.prevLocation)).toBe(true);
    expect(otherPlayer.isAlive).toBe(thePlayer.isAlive);
    expect(otherPlayer.score).toBe(thePlayer.score);
    expect(otherPlayer._dotsEaten).toBe(thePlayer._dotsEaten);
    expect(otherPlayer._attackModeId).toBe(thePlayer._attackModeId);
    expect(otherPlayer.numLives).toBe(thePlayer.numLives);
    expect(Math.floor(otherPlayer._attackModeFinishTime.diff((0, _moment2.default)(), "ms") / 1000)).toBe(2);
    expect(otherPlayer.direction).toBe(thePlayer.direction);
});

it("featureVectorLength", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var thePlayer = new _Player2.default(theLevel, _Player2.default.MR_PAC_MAN);
    thePlayer.aiMode = true;
    thePlayer.location.set(2, 3);
    thePlayer.prevLocation.set(1, 3);
    thePlayer.isAlive = true;
    thePlayer.score = 1000;
    thePlayer._dotsEaten = 5;
    thePlayer._attackModeId = 4;
    thePlayer.numLives = 3;
    thePlayer._attackModeFinishTime = (0, _moment2.default)().add(2.5, "s");
    thePlayer.direction = _Direction2.default.RIGHT;
    var featureVector = thePlayer.toFeatureVector();

    // CALL
    var length = _Player2.default.featureVectorLength;

    // ASSERT
    expect(featureVector.length).toBe(length);
});