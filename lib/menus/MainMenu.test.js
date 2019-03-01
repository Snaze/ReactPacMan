'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MainMenu = require('./MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _MainMenu3 = require('../model/menus/MainMenu');

var _MainMenu4 = _interopRequireDefault(_MainMenu3);

var _GameMode = require('../model/GameMode');

var _GameMode2 = _interopRequireDefault(_GameMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var mm = new _MainMenu4.default();
    var callback = function callback(e) {};

    _reactDom2.default.render(_react2.default.createElement(_MainMenu2.default, { dataSource: mm, onSelectionCallback: callback }), div);
});

it('key down works crashing', function () {
    // SETUP
    var div = document.createElement('div');
    var mmm = new _MainMenu4.default();
    var callback = function callback(e) {};

    var mm = _reactDom2.default.render(_react2.default.createElement(_MainMenu2.default, { dataSource: mmm, onSelectionCallback: callback }), div);

    // CALL
    mm.keyDown("ArrowUp");

    // ASSERT
    expect(mmm.selectedValue).toBe(_GameMode2.default.WATCH_PRE_TRAINED);
});