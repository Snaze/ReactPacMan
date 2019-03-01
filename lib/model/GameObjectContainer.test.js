"use strict";

var _GameObjectContainer = require("./GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _Level = require("./Level");

var _Level2 = _interopRequireDefault(_Level);

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

var _moment = require("../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _Ghost = require("./actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Dot from "./Dot";
// import Direction from "../utils/Direction";


it("Constructor works", function () {
    var theLevel = new _Level2.default();
    new _GameObjectContainer2.default(theLevel);
});

it("Player2 is not undefined", function () {
    var theLevel = new _Level2.default();
    var goc = new _GameObjectContainer2.default(theLevel);

    expect(goc.player2 !== null).toBe(true);
    expect(goc.player2.numLives > 0).toBe(true);
});

it("Get Level works", function () {
    // SETUP
    var theLevel = new _Level2.default();
    var goc = new _GameObjectContainer2.default(theLevel);

    // CALL
    var toCheck = goc.level;

    // ASSERT
    expect(theLevel === toCheck).toBe(true);
});

it("Set Level works", function () {
    // SETUP
    var theLevel = new _Level2.default();
    var goc = new _GameObjectContainer2.default(theLevel);
    var level2 = new _Level2.default();

    // CALL
    goc.level = level2;

    // ASSERT
    expect(goc.player.level === level2).toBe(true);
    expect(goc.ghostRed.level === level2).toBe(true);
    expect(goc.ghostBlue.level === level2).toBe(true);
    expect(goc.ghostPink.level === level2).toBe(true);
    expect(goc.ghostOrange.level === level2).toBe(true);
    expect(goc.level === level2).toBe(true);
});

it("moveAllBackToSpawn", function () {
    // SETUP
    var playerSpawnLocation = new _Location2.default(0, 0);
    var ghostRedLocation = new _Location2.default(1, 1);
    var ghostBlueLocation = new _Location2.default(2, 2);
    var ghostPinkLocation = new _Location2.default(3, 3);
    var ghostOrangeLocation = new _Location2.default(4, 4);

    var theLevel = new _Level2.default();
    theLevel.playerSpawnLocation.setWithLocation(playerSpawnLocation);
    theLevel.ghostRedLocation.setWithLocation(ghostRedLocation);
    theLevel.ghostBlueLocation.setWithLocation(ghostBlueLocation);
    theLevel.ghostPinkLocation.setWithLocation(ghostPinkLocation);
    theLevel.ghostOrangeLocation.setWithLocation(ghostOrangeLocation);

    var goc = new _GameObjectContainer2.default(theLevel);
    goc.player.location.set(10, 10);
    goc.ghostRed.location.set(11, 11);
    goc.ghostBlue.location.set(12, 12);
    goc.ghostPink.location.set(13, 13);
    goc.ghostOrange.location.set(14, 14);

    // CALL
    goc.moveAllBackToSpawnAndResetActors();

    // ASSERT
    expect(goc.player.location.equals(playerSpawnLocation)).toBe(true);
    expect(goc.ghostRed.location.equals(ghostRedLocation)).toBe(true);
    expect(goc.ghostBlue.location.equals(ghostBlueLocation)).toBe(true);
    expect(goc.ghostPink.location.equals(ghostPinkLocation)).toBe(true);
    expect(goc.ghostOrange.location.equals(ghostOrangeLocation)).toBe(true);
});

it("checkAndSpawnPowerUp works correctly", function () {
    // SETUP
    var theLevel = new _Level2.default();
    var goc = new _GameObjectContainer2.default(theLevel);
    goc._powerUpActive = false;
    goc._powerUpSpawnTime = (0, _moment2.default)().add(120, "s");
    var originalLocation = goc.powerUp.location.clone();
    var now = (0, _moment2.default)();

    // CALL
    goc.checkAndSpawnPowerUp(now);

    // ASSERT
    expect(goc.powerUp.location.equals(originalLocation)).toBe(true);
});

it("checkAndSpawnPowerUp works correctly 2", function () {
    // SETUP
    var theLevel = new _Level2.default();
    var goc = new _GameObjectContainer2.default(theLevel);
    goc._powerUpActive = false;
    goc._powerUpSpawnTime = (0, _moment2.default)();
    goc.powerUp.location.set(-1, -1);
    var originalLocation = goc.powerUp.location.clone();
    var now = (0, _moment2.default)().add(1, "s");

    // CALL
    goc.checkAndSpawnPowerUp(now);

    // ASSERT
    expect(!goc.powerUp.location.equals(originalLocation)).toBe(true);
});

it("if player spawn is not set, gameTimerTickFinished shouldn't do anything", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var goc = new _GameObjectContainer2.default(theLevel);
    var executedActorStep = false;
    goc._gameObjects = [{
        executeActorStep: function executeActorStep(e) {
            executedActorStep = true;
        }
    }];

    // CALL
    goc.gameTimerTickFinished({});

    // ASSERT
    expect(executedActorStep).toBe(false);
});

it("_killIfCollision will not kill a non-scared ghost", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.ghostRed.scaredState = _Ghost2.default.SCARED_STATE_NOT_SCARED;
    goc.ghostRed.location.set(0, 0);
    goc.player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");
    goc.player.location.set(0, 0);

    // CALL
    goc._killIfCollision(goc.player, goc.ghostRed, (0, _moment2.default)());

    // ASSERT
    expect(goc.ghostRed.isAlive).toBe(true);
});

