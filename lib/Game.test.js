'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Game = require('./model/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Game3 = require('./Game');

var _Game4 = _interopRequireDefault(_Game3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Game Renders", function () {
    var div = document.createElement('div');
    var game = new _Game2.default();

    _reactDom2.default.render(_react2.default.createElement(_Game4.default, { dataSource: game }), div);
});