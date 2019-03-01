'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _LevelRunner = require('./LevelRunner');

var _LevelRunner2 = _interopRequireDefault(_LevelRunner);

var _LevelRunner3 = require('./model/LevelRunner');

var _LevelRunner4 = _interopRequireDefault(_LevelRunner3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Game Renders", function () {
    var levelRunner = new _LevelRunner4.default("Level2WithPaths");
    var div = document.createElement('div');

    _reactDom2.default.render(_react2.default.createElement(_LevelRunner2.default, { dataSource: levelRunner }), div);
});