it("_killIfCollision will kill a scared ghost", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.ghostRed.scaredState = _Ghost2.default.SCARED_STATE_SCARED;
    goc.ghostRed.location.set(0, 0);
    goc.player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");
    goc.player.location.set(0, 0);

    // CALL
    goc._killIfCollision(goc.player, goc.ghostRed, (0, _moment2.default)());

    // ASSERT
    expect(goc.ghostRed.isAlive).toBe(false);
});

it("_killIfCollision will not kill player with dead ghost", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.ghostRed.scaredState = _Ghost2.default.SCARED_STATE_NOT_SCARED;
    goc.ghostRed.isAlive = false;
    goc.ghostRed.location.set(0, 0);
    goc.player._attackModeFinishTime = (0, _moment2.default)().add(120, "s");
    goc.player.location.set(0, 0);

    // CALL
    goc._killIfCollision(goc.player, goc.ghostRed, (0, _moment2.default)());

    // ASSERT
    expect(goc.player.isAlive).toBe(true);
});

it("checkAndSpawnPowerUp picks a random power up and sets it", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    theLevel.levelNum = 8;
    var goc = new _GameObjectContainer2.default(theLevel);
    goc._powerUpActive = false;
    goc._powerUpSpawnTime = (0, _moment2.default)().add(-1, "s");
    goc.powerUp._powerUpType = -1;

    // CALL
    goc.checkAndSpawnPowerUp((0, _moment2.default)());

    // ASSERT
    expect(goc.powerUp._powerUpType !== -1).toBe(true);
});

it("start or resume level should make all this ghost come back alive", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    theLevel.levelNum = 8;
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.ghostRed.isAlive = false;
    goc.ghostPink.isAlive = false;
    goc.ghostBlue.isAlive = false;
    goc.ghostOrange.isAlive = false;

    // CALL
    goc.startOrRestartLevel();

    // ASSERT
    expect(goc.ghostRed.isAlive).toBe(true);
    expect(goc.ghostPink.isAlive).toBe(true);
    expect(goc.ghostBlue.isAlive).toBe(true);
    expect(goc.ghostOrange.isAlive).toBe(true);
});

it("test toFeatureVector", function () {
    var theLevel = new _Level2.default(10, 1);
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.player.location.set(0, 0);
    goc.ghostRed.location.set(1, 0);
    goc.ghostBlue.location.set(2, 0);
    goc.ghostOrange.location.set(3, 0);
    goc.ghostPink.location.set(4, 0);
    goc.powerUp.location.set(5, 0);
    theLevel.floydWarshall.getPathDistance = jest.fn(function () {
        return 3;
    });
    goc._powerUpSpawnTime = (0, _moment2.default)().add(4.9, "s");
    _GameObjectContainer2.default._nextKillScore = 400;

    // CALL
    var featureVector = goc.toFeatureVector();

    // ASSERT
    expect(featureVector.length).toBe(7);
    expect(Math.floor(featureVector[0] / 1000)).toBe(4);
    expect(featureVector[1]).toBe(400);
    expect(featureVector[2]).toBe(3);
    expect(featureVector[3]).toBe(3);
    expect(featureVector[4]).toBe(3);
    expect(featureVector[5]).toBe(3);
    expect(featureVector[5]).toBe(3);

    _GameObjectContainer2.default.resetNextKillScore();
});

