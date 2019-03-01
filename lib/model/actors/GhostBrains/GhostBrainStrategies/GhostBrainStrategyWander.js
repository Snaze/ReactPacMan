"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GhostBrainStrategyWander = function () {
    function GhostBrainStrategyWander() {
        _classCallCheck(this, GhostBrainStrategyWander);

        this._destinationLocation = null;
    }

    _createClass(GhostBrainStrategyWander, [{
        key: "resetDestination",
        value: function resetDestination(ghost, player, level) {
            this._destinationLocation = GhostBrainStrategyWander._getRandomLocation(ghost.location, level);
        }
    }, {
        key: "getNextDirection",
        value: function getNextDirection(ghost, player, level) {
            if (this._destinationLocation === null) {
                this._destinationLocation = ghost.location;
            }

            if (this._destinationLocation.equals(ghost.location) || ghost.prevLocation.equals(ghost.location)) {
                // THIS CHECK HERE IS SO THEY DONT GET STUCK ON PARTIAL BORDER
                // this._destinationLocation = GhostBrainStrategyWander._getRandomLocation(ghost.location, level);
                this.resetDestination(ghost, player, level);
            }

            var fromCellId = ghost.location.toCellId();
            var toCellId = this._destinationLocation.toCellId();

            return level.floydWarshall.getDirection(fromCellId, toCellId);
        }
    }, {
        key: "cellTransitionDurationMax",
        get: function get() {
            return 0.225;
        }
    }, {
        key: "cellTransitionDurationMin",
        get: function get() {
            return 0.15;
        }
    }, {
        key: "destinationLocation",
        get: function get() {
            return this._destinationLocation;
        },
        set: function set(value) {
            this._destinationLocation = value;
        }
    }], [{
        key: "_getRandomLocation",
        value: function _getRandomLocation(currentLocation, level) {
            var toRet = currentLocation;

            while (toRet.equals(currentLocation)) {
                toRet = level.getRandomActiveCellLocation();
            }

            return toRet;
        }
    }]);

    return GhostBrainStrategyWander;
}();

exports.default = GhostBrainStrategyWander;