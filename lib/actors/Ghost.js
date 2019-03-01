"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Entity = require("../Entity");

var _Entity2 = _interopRequireDefault(_Entity);

var _Direction = require("../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DataSourceComponent2 = require("../DataSourceComponent");

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _Ghost = require("../model/actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _Cell = require("../Cell");

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ghost = function (_DataSourceComponent) {
    _inherits(Ghost, _DataSourceComponent);

    function Ghost(props) {
        _classCallCheck(this, Ghost);

        var _this = _possibleConstructorReturn(this, (Ghost.__proto__ || Object.getPrototypeOf(Ghost)).call(this, props));

        _this.state.direction = _Direction2.default.LEFT;
        return _this;
    }

    _createClass(Ghost, [{
        key: "getEntityStyle",
        value: function getEntityStyle(currentGridLocation) {
            var toRet = {
                display: "none"
            };

            if (currentGridLocation.isValid) {
                var cellLocation = _Cell2.default.getCellLocation(currentGridLocation);

                toRet.display = "block";
                toRet.position = "absolute";
                toRet.top = cellLocation.y - 2 + "px";
                toRet.left = cellLocation.x - 2 + "px";
                toRet.pointerEvents = "none";
                if (!this.ghost.editMode) {
                    var transitionStr = "top " + this.ghost.cellTransitionDuration + "s," + " left " + this.ghost.cellTransitionDuration + "s";
                    toRet.webKitTransition = transitionStr; /* Safari */
                    toRet.transition = transitionStr;
                }
            }

            return toRet;
        }
    }, {
        key: "getGhostEntityColor",
        value: function getGhostEntityColor() {
            if (!this.ghost.isAlive) {
                return _Entity2.default.DESIGNATOR_EYES;
            }

            if (this.ghost.scaredState === _Ghost2.default.SCARED_STATE_SCARED) {
                return _Entity2.default.DESIGNATOR_SCARED_GHOST;
            }

            if (this.ghost.scaredState === _Ghost2.default.SCARED_STATE_SCARED_FLASH) {
                return _Entity2.default.DESIGNATOR_FLASH_GHOST;
            }

            switch (this.ghost.color) {
                case _Ghost2.default.RED:
                    return _Entity2.default.DESIGNATOR_RED_GHOST;
                case _Ghost2.default.BLUE:
                    return _Entity2.default.DESIGNATOR_BLUE_GHOST;
                case _Ghost2.default.PINK:
                    return _Entity2.default.DESIGNATOR_PINK_GHOST;
                case _Ghost2.default.ORANGE:
                    return _Entity2.default.DESIGNATOR_ORANGE_GHOST;
                default:
                    throw new Error("Unknown ghost color found.");
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "Ghost" },
                _react2.default.createElement(
                    "div",
                    { style: this.getEntityStyle(this.ghost.location) },
                    _react2.default.createElement(_Entity2.default, { designator: this.getGhostEntityColor(),
                        modifier: this.ghost.direction,
                        animating: this.props.animating })
                )
            );
        }
    }, {
        key: "ghost",
        get: function get() {
            return this.dataSource;
        }
    }]);

    return Ghost;
}(_DataSourceComponent3.default);

Ghost.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Ghost2.default).isRequired,
    animating: _propTypes2.default.bool
};

Ghost.defaultProps = {
    animating: true
};

exports.default = Ghost;