"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Modal = require("../Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _Modal3 = require("../model/Modal");

var _Modal4 = _interopRequireDefault(_Modal3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalTest = function (_Component) {
    _inherits(ModalTest, _Component);

    function ModalTest(props) {
        _classCallCheck(this, ModalTest);

        var _this = _possibleConstructorReturn(this, (ModalTest.__proto__ || Object.getPrototypeOf(ModalTest)).call(this, props));

        _this.state = {
            lastButtonClicked: ""
        };

        _this._modal = new _Modal4.default();
        _this._modal.buttonClick = function (e) {
            return _this.modalButtonClick(e);
        };
        return _this;
    }

    _createClass(ModalTest, [{
        key: "onClick",
        value: function onClick(e) {
            this._modal.show = !this._modal.show;
        }
    }, {
        key: "modalButtonClick",
        value: function modalButtonClick(e) {
            if (e.buttonType === _Modal2.default.BUTTON_YES) {
                this.setState({
                    lastButtonClicked: "YES"
                });
                this._modal.show = false;
            } else {
                this.setState({
                    lastButtonClicked: "NO"
                });
                this._modal.show = false;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    null,
                    "Last Button Clicked: ",
                    this.state.lastButtonClicked
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick(e) {
                            return _this2.onClick(e);
                        } },
                    this.buttonText
                ),
                _react2.default.createElement(
                    _Modal2.default,
                    { dataSource: this._modal },
                    _react2.default.createElement(
                        "div",
                        null,
                        "WOULD YOU LIKE TO PLAY AGAIN"
                    )
                )
            );
        }
    }, {
        key: "buttonText",
        get: function get() {
            if (!this._modal.show) {
                return "Show";
            }

            return "Hide";
        }
    }]);

    return ModalTest;
}(_react.Component);

exports.default = ModalTest;