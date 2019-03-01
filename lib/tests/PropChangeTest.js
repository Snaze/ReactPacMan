"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dummy = require("../model/Dummy");

var _Dummy2 = _interopRequireDefault(_Dummy);

var _Dummy3 = require("./Dummy");

var _Dummy4 = _interopRequireDefault(_Dummy3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropChangeTest = function (_Component) {
    _inherits(PropChangeTest, _Component);

    function PropChangeTest(props) {
        _classCallCheck(this, PropChangeTest);

        var _this = _possibleConstructorReturn(this, (PropChangeTest.__proto__ || Object.getPrototypeOf(PropChangeTest)).call(this, props));

        _this.state = {
            dummy: new _Dummy2.default()
        };
        return _this;
    }

    _createClass(PropChangeTest, [{
        key: "buttonClick",
        value: function buttonClick(e) {
            this.setState({
                dummy: new _Dummy2.default()
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
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
                            _react2.default.createElement(_Dummy4.default, { dataSource: this.state.dummy })
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
                                        return _this2.buttonClick(e);
                                    } },
                                "Swap Prop"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PropChangeTest;
}(_react.Component);

exports.default = PropChangeTest;