'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _LevelEditPanel = require('./LevelEditPanel');

var _LevelEditPanel2 = _interopRequireDefault(_LevelEditPanel);

var _LevelFactory = require('./model/LevelFactory');

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

var _Level = require('./model/Level');

var _Level2 = _interopRequireDefault(_Level);

var _Border = require('./model/Border');

var _Border2 = _interopRequireDefault(_Border);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');
    var theLevel = _LevelFactory2.default.createLevel("level2");
    _reactDom2.default.render(_react2.default.createElement(_LevelEditPanel2.default, { dataSource: theLevel, onLoadComplete: function onLoadComplete(e) {
            return alert("Load Complete");
        } }), div);
});

it("onDropDownChange(e) sets the color for the color dropdown", function () {
    // SETUP
    var div = document.createElement('div');
    var theLevel = new _Level2.default(2, 2);

    var lep = _reactDom2.default.render(_react2.default.createElement(_LevelEditPanel2.default, { dataSource: theLevel, onLoadComplete: function onLoadComplete(e) {
            return alert("Load Complete");
        } }), div);

    // CALL
    lep.onFormEvent({ target: {
            value: _Border2.default.COLOR_PINK,
            id: "ddlColor"
        } });

    // ASSERT
    expect(theLevel.color).toBe(_Border2.default.COLOR_PINK);
});