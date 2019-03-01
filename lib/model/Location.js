"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Direction = require("../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Location = function (_DataSourceBase) {
    _inherits(Location, _DataSourceBase);

    function Location(x, y) {
        _classCallCheck(this, Location);

        var _this = _possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).call(this));

        _this._x = x;
        _this._y = y;
        _this._cellId = null;
        return _this;
    }

    _createClass(Location, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                _x: this._x,
                _y: this._y
            };
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Location(this.x, this.y);
        }

        // Perhaps this class should be immutable.
        // Let's roll with this and see how it turns out.

    }, {
        key: "set",
        value: function set(x, y) {
            this._cellId = null;
            this.x = x;
            this.y = y;
        }
    }, {
        key: "setWithLocation",
        value: function setWithLocation(otherLocation) {
            this._cellId = null;
            this.x = otherLocation.x;
            this.y = otherLocation.y;
        }
    }, {
        key: "reset",
        value: function reset() {
            this._cellId = null;
            this.x = -1;
            this.y = -1;
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var yFirst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (yFirst) {
                return [this.y, this.x];
            }

            return [this.x, this.y];
        }
    }, {
        key: "toString",
        value: function toString() {
            return "(" + this.x + ", " + this.y + ")";
        }
    }, {
        key: "equals",
        value: function equals(otherLocation) {
            return this.x === otherLocation.x && this.y === otherLocation.y;
        }
    }, {
        key: "isEqualTo",
        value: function isEqualTo(x, y) {
            return this.x === x && this.y === y;
        }
    }, {
        key: "isAbove",
        value: function isAbove(otherLocation) {
            var maxHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (otherLocation.isEqualTo(this.x, this.y + 1)) {
                return true;
            }

            return maxHeight !== null && otherLocation.y === 0 && this.isEqualTo(otherLocation.x, maxHeight - 1);
        }
    }, {
        key: "isLeftOf",
        value: function isLeftOf(otherLocation) {
            var maxWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (otherLocation.isEqualTo(this.x + 1, this.y)) {
                return true;
            }

            return maxWidth !== null && otherLocation.x === 0 && this.isEqualTo(maxWidth - 1, otherLocation.y);
        }
    }, {
        key: "isRightOf",
        value: function isRightOf(otherLocation) {
            var maxWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (otherLocation.isEqualTo(this.x - 1, this.y)) {
                return true;
            }

            return maxWidth !== null && otherLocation.x === maxWidth - 1 && this.isEqualTo(0, otherLocation.y);
        }
    }, {
        key: "isBelow",
        value: function isBelow(otherLocation) {
            var maxHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (otherLocation.isEqualTo(this.x, this.y - 1)) {
                return true;
            }

            return maxHeight !== null && otherLocation.y === maxHeight - 1 && this.isEqualTo(otherLocation.x, 0);
        }
    }, {
        key: "toCellId",
        value: function toCellId() {
            if (this._cellId === null) {
                this._cellId = this.y + "_" + this.x;
            }

            return this._cellId;
            // return this.y + "_" + this.x;
        }
    }, {
        key: "distance",
        value: function distance(otherLocation) {
            return Math.sqrt(Math.pow(this.y - otherLocation.y, 2.0) + Math.pow(this.x - otherLocation.x, 2.0));
        }
    }, {
        key: "manhattanDistance",
        value: function manhattanDistance(otherLocation) {
            return Math.abs(this.y - otherLocation.y) + Math.abs(this.x - otherLocation.x);
        }
    }, {
        key: "moveInDirection",
        value: function moveInDirection(direction, levelHeight, levelWidth) {
            switch (direction) {
                case _Direction2.default.DOWN:
                    if (this.y + 1 < levelHeight) {
                        this.y += 1;
                    } else {
                        this.y = 0;
                    }
                    break;
                case _Direction2.default.UP:
                    if (this.y - 1 >= 0) {
                        this.y -= 1;
                    } else {
                        this.y = levelHeight - 1;
                    }
                    break;
                case _Direction2.default.LEFT:
                    if (this.x - 1 >= 0) {
                        this.x -= 1;
                    } else {
                        this.x = levelWidth - 1;
                    }
                    break;
                case _Direction2.default.RIGHT:
                    if (this.x + 1 < levelWidth) {
                        this.x += 1;
                    } else {
                        this.x = 0;
                    }
                    break;
                case _Direction2.default.NONE:
                    break;
                default:
                    throw new Error("invalid direction");
            }

            return this;
        }
    }, {
        key: "getDelta",
        value: function getDelta(otherLocation) {
            return {
                x: this.x - otherLocation.x,
                y: this.y - otherLocation.y
            };
        }
    }, {
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            this._cellId = null;
            this._setValueAndRaiseOnChange("_x", value);
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            this._cellId = null;
            this._setValueAndRaiseOnChange("_y", value);
        }
    }, {
        key: "isValid",
        get: function get() {
            return this.x >= 0 && this.y >= 0;
        }
    }], [{
        key: "fromIndexArray",
        value: function fromIndexArray(indexArray) {
            var yFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (yFirst) {
                return new Location(indexArray[1], indexArray[0]);
            }

            return new Location(indexArray[0], indexArray[1]);
        }
    }, {
        key: "getDirection",
        value: function getDirection(fromLocation, toLocation) {
            var maxWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var maxHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (fromLocation.isAbove(toLocation, maxHeight)) {
                return _Direction2.default.DOWN;
            }

            if (fromLocation.isLeftOf(toLocation, maxWidth)) {
                return _Direction2.default.RIGHT;
            }

            if (fromLocation.isRightOf(toLocation, maxWidth)) {
                return _Direction2.default.LEFT;
            }

            if (fromLocation.isBelow(toLocation, maxHeight)) {
                return _Direction2.default.UP;
            }

            return _Direction2.default.NONE;
        }
    }]);

    return Location;
}(_DataSourceBase3.default);

exports.default = Location;