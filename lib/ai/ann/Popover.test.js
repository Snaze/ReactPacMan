'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');

    _reactDom2.default.render(_react2.default.createElement(_Popover2.default, {
        width: 200,
        height: 200,
        stroke: "DarkGreen",
        roundedCorners: 20,
        fill: "green",
        strokeWidth: 4 }), div);
});