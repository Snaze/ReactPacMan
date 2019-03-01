"use strict";

var _Level = require("./Level");

var _Level2 = _interopRequireDefault(_Level);

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _Border = require("./Border");

var _Border2 = _interopRequireDefault(_Border);

var _BorderType = require("./BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

var _lodash = require("../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('addRow works', function () {
    var theLevel = new _Level2.default();
    var prevHeight = theLevel.height;

    theLevel.addRow();

    expect(theLevel._gameMatrix[prevHeight]).toEqual(expect.anything());
    expect(theLevel.height).toBe(prevHeight + 1);
});

it('addRow wires up events', function () {
    // SETUP
    var theLevel = new _Level2.default();
    var prevHeight = theLevel.height;

    var numFired = 0;
    var theCallback = function theCallback(e) {
        if (_lodash2.default.endsWith(e.source, "selected") && e.newValue) {
            numFired++;
        }
        // console.log(e.source);
    };
    theLevel.addOnChangeCallback(theCallback);

    // CALL
    theLevel.addRow();

    for (var x = 0; x < theLevel.width; x++) {
        theLevel.getCell(x, prevHeight).selected = true;
    }

    // ASSERT
    expect(numFired).toBe(theLevel.width);
});

it('removeRow works', function () {
    var theLevel = new _Level2.default();
    var prevHeight = theLevel.height;
    var prevLength = theLevel._gameMatrix.length;
    expect(prevHeight).toEqual(prevLength);

    theLevel.removeRow();

    expect(theLevel._gameMatrix.length).toEqual(prevLength - 1);
    expect(theLevel.height).toBe(prevHeight - 1);
});

it('removeRow unwires events', function () {
    // SETUP
    var theLevel = new _Level2.default();
    var prevHeight = theLevel.height;
    var lastCell = theLevel.getCell(0, prevHeight - 1);
    var fired = false;
    var theCallback = function theCallback(e) {
        fired = true;
    };

    theLevel.removeRow();
    theLevel.addOnChangeCallback(theCallback);

    // CALL
    lastCell.selected = true;

    // ASSERT
    expect(fired).toBe(false);
});

it('addColumn works', function () {
    var theLevel = new _Level2.default();
    var prevWidth = theLevel.width;
    var prevLength = theLevel._gameMatrix[0].length;
    expect(prevWidth).toEqual(prevLength);

    theLevel.addColumn();

    expect(theLevel._gameMatrix[0].length).toEqual(prevWidth + 1);
    expect(theLevel.width).toBe(prevWidth + 1);
});

it('addColumn wires up events', function () {
    // SETUP
    var theLevel = new _Level2.default();
    var prevWidth = theLevel.width;

    var numFired = 0;
    var theCallback = function theCallback(e) {
        if (_lodash2.default.endsWith(e.source, "selected") && e.newValue) {
            numFired++;
        }
        // console.log(e.source);
    };
    theLevel.addOnChangeCallback(theCallback);

    // CALL
    theLevel.addColumn();

    for (var y = 0; y < theLevel.height; y++) {
        theLevel.getCell(prevWidth, y).selected = true;
    }

    // ASSERT
    expect(numFired).toBe(theLevel.height);
});

it('removeColumn works', function () {
    var theLevel = new _Level2.default();
    var prevWidth = theLevel.width;
    var prevLength = theLevel._gameMatrix[0].length;
    expect(prevWidth).toEqual(prevLength);

    theLevel.removeColumn();

    expect(theLevel._gameMatrix[0].length).toEqual(prevLength - 1);
    expect(theLevel.width).toBe(prevWidth - 1);
});

it('removeColumn unwires events', function () {
    // SETUP
    var theLevel = new _Level2.default();
    var prevWidth = theLevel.width;
    var lastCell = theLevel.getCell(prevWidth - 1, 0);
    var fired = false;
    var theCallback = function theCallback(e) {
        fired = true;
    };

    theLevel.removeColumn();
    theLevel.addOnChangeCallback(theCallback);

    // CALL
    lastCell.selected = true;

    // ASSERT
    expect(fired).toBe(false);
});

