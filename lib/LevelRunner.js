'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LevelRunner = require('./model/LevelRunner');

var _LevelRunner2 = _interopRequireDefault(_LevelRunner);

var _Level = require('./Level');

var _Level2 = _interopRequireDefault(_Level);

var _LevelEditPanel = require('./LevelEditPanel');

var _LevelEditPanel2 = _interopRequireDefault(_LevelEditPanel);

var _DataSourceComponent2 = require('./DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

require('./LevelRunner.css');

var _ContextMenu = require('./ContextMenu');

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _GameHeader = require('./GameHeader');

var _GameHeader2 = _interopRequireDefault(_GameHeader);

var _GameFooter = require('./GameFooter');

var _GameFooter2 = _interopRequireDefault(_GameFooter);

var _GameEntities = require('./GameEntities');

var _GameEntities2 = _interopRequireDefault(_GameEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelRunner = function (_DataSourceComponent) {
    _inherits(LevelRunner, _DataSourceComponent);

    function LevelRunner() {
        _classCallCheck(this, LevelRunner);

        return _possibleConstructorReturn(this, (LevelRunner.__proto__ || Object.getPrototypeOf(LevelRunner)).apply(this, arguments));
    }

    _createClass(LevelRunner, [{
        key: 'levelEditPanel_onLoadComplete',
        value: function levelEditPanel_onLoadComplete(theLevel) {
            this.levelRunner.level = theLevel;
        }
    }, {
        key: 'buttonToggleEdit_Click',
        value: function buttonToggleEdit_Click(e) {
            this.levelRunner.editMode = !this.levelRunner.editMode;
        }
    }, {
        key: 'editPanelStyle',
        value: function editPanelStyle() {
            if (this.levelRunner.editPanelEnabled) {
                return {
                    display: "inline"
                };
            }

            return {
                display: "none"
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'LevelRunner' },
                _react2.default.createElement(
                    'div',
                    { className: 'LevelRunnerLevel' },
                    _react2.default.createElement(
                        'table',
                        { id: 'tblLevelRunner', className: this.levelRunnerLevelClass },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_GameHeader2.default, { dataSource: this.gameHeader })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_Level2.default, { dataSource: this.level, gameObjectContainer: this.gameObjectContainer }),
                                    _react2.default.createElement(_GameEntities2.default, { dataSource: this.gameObjectContainer })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_GameFooter2.default, { dataSource: this.gameFooter })
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: this.editPanelStyle() },
                    _react2.default.createElement(
                        'div',
                        { className: this.levelRunner.editMode ? "LevelRunnerLevelEditorPanel" : "LevelRunnerLevelEditorPanelHide" },
                        _react2.default.createElement(
                            'div',
                            { className: 'ButtonToggleEdit',
                                onClick: function onClick(e) {
                                    return _this2.buttonToggleEdit_Click(e);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'ButtonToggleEditText' },
                                this.levelRunner.editMode ? "Play!" : "Edit!"
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'LevelRunnerPanel' },
                            _react2.default.createElement(_LevelEditPanel2.default, { dataSource: this.level,
                                onLoadComplete: function onLoadComplete(e) {
                                    return _this2.levelEditPanel_onLoadComplete(e);
                                } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'LevelRunnerPanel' },
                            _react2.default.createElement(_ContextMenu2.default, { dataSource: this.level.selectedCell, editMode: this.level.editMode })
                        )
                    )
                )
            );
        }
    }, {
        key: 'level',
        get: function get() {
            return this.levelRunner.level;
        }
    }, {
        key: 'gameObjectContainer',
        get: function get() {
            return this.levelRunner.gameObjectContainer;
        }
    }, {
        key: 'gameFooter',
        get: function get() {
            return this.levelRunner.gameFooter;
        }
    }, {
        key: 'gameHeader',
        get: function get() {
            return this.levelRunner.gameHeader;
        }
    }, {
        key: 'levelRunner',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'levelRunnerLevelClass',
        get: function get() {
            if (this.levelRunner.editPanelEnabled) {
                return "LevelRunnerArea";
            }

            return "LevelRunnerAreaCenter";
        }
    }], [{
        key: 'getLevelStyle',
        value: function getLevelStyle(level) {
            return {
                width: level.screenWidth,
                height: level.screenHeight
            };
        }
    }]);

    return LevelRunner;
}(_DataSourceComponent3.default);

LevelRunner.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_LevelRunner2.default).isRequired
};

exports.default = LevelRunner;