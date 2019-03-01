"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Border = require("./Border");

var _Border2 = _interopRequireDefault(_Border);

var _BorderType = require("./BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

var _Dot = require("./Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_DataSourceBase) {
    _inherits(Cell, _DataSourceBase);

    function Cell(id) {
        _classCallCheck(this, Cell);

        var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this));

        _this._id = id;
        _this._solidBorder = _this._wireUp("_solidBorder", new _Border2.default());
        _this._partialBorder = _this._wireUp("_partialBorder", new _Border2.default());

        _this._dotType = _Dot2.default.NONE;
        _this._selected = false;

        _this._isPlayerSpawn = false;
        _this._isGhostRedSpawn = false;
        _this._isGhostPinkSpawn = false;
        _this._isGhostBlueSpawn = false;
        _this._isGhostOrangeSpawn = false;
        _this._isActive = true;

        var tempArray = _this._id.split("_");
        var x = parseInt(tempArray[1], 10);
        var y = parseInt(tempArray[0], 10);
        _this._location = _this._wireUp("_location", new _Location2.default(x, y));
        _this._editMode = false;
        _this._blinkBorder = false;
        _this._highlighted = false;
        return _this;
    }

    _createClass(Cell, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                _id: this._id,
                _solidBorder: this._solidBorder.toJSON(),
                _partialBorder: this._partialBorder.toJSON(),
                _dotType: this._dotType,
                _selected: this._selected,
                _isPlayerSpawn: this._isPlayerSpawn,
                _isGhostRedSpawn: this._isGhostRedSpawn,
                _isGhostPinkSpawn: this._isGhostPinkSpawn,
                _isGhostBlueSpawn: this._isGhostBlueSpawn,
                _isGhostOrangeSpawn: this._isGhostOrangeSpawn,
                _isActive: this._isActive,
                _location: this._location.toJSON()
            };
        }
    }, {
        key: "clone",
        value: function clone(theId) {
            var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "none";

            var toRet = new Cell(theId);

            toRet._solidBorder = this._solidBorder.clone(direction);
            toRet._partialBorder = this._partialBorder.clone(direction);
            toRet._dotType = this._dotType;
            toRet._selected = this._selected;
            toRet._isPlayerSpawn = this._isPlayerSpawn;
            toRet._isGhostRedSpawn = this._isGhostRedSpawn;
            toRet._isGhostPinkSpawn = this._isGhostPinkSpawn;
            toRet._isGhostBlueSpawn = this._isGhostBlueSpawn;
            toRet._isGhostOrangeSpawn = this._isGhostOrangeSpawn;
            toRet._isActive = this._isActive;
            toRet._location = this._location.clone();
            toRet._editMode = this._editMode;
            toRet._blinkBorder = this._blinkBorder;

            // I'LL LEAVE IT AS THE RESPONSIBLITY OF THE CALLER TO RE-ASSIGN
            // THE EVENT HANDLERS

            return toRet;
        }
    }, {
        key: "setAllSpawnValuesFalse",
        value: function setAllSpawnValuesFalse() {
            var fromProperty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";


            if (fromProperty !== "isPlayerSpawn") {
                this.isPlayerSpawn = false;
            }

            if (fromProperty !== "isGhostBlueSpawn") {
                this.isGhostBlueSpawn = false;
            }

            if (fromProperty !== "isGhostOrangeSpawn") {
                this.isGhostOrangeSpawn = false;
            }

            if (fromProperty !== "isGhostPinkSpawn") {
                this.isGhostPinkSpawn = false;
            }

            if (fromProperty !== "isGhostRedSpawn") {
                this.isGhostRedSpawn = false;
            }
        }
    }, {
        key: "equals",
        value: function equals(otherCell) {
            return this.id === otherCell.id && this._solidBorder.equals(otherCell._solidBorder) && this._partialBorder.equals(otherCell._partialBorder) && this.dotType === otherCell.dotType && this._selected === otherCell._selected && this._isPlayerSpawn === otherCell._isPlayerSpawn && this._isGhostRedSpawn === otherCell._isGhostRedSpawn && this._isGhostPinkSpawn === otherCell._isGhostPinkSpawn && this._isGhostBlueSpawn === otherCell._isGhostBlueSpawn && this._isActive === otherCell._isActive && this._location.equals(otherCell.location) && this.blinkBorder === otherCell.blinkBorder;
        }
    }, {
        key: "setSolidBorder",
        value: function setSolidBorder(borderType, value) {

            if (!_BorderType2.default.isValid(borderType)) {
                throw new Error("Invalid Border Type");
            }

            this._solidBorder[borderType] = !!value;
        }
    }, {
        key: "getSolidBorder",
        value: function getSolidBorder(borderType) {

            if (!_BorderType2.default.isValid(borderType)) {
                throw new Error("Invalid Border Type");
            }

            return this._solidBorder[borderType];
        }
    }, {
        key: "setPartialBorder",
        value: function setPartialBorder(borderType, value) {

            if (!_BorderType2.default.isValid(borderType)) {
                throw new Error("Invalid Border Type");
            }

            this._partialBorder[borderType] = !!value;
        }
    }, {
        key: "getPartialBorder",
        value: function getPartialBorder(borderType) {

            if (!_BorderType2.default.isValid(borderType)) {
                throw new Error("Invalid Border Type");
            }

            return this._partialBorder[borderType];
        }
    }, {
        key: "toggleBorder",
        value: function toggleBorder(borderType) {
            if (!_BorderType2.default.isValid(borderType)) {
                throw new Error("Invalid border type");
            }

            if (!this._solidBorder[borderType] && !this._partialBorder[borderType]) {
                this._solidBorder[borderType] = true;
                this._partialBorder[borderType] = false;
            } else if (this._solidBorder[borderType] && !this._partialBorder[borderType]) {
                this._solidBorder[borderType] = false;
                this._partialBorder[borderType] = true;
            } else if (!this._solidBorder[borderType] && this._partialBorder[borderType]) {
                this._solidBorder[borderType] = false;
                this._partialBorder[borderType] = false;
            }
        }
    }, {
        key: "toggleIsActive",
        value: function toggleIsActive() {
            this.isActive = !this.isActive;
        }
    }, {
        key: "toggleDot",
        value: function toggleDot() {
            if (this.dotType === _Dot2.default.NONE) {
                this.dotType = _Dot2.default.LITTLE;
            } else if (this._dotType === _Dot2.default.LITTLE) {
                this.dotType = _Dot2.default.BIG;
            } else if (this._dotType === _Dot2.default.BIG) {
                this.dotType = _Dot2.default.NONE;
            }
        }
    }, {
        key: "canTraverseTo",
        value: function canTraverseTo(otherCell, maxWidth, maxHeight) {
            var checkPartial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (this.location.isAbove(otherCell.location, maxHeight)) {
                if (!checkPartial) {
                    return !this.solidBorder.bottom;
                }

                return !this.solidBorder.bottom && !this.partialBorder.bottom;
            }

            if (this.location.isRightOf(otherCell.location, maxWidth)) {
                if (!checkPartial) {
                    return !this.solidBorder.left;
                }

                return !this.solidBorder.left && !this.partialBorder.left;
            }

            if (this.location.isLeftOf(otherCell.location, maxWidth)) {
                if (!checkPartial) {
                    return !this.solidBorder.right;
                }

                return !this.solidBorder.right && !this.partialBorder.right;
            }

            if (this.location.isBelow(otherCell.location, maxHeight)) {
                if (!checkPartial) {
                    return !this.solidBorder.top;
                }

                return !this.solidBorder.top && !this.partialBorder.top;
            }

            return false;
        }
    }, {
        key: "isTeleportCell",
        value: function isTeleportCell(width, height) {
            if (!this.solidBorder.top && !this.partialBorder.top && this.location.y === 0) {
                return true;
            }

            if (!this.solidBorder.left && !this.partialBorder.left && this.location.x === 0) {
                return true;
            }

            if (!this.solidBorder.bottom && !this.partialBorder.bottom && this.location.y === height - 1) {
                return true;
            }

            if (!this.solidBorder.right && !this.partialBorder.right && this.location.x === width - 1) {
                return true;
            }

            return false;
        }

        /**
         * This will return a 9-bit binary string representing the following:
         * 2^8 = Cell has power up (to be filled in upstream - will always be 0 here)
         * 2^7 = Cell has player (to be filled in upstream - will always be 0 here)
         * 2^6 = Cell has Ghost (to be filled in upstream - will always be 0 here)
         * 2^5 = Cell has big dot
         * 2^4 = Cell has little dot
         * 2^3 = Cell has solid left border
         * 2^2 = Cell has solid top border
         * 2^1 = Cell has solid right border
         * 2^0 = Cell has solid bottom border
         */

    }, {
        key: "toBinary",
        value: function toBinary() {
            var toRet = "000";

            if (this.dotType === _Dot2.default.BIG) {
                toRet += "1";
            } else {
                toRet += "0";
            }

            if (this.dotType === _Dot2.default.LITTLE) {
                toRet += "1";
            } else {
                toRet += "0";
            }

            if (this.solidBorder.left) {
                toRet += "1";
            } else {
                toRet += "0";
            }

            if (this.solidBorder.top) {
                toRet += "1";
            } else {
                toRet += "0";
            }

            if (this.solidBorder.right) {
                toRet += "1";
            } else {
                toRet += "0";
            }

            if (this.solidBorder.bottom) {
                toRet += "1";
            } else {
                toRet += "0";
            }

            return toRet;
        }
    }, {
        key: "isPlayerSpawn",
        get: function get() {
            return this._isPlayerSpawn;
        },
        set: function set(value) {
            if (value) {
                this.setAllSpawnValuesFalse("isPlayerSpawn");
            }

            this._setValueAndRaiseOnChange("_isPlayerSpawn", value);
        }
    }, {
        key: "isGhostRedSpawn",
        get: function get() {
            return this._isGhostRedSpawn;
        },
        set: function set(value) {
            if (value) {
                this.setAllSpawnValuesFalse("isGhostRedSpawn");
            }

            this._setValueAndRaiseOnChange("_isGhostRedSpawn", value);
        }
    }, {
        key: "isGhostPinkSpawn",
        get: function get() {
            return this._isGhostPinkSpawn;
        },
        set: function set(value) {
            if (value) {
                this.setAllSpawnValuesFalse("isGhostPinkSpawn");
            }

            this._setValueAndRaiseOnChange("_isGhostPinkSpawn", value);
        }
    }, {
        key: "isGhostBlueSpawn",
        get: function get() {
            return this._isGhostBlueSpawn;
        },
        set: function set(value) {
            if (value) {
                this.setAllSpawnValuesFalse("isGhostBlueSpawn");
            }

            this._setValueAndRaiseOnChange("_isGhostBlueSpawn", value);
        }
    }, {
        key: "isGhostOrangeSpawn",
        get: function get() {
            return this._isGhostOrangeSpawn;
        },
        set: function set(value) {
            if (value) {
                this.setAllSpawnValuesFalse("isGhostOrangeSpawn");
            }

            this._setValueAndRaiseOnChange("_isGhostOrangeSpawn", value);
        }
    }, {
        key: "isActive",
        get: function get() {
            return this._isActive;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_isActive", value);
        }
    }, {
        key: "selected",
        get: function get() {
            return this._selected;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_selected", value);
        }
    }, {
        key: "solidBorder",
        get: function get() {
            return this._solidBorder;
        }
    }, {
        key: "partialBorder",
        get: function get() {
            return this._partialBorder;
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "dotType",
        get: function get() {
            return this._dotType;
        },
        set: function set(value) {
            if (!_Dot2.default.isValid(value)) {
                throw new Error("Invalid Dot Type");
            }

            this._setValueAndRaiseOnChange("_dotType", value);
        }
    }, {
        key: "hasLittleDot",
        get: function get() {
            return this.dotType === _Dot2.default.LITTLE;
        }
    }, {
        key: "hasBigDot",
        get: function get() {
            return this.dotType === _Dot2.default.BIG;
        }
    }, {
        key: "location",
        get: function get() {
            return this._location;
        }
    }, {
        key: "x",
        get: function get() {
            return this._location.x;
        }
    }, {
        key: "y",
        get: function get() {
            return this._location.y;
        }
    }, {
        key: "editMode",
        get: function get() {
            return this._editMode;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_editMode", value);
        }
    }, {
        key: "blinkBorder",
        get: function get() {
            return this._blinkBorder;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_blinkBorder", value);
        }
    }, {
        key: "highlighted",
        get: function get() {
            return this._highlighted;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_highlighted", value);
        }
    }]);

    return Cell;
}(_DataSourceBase3.default);

exports.default = Cell;