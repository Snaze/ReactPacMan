"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Modal = require("./Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _CountDownMenu = require("./menus/CountDownMenu");

var _CountDownMenu2 = _interopRequireDefault(_CountDownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modal_mode_countdown = 0;
var modal_mode_game_over = 1;
var modal_mode_game_paused = 2;

var GameModal = function (_DataSourceBase) {
    _inherits(GameModal, _DataSourceBase);

    _createClass(GameModal, null, [{
        key: "MODAL_MODE_COUNTDOWN",
        get: function get() {
            return modal_mode_countdown;
        }
    }, {
        key: "MODAL_MODE_GAME_OVER",
        get: function get() {
            return modal_mode_game_over;
        }
    }, {
        key: "MODAL_MODE_GAME_PAUSED",
        get: function get() {
            return modal_mode_game_paused;
        }
    }]);

    function GameModal() {
        _classCallCheck(this, GameModal);

        var _this = _possibleConstructorReturn(this, (GameModal.__proto__ || Object.getPrototypeOf(GameModal)).call(this));

        _this._modalDismissedCallback = null;
        _this._modal = new _Modal2.default();
        _this._countDownMenu = new _CountDownMenu2.default();
        _this._gameOverText = "";

        _this._countDownCallbackRef = function (e) {
            return _this._countDownCallback(e);
        };
        _this._countDownMenu.callback = _this._countDownCallbackRef;

        _this._modalButtonClickRef = function (e) {
            return _this._modalButtonClick(e);
        };
        _this._modal.buttonClick = _this._modalButtonClickRef;
        _this._mode = GameModal.MODAL_MODE_COUNTDOWN;
        _this._visible = false;

        _this._pausedText = "Game Paused";
        return _this;
    }

    _createClass(GameModal, [{
        key: "hideModal",
        value: function hideModal() {
            this.modal.show = false;
            this.visible = false;

            if (this.modalDismissedCallback) {
                this.modalDismissedCallback(this);
            }
        }
    }, {
        key: "_modalButtonClick",
        value: function _modalButtonClick(e) {
            this.hideModal();
        }
    }, {
        key: "_countDownCallback",
        value: function _countDownCallback(e) {
            this.hideModal();
        }
    }, {
        key: "showPausedModal",
        value: function showPausedModal() {
            this._mode = GameModal.MODAL_MODE_GAME_PAUSED;
            this._modal.yesButtonText = "";
            this._modal.noButtonText = "";
            this._modal.title = "GAME PAUSED";
            this._modal.height = 150;
            this._modal.width = 300;
            this._modal.show = true;
            this.visible = true;
        }
    }, {
        key: "showCountDownModal",
        value: function showCountDownModal() {
            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

            this._mode = GameModal.MODAL_MODE_COUNTDOWN;

            this._modal.yesButtonText = "";
            this._modal.noButtonText = "";
            this._modal.title = "READY!";
            this._modal.height = 150;
            this._modal.width = 300;
            this._modal.show = true;
            this.visible = true;

            this._countDownMenu.count = count;
            this._countDownMenu.start();
        }
    }, {
        key: "showGameOverModal",
        value: function showGameOverModal(score, levelNum) {
            this._mode = GameModal.MODAL_MODE_GAME_OVER;

            this.gameOverText = "Score=" + score + " Level=" + levelNum;

            this._modal.yesButtonText = "OK";
            this._modal.noButtonText = "";
            this._modal.title = "GAME OVER!";
            this._modal.height = 150;
            this._modal.width = 300;
            this._modal.show = true;
            this.visible = true;
        }
    }, {
        key: "modalDismissedCallback",
        get: function get() {
            return this._modalDismissedCallback;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_modalDismissedCallback", value);
        }
    }, {
        key: "modal",
        get: function get() {
            return this._modal;
        }
    }, {
        key: "countDownMenu",
        get: function get() {
            return this._countDownMenu;
        }
    }, {
        key: "mode",
        get: function get() {
            return this._mode;
        }
    }, {
        key: "visible",
        get: function get() {
            return this._visible;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_visible", value);
        }
    }, {
        key: "gameOverText",
        get: function get() {
            return this._gameOverText;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_gameOverText", value);
        }
    }, {
        key: "pausedText",
        get: function get() {
            return this._pausedText;
        }
    }]);

    return GameModal;
}(_DataSourceBase3.default);

exports.default = GameModal;