"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var assert = exports.assert = function assert(expression) {
    var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Assertion failed";

    if (!expression) {
        throw new Error(errorMessage);
    }
};