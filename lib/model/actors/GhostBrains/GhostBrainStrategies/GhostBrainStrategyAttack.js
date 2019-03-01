"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GhostBrainStrategyAttack = function () {
    function GhostBrainStrategyAttack() {
        _classCallCheck(this, GhostBrainStrategyAttack);
    }

    _createClass(GhostBrainStrategyAttack, [{
        key: "getNextDirection",
        value: function getNextDirection(ghost, player, level) {

            var fromCellId = ghost.location.toCellId();
            var toCellId = player.location.toCellId();

            return level.floydWarshall.getDirection(fromCellId, toCellId);
        }
    }, {
        key: "cellTransitionDurationMax",
        get: function get() {
            return 0.2;
        }
    }, {
        key: "cellTransitionDurationMin",
        get: function get() {
            return 0.125;
        }
    }, {
        key: "attackExpirationDuration",
        get: function get() {
            return 3.0;
        }
    }]);

    return GhostBrainStrategyAttack;
}();

exports.default = GhostBrainStrategyAttack;