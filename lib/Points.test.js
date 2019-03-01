'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Points = require('./model/Points');

var _Points2 = _interopRequireDefault(_Points);

var _Points3 = require('./Points');

var _Points4 = _interopRequireDefault(_Points3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var points = new _Points2.default();

    _reactDom2.default.render(_react2.default.createElement(_Points4.default, { dataSource: points }), div);
});