"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DataSourceComponent2 = require("./DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

require("./GameFooter.css");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GameFooter = require("./model/GameFooter");

var _GameFooter2 = _interopRequireDefault(_GameFooter);

var _Entity = require("./Entity");

var _Entity2 = _interopRequireDefault(_Entity);

var _Player = require("./model/actors/Player");

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modifierMap = {
    "Cherry": _Entity2.default.MODIFIER_POWER_UP_CHERRY,
    "Strawberry": _Entity2.default.MODIFIER_POWER_UP_STRAWBERRY,
    "Orange": _Entity2.default.MODIFIER_POWER_UP_PEACH, // TODO: FIX THE NAME OF THIS
    "Pretzel": _Entity2.default.MODIFIER_POWER_UP_PRETZEL,
    "Apple": _Entity2.default.MODIFIER_POWER_UP_APPLE,
    "Pear": _Entity2.default.MODIFIER_POWER_UP_PEAR,
    "Banana": _Entity2.default.MODIFIER_POWER_UP_BANANA
};

var GameFooter = function (_DataSourceComponent) {
    _inherits(GameFooter, _DataSourceComponent);

    function GameFooter() {
        _classCallCheck(this, GameFooter);

        return _possibleConstructorReturn(this, (GameFooter.__proto__ || Object.getPrototypeOf(GameFooter)).apply(this, arguments));
    }

    _createClass(GameFooter, [{
        key: "getLifeDesignator",
        value: function getLifeDesignator() {
            var activePlayerGender = this.gameFooter.getActivePlayerGender();

            if (activePlayerGender === _Player2.default.MR_PAC_MAN) {
                return _Entity2.default.DESIGNATOR_PAC_MAN;
            }

            return _Entity2.default.DESIGNATOR_MRS_PAC_MAN;
        }
    }, {
        key: "getLifeEntities",
        value: function getLifeEntities() {
            var toRet = [];

            for (var i = 0; i < this.gameFooter.numLives; i++) {
                toRet.push(_react2.default.createElement(
                    "div",
                    { key: "LifeEntity_" + i, style: { display: "inline-block" } },
                    _react2.default.createElement(_Entity2.default, { designator: this.getLifeDesignator(),
                        modifier: _Entity2.default.MODIFIER_DIRECTION_LEFT,
                        animating: false })
                ));
            }

            return toRet;
        }
    }, {
        key: "_getModifierByPowerUpName",
        value: function _getModifierByPowerUpName(powerUpName) {
            return modifierMap[powerUpName];
        }
    }, {
        key: "getPowerUpEntities",
        value: function getPowerUpEntities() {
            var toRet = [];
            var self = this;

            this.gameFooter.powerUps.forEach(function (powerUpName, index) {
                toRet.push(_react2.default.createElement(
                    "div",
                    { key: "PowerUpEntity_" + index, style: { display: "inline-block" } },
                    _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                        modifier: self._getModifierByPowerUpName(powerUpName),
                        animating: false })
                ));
            });

            return toRet;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "GameFooter" },
                _react2.default.createElement(
                    "table",
                    { className: "GameFooterTable" },
                    _react2.default.createElement(
                        "tbody",
                        null,
                        _react2.default.createElement(
                            "tr",
                            { className: "GameFooterRow" },
                            _react2.default.createElement(
                                "td",
                                { className: "GameFooterLeft" },
                                _react2.default.createElement(
                                    "div",
                                    { style: { display: "inline" } },
                                    this.getLifeEntities()
                                )
                            ),
                            _react2.default.createElement(
                                "td",
                                { className: "GameFooterRight" },
                                _react2.default.createElement(
                                    "div",
                                    { style: { display: "inline" } },
                                    this.getPowerUpEntities()
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "gameFooter",


        // constructor(props) {
        //     super(props);
        //
        //     // this.debug = true;
        // }

        get: function get() {
            return this.dataSource;
        }
    }]);

    return GameFooter;
}(_DataSourceComponent3.default);

GameFooter.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_GameFooter2.default).isRequired
};

exports.default = GameFooter;