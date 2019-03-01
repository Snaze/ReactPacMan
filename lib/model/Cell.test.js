"use strict";

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _BorderType = require("./BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

var _Dot = require("./Dot");

var _Dot2 = _interopRequireDefault(_Dot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('test get/set solidBorder', function () {
    var theCell = new _Cell2.default("1");

    theCell.setSolidBorder(_BorderType2.default.LEFT, true);
    expect(theCell.getSolidBorder(_BorderType2.default.LEFT)).toBe(true);

    theCell.setSolidBorder(_BorderType2.default.LEFT, false);
    expect(theCell.getSolidBorder(_BorderType2.default.LEFT)).toBe(false);
});

it('test get/set partialBorder', function () {
    var theCell = new _Cell2.default("1");

    theCell.setPartialBorder(_BorderType2.default.LEFT, true);
    expect(theCell.getPartialBorder(_BorderType2.default.LEFT)).toBe(true);

    theCell.setPartialBorder(_BorderType2.default.LEFT, false);
    expect(theCell.getPartialBorder(_BorderType2.default.LEFT)).toBe(false);
});

it('test get id', function () {
    var theCell = new _Cell2.default("1");
    expect(theCell.id).toBe("1");
});

it('test get/set DotType', function () {
    var theCell = new _Cell2.default("1");
    theCell.dotType = _Dot2.default.BIG;
    expect(theCell.dotType).toBe(_Dot2.default.BIG);
});

it("clone works", function () {
    var theCell = new _Cell2.default("1");
    var theClone = theCell.clone("2");
    expect(theCell._solidBorder.equals(theClone._solidBorder) && theCell._partialBorder.equals(theClone._partialBorder) && theCell.dotType === theClone.dotType).toBe(true);
    expect(theClone.id).toBe("2");
});

it("test solid border changed nested event", function () {
    // SETUP
    var cell = new _Cell2.default("0_0");
    var wasCalledCorrectly = false;
    var theCallback = function theCallback(value) {
        if (value.source === "_solidBorder._left" && !value.oldValue && value.newValue) {
            wasCalledCorrectly = true;
        }
    };
    cell.addOnChangeCallback(theCallback);

    // CALL
    cell.setSolidBorder(_BorderType2.default.LEFT, true);

    // ASSERT
    expect(wasCalledCorrectly).toBe(true);
});

it("test partial border changed nested event", function () {
    // SETUP
    var cell = new _Cell2.default("0_0");
    var wasCalledCorrectly = false;
    var theCallback = function theCallback(value) {
        if (value.source === "_partialBorder._top" && !value.oldValue && value.newValue) {
            wasCalledCorrectly = true;
        }
    };
    cell.addOnChangeCallback(theCallback);

    // CALL
    cell.setPartialBorder(_BorderType2.default.TOP, true);

    // ASSERT
    expect(wasCalledCorrectly).toBe(true);
});

it("test location changed nested event", function () {
    // SETUP
    var cell = new _Cell2.default("-1_-1");
    var wasCalledCorrectly = false;
    var theCallback = function theCallback(value) {
        if (value.source === "_location._x" && value.oldValue === -1 && value.newValue === 0) {
            wasCalledCorrectly = true;
        }
    };
    cell.addOnChangeCallback(theCallback);

    // CALL
    cell.location.x = 0;

    // ASSERT
    expect(wasCalledCorrectly).toBe(true);
});

it("test remove all callbacks work", function () {
    // SETUP
    var cell = new _Cell2.default("-1_-1");

    expect(cell.solidBorder.numCallbacks).toBe(1);
    expect(cell.partialBorder.numCallbacks).toBe(1);
    expect(cell.location.numCallbacks).toBe(1);
    // expect(cell.screenLocation.numCallbacks).toBe(1);

    // CALL
    cell.removeAllCallbacks();

    // ASSERT
    expect(cell.solidBorder.numCallbacks).toBe(0);
    expect(cell.partialBorder.numCallbacks).toBe(0);
    expect(cell.location.numCallbacks).toBe(0);
    // expect(cell.screenLocation.numCallbacks).toBe(0);
});

it("test set isPlayerSpawn -- toggle case", function () {
    // SETUP
    var cell = new _Cell2.default("-1_-1");
    cell._isGhostRedSpawn = true;
    cell._isGhostPinkSpawn = true;
    cell._isGhostBlueSpawn = true;
    cell._isGhostOrangeSpawn = true;

    // CALL
    cell.isPlayerSpawn = true;

    // ASSERT
    expect(cell.isPlayerSpawn).toBe(true);
    expect(cell.isGhostRedSpawn).toBe(false);
    expect(cell.isGhostPinkSpawn).toBe(false);
    expect(cell.isGhostBlueSpawn).toBe(false);
    expect(cell.isGhostOrangeSpawn).toBe(false);
});

/** canTraverseTo - DOWN **/

it("canTraverseTo up to down -- no border", function () {
    // SETUP
    var topCell = new _Cell2.default("0_0");
    var bottomCell = new _Cell2.default("1_0");

    // CALL
    var retVal = topCell.canTraverseTo(bottomCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo up to down -- border", function () {
    // SETUP
    var topCell = new _Cell2.default("0_0");
    topCell.solidBorder.bottom = true;
    var bottomCell = new _Cell2.default("1_0");

    // CALL
    var retVal = topCell.canTraverseTo(bottomCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

it("canTraverseTo up to down -- wrap", function () {
    // SETUP
    var topCell = new _Cell2.default("2_0");
    // topCell.solidBorder.bottom = true;
    var bottomCell = new _Cell2.default("0_0");

    // CALL
    var retVal = topCell.canTraverseTo(bottomCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo up to down -- wrap border", function () {
    // SETUP
    var topCell = new _Cell2.default("2_0");
    topCell.solidBorder.bottom = true;
    var bottomCell = new _Cell2.default("0_0");

    // CALL
    var retVal = topCell.canTraverseTo(bottomCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

/** canTraverseTo - LEFT **/

it("canTraverseTo right to left -- no border", function () {
    // SETUP
    var leftCell = new _Cell2.default("0_0");
    var rightCell = new _Cell2.default("0_1");

    // CALL
    var retVal = rightCell.canTraverseTo(leftCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo right to left -- border", function () {
    // SETUP
    var leftCell = new _Cell2.default("0_0");
    var rightCell = new _Cell2.default("0_1");
    rightCell.solidBorder.left = true;

    // CALL
    var retVal = rightCell.canTraverseTo(leftCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

it("canTraverseTo right to left -- wrap", function () {
    // SETUP
    var rightCell = new _Cell2.default("0_0");
    var leftCell = new _Cell2.default("2_0");

    // CALL
    var retVal = rightCell.canTraverseTo(leftCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo right to left -- wrap border", function () {
    // SETUP
    var rightCell = new _Cell2.default("0_0");
    rightCell.solidBorder.left = true;
    var leftCell = new _Cell2.default("0_2");

    // CALL
    var retVal = rightCell.canTraverseTo(leftCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

/** canTraverseTo - RIGHT **/

it("canTraverseTo left to right -- no border", function () {
    // SETUP
    var leftCell = new _Cell2.default("0_0");
    var rightCell = new _Cell2.default("0_1");

    // CALL
    var retVal = leftCell.canTraverseTo(rightCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo left to right -- border", function () {
    // SETUP
    var leftCell = new _Cell2.default("0_0");
    leftCell.solidBorder.right = true;
    var rightCell = new _Cell2.default("0_1");

    // CALL
    var retVal = leftCell.canTraverseTo(rightCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

it("canTraverseTo left to right -- wrap", function () {
    // SETUP
    var rightCell = new _Cell2.default("0_0");
    var leftCell = new _Cell2.default("2_0");

    // CALL
    var retVal = leftCell.canTraverseTo(rightCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo left to right -- wrap border", function () {
    // SETUP
    var rightCell = new _Cell2.default("0_0");
    var leftCell = new _Cell2.default("0_2");
    leftCell.solidBorder.right = true;

    // CALL
    var retVal = leftCell.canTraverseTo(rightCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

/** canTraverseTo - UP **/

it("canTraverseTo down to up -- no border", function () {
    // SETUP
    var topCell = new _Cell2.default("0_0");
    var bottomCell = new _Cell2.default("1_0");

    // CALL
    var retVal = bottomCell.canTraverseTo(topCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo down to up -- border", function () {
    // SETUP
    var topCell = new _Cell2.default("0_0");
    var bottomCell = new _Cell2.default("1_0");
    bottomCell.solidBorder.top = true;

    // CALL
    var retVal = bottomCell.canTraverseTo(topCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

it("canTraverseTo down to up -- wrap", function () {
    // SETUP
    var topCell = new _Cell2.default("2_0");
    // topCell.solidBorder.bottom = true;
    var bottomCell = new _Cell2.default("0_0");

    // CALL
    var retVal = bottomCell.canTraverseTo(topCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(true);
});

it("canTraverseTo down to up -- wrap border", function () {
    // SETUP
    var topCell = new _Cell2.default("2_0");
    // topCell.solidBorder.bottom = true;
    var bottomCell = new _Cell2.default("0_0");
    bottomCell.solidBorder.top = true;

    // CALL
    var retVal = bottomCell.canTraverseTo(topCell, 3, 3);

    // ASSERT
    expect(retVal).toBe(false);
});

it("canTraverseTo non adjacent test", function () {
    // SETUP
    var topCell = new _Cell2.default("1_1");
    var bottomCell = new _Cell2.default("2_2");

    // CALL
    var retVal = bottomCell.canTraverseTo(topCell, 10, 10);

    // ASSERT
    expect(retVal).toBe(false);
});

it("is teleport cell", function () {
    // SETUP
    var topCell = new _Cell2.default("0_1");
    var leftCell = new _Cell2.default("1_0");
    var bottomCell = new _Cell2.default("9_1");
    var rightCell = new _Cell2.default("8_9");

    // ASSERT
    expect(topCell.isTeleportCell(10, 10)).toBe(true);
    expect(leftCell.isTeleportCell(10, 10)).toBe(true);
    expect(bottomCell.isTeleportCell(10, 10)).toBe(true);
    expect(rightCell.isTeleportCell(10, 10)).toBe(true);
});

it("is not teleport cell", function () {
    // SETUP
    var topCell = new _Cell2.default("0_1");
    topCell.solidBorder.top = true;
    var leftCell = new _Cell2.default("1_0");
    leftCell.solidBorder.left = true;
    var bottomCell = new _Cell2.default("9_1");
    bottomCell.solidBorder.bottom = true;
    var rightCell = new _Cell2.default("8_9");
    rightCell.solidBorder.right = true;

    // ASSERT
    expect(topCell.isTeleportCell(10, 10)).toBe(false);
    expect(leftCell.isTeleportCell(10, 10)).toBe(false);
    expect(bottomCell.isTeleportCell(10, 10)).toBe(false);
    expect(rightCell.isTeleportCell(10, 10)).toBe(false);
});

it("toBinary with all fixings", function () {
    // SETUP
    var cell = new _Cell2.default("0_0");
    cell.dotType = _Dot2.default.BIG;
    cell.solidBorder.left = true;
    cell.solidBorder.top = true;
    cell.solidBorder.right = true;
    cell.solidBorder.bottom = true;

    // CALL
    var binaryWithDot = cell.toBinary();
    cell.dotType = _Dot2.default.LITTLE;
    var binaryWithLittleDot = cell.toBinary();

    // ASSERT
    expect(binaryWithDot).toBe("000101111");
    expect(binaryWithLittleDot).toBe("000011111");
});

it("toBinary with all fixings", function () {
    // SETUP
    var cell = new _Cell2.default("0_0");
    cell.dotType = _Dot2.default.NONE;

    // CALL
    var binary = cell.toBinary();

    // ASSERT
    expect(binary).toBe("000000000");
});