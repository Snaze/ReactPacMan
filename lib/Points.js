'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DataSourceComponent2 = require('./DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _Points = require('./model/Points');

var _Points2 = _interopRequireDefault(_Points);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Points = function (_DataSourceComponent) {
    _inherits(Points, _DataSourceComponent);

    function Points() {
        _classCallCheck(this, Points);

        return _possibleConstructorReturn(this, (Points.__proto__ || Object.getPrototypeOf(Points)).apply(this, arguments));
    }

    _createClass(Points, [{
        key: '_dataSourceUpdated',
        value: function _dataSourceUpdated(e) {
            _get(Points.prototype.__proto__ || Object.getPrototypeOf(Points.prototype), '_dataSourceUpdated', this).call(this, e);
        }
    }, {
        key: 'getEntityStyle',
        value: function getEntityStyle(currentGridLocation) {
            var toRet = {
                display: "none"
            };

            if (this.points.pointsState === _Points2.default.POINTS_STATE_INVISIBLE) {
                // console.log("component - invisible");
                return toRet;
            }

            if (currentGridLocation.isValid) {
                // let cellModel = this.level.gameMatrix[spawnLocation.y][spawnLocation.x];
                var cellLocation = _Cell2.default.getCellLocation(currentGridLocation);

                toRet.display = "block";
                toRet.position = "absolute";
                toRet.top = cellLocation.y - 2 + "px";
                toRet.left = cellLocation.x - 2 + "px";
                toRet.pointerEvents = "none";
                // console.log ("visible or fade at: " + cellLocation.toCellId());

                if (this.points.pointsState === _Points2.default.POINTS_STATE_FADE) {
                    var transitionStr = "top 2s, left 2s, opacity 2s";
                    toRet.webKitTransition = transitionStr; /* Safari */
                    toRet.transition = transitionStr;
                    toRet.top = cellLocation.y - 16 + "px";
                    toRet.left = cellLocation.x + 16 + "px";
                    toRet.opacity = 0;
                }
            }

            return toRet;
        }
    }, {
        key: 'getPointsDesignator',
        value: function getPointsDesignator() {
            switch (this.points.pointsType) {
                case _Points2.default.POINTS_TYPE_GHOST_KILL:
                    return _Entity2.default.DESIGNATOR_BIG_SCORE;
                case _Points2.default.POINTS_TYPE_POWER_UP:
                    return _Entity2.default.DESIGNATOR_ROW_SCORE;
                default:
                    // this.log("warn: Entity.DESIGNATOR_NONE");
                    return _Entity2.default.DESIGNATOR_NONE;
            }
        }
    }, {
        key: 'getPointsModifier',
        value: function getPointsModifier() {
            switch (this.points.pointsType) {
                case _Points2.default.POINTS_TYPE_GHOST_KILL:
                    var toRet = Points.modifierScoreMapping["ghost_kill"][this.points.amount];
                    if (typeof toRet === "undefined") {
                        // this.log("warn: Entity.MODIFIER_NO_MODIFIER 1");
                        // this.log("this.points.amount = " + this.points.amount);
                        return _Entity2.default.MODIFIER_NO_MODIFIER;
                    }
                    return toRet;
                case _Points2.default.POINTS_TYPE_POWER_UP:
                    var toRet2 = Points.modifierScoreMapping["power_up"][this.points.amount];
                    if (typeof toRet2 === "undefined") {
                        // this.log("warn: Entity.MODIFIER_NO_MODIFIER 2");
                        // this.log("this.points.amount = " + this.points.amount);
                        return _Entity2.default.MODIFIER_NO_MODIFIER;
                    }
                    return toRet2;
                default:
                    // this.log("warn: Entity.MODIFIER_NO_MODIFIER 3");
                    return _Entity2.default.MODIFIER_NO_MODIFIER;

            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Points', style: this.getEntityStyle(this.points.location) },
                _react2.default.createElement(_Entity2.default, { designator: this.getPointsDesignator(),
                    modifier: this.getPointsModifier(),
                    animating: true })
            );
        }
    }, {
        key: 'points',
        get: function get() {
            return this.dataSource;
        }
    }]);

    return Points;
}(_DataSourceComponent3.default);

Points.modifierScoreMapping = {
    "ghost_kill": {
        200: _Entity2.default.MODIFIER_BIG_SCORE_200,
        400: _Entity2.default.MODIFIER_BIG_SCORE_400,
        800: _Entity2.default.MODIFIER_BIG_SCORE_800,
        1600: _Entity2.default.MODIFIER_BIG_SCORE_1600
    },
    "power_up": {
        100: _Entity2.default.MODIFIER_ROW_SCORE_100,
        200: _Entity2.default.MODIFIER_ROW_SCORE_200,
        500: _Entity2.default.MODIFIER_ROW_SCORE_500,
        700: _Entity2.default.MODIFIER_ROW_SCORE_700,
        1000: _Entity2.default.MODIFIER_ROW_SCORE_1000,
        2000: _Entity2.default.MODIFIER_ROW_SCORE_2000,
        5000: _Entity2.default.MODIFIER_ROW_SCORE_5000
    }
};


Points.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Points2.default).isRequired
};

exports.default = Points;