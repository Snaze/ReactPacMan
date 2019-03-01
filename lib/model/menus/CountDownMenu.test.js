"use strict";

var _CountDownMenu = require("./CountDownMenu");

var _CountDownMenu2 = _interopRequireDefault(_CountDownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Constructor works", function () {
    var countDownMenu = new _CountDownMenu2.default();

    expect(countDownMenu !== null).toBe(true);
});

it("interval tick fires at 0", function () {
    // SETUP
    // let fired = false;
    // let callback = function (e) {
    //     fired = true;
    // };

    var countDownMenu = new _CountDownMenu2.default();
    countDownMenu.count = 1;

    // CALL
    countDownMenu.intervalTick({});

    // ASSERT
    expect(countDownMenu._interval === null).toBe(true);
});

it("interval tick only fires at 0", function () {
    // SETUP
    var fired = false;
    var callback = function callback(e) {
        fired = true;
    };

    var countDownMenu = new _CountDownMenu2.default();
    countDownMenu.count = 2;
    countDownMenu.callback = callback;

    // CALL
    countDownMenu.intervalTick({});

    // ASSERT
    expect(fired).toBe(false);
});