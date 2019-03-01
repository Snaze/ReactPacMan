"use strict";

var _KeyEventer = require("./KeyEventer");

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("keydown and keyup works", function () {
    var keyEventer = _KeyEventer2.default.instance;
    expect(keyEventer.up).toBe(false);
    expect(keyEventer.down).toBe(false);
    expect(keyEventer.left).toBe(false);
    expect(keyEventer.right).toBe(false);

    keyEventer.onKeyDown({ key: "ArrowDown" });
    expect(keyEventer.down).toBe(true);

    keyEventer.onKeyUp({ key: "ArrowDown" });
    expect(keyEventer.down).toBe(false);

    keyEventer.onKeyDown({ key: "ArrowUp" });
    expect(keyEventer.up).toBe(true);

    keyEventer.onKeyUp({ key: "ArrowUp" });
    expect(keyEventer.up).toBe(false);

    keyEventer.onKeyDown({ key: "ArrowLeft" });
    expect(keyEventer.left).toBe(true);

    keyEventer.onKeyUp({ key: "ArrowLeft" });
    expect(keyEventer.left).toBe(false);

    keyEventer.onKeyDown({ key: "ArrowRight" });
    expect(keyEventer.right).toBe(true);

    keyEventer.onKeyUp({ key: "ArrowRight" });
    expect(keyEventer.right).toBe(false);
});