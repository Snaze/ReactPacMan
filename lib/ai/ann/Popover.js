"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover(props) {
        _classCallCheck(this, Popover);

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

        _this._onMouseMoveRef = function (e) {
            return _this._onMouseMove(e);
        };
        return _this;
    }

    _createClass(Popover, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!!document) {
                document.addEventListener("mousemove", this._onMouseMoveRef);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (!!document) {
                document.removeEventListener("mousemove", this._onMouseMoveRef);
            }
        }
    }, {
        key: "_onMouseMove",
        value: function _onMouseMove(e) {
            e.target.style.x = e.screenX;
            e.target.style.y = e.screenY;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.roundedCorners > 0) {
                return _react2.default.createElement(
                    "svg",
                    { visibility: this.props.visibility, x: this.props.x, y: this.props.y },
                    _react2.default.createElement("rect", {
                        rx: this.props.roundedCorners,
                        ry: this.props.roundedCorners,
                        width: this.props.width,
                        height: this.props.height,
                        fill: this.props.fill,
                        strokeWidth: this.props.strokeWidth,
                        stroke: this.props.stroke }),
                    _react2.default.createElement(
                        "svg",
                        null,
                        this.props.children
                    )
                );
            }

            return _react2.default.createElement(
                "svg",
                { visibility: this.props.visibility, x: this.props.x, y: this.props.y },
                _react2.default.createElement("rect", {
                    width: this.props.width,
                    height: this.props.height,
                    fill: this.props.fill,
                    strokeWidth: this.props.strokeWidth,
                    stroke: this.props.stroke }),
                _react2.default.createElement(
                    "svg",
                    null,
                    this.props.children
                )
            );
        }
    }]);

    return Popover;
}(_react.Component);

Popover.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    stroke: _propTypes2.default.string,
    stokeWidth: _propTypes2.default.number,
    fill: _propTypes2.default.string,
    roundedCorners: _propTypes2.default.number,
    visibility: _propTypes2.default.string,
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
};

Popover.defaultProps = {
    strokeWidth: 4,
    stroke: "DarkGreen",
    fill: "Green",
    roundedCorners: 20,
    visibility: "hidden",
    x: 0,
    y: 0
};

exports.default = Popover;