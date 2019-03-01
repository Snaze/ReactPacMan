'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PowerUp = require('./PowerUp');

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _PowerUp3 = require('../model/actors/PowerUp');

var _PowerUp4 = _interopRequireDefault(_PowerUp3);

var _Level = require('../model/Level');

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var level = new _Level2.default();
    // const player = new Player(level, Player.MR_PAC_MAN);
    var powerUpModel = new _PowerUp4.default(level, _PowerUp4.default.POWER_UP_CHERRY);

    _reactDom2.default.render(_react2.default.createElement(_PowerUp2.default, { dataSource: powerUpModel }), div);
});