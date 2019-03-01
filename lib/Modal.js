'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DataSourceComponent2 = require('./DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../node_modules/animate.css/animate.css');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

require('./Modal.css');

var _Modal = require('./model/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_DataSourceComponent) {
    _inherits(Modal, _DataSourceComponent);

    function Modal() {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
    }

    _createClass(Modal, [{
        key: 'buttonClick',
        value: function buttonClick(e) {
            if (this.modal.buttonClick) {
                var buttonType = _Modal2.default.BUTTON_YES;

                if (e.target.id === "modalNoButton") {
                    buttonType = _Modal2.default.BUTTON_NO;
                }

                this.modal.buttonClick({
                    buttonType: buttonType,
                    event: e
                });
            }
        }
    }, {
        key: 'elements',
        value: function elements() {
            if (this.modal.show) {
                return _react2.default.createElement(
                    'div',
                    { key: 'TEST', className: 'ModalContent', style: this.style },
                    this.header,
                    _react2.default.createElement(
                        'div',
                        { className: 'ModalText' },
                        this.props.children
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'ModalButtons' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ModalYesNoButtons', style: this.buttonsStyle },
                            this.yesButton,
                            this.noButton
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
                { className: 'Modal' },
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    {
                        transitionName: 'Modal',
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 500 },
                    this.elements()
                )
            );
        }
    }, {
        key: 'modal',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'style',
        get: function get() {
            var self = this;

            return {
                // width: self.modal.width,
                // height: self.modal.height,
                fontSize: self.modal.fontSize
            };
        }
    }, {
        key: 'noButton',
        get: function get() {
            var _this2 = this;

            if (this.modal.noButtonText !== "") {
                return _react2.default.createElement(
                    'button',
                    { id: 'modalNoButton', className: 'ModalButton', onClick: function onClick(e) {
                            return _this2.buttonClick(e);
                        } },
                    this.modal.noButtonText
                );
            }

            return null;
        }
    }, {
        key: 'yesButton',
        get: function get() {
            var _this3 = this;

            if (this.modal.yesButtonText !== "") {
                return _react2.default.createElement(
                    'button',
                    { id: 'modalYesButton', className: 'ModalButton', onClick: function onClick(e) {
                            return _this3.buttonClick(e);
                        } },
                    this.modal.yesButtonText
                );
            }

            return null;
        }
    }, {
        key: 'header',
        get: function get() {
            if (this.modal.title !== "") {
                return _react2.default.createElement(
                    'div',
                    { className: 'ModalHeader' },
                    this.modal.title
                );
            }

            return null;
        }
    }, {
        key: 'buttonsStyle',
        get: function get() {
            if (this.noButtonText === "" && this.yesButtonText === "") {
                return {
                    display: "none"
                };
            }

            return {
                display: "inline"
            };
        }
    }]);

    return Modal;
}(_DataSourceComponent3.default);

Modal.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Modal2.default).isRequired
};

exports.default = Modal;