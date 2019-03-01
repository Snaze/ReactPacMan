"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _LevelFactory = require("../model/LevelFactory");

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelTest = function (_Component) {
    _inherits(LevelTest, _Component);

    function LevelTest(props) {
        _classCallCheck(this, LevelTest);

        var _this = _possibleConstructorReturn(this, (LevelTest.__proto__ || Object.getPrototypeOf(LevelTest)).call(this, props));

        _this.state = {
            level: _LevelFactory2.default.createLevel("level2")
        };
        return _this;
    }

    _createClass(LevelTest, [{
        key: "render",
        value: function render() {
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
                                        _react2.default.createElement(
                                            "td",
                                            null,
                                            _react2.default.createElement(_Level2.default, { dataSource: this.state.level })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("td", null)
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("td", null)
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("td", null)
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("td", null)
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("td", null)
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement("td", null)
                    )
                )
            );
        }
    }]);

    return LevelTest;
}(_react.Component);

exports.default = LevelTest;