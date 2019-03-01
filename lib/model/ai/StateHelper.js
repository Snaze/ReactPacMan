"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Dot = require("../Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _lodash = require("../../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ConvertBase = require("../../utils/ConvertBase");

var _ConvertBase2 = _interopRequireDefault(_ConvertBase);

var _Ghost = require("../actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _GameObjectContainer = require("../GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _MathUtil = require("./MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var num_bins = 10;

var StateHelper = function () {
    _createClass(StateHelper, null, [{
        key: "NUM_BINS",
        get: function get() {
            return num_bins;
        }
    }, {
        key: "NUM_STATES",
        get: function get() {
            if (StateHelper._numStates === null) {
                StateHelper._numStates = Math.pow(num_bins, 4);
            }

            return StateHelper._numStates;
        }
    }]);

    function StateHelper() {
        var searchDepth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

        _classCallCheck(this, StateHelper);

        this._searchDepth = searchDepth;

        // TODO: Move these values to a common location
        this._deathValue = -10000;
        this._littleDotValue = 10;
        this._bigDotValue = 50;
        this._unvisitedCellValue = 1000;
        this._globalMin = Number.POSITIVE_INFINITY;
        this._globalMax = Number.NEGATIVE_INFINITY;
        this._visitedCells = {};
        this._prevTraversedCells = null;
        this._prevLocation = null;
    }

    _createClass(StateHelper, [{
        key: "getGhostHeuristic",
        value: function getGhostHeuristic(distance, ghost) {
            if (ghost.scaredState === _Ghost2.default.SCARED_STATE_NOT_SCARED) {
                return this.getDiscountedHeuristic(distance, this.deathValue);
            }

            return this.getDiscountedHeuristic(distance, _GameObjectContainer2.default.peekNextKillScore());
        }
    }, {
        key: "getDiscountedHeuristic",
        value: function getDiscountedHeuristic(distance, value) {
            return (this._searchDepth - distance) / this._searchDepth * value;
            // return value;
        }
    }, {
        key: "getHeuristic",
        value: function getHeuristic(goc, startLocation) {
            var traversedCells = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


            var score = 0;

            goc.graph.breadthFirstSearch(startLocation.toCellId(), function (vertex) {
                var cell = goc.level.getCellById(vertex.id);
                if (traversedCells) {
                    traversedCells[vertex.id] = cell;
                }

                var distance = goc.level.floydWarshall.getPathDistance(startLocation.toCellId(), vertex.id);

                if (cell.dotType === _Dot2.default.LITTLE) {
                    score += this.getDiscountedHeuristic(distance, this.littleDotValue);
                } else if (cell.dotType === _Dot2.default.BIG) {
                    score += this.getDiscountedHeuristic(distance, this.bigDotValue);
                }

                if (cell.location.equals(goc.ghostRed.location)) {
                    score += this.getGhostHeuristic(distance, goc.ghostRed, goc);
                }

                if (cell.location.equals(goc.ghostBlue.location)) {
                    score += this.getGhostHeuristic(distance, goc.ghostBlue, goc);
                }

                if (cell.location.equals(goc.ghostOrange.location)) {
                    score += this.getGhostHeuristic(distance, goc.ghostOrange, goc);
                }

                if (cell.location.equals(goc.ghostPink.location)) {
                    score += this.getGhostHeuristic(distance, goc.ghostPink, goc);
                }

                if (cell.location.equals(goc.powerUp.location)) {
                    score += this.getDiscountedHeuristic(distance, goc.powerUp.powerUpValue);
                }

                if (cell.location.toCellId() in this._visitedCells) {
                    score += this.getDiscountedHeuristic(distance, this.unvisitedCellValue);
                }
            }.bind(this), [goc.player.location.toCellId()], this._searchDepth);

            return score;
        }
    }, {
        key: "getHeuristicFromPlayerMovedInDirection",
        value: function getHeuristicFromPlayerMovedInDirection(goc, theDirection) {
            var traversedCells = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var playerLocation = goc.player.location;
            var playerCell = goc.level.getCellByLocation(playerLocation);
            var location = playerLocation.clone().moveInDirection(theDirection, goc.level.height, goc.level.width);
            var currentCell = goc.level.getCellByLocation(location);

            if (playerCell.canTraverseTo(currentCell, goc.level.width, goc.level.height)) {
                return this.getHeuristic(goc, location, traversedCells);
            }

            return null;
        }
    }, {
        key: "getBinnedHeuristics",
        value: function getBinnedHeuristics(heuristics, minValue, maxValue) {
            return _lodash2.default.map(heuristics, function (h) {
                if (h === null) {
                    if (num_bins <= 10) {
                        return "0";
                    }

                    return "00";
                }

                // This should leave us with numbers between (0..1]
                var scaledValueDenominator = -1 * minValue + maxValue;
                var scaledValue = 1 / num_bins;

                if (scaledValueDenominator !== 0) {
                    scaledValue = (h + -1 * minValue) / scaledValueDenominator;
                }

                if (scaledValue >= 1) {
                    scaledValue = 0.9999;
                }
                if (scaledValue < 1 / num_bins) {
                    scaledValue = 1 / num_bins;
                }

                var toRet = Math.floor(num_bins * scaledValue).toString(); // This should return a number between (0..numBins]
                if (num_bins > 10 && toRet < 10) {
                    return "0" + toRet.toString();
                }

                return toRet.toString();
            });
        }

        /**
         *
         * @param goc GameObjectContainer
         */

    }, {
        key: "getStateNumber",
        value: function getStateNumber(goc) {
            this._visitedCells[goc.player.location.toCellId()] = true;

            var traversedCells = {};
            var topHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, _Direction2.default.UP, traversedCells);
            var leftHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, _Direction2.default.LEFT, traversedCells);
            var rightHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, _Direction2.default.RIGHT, traversedCells);
            var bottomHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, _Direction2.default.DOWN, traversedCells);

            this._highlightTraversedCells(traversedCells);

            var heuristics = [topHeuristic, leftHeuristic, rightHeuristic, bottomHeuristic];

            var filteredHeuristics = _lodash2.default.filter(heuristics, function (h) {
                return h !== null;
            });
            if (filteredHeuristics.length <= 0) {
                return 0; // Hmmmmmmm
            }

            var minValue = Math.min.apply(Math, _toConsumableArray(filteredHeuristics));
            var maxValue = Math.max.apply(Math, _toConsumableArray(filteredHeuristics));

            this._globalMin = Math.min(minValue, this._globalMin);
            this._globalMax = Math.max(maxValue, this._globalMax);

            var binnedHeuristics = this.getBinnedHeuristics(heuristics, minValue, maxValue);

            var toConvert = binnedHeuristics.join("");
            var toRet = _ConvertBase2.default.convert(toConvert).from(num_bins).to(10);
            return parseInt(toRet, 10);
        }
    }, {
        key: "mapIndexToDirection",
        value: function mapIndexToDirection(index) {
            var theDirection = null;

            switch (index) {
                case 0:
                    theDirection = _Direction2.default.UP;
                    break;
                case 1:
                    theDirection = _Direction2.default.LEFT;
                    break;
                case 2:
                    theDirection = _Direction2.default.RIGHT;
                    break;
                case 3:
                    theDirection = _Direction2.default.DOWN;
                    break;
                default:
                    throw new Error("Unknown direction");
            }

            return theDirection;
        }
    }, {
        key: "getDirection",
        value: function getDirection(goc, stateNumber) {
            // let stateNumber = this.getStateNumber(goc);
            var theString = stateNumber.toString();

            while (theString.length < 4) {
                theString = "0" + theString;
            }

            var theArray = theString.split("").map(function (item) {
                return parseInt(item, 10);
            });

            var maxIndex = _MathUtil2.default.argMax(theArray);
            return this.mapIndexToDirection(maxIndex);
        }
    }, {
        key: "_findDirectionNotPrev",
        value: function _findDirectionNotPrev(theArray, player) {
            var theDirection = _Direction2.default.NONE;

            while (theDirection === _Direction2.default.NONE) {
                var maxIndex = _MathUtil2.default.argMax(theArray);

                switch (maxIndex) {
                    case 0:
                        theDirection = _Direction2.default.UP;
                        break;
                    case 1:
                        theDirection = _Direction2.default.LEFT;
                        break;
                    case 2:
                        theDirection = _Direction2.default.RIGHT;
                        break;
                    case 3:
                        theDirection = _Direction2.default.DOWN;
                        break;
                    default:
                        throw new Error("Unknown direction");
                }

                if (!!this._prevLocation && player.location.clone().moveInDirection(theDirection).equals(this._prevLocation)) {
                    theDirection = _Direction2.default.NONE;
                    theArray[maxIndex] = 0;
                }
            }

            this._prevLocation = player.location.clone();

            return theDirection;
        }
    }, {
        key: "_highlightTraversedCells",
        value: function _highlightTraversedCells(traversedCells) {
            if (this._prevTraversedCells) {
                for (var cellId in this._prevTraversedCells) {
                    if (this._prevTraversedCells.hasOwnProperty(cellId)) {
                        this._prevTraversedCells[cellId].highlighted = false;
                    }
                }
            }

            for (var _cellId in traversedCells) {
                if (traversedCells.hasOwnProperty(_cellId)) {
                    traversedCells[_cellId].highlighted = true;
                }
            }

            this._prevTraversedCells = traversedCells;
        }
    }, {
        key: "searchDepth",
        get: function get() {
            return this._searchDepth;
        }
    }, {
        key: "deathValue",
        get: function get() {
            return this._deathValue;
        }
    }, {
        key: "littleDotValue",
        get: function get() {
            return this._littleDotValue;
        }
    }, {
        key: "bigDotValue",
        get: function get() {
            return this._bigDotValue;
        }
    }, {
        key: "unvisitedCellValue",
        get: function get() {
            return this._unvisitedCellValue;
        }
    }], [{
        key: "convertToDetailString",
        value: function convertToDetailString(stateNum) {
            var tempStr = stateNum.toString();

            while (tempStr.length < 4) {
                tempStr = "0" + tempStr;
            }

            var theArray = tempStr.split("");

            return "top: " + theArray[0] + ", left: " + theArray[1] + ", right: " + theArray[2] + ", bottom: " + theArray[3];
        }
    }]);

    return StateHelper;
}();

StateHelper._numStates = null;
exports.default = StateHelper;