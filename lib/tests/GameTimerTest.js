"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GameTimer = require("../model/GameTimer");

var _GameTimer2 = _interopRequireDefault(_GameTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameTimerTest = function (_Component) {
    _inherits(GameTimerTest, _Component);

    function GameTimerTest(props) {
        _classCallCheck(this, GameTimerTest);

        var _this = _possibleConstructorReturn(this, (GameTimerTest.__proto__ || Object.getPrototypeOf(GameTimerTest)).call(this, props));

        _this._callbackHandle = function (e) {
            return _this.timerCallback(e);
        };

        _this.state = {
            timer: _GameTimer2.default.instance
        };
        return _this;
    }

    _createClass(GameTimerTest, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            _GameTimer2.default.instance.addCallback(this._callbackHandle);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _GameTimer2.default.instance.removeCallback(this._callbackHandle);
        }
    }, {
        key: "timerCallback",
        value: function timerCallback(steps) {
            this.setState({
                timer: _GameTimer2.default.instance
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "table",
                { style: { backgroundColor: "black", color: "white" } },
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            null,
                            "Step Number (250ms) = ",
                            this.state.timer.getStepNumber(_GameTimer2.default.TIME_250MS)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            null,
                            "Step Number (500ms) = ",
                            this.state.timer.getStepNumber(_GameTimer2.default.TIME_500MS)
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            null,
                            "Step Number (1000ms) = ",
                            this.state.timer.getStepNumber(_GameTimer2.default.TIME_1000MS)
                        )
                    )
                )
            );
        }
    }]);

    return GameTimerTest;
}(_react.Component);

exports.default = GameTimerTest;