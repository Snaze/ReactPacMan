'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Player3 = require('../model/actors/Player');

var _Player4 = _interopRequireDefault(_Player3);

var _Level = require('../model/Level');

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var level = new _Level2.default();
    var player = new _Player4.default(level, _Player4.default.MR_PAC_MAN);

    _reactDom2.default.render(_react2.default.createElement(_Player2.default, { dataSource: player }), div);
});