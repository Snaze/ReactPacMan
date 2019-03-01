'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CountDownMenu = require('./CountDownMenu');

var _CountDownMenu2 = _interopRequireDefault(_CountDownMenu);

var _CountDownMenu3 = require('../model/menus/CountDownMenu');

var _CountDownMenu4 = _interopRequireDefault(_CountDownMenu3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var cdmm = new _CountDownMenu4.default();

    _reactDom2.default.render(_react2.default.createElement(_CountDownMenu2.default, { dataSource: cdmm }), div);
});