'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GameFooter = require('./GameFooter');

var _GameFooter2 = _interopRequireDefault(_GameFooter);

var _GameFooter3 = require('./model/GameFooter');

var _GameFooter4 = _interopRequireDefault(_GameFooter3);

var _Player = require('./model/actors/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Level = require('./model/Level');

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Game Renders", function () {
    var div = document.createElement('div');
    var level = new _Level2.default();
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    var player2 = new _Player2.default(level, _Player2.default.MRS_PAC_MAN);
    var gfm = new _GameFooter4.default(player, player2, level, _GameFooter4.default.ACTIVE_PLAYER_1);

    _reactDom2.default.render(_react2.default.createElement(_GameFooter2.default, { dataSource: gfm }), div);
});