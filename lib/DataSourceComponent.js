'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSourceComponent = function (_Component) {
    _inherits(DataSourceComponent, _Component);

    function DataSourceComponent(props) {
        _classCallCheck(this, DataSourceComponent);

        var _this = _possibleConstructorReturn(this, (DataSourceComponent.__proto__ || Object.getPrototypeOf(DataSourceComponent)).call(this, props));

        _this._callback = function (e) {
            return _this._dataSourceUpdated(e);
        };
        _this.state = {
            dataSource: props.dataSource
        };
        // this._propsModifiedSinceUpdate = [];
        // this._regexToIgnore = [];
        // this._propsToAccept = [];
        _this._debug = false;
        return _this;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //
    //     if (this._propsToAccept.length === 0) {
    //         this._propsModifiedSinceUpdate = [];
    //         this.log("shouldComponentUpdate = true");
    //         return true;
    //     }
    //
    //     if (this._propsToAccept.length > 0) {
    //         let theIntersection = _.intersection(this._propsToAccept, this._propsModifiedSinceUpdate);
    //         this._propsModifiedSinceUpdate = [];
    //         let toRet = theIntersection.length > 0;
    //         this.log("shouldComponentUpdate = " + toRet);
    //         return toRet;
    //     }
    //
    //     this._propsModifiedSinceUpdate = [];
    //     this.log("shouldComponentUpdate = true");
    //     return true;
    // }

    _createClass(DataSourceComponent, [{
        key: '_dataSourceUpdated',
        value: function _dataSourceUpdated(e) {

            // this._propsModifiedSinceUpdate.push(e.source);
            if (typeof e.forceUpdate !== "undefined" && e.forceUpdate) {
                this.forceUpdate();
            } else {
                this.setState({
                    dataSource: e.object
                });

                this.log("_dataSourceUpdated from " + e.source);
            }
        }
    }, {
        key: 'log',
        value: function log(toLog) {
            if (this.debug) {
                console.log(toLog);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.dataSource) {
                this.dataSource.addOnChangeCallback(this._callback);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.dataSource) {
                this.dataSource.removeOnChangeCallback(this._callback);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.dataSource !== nextProps.dataSource) {

                if (typeof this.props.dataSource !== "undefined" && typeof nextProps.dataSource !== "undefined" && _typeof(nextProps.dataSource) !== _typeof(this.props.dataSource)) {
                    throw new Error("Swapped out datasources should be of the same type");
                }

                if (!!this.props.dataSource) {
                    this.props.dataSource.removeOnChangeCallback(this._callback);
                }

                if (!!nextProps.dataSource) {
                    nextProps.dataSource.addOnChangeCallback(this._callback);
                }

                this.setState({
                    dataSource: nextProps.dataSource
                });

                this._dataSourceChanged();
            }
        }
    }, {
        key: '_dataSourceChanged',
        value: function _dataSourceChanged() {}
    }, {
        key: 'debug',
        get: function get() {
            return this._debug;
        },
        set: function set(value) {
            this._debug = value;
        }
    }, {
        key: 'dataSource',
        get: function get() {
            return this.state.dataSource;
        }
    }, {
        key: 'regexToIgnore',
        get: function get() {
            return this._regexToIgnore;
        }
    }]);

    return DataSourceComponent;
}(_react.Component);

DataSourceComponent.PropTypes = {
    dataSource: _propTypes2.default.object.isRequired
};

exports.default = DataSourceComponent;