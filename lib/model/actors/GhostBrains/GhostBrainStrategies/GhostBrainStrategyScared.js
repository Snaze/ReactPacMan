"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("../../../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var direction_array = [_Direction2.default.LEFT, _Direction2.default.UP, _Direction2.default.RIGHT, _Direction2.default.DOWN];

var GhostBrainStrategyScared = function () {
    function GhostBrainStrategyScared() {
        _classCallCheck(this, GhostBrainStrategyScared);

        this._avoidPrevLocPercent = 0.90;
    }

    _createClass(GhostBrainStrategyScared, [{
        key: "getNextDirection",
        value: function getNextDirection(ghost, player, level) {
            var leftDistance = this.getNewDistance(_Direction2.default.LEFT, ghost, player.location, level);
            var upDistance = this.getNewDistance(_Direction2.default.UP, ghost, player.location, level);
            var rightDistance = this.getNewDistance(_Direction2.default.RIGHT, ghost, player.location, level);
            var downDistance = this.getNewDistance(_Direction2.default.DOWN, ghost, player.location, level);

            var theArray = [leftDistance, upDistance, rightDistance, downDistance];
            var maxValue = Math.max.apply(Math, theArray);
            var indicesWithMax = this.indicesWithValue(theArray, maxValue);
            var randomIndex = indicesWithMax[Math.floor(Math.random() * indicesWithMax.length)];

            var toRet = direction_array[randomIndex];
            if (typeof toRet === "undefined") {
                throw new Error("the next direction cannot be undefined");
            }
            return toRet;
        }
    }, {
        key: "indicesWithValue",
        value: function indicesWithValue(theArray, value) {
            var toRet = [];

            theArray.forEach(function (item, index) {
                if (item === value) {
                    toRet.push(index);
                }
            });

            return toRet;
        }
    }, {
        key: "argmax",
        value: function argmax(theArray) {
            var theMaxIndex = -1;
            var theMax = Number.NEGATIVE_INFINITY;

            theArray.forEach(function (item, i) {
                if (item > theMax) {
                    theMax = item;
                    theMaxIndex = i;
                }
            });

            return theMaxIndex;
        }
    }, {
        key: "getNewDistance",
        value: function getNewDistance(direction, ghost, playerLocation, level) {
            var ghostLocation = ghost.location.clone();

            if (ghost.canMoveInDirection(ghostLocation, direction)) {
                ghostLocation.moveInDirection(direction, level.height, level.width);
                if (ghostLocation.equals(ghost.prevLocation) && Math.random() < this._avoidPrevLocPercent) {
                    return 0;
                }

                // return ghostLocation.distance(playerLocation);
                var toRet = level.floydWarshall.getPathDistance(ghostLocation.toCellId(), playerLocation.toCellId());
                if (typeof toRet === "undefined") {
                    return 0;
                }

                return toRet;
            }

            return 0;
        }
    }, {
        key: "cellTransitionDurationMax",
        get: function get() {
            return 0.8;
        }
    }, {
        key: "cellTransitionDurationMin",
        get: function get() {
            return 0.6;
        }
    }]);

    return GhostBrainStrategyScared;
}();

exports.default = GhostBrainStrategyScared;