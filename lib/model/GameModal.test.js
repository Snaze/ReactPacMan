"use strict";

var _GameModal = require("./GameModal");

var _GameModal2 = _interopRequireDefault(_GameModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("GameModal constructor works", function () {
    var gameModal = new _GameModal2.default();

    expect(gameModal !== null).toBe(true);
});

it("GameModal.modal is not undefined", function () {
    var gameModal = new _GameModal2.default();

    expect(typeof gameModal.modal !== "undefined").toBe(true);
    expect(gameModal.modal !== null).toBe(true);
});