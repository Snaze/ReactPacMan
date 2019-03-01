"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./LevelEditPanel.css");

var _Level = require("./model/Level");

var _Level2 = _interopRequireDefault(_Level);

var _DataSourceComponent2 = require("./DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelEditPanel = function (_DataSourceComponent) {
    _inherits(LevelEditPanel, _DataSourceComponent);

    function LevelEditPanel(props) {
        _classCallCheck(this, LevelEditPanel);

        var _this = _possibleConstructorReturn(this, (LevelEditPanel.__proto__ || Object.getPrototypeOf(LevelEditPanel)).call(this, props));

        _this.state.textAreaValue = '';
        return _this;
    }

    _createClass(LevelEditPanel, [{
        key: "onFormEvent",
        value: function onFormEvent(e) {
            var theLevel = this.level;

            switch (e.target.id) {
                case "btnSubRow":
                    theLevel.removeRow();
                    break;
                case "btnAddRow":
                    theLevel.addRow();
                    break;
                case "btnSubCol":
                    theLevel.removeColumn();
                    break;
                case "btnAddCol":
                    theLevel.addColumn();
                    break;
                case "btnLoad":
                    theLevel = _Level2.default.fromJSON(JSON.parse(this.state.textAreaValue));

                    this.props.onLoadComplete(theLevel);
                    break;
                case "btnSave":
                    theLevel.regeneratePaths();
                    var newTextAreaValue = JSON.stringify(theLevel.toJSON());
                    var newState = {
                        textAreaValue: newTextAreaValue
                    };
                    this.setState(newState);
                    break;
                case "txtData":
                    break;
                case "btnMirrorHorizontal":
                    theLevel.mirrorHorizontally();
                    break;
                case "btnMirrorVertical":
                    theLevel.mirrorVertically();
                    break;
                case "ddlColor":
                    theLevel.color = parseInt(e.target.value, 10);
                    break;
                default:
                    throw new Error("Unknown ID");
            }
        }
    }, {
        key: "onTextAreaChange",
        value: function onTextAreaChange(e) {
            this.setState({
                textAreaValue: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "table",
                { className: "LevelEditPanel", onClick: function onClick(e) {
                        return _this2.onFormEvent(e);
                    } },
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                                "button",
                                { id: "btnSubRow", className: "LevelEditButton" },
                                "-"
                            )
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            this.level.height,
                            " Row",
                            this.level.height !== 1 ? "s" : ""
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                                "button",
                                { id: "btnAddRow", className: "LevelEditButton" },
                                "+"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                                "button",
                                { id: "btnSubCol", className: "LevelEditButton" },
                                "-"
                            )
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            this.level.width,
                            " Col",
                            this.level.width !== 1 ? "s" : ""
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                                "button",
                                { id: "btnAddCol", className: "LevelEditButton" },
                                "+"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: 3 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: 1, style: { textAlign: "right" } },
                            "Color:"
                        ),
                        _react2.default.createElement(
                            "td",
                            { colSpan: 2 },
                            _react2.default.createElement(
                                "select",
                                { id: "ddlColor", value: this.level.color, onChange: function onChange(e) {
                                        return _this2.onFormEvent(e);
                                    } },
                                _react2.default.createElement(
                                    "option",
                                    { value: "0" },
                                    "Classic Blue"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "1" },
                                    "Pink"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "2" },
                                    "Aqua"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "3" },
                                    "Orange"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "4" },
                                    "Purple"
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: 3 },
                            _react2.default.createElement("hr", null)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: 3 },
                            _react2.default.createElement(
                                "button",
                                { id: "btnLoad", className: "LevelEditButton" },
                                "Load"
                            ),
                            _react2.default.createElement(
                                "button",
                                { id: "btnSave", className: "LevelEditButton" },
                                "Save"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: 3 },
                            _react2.default.createElement(
                                "button",
                                { id: "btnMirrorHorizontal", className: "LevelEditButton" },
                                "Mirror Horizontal"
                            ),
                            _react2.default.createElement(
                                "button",
                                { id: "btnMirrorVertical", className: "LevelEditButton" },
                                "Mirror Vertical"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: 3 },
                            _react2.default.createElement("textarea", { id: "txtData",
                                rows: "16",
                                cols: "30",
                                value: this.state.textAreaValue,
                                onChange: function onChange(e) {
                                    return _this2.onTextAreaChange(e);
                                } })
                        )
                    )
                )
            );
        }
    }, {
        key: "level",
        get: function get() {
            return this.dataSource;
        }
    }]);

    return LevelEditPanel;
}(_DataSourceComponent3.default);

LevelEditPanel.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Level2.default).isRequired,
    onLoadComplete: _propTypes2.default.func.isRequired
};

exports.default = LevelEditPanel;