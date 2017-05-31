
class GhostBrainStrategyWander {

    constructor() {
        this._destinationLocation = null;
    }

    static _getRandomLocation(currentLocation, level) {
        let toRet = currentLocation;

        while (toRet.equals(currentLocation)) {
            toRet = level.getRandomActiveCellLocation();
        }

        return toRet;
    }

    getNextDirection(ghost, player, level) {
        if (this._destinationLocation === null)  {
            this._destinationLocation = ghost.location;
        }

        if (this._destinationLocation.equals(ghost.location)) {
            this._destinationLocation = GhostBrainStrategyWander._getRandomLocation(ghost.location, level);
        }

        let fromCellId = ghost.location.toCellId();
        let toCellId = this._destinationLocation.toCellId();

        return level.floydWarshall.getDirection(fromCellId, toCellId);
    }

    get cellTransitionDuration() {
        return 0.3;
    }

    get destinationLocation() {
        return this._destinationLocation;
    }

    set destinationLocation(value) {
        this._destinationLocation = value;
    }
}

export default GhostBrainStrategyWander;