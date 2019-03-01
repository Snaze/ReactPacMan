'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Level = require('./Level.js');

var _Level2 = _interopRequireDefault(_Level);

var _LevelFactory = require('./model/LevelFactory');

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

var _GameObjectContainer = require('./model/GameObjectContainer');

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var theLevel = _LevelFactory2.default.createLevel("level2");
    var gameObjectContainer = new _GameObjectContainer2.default(theLevel);

    _reactDom2.default.render(_react2.default.createElement(_Level2.default, { dataSource: theLevel, gameObjectContainer: gameObjectContainer }), div);
});