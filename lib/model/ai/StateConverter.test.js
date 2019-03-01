"use strict";

var _StateConverter = require("./StateConverter");

var _StateConverter2 = _interopRequireDefault(_StateConverter);

var _GameObjectContainerFactory = require("../unittesting/GameObjectContainerFactory");

var _GameObjectContainerFactory2 = _interopRequireDefault(_GameObjectContainerFactory);

var _Player = require("../actors/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Ghost = require("../actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _PowerUp = require("../actors/PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _GameObjectContainer = require("../GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Constructor works", function () {
    // SETUP

    // CALL
    var instance = new _StateConverter2.default();

    // ASSERT
    expect(instance !== null).toBe(true);
});

it("toFeatureVector returns an array", function () {
    // SETUP
    var goc = _GameObjectContainerFactory2.default.createGameObjectContainer();
    var sc = new _StateConverter2.default();

    // CALL
    var retVal = sc.toFeatureVector(goc);

    // ASSERT
    expect(retVal instanceof Array).toBe(true);
});

it("capitalizeStartChar", function () {
    // SETUP
    var toCapitalize = "red";

    // CALL
    var retVal = _StateConverter2.default.capitalizeStartChar(toCapitalize);

    // ASSERT
    expect(retVal).toBe("Red");
});

it("get trainingFeatureIndices", function () {
    // SETUP
    var newLength = _Player2.default.trainingFeatureIndices.length + _Ghost2.default.trainingFeatureIndices.length * 4 + _PowerUp2.default.trainingFeatureIndices.length + _GameObjectContainer2.default.trainingFeatureIndices.length;

    // CALL
    var retVal = _StateConverter2.default.trainingFeatureIndices;

    // ASSERT
    var distinctValues = _ArrayUtils2.default.distinctIntegers(retVal);
    expect(retVal.length).toBe(newLength);
    expect(distinctValues.length).toBe(retVal.length);
});

it("test toFeatureVector", function () {
    // SETUP
    var goc = _GameObjectContainerFactory2.default.createGameObjectContainer();
    var sc = new _StateConverter2.default();
    var theLength = goc.player.toFeatureVector().length + goc.ghostBlue.toFeatureVector().length + goc.ghostRed.toFeatureVector().length + goc.ghostPink.toFeatureVector().length + goc.ghostOrange.toFeatureVector().length + goc.powerUp.toFeatureVector().length + goc.toFeatureVector().length;

    // CALL
    var retVal = sc.toFeatureVector(goc);

    // ASSERT
    expect(retVal.length).toBe(theLength);
});

it("test setFeatureVector", function () {
    // SETUP
    var goc = _GameObjectContainerFactory2.default.createGameObjectContainer();
    var sc = new _StateConverter2.default();
    _GameObjectContainer2.default._nextKillScore = 800;
    var featureVector = sc.toFeatureVector(goc);
    _GameObjectContainer2.default._nextKillScore = 200;
    var otherGoc = _GameObjectContainerFactory2.default.createGameObjectContainer();

    // CALL
    sc.setFeatureVector(otherGoc, featureVector);

    // ASSERT
    expect(_GameObjectContainer2.default._nextKillScore).toBe(800);
});