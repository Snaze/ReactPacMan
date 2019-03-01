'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GameHeader = require('./GameHeader');

var _GameHeader2 = _interopRequireDefault(_GameHeader);

var _GameHeader3 = require('./model/GameHeader');

var _GameHeader4 = _interopRequireDefault(_GameHeader3);

var _Player = require('./model/actors/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Level = require('./model/Level');

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Game Renders", function () {
    var div = document.createElement('div');
    var level = new _Level2.default();
    var player = new _Player2.default(level, _Player2.default.MR_PAC_MAN);
    var ghm = new _GameHeader4.default(player, null);

    _reactDom2.default.render(_react2.default.createElement(_GameHeader2.default, { dataSource: ghm }), div);
});