'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./MainMenu.css');

var _KeyEventer = require('../utils/KeyEventer');

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DataSourceComponent2 = require('../DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _MainMenu = require('../model/menus/MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _Assert = require('../utils/Assert');

var _GameMode = require('../model/GameMode');

var _GameMode2 = _interopRequireDefault(_GameMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenu = function (_DataSourceComponent) {
    _inherits(MainMenu, _DataSourceComponent);

    function MainMenu(props) {
        _classCallCheck(this, MainMenu);

        var _this = _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).call(this, props));

        _this.keyDownRef = function (e) {
            return _this.keyDown(e);
        };
        return _this;
    }

    _createClass(MainMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(MainMenu.prototype.__proto__ || Object.getPrototypeOf(MainMenu.prototype), 'componentDidMount', this).call(this);

            _KeyEventer2.default.instance.addCallback(this.keyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get(MainMenu.prototype.__proto__ || Object.getPrototypeOf(MainMenu.prototype), 'componentWillUnmount', this).call(this);

            _KeyEventer2.default.instance.removeCallback(this.keyDownRef, _KeyEventer2.default.CALLBACK_KEYDOWN);
        }

        /**
         * This will change the selection
         * @param isUp {boolean} True if up arrow pushed.  False otherwise
         */

    }, {
        key: 'toggleSelection',
        value: function toggleSelection(isUp) {
            var currentSelection = this.mainMenu.selectedValue;
            if (isUp) {
                currentSelection--;
            } else {
                currentSelection++;
            }
            var firstValue = _GameMode2.default.ALL[0];
            var lastValue = _GameMode2.default.ALL[_GameMode2.default.ALL.length - 1];

            (0, _Assert.assert)(lastValue >= firstValue, "Last Value must be greater than or equal first value");

            if (currentSelection < firstValue) {
                currentSelection = lastValue;
            } else if (currentSelection > lastValue) {
                currentSelection = firstValue;
            } else if (lastValue === firstValue) {
                currentSelection = firstValue;
            }

            this.mainMenu.selectedValue = currentSelection;
        }
    }, {
        key: 'keyDown',
        value: function keyDown(key) {

            switch (key) {
                case "ArrowUp":
                    this.toggleSelection(true);
                    break;
                case "ArrowDown":
                    this.toggleSelection(false);
                    break;
                case "Enter":
                case " ":
                    this.mainMenu.selectionConfirmed = true;
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'getSelectionSpan',
        value: function getSelectionSpan(theNum) {
            if (this.mainMenu.selectedValue === theNum) {
                return _react2.default.createElement(
                    'span',
                    { className: 'MainMenuBlink' },
                    '\xBB'
                );
            }

            return null;
        }
    }, {
        key: 'getComingSoonStyle',
        value: function getComingSoonStyle() {
            var toRet = {
                display: "inline-block",
                visibility: "hidden"
            };

            if (this.mainMenu.selectedValue === 2) {
                toRet["visibility"] = "visible";
            }

            return toRet;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'MainMenu' },
                _react2.default.createElement(
                    'div',
                    { className: 'MainMenuHeader' },
                    'pac-man'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'MainMenuAnimation' },
                    _react2.default.createElement(
                        'div',
                        { className: 'MainMenuAnimationItem' },
                        _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PINK_GHOST,
                            modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                            animating: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'MainMenuAnimationItem' },
                        _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_ORANGE_GHOST,
                            modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                            animating: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'MainMenuAnimationItem' },
                        _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_BLUE_GHOST,
                            modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                            animating: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'MainMenuAnimationItem' },
                        _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_RED_GHOST,
                            modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                            animating: true })
                    ),
                    _react2.default.createElement('div', { className: 'MainMenuAnimationItemBlank' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'MainMenuAnimationItem' },
                        _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_PAC_MAN,
                            modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                            animating: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'MainMenuAnimationItem' },
                        _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_MRS_PAC_MAN,
                            modifier: _Entity2.default.MODIFIER_DIRECTION_RIGHT,
                            animating: true })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'MainMenuItems' },
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellLeft' },
                                    this.getSelectionSpan(0)
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellRight' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Play!'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellLeft' },
                                    this.getSelectionSpan(1)
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellRight' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Train Player'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellLeft' },
                                    this.getSelectionSpan(2)
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellRight' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Watch Player'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellLeft' },
                                    this.getSelectionSpan(3)
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'MainMenuTableCellRight' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Watch Pre-Trained Player'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'mainMenu',
        get: function get() {
            return this.dataSource;
        }
    }]);

    return MainMenu;
}(_DataSourceComponent3.default);

MainMenu.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_MainMenu2.default).isRequired
};

exports.default = MainMenu;