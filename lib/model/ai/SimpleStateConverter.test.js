"use strict";

var _SimpleStateConverter = require("./SimpleStateConverter");

var _SimpleStateConverter2 = _interopRequireDefault(_SimpleStateConverter);

var _GameObjectContainerFactory = require("../unittesting/GameObjectContainerFactory");

var _GameObjectContainerFactory2 = _interopRequireDefault(_GameObjectContainerFactory);

var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var instance = new _SimpleStateConverter2.default();

    expect(instance !== null).toBe(true);
});

it("toFeatureVector", function () {
    // SETUP
    var goc = _GameObjectContainerFactory2.default.createGameObjectContainer();
    var instance = new _SimpleStateConverter2.default();
    var shouldBeFeatureVector = [1, 1, 1, 1, 2 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 0, 0, 1, 2 / _SimpleStateConverter2.default.MAX_LIVING_STATE, 41 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 0, 0, 0, 2 / _SimpleStateConverter2.default.MAX_LIVING_STATE, 41 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 0, 0, 0, 2 / _SimpleStateConverter2.default.MAX_LIVING_STATE, 41 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 0, 0, 0, 2 / _SimpleStateConverter2.default.MAX_LIVING_STATE, 2 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 0, 1, 0, 2 / _SimpleStateConverter2.default.MAX_LIVING_STATE, 200 / _SimpleStateConverter2.default.MAX_POWER_UP_VALUE, 1 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 1, 0, 0, 2 / _SimpleStateConverter2.default.MAX_DISTANCE, 0, 1, 0, 0];

    // CALL
    var featureVector = instance.toFeatureVector(goc);

    // ASSERT
    console.log("feature = " + featureVector);
    console.log("should  = " + shouldBeFeatureVector);
    expect(featureVector).toBeInstanceOf(Array);
    expect(_ArrayUtils2.default.arrayIsCloseTo(featureVector, shouldBeFeatureVector)).toBe(true);
});