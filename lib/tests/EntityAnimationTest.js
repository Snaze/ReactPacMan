"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _EntityAnimationDebug = require("../EntityAnimationDebug");

var _EntityAnimationDebug2 = _interopRequireDefault(_EntityAnimationDebug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityAnimationTest = function (_Component) {
    _inherits(EntityAnimationTest, _Component);

    function EntityAnimationTest(props) {
        _classCallCheck(this, EntityAnimationTest);

        var _this = _possibleConstructorReturn(this, (EntityAnimationTest.__proto__ || Object.getPrototypeOf(EntityAnimationTest)).call(this, props));

        _this.state = {
            animating: true
        };
        return _this;
    }

    _createClass(EntityAnimationTest, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
    }, {
        key: "toggleAnimate",
        value: function toggleAnimate(e) {
            var self = this;
            var toSet = {
                animating: !self.state.animating
            };

            this.setState(toSet);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick(e) {
                            return _this2.toggleAnimate(e);
                        } },
                    "Toggle Animate"
                ),
                _react2.default.createElement(_EntityAnimationDebug2.default, { animating: this.state.animating })
            );
        }
    }]);

    return EntityAnimationTest;
}(_react.Component);

exports.default = EntityAnimationTest;