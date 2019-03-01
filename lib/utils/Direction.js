"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Consolidate these with the ones in Entity.js and in the Border.js
var up = "direction_up";
var down = "direction_down";
var left = "direction_left";
var right = "direction_right";
var none = "direction_none";
var all = [up, down, left, right, none];

var Direction = function () {
    function Direction() {
        _classCallCheck(this, Direction);
    }

    _createClass(Direction, null, [{
        key: "isValid",
        value: function isValid(value) {
            return all.indexOf(value) > -1;
        }
    }, {
        key: "getOpposite",
        value: function getOpposite(value) {
            if (value === Direction.UP) {
                return Direction.DOWN;
            }

            if (value === Direction.DOWN) {
                return Direction.UP;
            }

            if (value === Direction.LEFT) {
                return Direction.RIGHT;
            }

            if (value === Direction.RIGHT) {
                return Direction.LEFT;
            }

            if (value === Direction.NONE) {
                return Direction.NONE;
            }

            throw new Error("Invalid Direction Entered");
        }
    }, {
        key: "toBinary",
        value: function toBinary(theDirection) {
            if (!Direction.isValid(theDirection)) {
                throw new Error("Invalid direction");
            }

            switch (theDirection) {
                case Direction.LEFT:
                    return "00";
                case Direction.UP:
                    return "01";
                case Direction.RIGHT:
                    return "10";
                case Direction.DOWN:
                    return "11";
                default:
                    // None doesnt need a direction I dont think
                    throw new Error("Invalid direction");
            }
        }
    }, {
        key: "decimalToDirection",
        value: function decimalToDirection(theValue) {
            if (theValue < 0 || theValue >= 4) {
                throw new Error("Invalid value");
            }

            switch (theValue) {
                case 0:
                    return Direction.LEFT;
                case 1:
                    return Direction.UP;
                case 2:
                    return Direction.RIGHT;
                case 3:
                    return Direction.DOWN;
                default:
                    throw new Error("Invalid Value");
            }
        }
    }, {
        key: "directionToDecimal",
        value: function directionToDecimal(theValue) {
            if (theValue < 0 || theValue >= 4) {
                throw new Error("Invalid value");
            }

            switch (theValue) {
                case Direction.LEFT:
                    return 0;
                case Direction.UP:
                    return 1;
                case Direction.RIGHT:
                    return 2;
                case Direction.DOWN:
                    return 3;
                default:
                    throw new Error("Invalid valid");
            }
        }
    }, {
        key: "UP",
        get: function get() {
            return up;
        }
    }, {
        key: "DOWN",
        get: function get() {
            return down;
        }
    }, {
        key: "LEFT",
        get: function get() {
            return left;
        }
    }, {
        key: "RIGHT",
        get: function get() {
            return right;
        }
    }, {
        key: "NONE",
        get: function get() {
            return none;
        }
    }]);

    return Direction;
}();

exports.default = Direction;