it("test setFeatureVector", function () {
    // SETUP
    var theLevel = new _Level2.default(10, 1);
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.player.location.set(0, 0);
    goc.ghostRed.location.set(1, 0);
    goc.ghostBlue.location.set(2, 0);
    goc.ghostOrange.location.set(3, 0);
    goc.ghostPink.location.set(4, 0);
    goc.powerUp.location.set(5, 0);
    theLevel.floydWarshall.getPathDistance = jest.fn(function () {
        return 3;
    });
    goc._powerUpSpawnTime = (0, _moment2.default)().add(4.9, "s");
    _GameObjectContainer2.default._nextKillScore = 400;
    var featureVector = goc.toFeatureVector();
    _GameObjectContainer2.default._nextKillScore = 200;
    var otherGOC = new _GameObjectContainer2.default(theLevel);

    // CALL
    otherGOC.setFeatureVector(featureVector);

    // EXPECT
    expect(Math.floor(otherGOC._powerUpSpawnTime.diff((0, _moment2.default)(), "ms") / 1000)).toBe(4);
    expect(_GameObjectContainer2.default._nextKillScore).toBe(400);

    _GameObjectContainer2.default.resetNextKillScore();
});

it("test toFeatureVector", function () {
    var theLevel = new _Level2.default(10, 1);
    var goc = new _GameObjectContainer2.default(theLevel);
    goc.player.location.set(0, 0);
    goc.ghostRed.location.set(1, 0);
    goc.ghostBlue.location.set(2, 0);
    goc.ghostOrange.location.set(3, 0);
    goc.ghostPink.location.set(4, 0);
    goc.powerUp.location.set(5, 0);
    theLevel.floydWarshall.getPathDistance = jest.fn(function () {
        return 3;
    });
    goc._powerUpSpawnTime = (0, _moment2.default)().add(4.9, "s");
    _GameObjectContainer2.default._nextKillScore = 400;
    var featureVector = goc.toFeatureVector();
    _GameObjectContainer2.default.resetNextKillScore();

    // CALL
    var length = _GameObjectContainer2.default.featureVectorLength;

    // ASSERT
    expect(length).toBe(featureVector.length);
});

// const createTestLevel = function () {
//     let toRet = new Level(2, 2);
//
//     toRet.getCell(0, 0).solidBorder.top = true;
//     toRet.getCell(0, 0).solidBorder.left = true;
//     toRet.getCell(0, 0).dotType = Dot.LITTLE;
//
//     toRet.getCell(0, 1).solidBorder.left = true;
//     toRet.getCell(0, 1).solidBorder.bottom = true;
//     toRet.getCell(0, 1).dotType = Dot.LITTLE;
//
//     toRet.getCell(1, 0).solidBorder.top = true;
//     toRet.getCell(1, 0).solidBorder.right = true;
//     toRet.getCell(1, 0).dotType = Dot.LITTLE;
//
//     toRet.getCell(1, 1).solidBorder.right = true;
//     toRet.getCell(1, 1).solidBorder.bottom = true;
//     toRet.getCell(1, 1).dotType = Dot.LITTLE;
//
//     return toRet;
// };

// it ("test update binary matrix", () => {
//     // SETUP
//     let level = createTestLevel();
//     let goc = new GameObjectContainer(level);
//     goc.player.location.set(0, 0);
//     expect(level.getCell(0, 0).toBinary()).toBe("000011100");
//
//     // CALL and ASSERT
//     let binaryMatrix = goc.binaryMatrix;
//
//     expect(binaryMatrix.getBinaryValue(0, 0)).toBe("010001100");
//     expect(binaryMatrix.getBinaryValue(0, 1)).toBe("000011001");
//     expect(binaryMatrix.getBinaryValue(1, 0)).toBe("000010110");
//     expect(binaryMatrix.getBinaryValue(1, 1)).toBe("000010011");
//
//     // CALL and ASSERT
//     goc.player.direction = Direction.DOWN;
//     goc.player.location.set(1, 0);
//     binaryMatrix = goc.binaryMatrix;
//
//     expect(binaryMatrix.getBinaryValue(0, 0)).toBe("000001100");
//     expect(binaryMatrix.getBinaryValue(0, 1)).toBe("000011001");
//     expect(binaryMatrix.getBinaryValue(1, 0)).toBe("010000110");
//     expect(binaryMatrix.getBinaryValue(1, 1)).toBe("000010011");
//
//     expect(Direction.decimalToDirection(binaryMatrix.numMatrix[0])).toBe(Direction.DOWN);
// });