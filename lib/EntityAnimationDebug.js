"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Entity.css");

require("./images/PacManSprites.png");

var _Entity = require("./Entity");

var _Entity2 = _interopRequireDefault(_Entity);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityAnimationDebug = function (_Component) {
        _inherits(EntityAnimationDebug, _Component);

        function EntityAnimationDebug() {
                _classCallCheck(this, EntityAnimationDebug);

                return _possibleConstructorReturn(this, (EntityAnimationDebug.__proto__ || Object.getPrototypeOf(EntityAnimationDebug)).apply(this, arguments));
        }

        _createClass(EntityAnimationDebug, [{
                key: "componentDidMount",
                value: function componentDidMount() {}
        }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {}
        }, {
                key: "render",
                value: function render() {
                        return _react2.default.createElement(
                                "div",
                                { style: { backgroundColor: "Gray" } },
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DEAD,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DEAD,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_RED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_RED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_RED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_RED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BLUE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BLUE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BLUE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BLUE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ORANGE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ORANGE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ORANGE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ORANGE_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PINK_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PINK_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PINK_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PINK_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_DEAD_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_DEAD_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_DEAD_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_DEAD_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_FLASH_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_FLASH_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_FLASH_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_FLASH_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_APPLE,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_BANANA,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_CHERRY,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_KEY,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_PEACH,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_PEAR,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_PRETZEL,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                                        modifier: _Entity2.default.MODIFIER_POWER_UP_STRAWBERRY,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ACT,
                                        modifier: _Entity2.default.MODIFIER_NO_MODIFIER,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_EYES,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_EYES,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_EYES,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_EYES,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_HEART,
                                        modifier: _Entity2.default.MODIFIER_NO_MODIFIER,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_TINY_ICON,
                                        modifier: _Entity2.default.MODIFIER_TINY_ICON_POTION,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_TINY_ICON,
                                        modifier: _Entity2.default.MODIFIER_TINY_ICON_LIFE,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SWAN,
                                        modifier: _Entity2.default.MODIFIER_NO_MODIFIER,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BIG_SCORE,
                                        modifier: _Entity2.default.MODIFIER_BIG_SCORE_200,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BIG_SCORE,
                                        modifier: _Entity2.default.MODIFIER_BIG_SCORE_400,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BIG_SCORE,
                                        modifier: _Entity2.default.MODIFIER_BIG_SCORE_800,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BIG_SCORE,
                                        modifier: _Entity2.default.MODIFIER_BIG_SCORE_1600,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_100,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_200,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_500,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_700,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_1000,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_2000,
                                        animating: this.props.animating }),
                                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ROW_SCORE,
                                        modifier: _Entity2.default.MODIFIER_ROW_SCORE_5000,
                                        animating: this.props.animating })
                        );
                }
        }]);

        return EntityAnimationDebug;
}(_react.Component);

EntityAnimationDebug.propTypes = {
        animating: _propTypes2.default.bool
};

EntityAnimationDebug.defaultProps = {
        animating: true
};

exports.default = EntityAnimationDebug;