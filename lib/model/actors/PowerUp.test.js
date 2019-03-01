"use strict";

var _PowerUp = require("./PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _moment = require("../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Constructor works", function () {
    // SETUP
    var level = new _Level2.default(10, 10);
    new _PowerUp2.default(level, _PowerUp2.default.POWER_UP_APPLE);
});

it("TimerTick works", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var powerUp = new _PowerUp2.default(level, _PowerUp2.default.POWER_UP_APPLE);
    powerUp.location.set(0, 0);
    var originalLocation = powerUp.location.clone();

    // CALL
    powerUp.timerTick({});

    // ASSERT
    expect(!originalLocation.equals(powerUp.location)).toBe(true);
});

it("setPowerUpTypeByName works", function () {
    // SETUP
    var level = new _Level2.default(2, 2);
    var powerUp = new _PowerUp2.default(level, _PowerUp2.default.POWER_UP_APPLE);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Cherry");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_CHERRY).toBe(true);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Strawberry");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_STRAWBERRY).toBe(true);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Orange");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_ORANGE).toBe(true);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Pretzel");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_PRETZEL).toBe(true);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Apple");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_APPLE).toBe(true);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Pear");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_PEAR).toBe(true);

    // CALL & ASSERT
    powerUp.setPowerUpTypeByName("Banana");
    expect(powerUp.powerUpType === _PowerUp2.default.POWER_UP_BANANA).toBe(true);
});

it("locations get reset on level set", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var powerUp = new _PowerUp2.default(theLevel, _PowerUp2.default.POWER_UP_BANANA);
    powerUp.location.set(2, 2);
    powerUp._spawnLocation.set(2, 2);
    powerUp._prevLocation.set(2, 2);
    powerUp._destinationLocation.set(2, 2);

    // CALL
    powerUp.level = new _Level2.default(4, 4);

    // ASSERT
    expect(powerUp.location.isEqualTo(-1, -1)).toBe(true);
    expect(powerUp._spawnLocation.isEqualTo(-1, -1)).toBe(true);
    expect(powerUp._prevLocation.isEqualTo(-1, -1)).toBe(true);
    expect(powerUp._destinationLocation.isEqualTo(-1, -1)).toBe(true);
});

it("spawn set expiration and blink times", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var powerUp = new _PowerUp2.default(theLevel, _PowerUp2.default.POWER_UP_BANANA);

    // CALL
    powerUp.spawn();

    // ASSERT
    var now = (0, _moment2.default)();
    expect(powerUp._blinkTime > now && powerUp._lifeExpirationTime > powerUp._blinkTime).toBe(true);
});

it("toFeatureVector test", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var powerUp = new _PowerUp2.default(theLevel, _PowerUp2.default.POWER_UP_BANANA);
    powerUp.location.set(2, 2);
    powerUp.isAlive = true;
    powerUp.prevLocation.set(1, 2);
    powerUp.direction = _Direction2.default.RIGHT;
    powerUp._destinationLocation.set(2, 1);
    powerUp.blink = true;
    powerUp._lifeExpirationTime = (0, _moment2.default)().add(2.9, "s");
    powerUp._blinkTime = (0, _moment2.default)().add(1.9, "s");

    // CALL
    var featureVector = powerUp.toFeatureVector();

    // ASSERT
    expect(featureVector.length).toBe(14);
    expect(featureVector[0]).toBe(2);
    expect(featureVector[1]).toBe(2);
    expect(featureVector[2]).toBe(1);
    expect(featureVector[3]).toBe(0);
    expect(featureVector[4]).toBe(1);
    expect(featureVector[5]).toBe(1);
    expect(featureVector[6]).toBe(2);
    expect(featureVector[7]).toBe(_Direction2.default.directionToDecimal(_Direction2.default.RIGHT));
    expect(featureVector[8]).toBe(2);
    expect(featureVector[9]).toBe(1);
    expect(featureVector[10]).toBe(1);
    expect(featureVector[11]).toBe(_PowerUp2.default.POWER_UP_BANANA);
    expect(Math.floor(featureVector[12] / 1000)).toBe(2);
    expect(Math.floor(featureVector[13] / 1000)).toBe(1);
});

it("setFeatureVector test", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var powerUp = new _PowerUp2.default(theLevel, _PowerUp2.default.POWER_UP_BANANA);
    powerUp.location.set(2, 2);
    powerUp.isAlive = true;
    powerUp.prevLocation.set(1, 2);
    powerUp.direction = _Direction2.default.RIGHT;
    powerUp._destinationLocation.set(2, 1);
    powerUp.blink = true;
    powerUp._lifeExpirationTime = (0, _moment2.default)().add(2.9, "s");
    powerUp._blinkTime = (0, _moment2.default)().add(1.9, "s");
    var featureVector = powerUp.toFeatureVector();
    var otherPowerUp = new _PowerUp2.default(theLevel, _PowerUp2.default.POWER_UP_STRAWBERRY);

    // CALL
    otherPowerUp.setFeatureVector(featureVector);

    // ASSERT
    expect(otherPowerUp.location.equals(powerUp.location)).toBe(true);
    expect(otherPowerUp.isAlive).toBe(powerUp.isAlive);
    expect(otherPowerUp.prevLocation.equals(powerUp.prevLocation)).toBe(true);
    expect(otherPowerUp.direction).toBe(powerUp.direction);
    expect(otherPowerUp._destinationLocation.equals(powerUp._destinationLocation)).toBe(true);
    expect(otherPowerUp.blink).toBe(powerUp.blink);
    expect(Math.floor(otherPowerUp._lifeExpirationTime.diff((0, _moment2.default)()) / 1000)).toBe(2);
    expect(Math.floor(otherPowerUp._blinkTime.diff((0, _moment2.default)()) / 1000)).toBe(1);
    expect(otherPowerUp.powerUpType).toBe(powerUp.powerUpType);
});

it("toFeatureVector test", function () {
    // SETUP
    var theLevel = new _Level2.default(3, 3);
    var powerUp = new _PowerUp2.default(theLevel, _PowerUp2.default.POWER_UP_BANANA);
    powerUp.location.set(2, 2);
    powerUp.isAlive = true;
    powerUp.prevLocation.set(1, 2);
    powerUp.direction = _Direction2.default.RIGHT;
    powerUp._destinationLocation.set(2, 1);
    powerUp.blink = true;
    powerUp._lifeExpirationTime = (0, _moment2.default)().add(2.9, "s");
    powerUp._blinkTime = (0, _moment2.default)().add(1.9, "s");
    var featureVector = powerUp.toFeatureVector();

    // CALL
    var length = _PowerUp2.default.featureVectorLength;

    // ASSERT
    expect(featureVector.length).toBe(length);
});