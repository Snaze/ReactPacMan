"use strict";

var _Eventer = require("./Eventer");

var _Eventer2 = _interopRequireDefault(_Eventer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("addCallback works", function () {
    var eventer = new _Eventer2.default();
    var callback = function callback(data) {
        return true;
    };
    eventer.addCallback(callback);

    expect(eventer._callbacks[0]).toBe(callback);
});

it("removeCallback works", function () {
    var eventer = new _Eventer2.default();
    var callback = function callback(data) {
        return true;
    };
    eventer.addCallback(callback);

    expect(eventer._callbacks[0]).toBe(callback);

    eventer.removeCallback(callback);
    expect(eventer._callbacks.length).toBe(0);
});

it("raiseEvent works", function () {
    var eventer = new _Eventer2.default();
    var theValue = null;
    var toBeValue = "test";

    var callback = function callback(data) {
        theValue = data;
    };
    eventer.addCallback(callback);

    expect(eventer._callbacks[0]).toBe(callback);

    eventer.raiseEvent(toBeValue);

    expect(theValue).toBe(toBeValue);
});