it('getCell works', function () {
    var theLevel = new _Level2.default();
    var cell0_0 = theLevel.getCell(0, 0);
    expect(cell0_0).toEqual(expect.any(_Cell2.default));
});

it("getCellById works", function () {
    var theLevel = new _Level2.default();
    var cell0_0 = theLevel.getCellById("0_0");
    expect(cell0_0).toEqual(expect.any(_Cell2.default));
});

it("fromJSON works", function () {
    var jsonObject = {
        "_width": 2,
        "_height": 2,
        "_gameMatrix": [[{
            "_id": "0_0",
            "_solidBorder": {
                "_left": true,
                "_top": true,
                "_right": false,
                "_bottom": false
            },
            "_partialBorder": {
                "_left": false,
                "_top": false,
                "_right": false,
                "_bottom": false
            },
            "_dotType": 0
        }, {
            "_id": "0_1",
            "_solidBorder": {
                "_left": false,
                "_top": true,
                "_right": true,
                "_bottom": false
            },
            "_partialBorder": {
                "_left": false,
                "_top": false,
                "_right": false,
                "_bottom": false
            },
            "_dotType": 0
        }], [{
            "_id": "1_0",
            "_solidBorder": {
                "_left": true,
                "_top": false,
                "_right": false,
                "_bottom": true
            },
            "_partialBorder": {
                "_left": false,
                "_top": false,
                "_right": false,
                "_bottom": false
            },
            "_dotType": 0
        }, {
            "_id": "1_1",
            "_solidBorder": {
                "_left": false,
                "_top": false,
                "_right": true,
                "_bottom": true
            },
            "_partialBorder": {
                "_left": false,
                "_top": false,
                "_right": false,
                "_bottom": false
            },
            "_dotType": 0
        }]]
    };

    var theLevel = _Level2.default.fromJSON(jsonObject);
    expect(theLevel.width).toBe(2);
    expect(theLevel.height).toBe(2);
    // TODO: Perform better checks in here
});

it("mirrorHorizontally", function () {
    var theLevel = new _Level2.default(1, 1);

    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.LEFT, true);
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.TOP, true);
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.RIGHT, true);
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.BOTTOM, true);

    theLevel.mirrorHorizontally();

    expect(theLevel.gameMatrix[0][1].getSolidBorder(_BorderType2.default.LEFT)).toBe(true);
    expect(theLevel.gameMatrix[0][1].getSolidBorder(_BorderType2.default.TOP)).toBe(true);
    expect(theLevel.gameMatrix[0][1].getSolidBorder(_BorderType2.default.RIGHT)).toBe(true);
    expect(theLevel.gameMatrix[0][1].getSolidBorder(_BorderType2.default.BOTTOM)).toBe(true);
});

it("mirrorVertically", function () {
    var theLevel = new _Level2.default(1, 1);

    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.LEFT, true);
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.TOP, true);
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.RIGHT, true);
    theLevel.gameMatrix[0][0].setSolidBorder(_BorderType2.default.BOTTOM, true);

    theLevel.mirrorVertically();

    expect(theLevel.gameMatrix[1][0].getSolidBorder(_BorderType2.default.LEFT)).toBe(true);
    expect(theLevel.gameMatrix[1][0].getSolidBorder(_BorderType2.default.TOP)).toBe(true);
    expect(theLevel.gameMatrix[1][0].getSolidBorder(_BorderType2.default.RIGHT)).toBe(true);
    expect(theLevel.gameMatrix[1][0].getSolidBorder(_BorderType2.default.BOTTOM)).toBe(true);
});

it("mirrorVertically Callback works on newly created cells", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    var theCallbackFired = false;
    var theCallback = function theCallback(e) {
        theCallbackFired = true;
    };
    theLevel.addOnChangeCallback(theCallback);
    theLevel.mirrorVertically();

    // CALL
    theLevel.getCell(0, 1).selected = true;

    // ASSERT
    expect(theCallbackFired).toBe(true);
});

