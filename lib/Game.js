"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Game.css");

var _DataSourceComponent2 = require("./DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Game = require("./model/Game");

var _Game2 = _interopRequireDefault(_Game);

var _MainMenu = require("./menus/MainMenu");

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _LevelRunner = require("./LevelRunner");

var _LevelRunner2 = _interopRequireDefault(_LevelRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_DataSourceComponent) {
    _inherits(Game, _DataSourceComponent);

    function Game() {
        _classCallCheck(this, Game);

        return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
    }

    _createClass(Game, [{
        key: "getGameContent",
        value: function getGameContent() {
            if (!this.game.gameStarted) {
                return _react2.default.createElement(_MainMenu2.default, { dataSource: this.game.mainMenu });
            }

            return _react2.default.createElement(_LevelRunner2.default, { dataSource: this.game.levelRunner });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                this.getGameContent()
            );
        }
    }, {
        key: "game",


        // constructor(props) {
        //     super(props);
        //
        //     this.debug = true;
        // }

        get: function get() {
            return this.dataSource;
        }
    }]);

    return Game;
}(_DataSourceComponent3.default);

Game.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Game2.default).isRequired
};

exports.default = Game;