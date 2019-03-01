"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Cell = require("../model/Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _Cell3 = require("../Cell");

var _Cell4 = _interopRequireDefault(_Cell3);

var _BorderType = require("../model/BorderType");

var _BorderType2 = _interopRequireDefault(_BorderType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellTest = function (_Component) {
    _inherits(CellTest, _Component);

    function CellTest(props) {
        _classCallCheck(this, CellTest);

        var _this = _possibleConstructorReturn(this, (CellTest.__proto__ || Object.getPrototypeOf(CellTest)).call(this, props));

        _this.state = {
            cell: new _Cell2.default("1_1")
        };
        return _this;
    }

    _createClass(CellTest, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "table",
                { style: { backgroundColor: "black" } },
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
                                "table",
                                null,
                                _react2.default.createElement(
                                    "tbody",
                                    null,
                                    _react2.default.createElement(
                                        "tr",
                                        null,
                                        _react2.default.createElement(_Cell4.default, { dataSource: this.state.cell })
                                    )
                                )
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
                                { onClick: function onClick(e) {
                                        return _this2.state.cell.toggleBorder(_BorderType2.default.LEFT);
                                    } },
                                "Toggle Left Border"
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
                                { onClick: function onClick(e) {
                                        return _this2.state.cell.toggleBorder(_BorderType2.default.TOP);
                                    } },
                                "Toggle Top Border"
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
                                { onClick: function onClick(e) {
                                        return _this2.state.cell.toggleBorder(_BorderType2.default.RIGHT);
                                    } },
                                "Toggle Right Border"
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
                                { onClick: function onClick(e) {
                                        return _this2.state.cell.toggleBorder(_BorderType2.default.BOTTOM);
                                    } },
                                "Toggle Bottom Border"
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
                                { onClick: function onClick(e) {
                                        return _this2.state.cell.toggleDot();
                                    } },
                                "Toggle Dot"
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
                                { onClick: function onClick(e) {
                                        return _this2.state.cell.toggleIsActive();
                                    } },
                                "Toggle IsActive"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CellTest;
}(_react.Component);

exports.default = CellTest;