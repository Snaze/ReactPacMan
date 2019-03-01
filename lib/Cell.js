'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Cell.css');

var _Dot = require('./model/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Location = require('./model/Location');

var _Location2 = _interopRequireDefault(_Location);

var _DataSourceComponent2 = require('./DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _BorderType = require('./model/BorderType');

var _BorderType2 = _interopRequireDefault(_BorderType);

var _Border = require('./model/Border');

var _Border2 = _interopRequireDefault(_Border);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {default as CellModel} from "./model/Cell";


var default_cell_width = 24;
var default_cell_height = 24;

var Cell = function (_DataSourceComponent) {
    _inherits(Cell, _DataSourceComponent);

    _createClass(Cell, null, [{
        key: 'DEFAULT_CELL_WIDTH',
        get: function get() {
            return default_cell_width;
        }
    }, {
        key: 'DEFAULT_CELL_HEIGHT',
        get: function get() {
            return default_cell_height;
        }
    }, {
        key: 'colorNameMap',
        get: function get() {
            if (Cell._colorNameMap === null) {
                Cell._colorNameMap = {};
                Cell._colorNameMap[_Border2.default.COLOR_CLASSIC] = "";
                Cell._colorNameMap[_Border2.default.COLOR_PINK] = "Pink";
                Cell._colorNameMap[_Border2.default.COLOR_AQUA] = "Aqua";
                Cell._colorNameMap[_Border2.default.COLOR_ORANGE] = "Orange";
                Cell._colorNameMap[_Border2.default.COLOR_PURPLE] = "Purple";
            }

            return Cell._colorNameMap;
        }
    }]);

    function Cell(props) {
        _classCallCheck(this, Cell);

        var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));

        _this.state.hover = false;
        return _this;
    }

    _createClass(Cell, [{
        key: 'onMouseEnter',
        value: function onMouseEnter(e) {
            if (!this.cell.editMode) {
                return;
            }

            this.setState({ hover: true });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(e) {
            if (!this.cell.editMode) {
                return;
            }

            this.setState({ hover: false });
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            if (!this.cell.editMode) {
                return;
            }

            this.cell.selected = true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('td', { id: Cell.elementId(this.cell),
                style: this.style,
                className: this.className,
                'data-cell_id': this.cellId,
                key: this.cellId,
                onMouseEnter: function onMouseEnter(e) {
                    return _this2.onMouseEnter(e);
                },
                onMouseLeave: function onMouseLeave(e) {
                    return _this2.onMouseLeave(e);
                },
                onClick: function onClick(e) {
                    return _this2.onClick(e);
                } });
        }
    }, {
        key: 'cell',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'cellId',
        get: function get() {
            return this.cell.id;
        }
    }, {
        key: 'className',
        get: function get() {
            var toRet = "Cell ";

            var self = this;
            var assignBorders = function assignBorders(propName, solidClassName, partialClassName) {
                if (self.cell.solidBorder[propName]) {
                    toRet += solidClassName + Cell.colorNameMap[self.cell.solidBorder.color] + " ";
                } else if (self.cell.partialBorder[propName]) {
                    toRet += partialClassName + " ";
                }
            };

            assignBorders(_BorderType2.default.LEFT, "CellSolidLeftBorder", "CellPartialLeftBorder");
            assignBorders(_BorderType2.default.TOP, "CellSolidTopBorder", "CellPartialTopBorder");
            assignBorders(_BorderType2.default.RIGHT, "CellSolidRightBorder", "CellPartialRightBorder");
            assignBorders(_BorderType2.default.BOTTOM, "CellSolidBottomBorder", "CellPartialBottomBorder");

            if (this.cell.dotType === _Dot2.default.BIG) {
                toRet += "CellBigDot ";
            } else if (this.cell.dotType === _Dot2.default.LITTLE) {
                toRet += "CellLittleDot ";
            }

            if (!this.cell.isActive) {
                if (this.cell.editMode) {
                    toRet += "CellInActive ";
                } else {
                    toRet += "CellBackground" + Cell.colorNameMap[this.cell.solidBorder.color] + " ";
                }
            }

            if (this.state.hover || this.cell.selected || this.cell.highlighted) {
                toRet += "CellSelected ";
            } else {
                toRet += "CellNotSelected ";
            }

            return toRet;
        }
    }, {
        key: 'style',
        get: function get() {
            var toRet = {};

            if (!this.cell.blinkBorder) {
                return toRet;
            }

            var animation = "";

            if (this.cell.solidBorder.top) {
                animation += "CellSolidTopBorderBlinkAnimation 500ms linear infinite, ";
            }

            if (this.cell.solidBorder.left) {
                animation += "CellSolidLeftBorderBlinkAnimation 500ms linear infinite, ";
            }

            if (this.cell.solidBorder.right) {
                animation += "CellSolidRightBorderBlinkAnimation 500ms linear infinite, ";
            }

            if (this.cell.solidBorder.bottom) {
                animation += "CellSolidBottomBorderBlinkAnimation 500ms linear infinite, ";
            }

            if (animation !== "") {
                toRet["animation"] = animation.substr(0, animation.length - 2);
            }

            return toRet;
        }
    }], [{
        key: 'getCellLocation',
        value: function getCellLocation(location) {
            var cellId = Cell.elementIdByLocation(location);

            if (typeof Cell._cellLocationCache[cellId] === 'undefined') {
                var theCellDOMElement = document.getElementById(cellId);
                if (theCellDOMElement) {
                    var clientRect = theCellDOMElement.getBoundingClientRect();
                    var parents = document.getElementsByClassName("LevelRunnerAreaCenter");
                    if (parents.length <= 0) {
                        parents = document.getElementsByClassName("LevelRunnerArea");
                    }
                    var parent = parents[0];
                    var parentRect = parent.getBoundingClientRect();

                    var left = Math.abs(clientRect["left"] - parentRect["left"]) - 2;
                    var top = Math.abs(clientRect["top"] - parentRect["top"]) - 2;

                    Cell._cellLocationCache[cellId] = new _Location2.default(left, top);
                } else {
                    return new _Location2.default(-1, -1);
                }
            }

            return Cell._cellLocationCache[cellId];

            // let cellId = Cell.elementIdByLocation(location);
            // let theCellDOMElement = document.getElementById(cellId);
            // if (theCellDOMElement) {
            //     let clientRect = theCellDOMElement.getBoundingClientRect();
            //     return new LocationModel(clientRect["left"],
            //         clientRect["top"]);
            // }
            //
            // return new LocationModel(-1, -1);
        }
    }, {
        key: 'resetCellLocationCache',
        value: function resetCellLocationCache() {
            Cell._cellLocationCache = {};
        }
    }, {
        key: 'elementId',
        value: function elementId(cell) {
            return "cell_" + cell.id;
        }
    }, {
        key: 'elementIdByLocation',
        value: function elementIdByLocation(location) {
            return "cell_" + location.y + "_" + location.x;
        }
    }]);

    return Cell;
}(_DataSourceComponent3.default);

Cell._colorNameMap = null;
Cell._cellLocationCache = {};


Cell.propTypes = {
    dataSource: _propTypes2.default.object.isRequired
};

exports.default = Cell;