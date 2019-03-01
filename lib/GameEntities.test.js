'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GameEntities = require('./GameEntities');

var _GameEntities2 = _interopRequireDefault(_GameEntities);

var _LevelFactory = require('./model/LevelFactory');

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

var _GameObjectContainer = require('./model/GameObjectContainer');

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("Game Renders", function () {
    var div = document.createElement('div');
    var level = _LevelFactory2.default.createLevel("level2");
    var gameObjectContainer = new _GameObjectContainer2.default(level);

    _reactDom2.default.render(_react2.default.createElement(_GameEntities2.default, { dataSource: gameObjectContainer }), div);
});