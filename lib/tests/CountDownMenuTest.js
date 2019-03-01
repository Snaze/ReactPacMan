"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CountDownMenu = require("../menus/CountDownMenu");

var _CountDownMenu2 = _interopRequireDefault(_CountDownMenu);

var _CountDownMenu3 = require("../model/menus/CountDownMenu");

var _CountDownMenu4 = _interopRequireDefault(_CountDownMenu3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountDownMenuTest = function (_Component) {
    _inherits(CountDownMenuTest, _Component);

    function CountDownMenuTest(props) {
        _classCallCheck(this, CountDownMenuTest);

        var _this = _possibleConstructorReturn(this, (CountDownMenuTest.__proto__ || Object.getPrototypeOf(CountDownMenuTest)).call(this, props));

        _this._contentMenu = new _CountDownMenu4.default();
        return _this;
    }

    _createClass(CountDownMenuTest, [{
        key: "start",
        value: function start() {
            this._contentMenu.count = 3;
            this._contentMenu.stop();
            this._contentMenu.start();
        }
    }, {
        key: "stop",
        value: function stop() {
            this._contentMenu.stop();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { style: { backgroundColor: "red" } },
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick(e) {
                            return _this2.start(e);
                        } },
                    "Start"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick(e) {
                            return _this2.stop(e);
                        } },
                    "Stop"
                ),
                _react2.default.createElement(_CountDownMenu2.default, { dataSource: this._contentMenu })
            );
        }
    }]);

    return CountDownMenuTest;
}(_react.Component);

exports.default = CountDownMenuTest;