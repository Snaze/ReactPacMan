"use strict";

var _TimeRecorder = require("./TimeRecorder");

var _TimeRecorder2 = _interopRequireDefault(_TimeRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor", function () {
    var instance = new _TimeRecorder2.default();

    expect(instance !== null).toBe(true);
});

/**
 * I know this test sucks but it is just for visual inspection.
 */
it("test it all", function () {
    // SETUP
    var timeRecorder = new _TimeRecorder2.default();
    var timeRecorder2 = new _TimeRecorder2.default();

    // CALL
    timeRecorder.recordStart("test");
    // for (let i = 0; i < 100; i++) {
    //     let temp = (5 + 5).toString();
    //     console.log(temp);
    // }
    timeRecorder.recordEnd("test");

    timeRecorder.recordStart("test");
    // for (let i = 0; i < 100; i++) {
    //     let temp = (5 + 5).toString();
    //     console.log(temp);
    // }
    timeRecorder.recordEnd("test");

    timeRecorder.recordStart("test");
    // for (let i = 0; i < 100; i++) {
    //     let temp = (5 + 5).toString();
    //     console.log(temp);
    // }
    timeRecorder.recordEnd("test");

    timeRecorder.recordStart("test");
    // for (let i = 0; i < 100; i++) {
    //     let temp = (5 + 5).toString();
    //     console.log(temp);
    // }
    timeRecorder.recordEnd("test");

    timeRecorder2.recordStart("test2");
    timeRecorder2.recordEnd("test2");

    timeRecorder2.recordStart("test2");

    timeRecorder.logSummary();
});