it("mirrorHorizontally Callback works on newly created cells", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    var theCallbackFired = false;
    var theCallback = function theCallback(e) {
        theCallbackFired = true;
    };
    theLevel.addOnChangeCallback(theCallback);
    theLevel.mirrorHorizontally();

    // CALL
    theLevel.getCell(1, 0).selected = true;

    // ASSERT
    expect(theCallbackFired).toBe(true);
});

it("selected change works correctly", function () {

    // SETUP
    var theLevel = new _Level2.default(3, 1);

    // CALL
    theLevel.gameMatrix[0][0].selected = true;
    theLevel.gameMatrix[0][1].selected = false;
    theLevel.gameMatrix[0][2].selected = false;

    // ASSERT
    expect(theLevel.gameMatrix[0][0].selected).toBe(true);
    expect(theLevel.gameMatrix[0][1].selected).toBe(false);
    expect(theLevel.gameMatrix[0][2].selected).toBe(false);
    expect(theLevel._selectedLocation.isEqualTo(0, 0)).toBe(true);

    // CALL
    theLevel.gameMatrix[0][2].selected = true;

    // ASSERT
    expect(theLevel.gameMatrix[0][0].selected).toBe(false);
    expect(theLevel.gameMatrix[0][1].selected).toBe(false);
    expect(theLevel.gameMatrix[0][2].selected).toBe(true);
    expect(theLevel._selectedLocation.isEqualTo(2, 0)).toBe(true);
});

it("change selected location", function () {

    // SETUP
    var theLevel = new _Level2.default(3, 1);

    // CALL
    theLevel.gameMatrix[0][0].selected = true;
    theLevel.gameMatrix[0][1].selected = false;
    theLevel.gameMatrix[0][2].selected = false;

    // ASSERT
    expect(theLevel.gameMatrix[0][0].selected).toBe(true);
    expect(theLevel.gameMatrix[0][1].selected).toBe(false);
    expect(theLevel.gameMatrix[0][2].selected).toBe(false);
    expect(theLevel._selectedLocation.isEqualTo(0, 0)).toBe(true);

    // CALL
    theLevel.getCell(2, 0).selected = true;

    // ASSERT
    expect(theLevel.gameMatrix[0][0].selected).toBe(false);
    expect(theLevel.gameMatrix[0][1].selected).toBe(false);
    expect(theLevel.gameMatrix[0][2].selected).toBe(true);
    expect(theLevel._selectedLocation.isEqualTo(2, 0)).toBe(true);
});

