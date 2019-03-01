"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Assert = require("../../../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivationFunctionChart = function (_Component) {
    _inherits(ActivationFunctionChart, _Component);

    function ActivationFunctionChart() {
        _classCallCheck(this, ActivationFunctionChart);

        return _possibleConstructorReturn(this, (ActivationFunctionChart.__proto__ || Object.getPrototypeOf(ActivationFunctionChart)).apply(this, arguments));
    }

    _createClass(ActivationFunctionChart, [{
        key: "getAxis",
        value: function getAxis(isVertical) {
            (0, _Assert.assert)(this.props.notchIncrement <= this.props.scale, "notch increment must be less than scale");

            var toRet = [];

            if (isVertical) {
                toRet.push(this.getVerticalAxis());
            } else {
                toRet.push(this.getHorizontalAxis());
            }

            for (var i = this.props.notchIncrement; i <= this.props.scale; i += this.props.notchIncrement) {
                if (isVertical) {
                    toRet.push(this.getVerticalAxisNotch(i, true, this.props.notchLength));
                    toRet.push(this.getVerticalAxisNotch(i, false, this.props.notchLength));
                } else {
                    toRet.push(this.getHorizontalAxisNotch(i, true, this.props.notchLength));
                    toRet.push(this.getHorizontalAxisNotch(i, false, this.props.notchLength));
                }
            }

            return toRet;
        }
    }, {
        key: "getVerticalAxis",
        value: function getVerticalAxis() {
            return _react2.default.createElement("line", { key: "verticalAxis", x1: this.props.width / 2,
                x2: this.props.width / 2,
                y1: 0,
                y2: this.props.height,
                stroke: this.props.axisStroke,
                strokeWidth: this.props.axisStrokeWidth });
        }
    }, {
        key: "getHorizontalAxis",
        value: function getHorizontalAxis() {
            return _react2.default.createElement("line", { key: "horizontalAxis", x1: 0,
                x2: this.props.width,
                y1: this.props.height / 2,
                y2: this.props.height / 2,
                stroke: this.props.axisStroke,
                strokeWidth: this.props.axisStrokeWidth });
        }
    }, {
        key: "getVerticalAxisNotch",
        value: function getVerticalAxisNotch(index, isPositive) {
            var notchLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;

            (0, _Assert.assert)(this.props.scale > 0, "Scale must be greater than 0");
            (0, _Assert.assert)(index <= this.props.scale && index >= 1, "1 <= scale <= index");

            var centerX = this.props.width / 2;
            var centerY = this.props.height / 2;
            var interval = this.props.height / 2 / this.props.scale;
            var yLocation = isPositive ? centerY + index * interval : centerY + index * -interval;
            var key = ActivationFunctionChart.getNotchKey("vertical", index, isPositive);

            return _react2.default.createElement("line", { key: key,
                x1: centerX - notchLength / 2,
                x2: centerX + notchLength / 2,
                y1: yLocation,
                y2: yLocation,
                stroke: this.props.axisStroke,
                strokeWidth: this.props.axisStrokeWidth });
        }
    }, {
        key: "pointToScreenCoords",
        value: function pointToScreenCoords(x, y) {
            var centerX = this.props.width / 2;
            var centerY = this.props.height / 2;
            var yInterval = this.props.height / 2 / this.props.scale;
            var xInterval = this.props.width / 2 / this.props.scale;

            return {
                x: centerX + x * xInterval,
                y: centerY - y * yInterval
            };
        }
    }, {
        key: "getHorizontalAxisNotch",
        value: function getHorizontalAxisNotch(index, isPositive) {
            var notchLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;

            (0, _Assert.assert)(this.props.scale > 0, "Scale must be greater than 0");
            (0, _Assert.assert)(index <= this.props.scale && index >= 1, "1 <= scale <= index");

            var centerX = this.props.width / 2;
            var centerY = this.props.height / 2;
            var interval = this.props.height / 2 / this.props.scale;
            var xLocation = isPositive ? centerX + index * interval : centerX + index * -interval;
            var key = ActivationFunctionChart.getNotchKey("vertical", index, isPositive);

            return _react2.default.createElement("line", { key: key,
                x1: xLocation,
                x2: xLocation,
                y1: centerY - notchLength / 2,
                y2: centerY + notchLength / 2,
                stroke: this.props.axisStroke,
                strokeWidth: this.props.axisStrokeWidth });
        }
    }, {
        key: "getFunctionPath",
        value: function getFunctionPath() {
            var startPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -this.props.scale;

            (0, _Assert.assert)(this.props.scale > 0);
            (0, _Assert.assert)(startPoint >= -this.props.scale && startPoint <= this.props.scale);

            if (!this.props.lineFunction) {
                return null;
            }

            var toSet = " ",
                pointY = void 0,
                screenCoords = void 0;
            var intervalSize = this.props.scale * 2 / this.props.functionIntervals;

            for (var pointX = startPoint; pointX <= this.props.scale; pointX += intervalSize) {
                pointY = this.props.lineFunction(pointX);

                if (pointY === null || pointY === "undefined") {
                    break;
                }

                screenCoords = this.pointToScreenCoords(pointX, pointY);

                if (toSet === " ") {
                    toSet = "M " + screenCoords.x + " " + screenCoords.y + " ";
                } else {
                    toSet += "L " + screenCoords.x + " " + screenCoords.y + " ";
                }
            }

            return _react2.default.createElement("path", { d: toSet.substr(0, toSet.length - 1),
                stroke: this.props.functionStroke,
                strokeWidth: this.props.functionStrokeWidth, fill: "none" });
        }
    }, {
        key: "getXLine",
        value: function getXLine() {
            if (this.props.x === null) {
                return null;
            }

            var xCoord = this.pointToScreenCoords(this.props.x, 0);

            return _react2.default.createElement("line", { x1: xCoord.x,
                x2: xCoord.x,
                y1: 0,
                y2: this.props.height,
                stroke: this.props.xLineStroke,
                strokeWidth: this.props.xLineStrokeWidth });
        }
    }, {
        key: "render",
        value: function render() {
            var startPoint = this.props.startPoint === null ? -this.props.scale : this.props.startPoint;

            return _react2.default.createElement(
                "svg",
                { width: this.props.width, height: this.props.height },
                this.getAxis(false),
                this.getAxis(true),
                this.getFunctionPath(startPoint),
                this.getXLine()
            );
        }
    }], [{
        key: "getNotchKey",
        value: function getNotchKey(orientation, index, isPositive) {
            var boolValue = isPositive ? "pos" : "neg";
            return orientation + "_" + index + "_" + boolValue;
        }
    }]);

    return ActivationFunctionChart;
}(_react.Component);

ActivationFunctionChart.propTypes = {
    lineFunction: _propTypes2.default.func,
    x: _propTypes2.default.number,
    scale: _propTypes2.default.number,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    axisStroke: _propTypes2.default.string,
    axisStrokeWidth: _propTypes2.default.number,
    notchLength: _propTypes2.default.number,
    functionStroke: _propTypes2.default.string,
    functionStrokeWidth: _propTypes2.default.number,
    functionIntervals: _propTypes2.default.number,
    xLineStroke: _propTypes2.default.string,
    xLineStrokeWidth: _propTypes2.default.number,
    notchIncrement: _propTypes2.default.number,
    startPoint: _propTypes2.default.number
};

ActivationFunctionChart.defaultProps = {
    lineFunction: null,
    x: null,
    scale: 2,
    width: 128,
    height: 128,
    axisStroke: "brown",
    axisStrokeWidth: 1,
    notchLength: 16,
    functionStroke: "blue",
    functionStrokeWidth: 2,
    functionIntervals: 100,
    xLineStroke: "black",
    xLineStrokeWidth: 1,
    notchIncrement: 1,
    startPoint: null
};

exports.default = ActivationFunctionChart;