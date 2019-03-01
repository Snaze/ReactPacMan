"use strict";

var _WeightInitializer = require("./WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor works", function () {
    var test = new _WeightInitializer2.default(_ActivationFunctions2.default.sigmoid, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3);

    expect(test !== null).toBe(true);
});

var testFanInFanOut = function testFanInFanOut(activationFunction) {
    var test = new _WeightInitializer2.default(activationFunction, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3);

    var retVal = test._createFanInFanOutWeight();

    expect(retVal >= -10 && retVal <= 10).toBe(true);
};

it("test fan in / fan out", function () {
    _ActivationFunctions2.default.all.forEach(function (activationFunction) {
        testFanInFanOut(activationFunction);
    });
});

var testGenericNormal = function testGenericNormal(activationFunction) {
    var test = new _WeightInitializer2.default(activationFunction, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3);

    var retVal = test._createGenericNormal();

    expect(retVal >= -10 && retVal <= 10).toBe(true);
};

it("test generic normal", function () {
    _ActivationFunctions2.default.all.forEach(function (activationFunction) {
        testGenericNormal(activationFunction);
    });
});

var testCompressedNormal = function testCompressedNormal(activationFunction) {
    var test = new _WeightInitializer2.default(activationFunction, _WeightInitializer2.default.COMPRESSED_NORMAL, 3, 3);

    var retVal = test._createCompressedNormal();

    expect(retVal >= -10 && retVal <= 10).toBe(true);
};

it("test compressed normal", function () {
    _ActivationFunctions2.default.all.forEach(function (activationFunction) {
        testCompressedNormal(activationFunction);
    });
});

var testInitializationType = function testInitializationType(activationFunction, initializationType) {
    var test = new _WeightInitializer2.default(activationFunction, initializationType, 3, 3);

    var retVal = test.createRandomWeight();

    expect(retVal >= -10 && retVal <= 10).toBe(true);
};

it("test initializationTypes", function () {
    _ActivationFunctions2.default.all.forEach(function (activationFunction) {
        _WeightInitializer2.default.ALL.forEach(function (initializationType) {
            testInitializationType(activationFunction, initializationType);
        });
    });
});