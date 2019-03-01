'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ActivationFunctionChart = require('./ActivationFunctionChart');

var _ActivationFunctionChart2 = _interopRequireDefault(_ActivationFunctionChart);

var _ActivationFunctions = require('../../../model/ai/ann/ActivationFunctions');

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getActivationFunctionChart = function getActivationFunctionChart(activationFunction, x) {
    var functionIntervals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var notchIncrement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var scale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;

    var div = document.createElement('div');

    // let activationFunction = ActivationFunctions.sigmoid;
    // let x = 0;

    return _reactDom2.default.render(_react2.default.createElement(_ActivationFunctionChart2.default, {
        lineFunction: activationFunction.output, x: x,
        width: 128, height: 128, axisStroke: "brown",
        axisStrokeWidth: 1, functionIntervals: functionIntervals,
        notchIncrement: notchIncrement, scale: scale }), div);
};

it('renders without crashing', function () {

    var activationFunction = _ActivationFunctions2.default.sigmoid;
    var x = 0;

    getActivationFunctionChart(activationFunction, x);
});

var verifyVerticalAxis = function verifyVerticalAxis(verticalAxis) {
    expect(verticalAxis.type).toBe("line");
    expect(verticalAxis.props.x1).toBe(128 / 2);
    expect(verticalAxis.props.x2).toBe(128 / 2);
    expect(verticalAxis.props.y1).toBe(0);
    expect(verticalAxis.props.y2).toBe(128);
    expect(verticalAxis.props.stroke).toBe("brown");
    expect(verticalAxis.props.strokeWidth).toBe(1);
};

it("getVerticalAxis", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);

    // CALL
    var verticalAxis = chart.getVerticalAxis();

    // ASSERT
    verifyVerticalAxis(verticalAxis);
});

var verifyVerticalAxisNotch = function verifyVerticalAxisNotch(index, isPositive, notchLength, verticalAxisNotch) {
    var number = isPositive ? index : -index;

    expect(verticalAxisNotch.type).toBe("line");
    expect(verticalAxisNotch.props.x1).toBe(128 / 2 - notchLength / 2);
    expect(verticalAxisNotch.props.x2).toBe(128 / 2 + notchLength / 2);
    expect(verticalAxisNotch.props.y1).toBe(128 / 2 + number * (128 / 4));
    expect(verticalAxisNotch.props.y2).toBe(128 / 2 + number * (128 / 4));
    expect(verticalAxisNotch.props.stroke).toBe("brown");
    expect(verticalAxisNotch.props.strokeWidth).toBe(1);
};

it("getVerticalAxisNotch", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);
    var notchLength = 16;

    // CALL
    var verticalAxisNotch = chart.getVerticalAxisNotch(1, true, notchLength);

    // ASSERT
    verifyVerticalAxisNotch(1, true, notchLength, verticalAxisNotch);
});

var verifyHorizontalAxis = function verifyHorizontalAxis(horizontalAxis) {
    expect(horizontalAxis.type).toBe("line");
    expect(horizontalAxis.props.x1).toBe(0);
    expect(horizontalAxis.props.x2).toBe(128);
    expect(horizontalAxis.props.y1).toBe(128 / 2);
    expect(horizontalAxis.props.y2).toBe(128 / 2);
    expect(horizontalAxis.props.stroke).toBe("brown");
    expect(horizontalAxis.props.strokeWidth).toBe(1);
};

it("getHorizontalAxis", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);

    // CALL
    var horizontalAxis = chart.getHorizontalAxis();

    // ASSERT
    verifyHorizontalAxis(horizontalAxis);
});