it("cell_0_0.isPlayerSpawn set to true -- simple case", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_0_0 = myLevel.getCell(0, 0);

    // CALL
    cell_0_0.isPlayerSpawn = true;

    // ASSERT
    expect(myLevel.playerSpawnLocation.isEqualTo(0, 0)).toBe(true);
    expect(myLevel.ghostRedLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostBlueLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostOrangeLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostPinkLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.getCell(0, 0).isPlayerSpawn).toBe(true);
    expect(myLevel.getCell(1, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(2, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(3, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(4, 0).isPlayerSpawn).toBe(false);
});

it("cell_0_0.isPlayerSpawn set to true -- remove existing value", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_0_0 = myLevel.getCell(0, 0);
    var cell_1_0 = myLevel.getCell(1, 0);
    cell_1_0._isPlayerSpawn = true;
    myLevel._playerSpawnLocation.set(1, 0);

    // CALL
    cell_0_0.isPlayerSpawn = true;

    // ASSERT
    expect(myLevel.playerSpawnLocation.isEqualTo(0, 0)).toBe(true);
    expect(myLevel.ghostRedLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostBlueLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostOrangeLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostPinkLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.getCell(0, 0).isPlayerSpawn).toBe(true);
    expect(myLevel.getCell(1, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(2, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(3, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(4, 0).isPlayerSpawn).toBe(false);
});

it("cell_0_0.isPlayerSpawn set to false -- simple case", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_0_0 = myLevel.getCell(0, 0);
    cell_0_0._isPlayerSpawn = true;
    myLevel._playerSpawnLocation.set(0, 0);

    // CALL
    cell_0_0.isPlayerSpawn = false;

    // ASSERT
    expect(myLevel.playerSpawnLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostRedLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostBlueLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostOrangeLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostPinkLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.getCell(0, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(1, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(2, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(3, 0).isPlayerSpawn).toBe(false);
    expect(myLevel.getCell(4, 0).isPlayerSpawn).toBe(false);
});

it("cell_0_0.isPlayerSpawn set to true -- toggle from ghost spawn on same cell", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_0_0 = myLevel.getCell(0, 0);
    cell_0_0._isGhostRedSpawn = true;
    myLevel.ghostRedLocation.set(0, 0);

    // CALL
    cell_0_0.isPlayerSpawn = true;

    // ASSERT
    expect(myLevel.playerSpawnLocation.isEqualTo(0, 0)).toBe(true);
    expect(myLevel.ghostRedLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostBlueLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostOrangeLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.ghostPinkLocation.isEqualTo(-1, -1)).toBe(true);
    expect(myLevel.getCell(0, 0).isPlayerSpawn).toBe(true);
    expect(myLevel.getCell(0, 0).isGhostRedSpawn).toBe(false);
});

it("cell_0_0.isPlayerSpawn set to true -- toggle from different cell.isPlayerSpawn = true", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_0_0 = myLevel.getCell(0, 0);
    var cell_1_0 = myLevel.getCell(1, 0);
    cell_1_0._isPlayerSpawn = true;
    myLevel.playerSpawnLocation.set(1, 0);

    // CALL
    cell_0_0.isPlayerSpawn = true;

    // ASSERT
    expect(myLevel.playerSpawnLocation.isEqualTo(0, 0)).toBe(true);

    expect(myLevel.getCell(0, 0).isPlayerSpawn).toBe(true);
    expect(myLevel.getCell(1, 0).isPlayerSpawn).toBe(false);
});

it("selectedCell change -- make sure it doesn't toggle other values", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_0_0 = myLevel.getCell(0, 0);
    cell_0_0._isPlayerSpawn = true;
    myLevel.playerSpawnLocation.set(0, 0);

    // CALL
    cell_0_0.selected = true;

    // ASSERT
    expect(myLevel.playerSpawnLocation.isEqualTo(0, 0)).toBe(true);
    expect(cell_0_0.isPlayerSpawn).toBe(true);
    expect(myLevel._selectedLocation.isEqualTo(0, 0)).toBe(true);
    expect(cell_0_0.selected).toBe(true);
});

it("selectedCell change -- make sure it does toggle other selected Cells", function () {
    // SETUP
    var myLevel = new _Level2.default(5, 1);
    var cell_1_0 = myLevel.getCell(1, 0);
    var cell_0_0 = myLevel.getCell(0, 0);
    cell_0_0._selected = true;
    myLevel._selectedLocation.set(0, 0);

    // CALL
    cell_1_0.selected = true;

    // ASSERT
    expect(myLevel._selectedLocation.isEqualTo(1, 0)).toBe(true);
    expect(cell_1_0.selected).toBe(true);
    expect(cell_0_0.selected).toBe(false);
});

it("test editMode toggle", function () {
    // SETUP
    var theLevel = new _Level2.default();
    // let theCell = theLevel.getCell(0, 0);

    // CALL
    theLevel.editMode = true;

    // ASSERT
    theLevel.iterateOverCells(function (cell, theLevel) {
        expect(cell.editMode).toBe(true);
    });

    // CALL AGAIN
    theLevel.editMode = false;

    // ASSERT AGAIN
    theLevel.iterateOverCells(function (cell, theLevel) {
        expect(cell.editMode).toBe(false);
    });
});

var testOnKeyDown = function testOnKeyDown(fromLocation, key, destLocation) {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.editMode = true;
    theLevel.getCellByLocation(fromLocation).selected = true;
    expect(theLevel._selectedLocation.equals(fromLocation)).toBe(true);
    expect(theLevel.getCellByLocation(fromLocation).selected).toBe(true);

    // CALL
    theLevel.onKeyDown(key);

    // ASSERT
    if (!fromLocation.equals(destLocation)) {
        expect(theLevel.getCellByLocation(fromLocation).selected).toBe(false);
    }
    expect(theLevel.getCellByLocation(destLocation).selected).toBe(true);
    expect(theLevel._selectedLocation.equals(destLocation)).toBe(true);
};

it("test onKeyDown - ArrowDown from (0, 0) ", function () {
    testOnKeyDown(new _Location2.default(0, 0), "ArrowDown", new _Location2.default(0, 1));
});

it("test onKeyDown - ArrowDown from bottom ", function () {
    var bottomLocation = new _Location2.default(0, _Level2.default.DEFAULT_HEIGHT - 1);
    testOnKeyDown(bottomLocation, "ArrowDown", bottomLocation);
});

it("test onKeyDown - ArrowUp from (0, 0) ", function () {
    testOnKeyDown(new _Location2.default(0, 0), "ArrowUp", new _Location2.default(0, 0));
});

it("test onKeyDown - ArrowUp from bottom ", function () {
    var bottomLocation = new _Location2.default(0, _Level2.default.DEFAULT_HEIGHT - 1);
    var secondToBottomLocation = new _Location2.default(0, _Level2.default.DEFAULT_HEIGHT - 2);
    testOnKeyDown(bottomLocation, "ArrowUp", secondToBottomLocation);
});

it("test onKeyDown - ArrowLeft from (0, 0) ", function () {
    testOnKeyDown(new _Location2.default(0, 0), "ArrowLeft", new _Location2.default(0, 0));
});

it("test onKeyDown - ArrowLeft from right", function () {
    var rightLocation = new _Location2.default(_Level2.default.DEFAULT_WIDTH - 1, 0);
    var secondFromRightLoc = new _Location2.default(_Level2.default.DEFAULT_WIDTH - 2, 0);
    testOnKeyDown(rightLocation, "ArrowLeft", secondFromRightLoc);
});

it("test onKeyDown - ArrowRight from (0, 0) ", function () {
    testOnKeyDown(new _Location2.default(0, 0), "ArrowRight", new _Location2.default(1, 0));
});

it("test onKeyDown - ArrowRight from right", function () {
    var rightLocation = new _Location2.default(_Level2.default.DEFAULT_WIDTH - 1, 0);
    testOnKeyDown(rightLocation, "ArrowRight", rightLocation);
});

it("test selected cell changed", function () {
    // SETUP
    var theLevel = new _Level2.default();
    theLevel.getCell(0, 0).selected = true;
    expect(theLevel._selectedLocation.isEqualTo(0, 0)).toBe(true);
    expect(theLevel.getCell(0, 0).selected).toBe(true);

    // CALL
    theLevel.getCell(1, 0).selected = true;

    // ASSERT
    expect(theLevel._selectedLocation.isEqualTo(1, 0)).toBe(true);
    expect(theLevel.getCell(0, 0).selected).toBe(false);
    expect(theLevel.getCell(1, 0).selected).toBe(true);
});

it("selectedCell returns null if selectedLocation is invalid", function () {
    // SETUP
    var theLevel = new _Level2.default();

    // CALL
    var theSelectedCell = theLevel.selectedCell;

    // ASSERT
    expect(theSelectedCell).toBe(null);
});

it("regeneratePaths works", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var oldFloydWarshall = theLevel.floydWarshall;

    // CALL
    var newFloydWarshall = theLevel.regeneratePaths();

    // ASSERT
    expect(newFloydWarshall !== oldFloydWarshall).toBe(true);
});

it("get color works", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    // let oldFloydWarshall = theLevel.floydWarshall;

    // CALL
    var theColor = theLevel.color;

    // ASSERT
    expect(theColor).toBe(_Border2.default.COLOR_CLASSIC);
});

it("set color works", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    // let oldFloydWarshall = theLevel.floydWarshall;

    // CALL
    theLevel.color = _Border2.default.COLOR_PINK;

    // ASSERT
    expect(theLevel.color).toBe(_Border2.default.COLOR_PINK);
    expect(theLevel.getCell(0, 0).solidBorder.color).toBe(_Border2.default.COLOR_PINK);
    expect(theLevel.getCell(0, 1).solidBorder.color).toBe(_Border2.default.COLOR_PINK);
    expect(theLevel.getCell(1, 0).solidBorder.color).toBe(_Border2.default.COLOR_PINK);
    expect(theLevel.getCell(1, 1).solidBorder.color).toBe(_Border2.default.COLOR_PINK);
});

