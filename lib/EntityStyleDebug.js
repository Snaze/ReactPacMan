"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Entity.css");

require("./images/PacManSprites.png");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityStyleDebug = function (_Component) {
    _inherits(EntityStyleDebug, _Component);

    function EntityStyleDebug() {
        _classCallCheck(this, EntityStyleDebug);

        return _possibleConstructorReturn(this, (EntityStyleDebug.__proto__ || Object.getPrototypeOf(EntityStyleDebug)).apply(this, arguments));
    }

    _createClass(EntityStyleDebug, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManRightOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManRightMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManRightClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManLeftOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManLeftMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManLeftClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManUpOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManUpMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManUpClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManDownOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManDownMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity MrsPacManDownClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManRightOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManRightMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManRightClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManLeftOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManLeftMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManLeftClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManUpOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManUpMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManUpClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManDownOpen" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManDownMid" }),
                _react2.default.createElement("div", { className: "Entity RowEntity PacManDownClose" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedRight1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedRight2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedLeft1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedLeft2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedUp1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedUp2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedDown1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostRedDown2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeRight1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeRight2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeLeft1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeLeft2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeUp1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeUp2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeDown1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostOrangeDown2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkRight1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkRight2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkLeft1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkLeft2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkUp1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkUp2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkDown1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostPinkDown2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueRight1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueRight2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueLeft1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueLeft2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueUp1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueUp2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueDown1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostBlueDown2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostScared1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostScared2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostDead1" }),
                _react2.default.createElement("div", { className: "Entity RowEntity GhostDead2" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Cherry" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Strawberry" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Peach" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Pretzel" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Apple" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Pear" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Banana" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Key" }),
                _react2.default.createElement("div", { className: "Entity ActEntity ActOpen" }),
                _react2.default.createElement("div", { className: "Entity ActEntity ActMid" }),
                _react2.default.createElement("div", { className: "Entity ActEntity ActClosed" }),
                _react2.default.createElement("div", { className: "Entity RowEntity EyesRight" }),
                _react2.default.createElement("div", { className: "Entity RowEntity EyesLeft" }),
                _react2.default.createElement("div", { className: "Entity RowEntity EyesUp" }),
                _react2.default.createElement("div", { className: "Entity RowEntity EyesDown" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Heart" }),
                _react2.default.createElement("div", { className: "Entity TinyIcon Potion" }),
                _react2.default.createElement("div", { className: "Entity TinyIcon Life" }),
                _react2.default.createElement("div", { className: "Entity Swan SwanUp" }),
                _react2.default.createElement("div", { className: "Entity Swan SwanDown" }),
                _react2.default.createElement("div", { className: "Entity BigScore BigScore200" }),
                _react2.default.createElement("div", { className: "Entity BigScore BigScore400" }),
                _react2.default.createElement("div", { className: "Entity BigScore BigScore800" }),
                _react2.default.createElement("div", { className: "Entity BigScore BigScore1600" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score100" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score200" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score500" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score700" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score1000" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score2000" }),
                _react2.default.createElement("div", { className: "Entity RowEntity Score5000" })
            );
        }
    }]);

    return EntityStyleDebug;
}(_react.Component);

exports.default = EntityStyleDebug;