import Direction from "../../utils/Direction";
import Dot from "../Dot";
import _ from "../../../node_modules/lodash/lodash";
import ConvertBase from "../../utils/ConvertBase";
import Ghost from "../actors/Ghost";
import GameObjectContainer from "../GameObjectContainer";

const num_bins = 10;

class StateHelper {

    static get NUM_BINS() { return num_bins; }

    constructor(searchDepth=8) {
        this._searchDepth = searchDepth;

        // TODO: Move these values to a common location
        this._deathValue = -1000;
        this._littleDotValue = 10;
        this._bigDotValue = 50;
        this._unvisitedCellValue = 200;
        this._globalMin = Number.POSITIVE_INFINITY;
        this._globalMax = Number.NEGATIVE_INFINITY;
        this._visitedCells = {};
        this._prevTraversedCells = null;
    }

    getGhostHeuristic(distance, ghost) {
        if (ghost.scaredState === Ghost.SCARED_STATE_NOT_SCARED) {
            return this.getDiscountedHeuristic(distance, this.deathValue);
        }

        return this.getDiscountedHeuristic(distance, GameObjectContainer.peekNextKillScore());
    }

    getDiscountedHeuristic(distance, value) {
        return ((this._searchDepth - distance) / this._searchDepth) * value;
        // return value;
    }

    getHeuristic(goc, startLocation, traversedCells=null) {

        let score = 0;

        goc.graph.breadthFirstSearch(startLocation.toCellId(),
            function (vertex) {
                let cell = goc.level.getCellById(vertex.id);
                if (traversedCells) {
                    traversedCells[vertex.id] = cell;
                }

                let distance = cell.location.manhattanDistance(startLocation);

                if (cell.dotType === Dot.LITTLE) {
                    score += this.getDiscountedHeuristic(distance, this.littleDotValue);
                } else if (cell.dotType === Dot.BIG) {
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

            }.bind(this),
            [goc.player.location.toCellId()],
            this._searchDepth);

        return score;
    }

    getHeuristicFromPlayerMovedInDirection(goc, theDirection, traversedCells=null) {
        let playerLocation = goc.player.location;
        let playerCell = goc.level.getCellByLocation(playerLocation);
        let location = playerLocation.clone().moveInDirection(theDirection, goc.level.height, goc.level.width);
        let currentCell = goc.level.getCellByLocation(location);

        if (playerCell.canTraverseTo(currentCell, goc.level.width, goc.level.height)) {
            return this.getHeuristic(goc, location, traversedCells);
        }

        return null;
    }

    getBinnedHeuristics(heuristics, minValue, maxValue) {
        return _.map(heuristics, function (h) {
            if (h === null) {
                if (num_bins <= 10) {
                    return "0";
                }

                return "00";
            }

            // This should leave us with numbers between (0..1]
            let scaledValueDenominator = ((-1 * minValue) + maxValue);
            let scaledValue = (1 / num_bins);

            if (scaledValueDenominator !== 0) {
                scaledValue = (h + (-1 * minValue)) / scaledValueDenominator;
            }

            if (scaledValue >= 1) {
                scaledValue = 0.9999;
            }
            if (scaledValue < (1 / num_bins)) {
                scaledValue = (1 / num_bins);
            }

            let toRet = Math.floor(num_bins * scaledValue).toString(); // This should return a number between (0..numBins]
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
    getStateNumber(goc) {
        this._visitedCells[goc.player.location.toCellId()] = true;

        let traversedCells = {};
        let topHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, Direction.UP, traversedCells);
        let leftHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, Direction.LEFT, traversedCells);
        let rightHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, Direction.RIGHT, traversedCells);
        let bottomHeuristic = this.getHeuristicFromPlayerMovedInDirection(goc, Direction.DOWN, traversedCells);

        this._highlightTraversedCells(traversedCells);

        let heuristics = [
            topHeuristic, leftHeuristic, rightHeuristic, bottomHeuristic
        ];

        let filteredHeuristics = _.filter(heuristics, function (h) { return h !== null; });
        if (filteredHeuristics.length <= 0) {
            return 0; // Hmmmmmmm
        }

        let minValue = Math.min(...filteredHeuristics);
        let maxValue = Math.max(...filteredHeuristics);

        this._globalMin = Math.min(minValue, this._globalMin);
        this._globalMax = Math.max(maxValue, this._globalMax);

        let binnedHeuristics = this.getBinnedHeuristics(heuristics, minValue, maxValue);

        let toConvert = binnedHeuristics.join("");
        let toRet = ConvertBase.convert(toConvert).from(num_bins).to(10);
        return parseInt(toRet, 10);
    }

    _highlightTraversedCells(traversedCells) {
        if (this._prevTraversedCells) {
            for (let cellId in this._prevTraversedCells) {
                if (this._prevTraversedCells.hasOwnProperty(cellId)) {
                    this._prevTraversedCells[cellId].highlighted = false;
                }
            }
        }

        for (let cellId in traversedCells) {
            if (traversedCells.hasOwnProperty(cellId)) {
                traversedCells[cellId].highlighted = true;
            }
        }

        this._prevTraversedCells = traversedCells;
    }

    static convertToDetailString(stateNum) {
        let tempStr = stateNum.toString();

        while (tempStr.length < 4) {
            tempStr = "0" + tempStr;
        }

        let theArray = tempStr.split("");

        return `top: ${theArray[0]}, left: ${theArray[1]}, right: ${theArray[2]}, bottom: ${theArray[3]}`;
    }

    get searchDepth() {
        return this._searchDepth;
    }

    get deathValue() {
        return this._deathValue;
    }

    get littleDotValue() {
        return this._littleDotValue;
    }

    get bigDotValue() {
        return this._bigDotValue;
    }

    get unvisitedCellValue() {
        return this._unvisitedCellValue;
    }
}

export default StateHelper;