"use strict";

var _FloydWarshall = require("./FloydWarshall");

var _FloydWarshall2 = _interopRequireDefault(_FloydWarshall);

var _Level = require("../model/Level");

var _Level2 = _interopRequireDefault(_Level);

var _FloydWarshallTest = require("../levels/FloydWarshallTest.json");

var _FloydWarshallTest2 = _interopRequireDefault(_FloydWarshallTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Build vertIds works", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var fw = new _FloydWarshall2.default();

    // CALL
    var vertIds = fw.getVertIds(theLevel);

    // ASSERT
    expect(vertIds.indexOf("0_0") >= 0).toBe(true);
    expect(vertIds.indexOf("0_1") >= 0).toBe(true);
    expect(vertIds.indexOf("1_0") >= 0).toBe(true);
    expect(vertIds.indexOf("1_1") >= 0).toBe(true);
    expect(vertIds.length).toBe(4);
});

it("Build edges works", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var fw = new _FloydWarshall2.default();

    // CALL
    var edges = fw.getEdges(theLevel);

    // ASSERT
    expect(edges.length).toBe(16);
    expect(edges[0].length).toBe(2);
    expect(edges[0][0]).toBe("0_0");
    expect(edges[0][1]).toBe("0_0");
});

it("getDistance - noBarrier and adjacent", function () {
    // SETUP
    var theLevel = new _Level2.default(5, 5);
    var fw = new _FloydWarshall2.default();

    // CALL
    var distance = fw.getDistance(theLevel, ["0_0", "1_0"]);

    // ASSERT
    expect(distance).toBe(1);
});

it("getDistance - barrier and adjacent", function () {
    // SETUP
    var theLevel = new _Level2.default(5, 5);
    theLevel.getCell(0, 0).solidBorder.right = true;
    var fw = new _FloydWarshall2.default();

    // CALL
    var distance = fw.getDistance(theLevel, ["0_0", "0_1"]);

    // ASSERT
    expect(distance).toBe(Number.POSITIVE_INFINITY);
});

it("getDistance - not adjacent", function () {
    // SETUP
    var theLevel = new _Level2.default(5, 5);
    // theLevel.getCell(0, 0).solidBorder.right = true;
    var fw = new _FloydWarshall2.default();

    // CALL
    var distance = fw.getDistance(theLevel, ["0_0", "0_2"]);

    // ASSERT
    expect(distance).toBe(Number.POSITIVE_INFINITY);
});

it("test it works correctly", function () {
    // SETUP
    var testLevel = _Level2.default.fromJSON(_FloydWarshallTest2.default);
    var fw = new _FloydWarshall2.default();
    fw.buildAllPaths(testLevel);

    // CALL
    var thePath = fw.getPath("0_0", "0_1");

    // ASSERT
    expect(thePath.length).toBe(24);

    // DOWN
    expect(thePath[0]).toBe("0_0");
    expect(thePath[1]).toBe("1_0");
    expect(thePath[2]).toBe("2_0");
    expect(thePath[3]).toBe("3_0");
    expect(thePath[4]).toBe("4_0");
    expect(thePath[5]).toBe("5_0");

    // RIGHT
    expect(thePath[6]).toBe("5_1");
    expect(thePath[7]).toBe("5_2");

    // DOWN
    expect(thePath[8]).toBe("6_2");

    // RIGHT
    expect(thePath[9]).toBe("6_3");
    expect(thePath[10]).toBe("6_4");
    expect(thePath[11]).toBe("6_5");
    expect(thePath[12]).toBe("6_6");

    // UP
    expect(thePath[13]).toBe("5_6");
    expect(thePath[14]).toBe("4_6");
    expect(thePath[15]).toBe("3_6");
    expect(thePath[16]).toBe("2_6");
    expect(thePath[17]).toBe("1_6");
    expect(thePath[18]).toBe("0_6");

    // LEFT
    expect(thePath[19]).toBe("0_5");
    expect(thePath[20]).toBe("0_4");
    expect(thePath[21]).toBe("0_3");
    expect(thePath[22]).toBe("0_2");
    expect(thePath[23]).toBe("0_1");
});