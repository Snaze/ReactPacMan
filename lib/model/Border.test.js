"use strict";

var _Border = require("./Border");

var _Border2 = _interopRequireDefault(_Border);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function testAttribute(attrName) {
    var temp = new _Border2.default();

    expect(temp[attrName]).toBe(false);
    temp[attrName] = true;

    expect(temp[attrName]).toBe(true);

    temp[attrName] = false;
    expect(temp[attrName]).toBe(false);
}

it('left works', function () {
    testAttribute("left");
});

it('top works', function () {
    testAttribute("top");
});

it('right works', function () {
    testAttribute("right");
});

it('bottom works', function () {
    testAttribute("bottom");
});

it("clone works", function () {
    var theBorder = new _Border2.default(true, true, true, true);
    var theClone = theBorder.clone();
    expect(theClone.equals(theBorder)).toBe(true);
});