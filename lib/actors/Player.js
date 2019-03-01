'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DataSourceComponent2 = require('../DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _Player = require('../model/actors/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Cell = require('../Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_DataSourceComponent) {
    _inherits(Player, _DataSourceComponent);

    function Player() {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
    }

    _createClass(Player, [{
        key: 'getEntityStyle',
        value: function getEntityStyle(currentGridLocation) {
            var toRet = {
                display: "none"
            };

            if (currentGridLocation.isValid) {
                // let cellModel = this.level.gameMatrix[spawnLocation.y][spawnLocation.x];
                var cellLocation = _Cell2.default.getCellLocation(currentGridLocation);

                toRet.display = "block";
                toRet.position = "absolute";
                toRet.top = cellLocation.y - 2 + "px";
                toRet.left = cellLocation.x - 2 + "px";
                toRet.pointerEvents = "none";
                toRet.overflow = "hidden";
                if (!this.player.editMode) {
                    var transitionStr = "top " + this.player.cellTransitionDuration + "s," + " left " + this.player.cellTransitionDuration + "s";
                    toRet.webKitTransition = transitionStr; /* Safari */
                    toRet.transition = transitionStr;
                }
            }

            return toRet;
        }
    }, {
        key: 'getPlayerEntityGender',
        value: function getPlayerEntityGender() {
            switch (this.player.gender) {
                case _Player2.default.MR_PAC_MAN:
                    return _Entity2.default.DESIGNATOR_PAC_MAN;
                case _Player2.default.MRS_PAC_MAN:
                    return _Entity2.default.DESIGNATOR_MRS_PAC_MAN;
                default:
                    throw new Error("Unknown player gender found");
            }
        }
    }, {
        key: 'getPlayerModifier',
        value: function getPlayerModifier() {
            if (this.player.isAlive) {
                return this.player.direction;
            }

            return _Entity2.default.MODIFIER_DEAD;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Player', style: this.getEntityStyle(this.player.location) },
                _react2.default.createElement(_Entity2.default, { designator: this.getPlayerEntityGender(),
                    modifier: this.getPlayerModifier(),
                    animating: this.player.animating })
            );
        }
    }, {
        key: 'player',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'location',
        get: function get() {
            return this.player.location;
        }
    }, {
        key: 'level',
        get: function get() {
            return this.props.level;
        }
    }]);

    return Player;
}(_DataSourceComponent3.default);

Player.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Player2.default).isRequired,
    animating: _propTypes2.default.bool
};

Player.defaultProps = {
    animating: true
};

exports.default = Player;