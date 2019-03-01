'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var div = document.createElement('div');

    _reactDom2.default.render(_react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
        stepNumber: 0 }), div);
});

it('blink adds correct class', function () {
    // SETUP
    var div = document.createElement('div');

    var toCheck = _reactDom2.default.render(_react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
        stepNumber: 0, blink: true }), div);

    // CALL
    var className = toCheck.currentClassName();

    // ASSERT
    expect(className.indexOf(" EntityBlink") >= 0).toBe(true);
});

it('when blink = false that class is not added', function () {
    // SETUP
    var div = document.createElement('div');

    var toCheck = _reactDom2.default.render(_react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
        stepNumber: 0, blink: false }), div);

    // CALL
    var className = toCheck.currentClassName();

    // ASSERT
    expect(className.indexOf(" EntityBlink") < 0).toBe(true);
});

var testGetModifier = function testGetModifier(designator, modifier, animating, returnedModifier) {
    // SETUP
    var div = document.createElement('div');

    var toCheck = _reactDom2.default.render(_react2.default.createElement(_Entity2.default, { designator: designator,
        modifier: modifier,
        animating: animating }), div);

    // CALL
    var modifierToCheck = toCheck.getModifier();

    // ASSERT
    expect(modifierToCheck).toBe(returnedModifier);
};

var testGetModifierForDesignator = function testGetModifierForDesignator(designator) {
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_UP, true, _Entity2.default.MODIFIER_DIRECTION_UP);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_UP, false, _Entity2.default.MODIFIER_DIRECTION_UP_PAUSED);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_LEFT, true, _Entity2.default.MODIFIER_DIRECTION_LEFT);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_LEFT, false, _Entity2.default.MODIFIER_DIRECTION_LEFT_PAUSED);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_RIGHT, true, _Entity2.default.MODIFIER_DIRECTION_RIGHT);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_RIGHT, false, _Entity2.default.MODIFIER_DIRECTION_RIGHT_PAUSED);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_DOWN, true, _Entity2.default.MODIFIER_DIRECTION_DOWN);
    testGetModifier(designator, _Entity2.default.MODIFIER_DIRECTION_DOWN, false, _Entity2.default.MODIFIER_DIRECTION_DOWN_PAUSED);
    testGetModifier(designator, _Entity2.default.MODIFIER_DEAD, true, _Entity2.default.MODIFIER_DEAD);
    testGetModifier(designator, _Entity2.default.MODIFIER_DEAD, false, _Entity2.default.MODIFIER_DEAD_PAUSED);
};

it('test getModifier', function () {
    testGetModifierForDesignator(_Entity2.default.DESIGNATOR_PAC_MAN);
    testGetModifierForDesignator(_Entity2.default.DESIGNATOR_MRS_PAC_MAN);
});