it("removeColumn removes spawn values if they are in that col", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var cell_1_0 = theLevel.getCell(1, 0);
    cell_1_0.isPlayerSpawn = true;
    expect(theLevel.playerSpawnLocation.isEqualTo(1, 0)).toBe(true);

    // CALL
    theLevel.removeColumn();

    // ASSERT
    expect(theLevel.playerSpawnLocation.isEqualTo(-1, -1)).toBe(true);
    expect(cell_1_0.isPlayerSpawn).toBe(false);
});

it("removeColumn doesnt let less than 1 col", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);

    // CALL
    theLevel.removeColumn();

    // ASSERT
    expect(theLevel.width).toBe(1);
});

it("addColumn adds cell of the same color", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    var cell_0_0 = theLevel.getCell(0, 0);
    theLevel.color = _Border2.default.COLOR_AQUA;
    expect(cell_0_0.solidBorder.color === _Border2.default.COLOR_AQUA).toBe(true);

    // CALL
    theLevel.addColumn();

    // ASSERT
    var cell_1_0 = theLevel.getCell(1, 0);
    expect(cell_1_0.solidBorder.color === _Border2.default.COLOR_AQUA).toBe(true);
});

it("removeRow removes spawn values if they are in that row", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    var cell_0_1 = theLevel.getCell(0, 1);
    cell_0_1.isPlayerSpawn = true;
    expect(theLevel.playerSpawnLocation.isEqualTo(0, 1)).toBe(true);

    // CALL
    theLevel.removeRow();

    // ASSERT
    expect(theLevel.playerSpawnLocation.isEqualTo(-1, -1)).toBe(true);
    expect(cell_0_1.isPlayerSpawn).toBe(false);
});

