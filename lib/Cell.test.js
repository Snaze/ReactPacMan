'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Cell = require('./Cell.js');

var _Cell2 = _interopRequireDefault(_Cell);

var _Border = require('./model/Border');

var _Border2 = _interopRequireDefault(_Border);

var _Cell3 = require('./model/Cell');

var _Cell4 = _interopRequireDefault(_Cell3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
    var table = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    var theRow = document.createElement('tr');
    table.appendChild(theRow);
    var cell = new _Cell4.default("1");

    _reactDom2.default.render(_react2.default.createElement(_Cell2.default, { dataSource: cell }), theRow);
});

it('it sets the color css class names appropriately', function () {
    // SETUP
    var table = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    var theRow = document.createElement('tr');
    table.appendChild(theRow);
    var cell = new _Cell4.default("0_0");
    cell.solidBorder.color = _Border2.default.COLOR_PINK;
    cell.solidBorder.left = true;
    cell.solidBorder.top = true;
    cell.solidBorder.right = true;
    cell.solidBorder.bottom = true;

    var theCell = _reactDom2.default.render(_react2.default.createElement(_Cell2.default, { dataSource: cell }), theRow);

    // CALL
    var theClassName = theCell.className;

    // ASSERT
    expect(theClassName.indexOf("CellSolidLeftBorderPink") >= 0).toBe(true);
    expect(theClassName.indexOf("CellSolidRightBorderPink") >= 0).toBe(true);
    expect(theClassName.indexOf("CellSolidTopBorderPink") >= 0).toBe(true);
    expect(theClassName.indexOf("CellSolidBottomBorderPink") >= 0).toBe(true);
});

it("cell does not have any animations when blink is false", function () {
    // SETUP
    var table = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    var theRow = document.createElement('tr');
    table.appendChild(theRow);
    var cell = new _Cell4.default("0_0");
    cell.solidBorder.color = _Border2.default.COLOR_PINK;
    cell.solidBorder.left = true;
    cell.solidBorder.top = true;
    cell.solidBorder.right = true;
    cell.solidBorder.bottom = true;
    cell.blinkBorder = false;

    var theCell = _reactDom2.default.render(_react2.default.createElement(_Cell2.default, { dataSource: cell }), theRow);

    // CALL
    var theStyle = theCell.style;

    // ASSERT
    expect(typeof theStyle.animation === "undefined").toBe(true);
});

it("cell does have animations when blink is true", function () {
    // SETUP
    var table = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    var theRow = document.createElement('tr');
    table.appendChild(theRow);
    var cell = new _Cell4.default("0_0");
    cell.solidBorder.color = _Border2.default.COLOR_PINK;
    cell.solidBorder.left = true;
    cell.solidBorder.top = true;
    cell.solidBorder.right = true;
    cell.solidBorder.bottom = true;
    cell.blinkBorder = true;

    var theCell = _reactDom2.default.render(_react2.default.createElement(_Cell2.default, { dataSource: cell }), theRow);

    // CALL
    var theStyle = theCell.style;

    // ASSERT
    expect(theStyle.animation.indexOf("CellSolidTopBorderBlinkAnimation") >= 0).toBe(true);
    expect(theStyle.animation.indexOf("CellSolidLeftBorderBlinkAnimation") >= 0).toBe(true);
    expect(theStyle.animation.indexOf("CellSolidRightBorderBlinkAnimation") >= 0).toBe(true);
    expect(theStyle.animation.indexOf("CellSolidBottomBorderBlinkAnimation") >= 0).toBe(true);
});