'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DataSourceComponent2 = require('../DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

require('./CountDownMenu.css');

var _CountDownMenu = require('../model/menus/CountDownMenu');

var _CountDownMenu2 = _interopRequireDefault(_CountDownMenu);

require('../../node_modules/animate.css/animate.min.css');

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountDownMenu = function (_DataSourceComponent) {
    _inherits(CountDownMenu, _DataSourceComponent);

    function CountDownMenu() {
        _classCallCheck(this, CountDownMenu);

        return _possibleConstructorReturn(this, (CountDownMenu.__proto__ || Object.getPrototypeOf(CountDownMenu)).apply(this, arguments));
    }

    _createClass(CountDownMenu, [{
        key: 'getAnimation',
        value: function getAnimation() {
            if (this.countDownMenu.showAnimation) {
                return _react2.default.createElement(
                    'div',
                    { style: { width: "100%", height: "100%" } },
                    _react2.default.createElement(
                        'table',
                        { className: 'CountDownMenuMoveRightAnimation' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'CountDownMenuMoveLeftAnimation' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'CountDownMenuMoveUpAnimation' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_UP })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'CountDownMenuMoveDownAnimation' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_SCARED_GHOST,
                                        modifier: _Entity2.default.MODIFIER_DIRECTION_DOWN })
                                )
                            )
                        )
                    )
                );
            }

            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'CountDownMenu' },
                this.getAnimation(),
                this.countDownMenuContent
            );
        }
    }, {
        key: 'countDownMenu',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'countDownMenuContent',
        get: function get() {
            if (this.countDownMenu.count > 0) {
                return _react2.default.createElement(
                    'div',
                    { key: "countDownMenuNumber" + this.countDownMenu.count.toString(), className: 'CountDownMenuContent bounceIn animated' },
                    this.countDownMenu.count.toString()
                );
            }

            return _react2.default.createElement(
                'div',
                { key: 'countDownMenuFinishText', className: 'CountDownMenuContent bounceIn animated' },
                this.countDownMenu.finishText
            );
        }
    }]);

    return CountDownMenu;
}(_DataSourceComponent3.default);

CountDownMenu.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_CountDownMenu2.default).isRequired
};

exports.default = CountDownMenu;