it("removeRow doesnt let less than 1 row", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);

    // CALL
    theLevel.removeRow();

    // ASSERT
    expect(theLevel.height).toBe(1);
});

it("addRow adds cell of the same color", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    var cell_0_0 = theLevel.getCell(0, 0);
    theLevel.color = _Border2.default.COLOR_AQUA;
    expect(cell_0_0.solidBorder.color === _Border2.default.COLOR_AQUA).toBe(true);

    // CALL
    theLevel.addRow();

    // ASSERT
    var cell_0_1 = theLevel.getCell(0, 1);
    expect(cell_0_1.solidBorder.color === _Border2.default.COLOR_AQUA).toBe(true);
});

it("addRow should add the cells in edit mode", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    theLevel.editMode = true;

    // CALL
    theLevel.addRow();

    // ASSERT
    var cell_0_1 = theLevel.getCell(0, 1);
    expect(cell_0_1.editMode).toBe(true);
});

it("addColumn should add the cells in edit mode", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);
    theLevel.editMode = true;

    // CALL
    theLevel.addColumn();

    // ASSERT
    var cell_1_0 = theLevel.getCell(1, 0);
    expect(cell_1_0.editMode).toBe(true);
});

it("getCellByLocation returns null if cell doesn't exist", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 1);

    // CALL
    var theValue = theLevel.getCellByLocation(new _Location2.default(2, 2));

    // ASSERT
    expect(theValue === null).toBe(true);
});

