'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ContextMenu = require('./ContextMenu.js');

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _Cell = require('./model/Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import LevelFactory from "./model/LevelFactory";

it('renders without crashing', function () {
    var div = document.createElement('div');
    // const cell = LevelFactory.createLevel("level2");
    var cell = new _Cell2.default("0_0");

    _reactDom2.default.render(_react2.default.createElement(_ContextMenu2.default, { dataSource: cell, editMode: true }), div);
});