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

var _PowerUp = require('../model/actors/PowerUp');

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _Cell = require('../Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _Entity = require('../Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PowerUp = function (_DataSourceComponent) {
    _inherits(PowerUp, _DataSourceComponent);

    function PowerUp() {
        _classCallCheck(this, PowerUp);

        return _possibleConstructorReturn(this, (PowerUp.__proto__ || Object.getPrototypeOf(PowerUp)).apply(this, arguments));
    }

    _createClass(PowerUp, [{
        key: 'getEntityStyle',
        value: function getEntityStyle(currentGridLocation) {
            var toRet = {
                display: "none"
            };

            if (!this.powerup.isAlive) {
                return toRet;
            }

            if (currentGridLocation.isValid) {
                var cellLocation = _Cell2.default.getCellLocation(currentGridLocation);

                toRet.display = "block";
                toRet.position = "absolute";
                toRet.top = cellLocation.y - 2 + "px";
                toRet.left = cellLocation.x - 2 + "px";
                toRet.pointerEvents = "none";
                if (!this.powerup.editMode) {
                    var transitionStr = "top " + this.powerup.cellTransitionDuration + "s," + " left " + this.powerup.cellTransitionDuration + "s";
                    toRet.webKitTransition = transitionStr; /* Safari */
                    toRet.transition = transitionStr;
                }
            }

            return toRet;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'PowerUp', style: this.getEntityStyle(this.powerup.location) },
                _react2.default.createElement(_Entity2.default, { designator: _Entity2.default.DESIGNATOR_POWER_UP,
                    modifier: PowerUp.powerUpMap[this.powerup.powerUpType],
                    animating: this.props.animating,
                    blink: this.powerup.blink })
            );
        }
    }, {
        key: 'powerup',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'location',
        get: function get() {
            return this.powerup.location;
        }
    }, {
        key: 'level',
        get: function get() {
            return this.props.level;
        }
    }], [{
        key: 'powerUpMap',
        get: function get() {
            if (PowerUp._powerUpMap === null) {
                PowerUp._powerUpMap = {};
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_CHERRY] = _Entity2.default.MODIFIER_POWER_UP_CHERRY;
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_APPLE] = _Entity2.default.MODIFIER_POWER_UP_APPLE;
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_BANANA] = _Entity2.default.MODIFIER_POWER_UP_BANANA;
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_ORANGE] = _Entity2.default.MODIFIER_POWER_UP_PEACH;
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_PEAR] = _Entity2.default.MODIFIER_POWER_UP_PEAR;
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_PRETZEL] = _Entity2.default.MODIFIER_POWER_UP_PRETZEL;
                PowerUp._powerUpMap[_PowerUp2.default.POWER_UP_STRAWBERRY] = _Entity2.default.MODIFIER_POWER_UP_STRAWBERRY;
            }

            return PowerUp._powerUpMap;
        }
    }]);

    return PowerUp;
}(_DataSourceComponent3.default);

PowerUp._powerUpMap = null;


PowerUp.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_PowerUp2.default).isRequired,
    animating: _propTypes2.default.bool
};

PowerUp.defaultProps = {
    animating: true
};

exports.default = PowerUp;