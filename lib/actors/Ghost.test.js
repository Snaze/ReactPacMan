'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Ghost = require('./Ghost');

var _Ghost2 = _interopRequireDefault(_Ghost);

var _Ghost3 = require('../model/actors/Ghost');

var _Ghost4 = _interopRequireDefault(_Ghost3);

var _Level = require('../model/Level');

var _Level2 = _interopRequireDefault(_Level);

var _Player = require('../model/actors/Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var level = new _Level2.default();
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    var ghost = new _Ghost4.default(level, _Ghost4.default.RED, player);

    _reactDom2.default.render(_react2.default.createElement(_Ghost2.default, { dataSource: ghost }), div);
});