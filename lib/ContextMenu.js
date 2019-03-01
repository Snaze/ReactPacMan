"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./ContextMenu.css");

var _Dot = require("./model/Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _KeyEventer = require("./utils/KeyEventer");

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

var _BorderType = require("./model/BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

var _DataSourceComponent2 = require("./DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _Cell = require("./model/Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Entity = require("./Entity");

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = function (_DataSourceComponent) {
    _inherits(ContextMenu, _DataSourceComponent);

    function ContextMenu(props) {
        _classCallCheck(this, ContextMenu);

        var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

        _this.state.dummyCell = new _Cell2.default("-1_-1");
        _this._onKeyDownRef = function (e) {
            return _this.onKeyDown(e);
        };
        _this._onKeyUpRef = function (e) {
            return _this.onKeyUp(e);
        };
        // this.debug = true;
        return _this;
    }

    _createClass(ContextMenu, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            _get(ContextMenu.prototype.__proto__ || Object.getPrototypeOf(ContextMenu.prototype), "componentWillReceiveProps", this).call(this, nextProps);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            _get(ContextMenu.prototype.__proto__ || Object.getPrototypeOf(ContextMenu.prototype), "componentDidMount", this).call(this);

            _KeyEventer2.default.instance.addCallback(this._onKeyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
            _KeyEventer2.default.instance.addCallback(this._onKeyUpRef, _KeyEventer2.default.CALLBACK_KEYUP);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _get(ContextMenu.prototype.__proto__ || Object.getPrototypeOf(ContextMenu.prototype), "componentWillUnmount", this).call(this);

            _KeyEventer2.default.instance.removeCallback(this._onKeyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
            _KeyEventer2.default.instance.removeCallback(this._onKeyUpRef, _KeyEventer2.default.CALLBACK_KEYUP);
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(key) {
            if (!this.props.editMode) {
                return;
            }

            switch (key) {
                case "ArrowDown":
                case "ArrowUp":
                case "ArrowLeft":
                case "ArrowRight":
                    break;
                case "w":
                case "W":
                    this.cell.toggleBorder(_BorderType2.default.TOP);
                    break;
                case "a":
                case "A":
                    this.cell.toggleBorder(_BorderType2.default.LEFT);
                    break;
                case "s":
                case "S":
                    this.cell.toggleBorder(_BorderType2.default.BOTTOM);
                    break;
                case "d":
                case "D":
                    this.cell.toggleBorder(_BorderType2.default.RIGHT);
                    break;
                case "x":
                case "X":
                    this.cell.toggleIsActive();
                    break;
                case "Q":
                case "q":
                    this.cell.toggleDot();
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(key) {}
    }, {
        key: "onChange",
        value: function onChange(e) {
            // You might be able to move some of this logic back into the ContextMenu
            var element = e.target.dataset["element"];
            var checked = e.target.checked;

            switch (element) {
                case "borderLeft":
                    this.cell.solidBorder.left = checked;
                    if (checked) {
                        this.cell.partialBorder.left = false;
                    }
                    break;
                case "borderRight":
                    this.cell.solidBorder.right = checked;
                    if (checked) {
                        this.cell.partialBorder.right = false;
                    }
                    break;
                case "borderTop":
                    this.cell.solidBorder.top = checked;
                    if (checked) {
                        this.cell.partialBorder.top = false;
                    }
                    break;
                case "borderBottom":
                    this.cell.solidBorder.bottom = checked;
                    if (checked) {
                        this.cell.partialBorder.bottom = false;
                    }
                    break;
                case "partialBorderLeft":
                    this.cell.partialBorder.left = checked;
                    if (checked) {
                        this.cell.solidBorder.left = false;
                    }
                    break;
                case "partialBorderRight":
                    this.cell.partialBorder.right = checked;
                    if (checked) {
                        this.cell.solidBorder.right = false;
                    }
                    break;
                case "partialBorderTop":
                    this.cell.partialBorder.top = checked;
                    if (checked) {
                        this.cell.solidBorder.top = false;
                    }
                    break;
                case "partialBorderBottom":
                    this.cell.partialBorder.bottom = checked;
                    if (checked) {
                        this.cell.solidBorder.bottom = false;
                    }
                    break;
                case "bigDot":
                    if (checked) {
                        this.cell.dotType = _Dot2.default.BIG;
                    } else {
                        this.cell.dotType = _Dot2.default.NONE;
                    }
                    break;
                case "littleDot":
                    if (checked) {
                        this.cell.dotType = _Dot2.default.LITTLE;
                    } else {
                        this.cell.dotType = _Dot2.default.NONE;
                    }
                    break;
                case "isActive":
                    this.cell.isActive = checked;
                    break;
                case "isPlayerSpawn":
                    this.cell.isPlayerSpawn = checked;
                    break;
                case "isGhostRedSpawn":
                    this.cell.isGhostRedSpawn = checked;
                    break;
                case "isGhostPinkSpawn":
                    this.cell.isGhostPinkSpawn = checked;
                    break;
                case "isGhostBlueSpawn":
                    this.cell.isGhostBlueSpawn = checked;
                    break;
                case "isGhostOrangeSpawn":
                    this.cell.isGhostOrangeSpawn = checked;
                    break;
                default:
                    throw new Error("Unknown element name");
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "table",
                { className: "ContextMenu" },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            { colSpan: 2, className: "ContextMenuHeader" },
                            "Cell ",
                            this.cellId
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "borderLeft",
                                checked: this.cell.solidBorder.left,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Border Left (a)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "borderRight",
                                checked: this.cell.solidBorder.right,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Border Right (d)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "borderTop",
                                checked: this.cell.solidBorder.top,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Border Top (w)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "borderBottom",
                                checked: this.cell.solidBorder.bottom,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Border Bottom (s)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft", colSpan: 2 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "partialBorderLeft",
                                checked: this.cell.partialBorder.left,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Partial Border Left (a)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "partialBorderRight",
                                checked: this.cell.partialBorder.right,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Partial Border Right (d)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "partialBorderTop",
                                checked: this.cell.partialBorder.top,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Partial Border Top (w)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "partialBorderBottom",
                                checked: this.cell.partialBorder.bottom,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Partial Border Bottom (s)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft", colSpan: 2 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "bigDot",
                                checked: this.cell.dotType === _Dot2.default.BIG,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Dot Big (q)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "littleDot",
                                checked: this.cell.dotType === _Dot2.default.LITTLE,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Dot Little (q)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft", colSpan: 2 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "isActive",
                                checked: this.cell.isActive,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            "Active (x)"
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft", colSpan: 2 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "isPlayerSpawn",
                                checked: this.cell.isPlayerSpawn,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            _react2.default.createElement(
                                "table",
                                null,
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            "Player Spawn"
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                                                modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                                animating: this.props.animating })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft", colSpan: 2 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "isGhostRedSpawn",
                                checked: this.cell.isGhostRedSpawn,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            _react2.default.createElement(
                                "table",
                                null,
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            "Red Ghost Spawn"
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_RED_GHOST,
                                                modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                                animating: this.props.animating })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "isGhostPinkSpawn",
                                checked: this.cell.isGhostPinkSpawn,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            _react2.default.createElement(
                                "table",
                                null,
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            "Pink Ghost Spawn"
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PINK_GHOST,
                                                modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                                animating: this.props.animating })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "isGhostBlueSpawn",
                                checked: this.cell.isGhostBlueSpawn,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            _react2.default.createElement(
                                "table",
                                null,
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            "Blue Ghost Spawn"
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BLUE_GHOST,
                                                modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                                animating: this.props.animating })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        { className: "ContextMenuRow" },
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellLeft" },
                            _react2.default.createElement("input", { type: "checkbox",
                                "data-element": "isGhostOrangeSpawn",
                                checked: this.cell.isGhostOrangeSpawn,
                                onChange: function onChange(e) {
                                    return _this2.onChange(e);
                                } })
                        ),
                        _react2.default.createElement(
                            "td",
                            { className: "ContextMenuCellRight" },
                            _react2.default.createElement(
                                "table",
                                null,
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            "Orange Ghost Spawn"
                                        ),
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ORANGE_GHOST,
                                                modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                                animating: this.props.animating })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "cell",
        get: function get() {
            if (this.dataSource === null) {
                return this.state.dummyCell;
            }

            return this.dataSource;
        }
    }, {
        key: "cellId",
        get: function get() {
            if (this.cell === null) {
                return "Cell is NULL";
            }

            return this.cell.id;
        }
    }]);

    return ContextMenu;
}(_DataSourceComponent3.default);

ContextMenu.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Cell2.default),
    editMode: _propTypes2.default.bool.isRequired
};

exports.default = ContextMenu;