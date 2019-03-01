"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var border_color_classic = 0;
var border_color_pink = 1;
var border_color_aqua = 2;
var border_color_orange = 3;
var border_color_purple = 4;
var valid_colors = [border_color_classic, border_color_pink, border_color_aqua, border_color_orange, border_color_purple];

var Border = function (_DataSourceBase) {
    _inherits(Border, _DataSourceBase);

    _createClass(Border, null, [{
        key: "COLOR_CLASSIC",
        get: function get() {
            return border_color_classic;
        }
    }, {
        key: "COLOR_PINK",
        get: function get() {
            return border_color_pink;
        }
    }, {
        key: "COLOR_AQUA",
        get: function get() {
            return border_color_aqua;
        }
    }, {
        key: "COLOR_ORANGE",
        get: function get() {
            return border_color_orange;
        }
    }, {
        key: "COLOR_PURPLE",
        get: function get() {
            return border_color_purple;
        }
    }]);

    function Border() {
        var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var bottom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : border_color_classic;

        _classCallCheck(this, Border);

        var _this = _possibleConstructorReturn(this, (Border.__proto__ || Object.getPrototypeOf(Border)).call(this));

        _this._left = left;
        _this._top = top;
        _this._right = right;
        _this._bottom = bottom;
        _this._color = color;
        return _this;
    }

    _createClass(Border, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                _left: this._left,
                _top: this._top,
                _right: this._right,
                _bottom: this._bottom,
                _color: this._color
            };
        }
    }, {
        key: "clone",
        value: function clone() {
            var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "none";

            if (direction === "none") {
                return new Border(this._left, this._top, this._right, this._bottom, this._color);
            }

            if (direction === "horizontal") {
                return new Border(this._right, this._top, this._left, this._bottom, this._color);
            }

            if (direction === "vertical") {
                return new Border(this._left, this._bottom, this._right, this._top, this._color);
            }

            throw new Error("invalid direction found");
        }
    }, {
        key: "equals",
        value: function equals(otherBorder) {
            return this.left === otherBorder.left && this.top === otherBorder.top && this.right === otherBorder.right && this.bottom === otherBorder.bottom && this.color === otherBorder.color;
        }
    }, {
        key: "left",
        set: function set(value) {
            this._setValueAndRaiseOnChange("_left", value);
        },
        get: function get() {
            return this._left;
        }

        // THESE DIRECTION PROPERTIES ARE A HACK TO MAKE THE BorderTypes behave like the Direction class
        // TODO: Consolidate all usages of BorderType into Direction

    }, {
        key: "direction_up",
        set: function set(value) {
            this.top = value;
        },
        get: function get() {
            return this.top;
        }
    }, {
        key: "direction_down",
        set: function set(value) {
            this.bottom = value;
        },
        get: function get() {
            return this.bottom;
        }
    }, {
        key: "direction_left",
        set: function set(value) {
            this.left = value;
        },
        get: function get() {
            return this.left;
        }
    }, {
        key: "direction_right",
        set: function set(value) {
            this.right = value;
        },
        get: function get() {
            return this.right;
        }
    }, {
        key: "top",
        set: function set(value) {
            this._setValueAndRaiseOnChange("_top", value);
        },
        get: function get() {
            return this._top;
        }
    }, {
        key: "right",
        set: function set(value) {
            this._setValueAndRaiseOnChange("_right", value);
        },
        get: function get() {
            return this._right;
        }
    }, {
        key: "bottom",
        set: function set(value) {
            this._setValueAndRaiseOnChange("_bottom", value);
        },
        get: function get() {
            return this._bottom;
        }
    }, {
        key: "color",
        get: function get() {
            return this._color;
        },
        set: function set(value) {
            if (valid_colors.indexOf(value) < 0) {
                throw new Error("Invalid Color");
            }

            this._setValueAndRaiseOnChange("_color", value);
        }
    }]);

    return Border;
}(_DataSourceBase3.default);

exports.default = Border;