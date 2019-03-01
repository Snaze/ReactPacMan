"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DataSourceComponent2 = require("./DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

require("./GameModal.css");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GameModal = require("./model/GameModal");

var _GameModal2 = _interopRequireDefault(_GameModal);

var _Modal = require("./Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _CountDownMenu = require("./menus/CountDownMenu");

var _CountDownMenu2 = _interopRequireDefault(_CountDownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameModal = function (_DataSourceComponent) {
    _inherits(GameModal, _DataSourceComponent);

    function GameModal() {
        _classCallCheck(this, GameModal);

        return _possibleConstructorReturn(this, (GameModal.__proto__ || Object.getPrototypeOf(GameModal)).apply(this, arguments));
    }

    _createClass(GameModal, [{
        key: "getModalContent",
        value: function getModalContent() {

            switch (this.gameModal.mode) {
                case _GameModal2.default.MODAL_MODE_GAME_OVER:
                    return _react2.default.createElement(
                        "div",
                        { className: "GameModalTextContent" },
                        this.gameModal.gameOverText
                    );
                case _GameModal2.default.MODAL_MODE_COUNTDOWN:
                    return _react2.default.createElement(_CountDownMenu2.default, { dataSource: this.gameModal.countDownMenu });
                case _GameModal2.default.MODAL_MODE_GAME_PAUSED:
                    return _react2.default.createElement(
                        "div",
                        { className: "GameModalTextContent" },
                        this.gameModal.pausedText
                    );
                default:
                    throw new Error("Unknown gameModel.mode entered");
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _Modal2.default,
                { dataSource: this.gameModal.modal },
                _react2.default.createElement(
                    "div",
                    { style: { paddingTop: "50px" } },
                    this.getModalContent()
                )
            );
        }
    }, {
        key: "gameModal",
        get: function get() {
            return this.dataSource;
        }
    }]);

    return GameModal;
}(_DataSourceComponent3.default);

GameModal.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_GameModal2.default).isRequired
};

exports.default = GameModal;