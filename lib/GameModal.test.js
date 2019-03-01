'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GameModal = require('./GameModal');

var _GameModal2 = _interopRequireDefault(_GameModal);

var _GameModal3 = require('./model/GameModal');

var _GameModal4 = _interopRequireDefault(_GameModal3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("GameModal Renders", function () {
    var div = document.createElement('div');
    var gm = new _GameModal4.default();

    _reactDom2.default.render(_react2.default.createElement(_GameModal2.default, { dataSource: gm }), div);
});