var verifyHorizontalAxisNotch = function verifyHorizontalAxisNotch(index, isPositive, notchLength, horizontalAxisNotch) {
    var number = isPositive ? index : -index;

    expect(horizontalAxisNotch.type).toBe("line");
    expect(horizontalAxisNotch.props.x1).toBe(128 / 2 + number * (128 / 4));
    expect(horizontalAxisNotch.props.x2).toBe(128 / 2 + number * (128 / 4));
    expect(horizontalAxisNotch.props.y1).toBe(128 / 2 - notchLength / 2);
    expect(horizontalAxisNotch.props.y2).toBe(128 / 2 + notchLength / 2);
    expect(horizontalAxisNotch.props.stroke).toBe("brown");
    expect(horizontalAxisNotch.props.strokeWidth).toBe(1);
};

it("getHorizontalAxisNotch", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);
    var notchLength = 16;
    var index = 1;
    var isPositive = false;

    // CALL
    var horizontalAxisNotch = chart.getHorizontalAxisNotch(index, isPositive, notchLength);

    // ASSERT
    verifyHorizontalAxisNotch(index, isPositive, notchLength, horizontalAxisNotch);
});

it("getAxis horizontal", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);

    // CALL
    var axis = chart.getAxis(false);

    // ASSERT
    expect(axis.length).toBe(5);
    verifyHorizontalAxis(axis[0]);
    verifyHorizontalAxisNotch(1, true, 16, axis[1]);
    verifyHorizontalAxisNotch(1, false, 16, axis[2]);
    verifyHorizontalAxisNotch(2, true, 16, axis[3]);
    verifyHorizontalAxisNotch(2, false, 16, axis[4]);
});

it("getAxis vertical", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);

    // CALL
    var axis = chart.getAxis(true);

    // ASSERT
    expect(axis.length).toBe(5);
    verifyVerticalAxis(axis[0]);
    verifyVerticalAxisNotch(1, true, 16, axis[1]);
    verifyVerticalAxisNotch(1, false, 16, axis[2]);
    verifyVerticalAxisNotch(2, true, 16, axis[3]);
    verifyVerticalAxisNotch(2, false, 16, axis[4]);
});

it("getAxis vertical notchIncrement5", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1, 2, 5, 10);

    // CALL
    var axis = chart.getAxis(true);

    // ASSERT
    expect(axis.length).toBe(5);
    verifyVerticalAxis(axis[0]);
    verifyVerticalAxisNotch(1, true, 16, axis[1]);
    verifyVerticalAxisNotch(1, false, 16, axis[2]);
    verifyVerticalAxisNotch(2, true, 16, axis[3]);
    verifyVerticalAxisNotch(2, false, 16, axis[4]);
});

it("getAxis horizontal notchIncrement5", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1, 2, 5, 10);

    // CALL
    var axis = chart.getAxis(false);

    // ASSERT
    expect(axis.length).toBe(5);
    verifyHorizontalAxis(axis[0]);
    verifyHorizontalAxisNotch(1, true, 16, axis[1]);
    verifyHorizontalAxisNotch(1, false, 16, axis[2]);
    verifyHorizontalAxisNotch(2, true, 16, axis[3]);
    verifyHorizontalAxisNotch(2, false, 16, axis[4]);
});

it("pointToScreenCoords", function () {
    // SETUP
    var chart = getActivationFunctionChart(_ActivationFunctions2.default.sigmoid, 1);
    var x = 0.8,
        y = -0.8,
        center = 128 / 2;

    // CALL
    var screenCoord = chart.pointToScreenCoords(x, y);

    // ASSERT
    expect(screenCoord.x).toBe(center + 0.8 * (center / 2));
    expect(screenCoord.y).toBe(center + 0.8 * (center / 2));
});

it("getFunctionPath", function () {
    // SETUP
    var chart = getActivationFunctionChart({
        output: function output(x) {
            return x;
        }
    }, 1);

    // CALL
    var path = chart.getFunctionPath();

    // ASSERT
    expect(path.type).toBe("path");
    expect(path.props.d).toBe("M 0 128 L 64 64 L 128 0");
});

it("getFunctionPath returns null for null", function () {
    // SETUP
    var chart = getActivationFunctionChart({
        output: null
    }, 1);

    // CALL
    var path = chart.getFunctionPath();

    // ASSERT
    expect(path).toBe(null);
});