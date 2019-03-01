"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("../../../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GhostBrainStrategyHoldingPin = function () {
    function GhostBrainStrategyHoldingPin() {
        _classCallCheck(this, GhostBrainStrategyHoldingPin);
    }

    _createClass(GhostBrainStrategyHoldingPin, [{
        key: "getNextDirection",
        value: function getNextDirection(ghost, player, level) {
            // let toRet = ghost.location.clone();
            var randomValue = Math.random();

            if (ghost.location.equals(ghost._spawnLocation)) {
                // YOU ARE AT SPAWN LOCATION

                if (randomValue < 0.33) {
                    return _Direction2.default.DOWN;
                } else if (randomValue < 0.66) {
                    return _Direction2.default.NONE;
                } else {
                    return _Direction2.default.UP;
                }
            } else if (ghost.location.isEqualTo(ghost._spawnLocation.x, ghost._spawnLocation.y + 1)) {
                // YOU ARE AT DOWN LOCATION
                if (randomValue < 0.5) {
                    return _Direction2.default.NONE;
                } else {
                    return _Direction2.default.UP;
                }
            } else {
                // YOU ARE AT UP LOCATION
                if (randomValue < 0.5) {
                    return _Direction2.default.NONE;
                } else {
                    return _Direction2.default.DOWN;
                }
            }

            // throw new Error("You should never get here");
        }
    }, {
        key: "cellTransitionDurationMax",
        get: function get() {
            return 0.3;
        }
    }, {
        key: "cellTransitionDurationMin",
        get: function get() {
            return 0.3;
        }
    }]);

    return GhostBrainStrategyHoldingPin;
}();

exports.default = GhostBrainStrategyHoldingPin;