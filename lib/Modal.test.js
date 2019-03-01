'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Modal3 = require('./model/Modal');

var _Modal4 = _interopRequireDefault(_Modal3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var modalModel = new _Modal4.default();

    _reactDom2.default.render(_react2.default.createElement(_Modal2.default, { dataSource: modalModel }), div);
});

// it ("test", () => {
//     expect(false).toBe(true);
// });