it("mirrorHorizontal assigns new ids and locations to clone cells", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 1);
    var cell_0_0 = theLevel.getCell(0, 0);
    var cell_1_0 = theLevel.getCell(1, 0);
    expect(cell_0_0.id).toBe("0_0");
    expect(cell_1_0.id).toBe("0_1");

    // CALL
    theLevel.mirrorHorizontally();

    // ASSERT
    expect(theLevel.getCell(2, 0).id).toBe("0_2");
    expect(theLevel.getCell(2, 0).location.isEqualTo(2, 0)).toBe(true);
    expect(theLevel.getCell(3, 0).id).toBe("0_3");
    expect(theLevel.getCell(3, 0).location.isEqualTo(3, 0)).toBe(true);
});

it("mirrorVertical assigns new ids and locations to clone cells", function () {
    // SETUP
    var theLevel = new _Level2.default(1, 2);
    var cell_0_0 = theLevel.getCell(0, 0);
    var cell_0_1 = theLevel.getCell(0, 1);
    expect(cell_0_0.id).toBe("0_0");
    expect(cell_0_1.id).toBe("1_0");

    // CALL
    theLevel.mirrorVertically();

    // ASSERT
    expect(theLevel.getCell(0, 2).id).toBe("2_0");
    expect(theLevel.getCell(0, 2).location.isEqualTo(0, 2)).toBe(true);
    expect(theLevel.getCell(0, 3).id).toBe("3_0");
    expect(theLevel.getCell(0, 3).location.isEqualTo(0, 3)).toBe(true);
});

it("getLevelNumAsTimeRange basic test", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    theLevel.levelNum = 1;

    // CALL
    var theValue = theLevel.getLevelNumAsTimeRange();

    // ASSERT
    expect(theValue).toBe(0);
});

it("getLevelNumAsTimeRange basic test 2", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    theLevel.levelNum = 17;

    // CALL
    var theValue = theLevel.getLevelNumAsTimeRange();

    // ASSERT
    expect(theValue).toBe(1);
});

it("getLevelNumAsTimeRange crazy high level num test", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    theLevel.levelNum = 36;

    // CALL
    var theValue = theLevel.getLevelNumAsTimeRange();

    // ASSERT
    expect(theValue).toBe(1);
});

it("getLevelNumAsTimeRange low level num test", function () {
    // SETUP
    var theLevel = new _Level2.default(2, 2);
    theLevel.levelNum = 0;

    // CALL
    var theValue = theLevel.getLevelNumAsTimeRange();

    // ASSERT
    expect(theValue).toBe(0);
});

it("BlinkBorder setter works", function () {
    // SETUP
    var level = new _Level2.default(2, 2);

    // CALL
    level.blinkBorder = true;

    // ASSERT
    expect(level.getCell(0, 0).blinkBorder).toBe(true);
    expect(level.getCell(0, 1).blinkBorder).toBe(true);
    expect(level.getCell(1, 0).blinkBorder).toBe(true);
    expect(level.getCell(1, 1).blinkBorder).toBe(true);
});

it("test toBinary", function () {
    // SETUP
    var level = new _Level2.default(2, 2);

    // CALL
    var toCheck = level.toBinary();

    // ASSERT
    expect(toCheck[0][0] !== null && typeof toCheck[0][0] === "string").toBe(true);
    expect(toCheck[0][1] !== null && typeof toCheck[0][1] === "string").toBe(true);
    expect(toCheck[1][0] !== null && typeof toCheck[1][0] === "string").toBe(true);
    expect(toCheck[1][1] !== null && typeof toCheck[1][1] === "string").toBe(true);
});

it("test toGraph", function () {
    // SETUP
    var level = new _Level2.default(2, 2);

    // CALL
    var toCheck = level.toGraph();

    // ASSERT
    expect(toCheck.vertexCount).toBe(4);
    expect(toCheck.edgeCount).toBe(4);
});

it("test toGraph", function () {
    // SETUP
    var level = new _Level2.default(3, 3);

    // CALL
    var toCheck = level.toGraph();

    // ASSERT
    expect(toCheck.vertexCount).toBe(9);
    expect(toCheck.edgeCount).toBe(18);
});