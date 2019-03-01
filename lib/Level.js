'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Level.css');

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DataSourceComponent2 = require('./DataSourceComponent');

var _DataSourceComponent3 = _interopRequireDefault(_DataSourceComponent2);

var _Level = require('./model/Level');

var _Level2 = _interopRequireDefault(_Level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Level = function (_DataSourceComponent) {
    _inherits(Level, _DataSourceComponent);

    function Level() {
        _classCallCheck(this, Level);

        return _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).apply(this, arguments));
    }

    _createClass(Level, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            //TODO: FIX THIS --> THIS IS KIND OF HACKY
            if (this.dataSource !== nextProps.dataSource) {
                _Cell2.default.resetCellLocationCache();
            }

            _get(Level.prototype.__proto__ || Object.getPrototypeOf(Level.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
        }
    }, {
        key: 'renderCells',
        value: function renderCells(rowIndex) {
            var toRet = [];

            for (var colIndex = 0; colIndex < this.level.gameMatrix[rowIndex].length; colIndex++) {
                var currentCell = this.level.gameMatrix[rowIndex][colIndex];
                toRet.push(_react2.default.createElement(_Cell2.default, { key: "Cell_" + currentCell.id,
                    dataSource: currentCell }));
            }

            return toRet;
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var toRet = [];

            for (var rowIndex = 0; rowIndex < this.level.gameMatrix.length; rowIndex++) {
                var key = "Level_row_" + rowIndex;
                toRet.push(_react2.default.createElement(
                    'tr',
                    { key: key },
                    this.renderCells(rowIndex)
                ));
            }

            return toRet;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Level' },
                _react2.default.createElement(
                    'table',
                    { cellPadding: 0, cellSpacing: 0, style: this.tableStyle },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.renderRows()
                    )
                )
            );
        }
    }, {
        key: 'level',
        get: function get() {
            return this.dataSource;
        }
    }, {
        key: 'tableStyle',
        get: function get() {
            return {
                width: this.level.width * _Cell2.default.DEFAULT_CELL_WIDTH + "px",
                height: this.level.height * _Cell2.default.DEFAULT_CELL_HEIGHT + "px"
            };
        }
    }]);

    return Level;
}(_DataSourceComponent3.default);

Level.propTypes = {
    dataSource: _propTypes2.default.instanceOf(_Level2.default).isRequired
};

exports.default = Level;