"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./GameEntities.css");

var _GameObjectContainer = require("./model/GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _Player = require("./actors/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Ghost = require("./actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _DataSourceComponent2 = require("./DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Points = require("./Points");

var _Points2 = _interopRequireDefault(_Points);

var _PowerUp = require("./actors/PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _GameModal = require("./GameModal");

var _GameModal2 = _interopRequireDefault(_GameModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameEntities = function (_DataSourceComponent) {
    _inherits(GameEntities, _DataSourceComponent);

    function GameEntities() {
        _classCallCheck(this, GameEntities);

        return _possibleConstructorReturn(this, (GameEntities.__proto__ || Object.getPrototypeOf(GameEntities)).apply(this, arguments));
    }

    _createClass(GameEntities, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // I put this here so all the players don't end up in the top left
            // of the screen
            this.forceUpdate();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "GameEntities" },
                _react2.default.createElement(_Player2.default, { dataSource: this.gameObjectContainer.player }),
                _react2.default.createElement(_Ghost2.default, { dataSource: this.gameObjectContainer.ghostRed }),
                _react2.default.createElement(_Points2.default, { dataSource: this.gameObjectContainer.ghostRed.points }),
                _react2.default.createElement(_Ghost2.default, { dataSource: this.gameObjectContainer.ghostBlue }),
                _react2.default.createElement(_Points2.default, { dataSource: this.gameObjectContainer.ghostBlue.points }),
                _react2.default.createElement(_Ghost2.default, { dataSource: this.gameObjectContainer.ghostPink }),
                _react2.default.createElement(_Points2.default, { dataSource: this.gameObjectContainer.ghostPink.points }),
                _react2.default.createElement(_Ghost2.default, { dataSource: this.gameObjectContainer.ghostOrange }),
                _react2.default.createElement(_Points2.default, { dataSource: this.gameObjectContainer.ghostOrange.points }),
                _react2.default.createElement(_PowerUp2.default, { dataSource: this.gameObjectContainer.powerUp }),
                _react2.default.createElement(_Points2.default, { dataSource: this.gameObjectContainer.powerUp.points }),
                _react2.default.createElement(_GameModal2.default, { dataSource: this.gameObjectContainer.gameModal })
            );
        }
    }, {
        key: "gameObjectContainer",
        get: function get() {
            return this.dataSource;
        }
    }]);

    return GameEntities;
}(_DataSourceComponent3.default);

GameEntities.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_GameObjectContainer2.default).isRequired
};

exports.default = GameEntities;