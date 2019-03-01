"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _lodash = require("../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _BorderType = require("./BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

var _KeyEventer = require("../utils/KeyEventer");

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

var _FloydWarshall = require("../utils/FloydWarshall");

var _FloydWarshall2 = _interopRequireDefault(_FloydWarshall);

var _Dot = require("./Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _EasingFunctions = require("../utils/EasingFunctions");

var _EasingFunctions2 = _interopRequireDefault(_EasingFunctions);

var _Graph = require("./ai/Graph");

var _Graph2 = _interopRequireDefault(_Graph);

var _Direction = require("../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var default_width = 26;
var default_height = 26;
var powerUps = ["Cherry", "Strawberry", "Orange", "Pretzel", "Apple", "Pear", "Banana"];
var total_levels = 16;

// TODO: Refactor this class.  It has become unwieldy

var Level = function (_DataSourceBase) {
    _inherits(Level, _DataSourceBase);

    _createClass(Level, null, [{
        key: "_getGameMatrixPropName",
        value: function _getGameMatrixPropName(x, y) {
            return "_gameMatrix[" + y + "][" + x + "]";
        }
    }, {
        key: "constructGameMatrix",
        value: function constructGameMatrix(width, height) {
            var toRet = [];

            for (var y = 0; y < height; y++) {
                toRet[y] = [];

                for (var x = 0; x < width; x++) {
                    var currentId = y + "_" + x;
                    toRet[y][x] = new _Cell2.default(currentId);
                }
            }

            return toRet;
        }
    }, {
        key: "fromJSON",
        value: function fromJSON(jsonObject) {
            // let jsonObject = JSON.parse(json);
            var width = jsonObject._width;
            var height = jsonObject._height;
            var toRet = new Level(width, height);

            var currentCell = null;
            var currentDataCell = null;
            var conditionalAssignCell = function conditionalAssignCell(property) {
                if (typeof currentDataCell[property] !== 'undefined') {
                    currentCell[property] = currentDataCell[property];
                }
            };

            for (var y = 0; y < height; y++) {

                for (var x = 0; x < width; x++) {
                    currentCell = toRet.gameMatrix[y][x];
                    currentDataCell = jsonObject._gameMatrix[y][x];

                    currentCell.setSolidBorder(_BorderType2.default.LEFT, currentDataCell._solidBorder._left);
                    currentCell.setSolidBorder(_BorderType2.default.TOP, currentDataCell._solidBorder._top);
                    currentCell.setSolidBorder(_BorderType2.default.RIGHT, currentDataCell._solidBorder._right);
                    currentCell.setSolidBorder(_BorderType2.default.BOTTOM, currentDataCell._solidBorder._bottom);
                    if (typeof currentDataCell._solidBorder._color !== "undefined" && currentDataCell._solidBorder._color !== null) {
                        currentCell.solidBorder.color = currentDataCell._solidBorder._color;
                    }

                    currentCell.setPartialBorder(_BorderType2.default.LEFT, currentDataCell._partialBorder._left);
                    currentCell.setPartialBorder(_BorderType2.default.TOP, currentDataCell._partialBorder._top);
                    currentCell.setPartialBorder(_BorderType2.default.RIGHT, currentDataCell._partialBorder._right);
                    currentCell.setPartialBorder(_BorderType2.default.BOTTOM, currentDataCell._partialBorder._bottom);
                    if (typeof currentDataCell._partialBorder._color !== "undefined" && currentDataCell._partialBorder._color !== null) {
                        currentCell.partialBorder.color = currentDataCell._partialBorder._color;
                    }

                    conditionalAssignCell("_isPlayerSpawn");
                    conditionalAssignCell("_isGhostRedSpawn");
                    conditionalAssignCell("_isGhostPinkSpawn");
                    conditionalAssignCell("_isGhostBlueSpawn");
                    conditionalAssignCell("_isGhostOrangeSpawn");
                    conditionalAssignCell("_isActive");

                    currentCell.dotType = currentDataCell._dotType;
                }
            }

            var conditionalAssignLocation = function conditionalAssignLocation(jsonObject, propName) {
                if (typeof jsonObject[propName] !== 'undefined') {
                    toRet[propName] = new _Location2.default(jsonObject[propName]._x, jsonObject[propName]._y);
                }
            };

            conditionalAssignLocation(jsonObject, "_playerSpawnLocation");
            conditionalAssignLocation(jsonObject, "_ghostRedLocation");
            conditionalAssignLocation(jsonObject, "_ghostBlueLocation");
            conditionalAssignLocation(jsonObject, "_ghostOrangeLocation");
            conditionalAssignLocation(jsonObject, "_ghostPinkLocation");
            conditionalAssignLocation(jsonObject, "_selectedLocation");

            if (!!jsonObject._floydWarshall && !!jsonObject._floydWarshall._directions) {
                toRet._floydWarshall = new _FloydWarshall2.default();
                toRet._floydWarshall._directions = jsonObject._floydWarshall._directions;
                toRet._floydWarshall._pathDistance = jsonObject._floydWarshall._pathDistance;
                toRet._borderIsDirty = false;
            }

            if (typeof jsonObject._numDots !== "undefined") {
                toRet._numDots = jsonObject._numDots;
            }

            if (typeof jsonObject._powerUpSpawns !== "undefined") {
                toRet._powerUpSpawns = jsonObject._powerUpSpawns;
            }

            return toRet;
        }
    }, {
        key: "DEFAULT_WIDTH",
        get: function get() {
            return default_width;
        }
    }, {
        key: "DEFAULT_HEIGHT",
        get: function get() {
            return default_height;
        }
    }, {
        key: "TOTAL_LEVELS",
        get: function get() {
            return total_levels;
        }
    }]);

    function Level() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : default_width;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : default_height;
        var levelNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        _classCallCheck(this, Level);

        var _this = _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).call(this));

        _this._width = width;
        _this._height = height;
        _this._levelNum = levelNum;
        var theGameMatrix = Level.constructGameMatrix(_this._width, _this._height);
        _this._wireUpGameMatrix(theGameMatrix);
        _this._gameMatrix = theGameMatrix;
        _this._floydWarshall = null;
        _this._borderIsDirty = true;
        _this._numDots = null;
        _this._powerUpSpawns = null;
        _this._powerUps = null;

        _this._playerSpawnLocation = _this._wireUp("_playerSpawnLocation", new _Location2.default(-1, -1));
        _this._ghostRedLocation = _this._wireUp("_ghostRedLocation", new _Location2.default(-1, -1));
        _this._ghostBlueLocation = _this._wireUp("_ghostBlueLocation", new _Location2.default(-1, -1));
        _this._ghostOrangeLocation = _this._wireUp("_ghostOrangeLocation", new _Location2.default(-1, -1));
        _this._ghostPinkLocation = _this._wireUp("_ghostPinkLocation", new _Location2.default(-1, -1));
        _this._selectedLocation = _this._wireUp("_selectedLocation", new _Location2.default(-1, -1));

        // -------------------------------------------------------------------
        // everything above this line is restored via the fromJSON method
        // -------------------------------------------------------------------

        _this._editMode = false;
        _this._onKeyDownRef = function (e) {
            return _this.onKeyDown(e);
        };
        _this._onKeyUpRef = function (e) {
            return _this.onKeyUp(e);
        };
        _this._activeCells = null;
        _this._activeCellsIsDirty = true;
        _this.toIgnore.push("_dotType");
        _this.toIgnore.push("_blinkBorder");
        _this.toIgnore.push("_highlighted");
        // this.debug = true;
        return _this;
    }

    _createClass(Level, [{
        key: "toJSON",
        value: function toJSON() {
            var toRet = {
                _width: this._width,
                _height: this._height,
                _gameMatrix: [],
                _floydWarshall: null,
                _borderIsDirty: this._borderIsDirty,
                _playerSpawnLocation: this._playerSpawnLocation.toJSON(),
                _ghostRedLocation: this._ghostRedLocation.toJSON(),
                _ghostBlueLocation: this._ghostBlueLocation.toJSON(),
                _ghostOrangeLocation: this._ghostOrangeLocation.toJSON(),
                _ghostPinkLocation: this._ghostPinkLocation.toJSON(),
                _selectedLocation: this._selectedLocation.toJSON(),
                _numDots: this._numDots,
                _powerUpSpawns: this._powerUpSpawns
            };

            if (this._floydWarshall !== null) {
                toRet._floydWarshall = this._floydWarshall.toJSON();
            }

            for (var rowIndex = 0; rowIndex < this.height; rowIndex++) {
                toRet._gameMatrix[rowIndex] = [];

                for (var colIndex = 0; colIndex < this.width; colIndex++) {
                    toRet._gameMatrix[rowIndex][colIndex] = this._gameMatrix[rowIndex][colIndex].toJSON();
                }
            }

            return toRet;
        }
    }, {
        key: "regeneratePaths",
        value: function regeneratePaths() {
            this._floydWarshall = new _FloydWarshall2.default();
            this._floydWarshall.buildAllPaths(this);
            this._floydWarshall.convertPathsToDirections(this);
            this._borderIsDirty = false;
        }
    }, {
        key: "populateDotsAndSpawns",


        // TODO: Refactor this.  I know this is sloppy
        value: function populateDotsAndSpawns() {
            var theNumDots = 0;
            var thePowerUpSpawns = [];
            var self = this;

            this.activeCells.forEach(function (cell) {
                if (cell.dotType !== _Dot2.default.NONE) {
                    theNumDots++;
                }

                if (cell.isTeleportCell(self.width, self.height)) {
                    thePowerUpSpawns.push(cell.id);
                }
            });

            this._numDots = theNumDots;
            this._powerUpSpawns = thePowerUpSpawns;
        }
    }, {
        key: "getLevelNumAsTimeRange",
        value: function getLevelNumAsTimeRange() {
            var maxLevelNum = total_levels;
            var currentLevelNum = this.levelNum;
            if (currentLevelNum < 1) {
                currentLevelNum = 1;
            } else if (currentLevelNum > maxLevelNum) {
                currentLevelNum = maxLevelNum;
            }

            return _EasingFunctions2.default.getTime(1, maxLevelNum, currentLevelNum);
        }
    }, {
        key: "getRandomPowerUpSpawnLocation",
        value: function getRandomPowerUpSpawnLocation() {
            var numPowerUpSpawns = this.powerUpSpawns.length;
            var randomIndex = Math.floor(Math.random() * numPowerUpSpawns);
            var cellId = this.powerUpSpawns[randomIndex];
            var cell = this.getCellById(cellId);
            return cell.location;
        }
    }, {
        key: "getRandomActiveCellLocation",
        value: function getRandomActiveCellLocation() {
            var numActiveCells = this.activeCells.length;
            var randomIndex = Math.floor(Math.random() * numActiveCells);
            return this.activeCells[randomIndex].location.clone();
            // return toRet;
        }
    }, {
        key: "_getActiveCells",
        value: function _getActiveCells() {
            var toRet = [];

            this.iterateOverCells(function (cell) {
                if (cell.isActive) {
                    toRet.push(cell);
                }
            });

            return toRet;
        }
    }, {
        key: "_wireUpGameMatrix",
        value: function _wireUpGameMatrix(theGameMatrix) {
            var self = this;

            theGameMatrix.forEach(function (row) {
                row.forEach(function (cell) {
                    var x = cell.x;
                    var y = cell.y;
                    var propertyName = Level._getGameMatrixPropName(x, y);

                    self._wireUp(propertyName, cell);
                });
            });
        }
    }, {
        key: "_setLocationChangeValue",
        value: function _setLocationChangeValue(thisSpawnLocationPropName, cellPropName, newValue, newCell, oldValue, raiseEvent) {
            var thisSpawnLocationPropNameWithUnderscore = thisSpawnLocationPropName;
            if (!_lodash2.default.startsWith(thisSpawnLocationPropName, "_")) {
                thisSpawnLocationPropNameWithUnderscore = "_" + thisSpawnLocationPropName;
            }

            if (newValue) {
                // -1
                if (this[thisSpawnLocationPropName].isValid) {
                    // This kicks off another event.
                    this.getCellByLocation(this[thisSpawnLocationPropName])[cellPropName] = false;
                }

                this[thisSpawnLocationPropName].setWithLocation(newCell.location);
                if (raiseEvent) {
                    this._raiseOnChangeCallbacks(thisSpawnLocationPropNameWithUnderscore, oldValue, newValue);
                }
            } else {
                // -1
                this[thisSpawnLocationPropName].set(-1, -1);

                if (raiseEvent) {
                    this._raiseOnChangeCallbacks(thisSpawnLocationPropNameWithUnderscore, oldValue, newValue);
                }
            }
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            switch (e.source) {
                case "_isPlayerSpawn":
                    this._setLocationChangeValue("playerSpawnLocation", "isPlayerSpawn", e.newValue, e.object, e.oldValue, true);
                    break;
                case "_isGhostRedSpawn":
                    this._setLocationChangeValue("ghostRedLocation", "isGhostRedSpawn", e.newValue, e.object, e.oldValue, true);
                    break;
                case "_isGhostPinkSpawn":
                    this._setLocationChangeValue("ghostPinkLocation", "isGhostPinkSpawn", e.newValue, e.object, e.oldValue, true);
                    break;
                case "_isGhostBlueSpawn":
                    this._setLocationChangeValue("ghostBlueLocation", "isGhostBlueSpawn", e.newValue, e.object, e.oldValue, true);
                    break;
                case "_isGhostOrangeSpawn":
                    this._setLocationChangeValue("ghostOrangeLocation", "isGhostOrangeSpawn", e.newValue, e.object, e.oldValue, true);
                    break;
                case "_selected":
                    this._setLocationChangeValue("_selectedLocation", "selected", e.newValue, e.object, e.oldValue, false);
                    break;
                default:
                    if (_lodash2.default.startsWith(e.source, "_solidBorder")) {
                        // If there border changes, we need to re-run the path finding algorithm.
                        this._borderIsDirty = true;
                    }
                    break;
            }

            _get(Level.prototype.__proto__ || Object.getPrototypeOf(Level.prototype), "_nestedDataSourceChanged", this).call(this, e);
        }
    }, {
        key: "removeAllCallbacks",
        value: function removeAllCallbacks() {
            _get(Level.prototype.__proto__ || Object.getPrototypeOf(Level.prototype), "removeAllCallbacks", this).call(this);

            _KeyEventer2.default.instance.removeCallback(this._onKeyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
            _KeyEventer2.default.instance.removeCallback(this._onKeyUpRef, _KeyEventer2.default.CALLBACK_KEYUP);
        }
    }, {
        key: "mirrorHorizontally",
        value: function mirrorHorizontally() {

            var currentNewXIndex = 0;
            var currentCell = null;
            var currentClonedCell = null;

            for (var y = 0; y < this.height; y++) {

                currentNewXIndex = this.width;

                for (var x = this.width - 1; x >= 0; x--) {

                    currentCell = this.gameMatrix[y][x];
                    currentClonedCell = currentCell.clone(y + "_" + currentNewXIndex, "horizontal");
                    currentClonedCell.selected = false;
                    currentClonedCell.location.set(currentNewXIndex, y);

                    this._wireUp(Level._getGameMatrixPropName(currentNewXIndex, y), currentClonedCell);
                    this.gameMatrix[y][currentNewXIndex++] = currentClonedCell;
                }
            }

            this.width = currentNewXIndex;
        }
    }, {
        key: "mirrorVertically",
        value: function mirrorVertically() {

            var currentNewYIndex = this._height;
            var currentCell = null;
            var currentClonedCell = null;

            for (var y = this._height - 1; y >= 0; y--) {

                this.gameMatrix[currentNewYIndex] = [];

                for (var x = 0; x < this._width; x++) {

                    currentCell = this.gameMatrix[y][x];
                    currentClonedCell = currentCell.clone(currentNewYIndex + "_" + x, "vertical");
                    currentClonedCell.selected = false;
                    currentClonedCell.location.set(x, currentNewYIndex);

                    this._wireUp(Level._getGameMatrixPropName(x, currentNewYIndex), currentClonedCell);
                    this.gameMatrix[currentNewYIndex][x] = currentClonedCell;
                }

                currentNewYIndex++;
            }

            this.height = currentNewYIndex;
        }
    }, {
        key: "getCellById",
        value: function getCellById(cellId) {
            var theArray = cellId.split("_");
            var y = theArray[0];
            var x = theArray[1];

            return this.getCell(x, y);
        }
    }, {
        key: "getCell",
        value: function getCell(x, y) {
            return this._gameMatrix[y][x];
        }
    }, {
        key: "addRow",
        value: function addRow() {
            this.gameMatrix[this._height] = [];

            for (var x = 0; x < this.width; x++) {
                var currentId = this.height + "_" + x;
                var currentCell = new _Cell2.default(currentId);
                currentCell.solidBorder.color = this.color;
                currentCell.editMode = this.editMode;
                this._wireUp(Level._getGameMatrixPropName(x, this._height), currentCell);
                this.gameMatrix[this.height][x] = currentCell;
            }

            this._setValueAndRaiseOnChange("_height", this.height + 1);
        }
    }, {
        key: "removeRow",
        value: function removeRow() {
            if (this.height === 1) {
                return;
            }

            var self = this;
            var currentRow = this._gameMatrix.pop();
            currentRow.forEach(function (cell) {
                cell.setAllSpawnValuesFalse();
                self._unWireForDestruction(cell);
                cell.removeAllCallbacks();
            });

            this.height = this.height - 1;
        }
    }, {
        key: "addColumn",
        value: function addColumn() {
            for (var y = 0; y < this.height; y++) {
                var currentId = y + "_" + this.width;
                var currentCell = new _Cell2.default(currentId);
                currentCell.solidBorder.color = this.color;
                currentCell.editMode = this.editMode;
                this._wireUp(Level._getGameMatrixPropName(this.width, y), currentCell);

                this.gameMatrix[y][this.width] = currentCell;
            }

            this.width = this.width + 1;
        }
    }, {
        key: "removeColumn",
        value: function removeColumn() {

            if (this.width === 1) {
                return;
            }

            for (var y = 0; y < this.height; y++) {
                var currentCell = this.gameMatrix[y].pop();
                currentCell.setAllSpawnValuesFalse();
                this._unWireForDestruction(currentCell);
                currentCell.removeAllCallbacks();
            }

            this.width = this.width - 1;
        }
    }, {
        key: "getCellByLocation",
        value: function getCellByLocation(location) {
            if (location.x >= this.width || location.y >= this.height) {
                return null;
            }

            return this.gameMatrix[location.y][location.x];
        }

        /**
         * Use this method to iterate over all cells of the game matrix.
         *
         * @param theCallback This is a function that will be called for each cell.  It is passed (cell, level).
         */

    }, {
        key: "iterateOverCells",
        value: function iterateOverCells(theCallback) {
            var theLevel = this;
            this._gameMatrix.forEach(function (row) {
                row.forEach(function (cell) {
                    theCallback(cell, theLevel);
                });
            });
        }

        /** KEY EVENTER EVENTS - START **/

    }, {
        key: "onKeyDown",
        value: function onKeyDown(key) {
            if (!this.editMode) {
                return;
            }

            var currentCell = this.selectedCell;
            var newSelectedCell = null;

            switch (key) {
                case "ArrowDown":
                    if (currentCell.y + 1 < this.height) {
                        // currentCell.selected = false;
                        newSelectedCell = this.getCell(currentCell.x, currentCell.y + 1);
                        newSelectedCell.selected = true;
                    }
                    break;
                case "ArrowUp":
                    if (currentCell.y - 1 >= 0) {
                        // currentCell.selected = false;
                        newSelectedCell = this.getCell(currentCell.x, currentCell.y - 1);
                        newSelectedCell.selected = true;
                    }
                    break;
                case "ArrowLeft":
                    if (currentCell.x - 1 >= 0) {
                        // currentCell.selected = false;
                        newSelectedCell = this.getCell(currentCell.x - 1, currentCell.y);
                        newSelectedCell.selected = true;
                    }
                    break;
                case "ArrowRight":
                    if (currentCell.x + 1 < this.width) {
                        // currentCell.selected = false;
                        newSelectedCell = this.getCell(currentCell.x + 1, currentCell.y);
                        newSelectedCell.selected = true;
                    }
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(key) {}

        /** KEY EVENTER EVENTS - END **/

    }, {
        key: "toBinary",
        value: function toBinary() {
            var toRet = [];
            var currentCell = null;

            for (var y = 0; y < this.height; y++) {

                toRet[y] = [];

                for (var x = 0; x < this.width; x++) {
                    currentCell = this.getCell(x, y);
                    toRet[y][x] = currentCell.toBinary();
                }
            }

            return toRet;
        }
    }, {
        key: "toGraph",
        value: function toGraph() {
            var addEdgeFromCellToLocation = function (graph, centerCell, targetLocation) {
                var targetCell = this.getCellByLocation(targetLocation);

                if (centerCell.canTraverseTo(targetCell, this.width, this.height, true)) {
                    graph.addEdge(centerCell.id, targetCell.id);
                }
            }.bind(this);

            var toRet = new _Graph2.default();
            this.iterateOverCells(function (cell) {
                toRet.addVertex(cell.id);
            });

            this.iterateOverCells(function (centerCell) {

                var centerLocation = centerCell.location.clone();

                var leftLocation = centerLocation.clone().moveInDirection(_Direction2.default.LEFT, this.height, this.width);
                addEdgeFromCellToLocation(toRet, centerCell, leftLocation);

                var rightLocation = centerLocation.clone().moveInDirection(_Direction2.default.RIGHT, this.height, this.width);
                addEdgeFromCellToLocation(toRet, centerCell, rightLocation);

                var upLocation = centerLocation.clone().moveInDirection(_Direction2.default.UP, this.height, this.width);
                addEdgeFromCellToLocation(toRet, centerCell, upLocation);

                var downLocation = centerLocation.clone().moveInDirection(_Direction2.default.DOWN, this.height, this.width);
                addEdgeFromCellToLocation(toRet, centerCell, downLocation);
            }.bind(this));

            return toRet;
        }
    }, {
        key: "powerUps",
        get: function get() {
            if (this._powerUps === null) {
                var toSet = [];
                var self = this;

                powerUps.forEach(function (pu, index) {
                    if (index < self.levelNum) {
                        toSet.push(pu);
                    }
                });

                this._powerUps = toSet;
            }

            return this._powerUps;
        }
    }, {
        key: "levelNum",
        get: function get() {
            return this._levelNum;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_levelNum", value);
        }
    }, {
        key: "gameMatrix",
        get: function get() {
            return this._gameMatrix;
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_width", value);
        }
    }, {
        key: "screenWidth",
        get: function get() {
            return this._width * Level.DEFAULT_WIDTH;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_height", value);
        }
    }, {
        key: "screenHeight",
        get: function get() {
            return this._height * Level.DEFAULT_HEIGHT;
        }
    }, {
        key: "selectedCell",
        get: function get() {
            if (this._selectedLocation.isValid) {
                return this.getCellByLocation(this._selectedLocation);
            }

            return null;
        }
    }, {
        key: "playerSpawnLocation",
        get: function get() {
            return this._playerSpawnLocation;
        }
    }, {
        key: "ghostRedLocation",
        get: function get() {
            return this._ghostRedLocation;
        }
    }, {
        key: "ghostBlueLocation",
        get: function get() {
            return this._ghostBlueLocation;
        }
    }, {
        key: "ghostOrangeLocation",
        get: function get() {
            return this._ghostOrangeLocation;
        }
    }, {
        key: "ghostPinkLocation",
        get: function get() {
            return this._ghostPinkLocation;
        }
    }, {
        key: "editMode",
        get: function get() {
            return this._editMode;
        },
        set: function set(value) {
            this.gameMatrix.forEach(function (row) {
                row.forEach(function (cell) {
                    cell.selected = false;
                    cell.editMode = value;
                });
            });

            if (value && this._editMode !== value) {
                _KeyEventer2.default.instance.addCallback(this._onKeyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
                _KeyEventer2.default.instance.addCallback(this._onKeyUpRef, _KeyEventer2.default.CALLBACK_KEYUP);
                this._powerUpSpawns = null;
                this._numDots = null;
            } else if (!value && this._editMode !== value) {
                _KeyEventer2.default.instance.removeCallback(this._onKeyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
                _KeyEventer2.default.instance.removeCallback(this._onKeyUpRef, _KeyEventer2.default.CALLBACK_KEYUP);
            }

            this._setValueAndRaiseOnChange("_editMode", value);
        }
    }, {
        key: "player",
        get: function get() {
            return this._player;
        }
    }, {
        key: "ghostRed",
        get: function get() {
            return this._ghostRed;
        }
    }, {
        key: "ghostBlue",
        get: function get() {
            return this._ghostBlue;
        }
    }, {
        key: "ghostPink",
        get: function get() {
            return this._ghostPink;
        }
    }, {
        key: "ghostOrange",
        get: function get() {
            return this._ghostOrange;
        }
    }, {
        key: "floydWarshall",
        get: function get() {
            if (this._borderIsDirty || this._floydWarshall === null) {
                this.regeneratePaths();
            }

            return this._floydWarshall;
        }
    }, {
        key: "activeCells",
        get: function get() {
            if (this._activeCellsIsDirty || this._activeCells === null) {
                this._activeCells = this._getActiveCells();
                this._activeCellsIsDirty = false;
            }

            return this._activeCells;
        }
    }, {
        key: "color",
        get: function get() {
            return this.getCell(0, 0).solidBorder.color;
        },
        set: function set(value) {
            // let oldValue = this.color;
            this.iterateOverCells(function (cell) {
                cell.solidBorder.color = value;
            });
            // this._raiseOnChangeCallbacks("color", oldValue, value);
        }
    }, {
        key: "numDots",
        get: function get() {
            if (this._numDots === null) {
                this.populateDotsAndSpawns();
            }

            return this._numDots;
        }
    }, {
        key: "powerUpSpawns",
        get: function get() {
            if (this._powerUpSpawns === null) {
                this.populateDotsAndSpawns();
            }

            return this._powerUpSpawns;
        }
    }, {
        key: "blinkBorder",
        get: function get() {
            return this.getCell(0, 0).blinkBorder;
        },
        set: function set(value) {
            this.iterateOverCells(function (theCell) {
                theCell.blinkBorder = value;
            });
        }
    }]);

    return Level;
}(_DataSourceBase3.default);

exports.default = Level;