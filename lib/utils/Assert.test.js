"use strict";

var _Assert = require("./Assert");

it("Assert throws", function () {
    var errorThrown = false;

    try {
        (0, _Assert.assert)(false, "TEST");
    } catch (e) {
        errorThrown = true;
    }

    expect(errorThrown).toBe(true);
});

it("Assert does not throw", function () {
    var errorThrown = false;

    try {
        (0, _Assert.assert)(true, "TEST");
    } catch (e) {
        errorThrown = true;
    }

    expect(errorThrown).toBe(false);
});