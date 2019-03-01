"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("../DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountDownMenu = function (_DataSourceBase) {
    _inherits(CountDownMenu, _DataSourceBase);

    function CountDownMenu() {
        _classCallCheck(this, CountDownMenu);

        var _this = _possibleConstructorReturn(this, (CountDownMenu.__proto__ || Object.getPrototypeOf(CountDownMenu)).call(this));

        _this._count = 3;
        _this._finishText = "GO!";
        _this._callback = null;
        _this._intervalTickRef = function (e) {
            return _this.intervalTick(e);
        };
        _this._interval = null;
        _this._showAnimation = false;
        return _this;
    }

    _createClass(CountDownMenu, [{
        key: "start",
        value: function start() {
            this.stop();

            this._interval = setInterval(this._intervalTickRef, 1000);
        }
    }, {
        key: "stop",
        value: function stop() {
            if (this._interval !== null) {
                clearInterval(this._interval);
                this._interval = null;
            }
        }
    }, {
        key: "intervalTick",
        value: function intervalTick(e) {
            this.count -= 1;

            if (this.count <= 0) {
                this.stop();

                if (this._callback) {
                    setTimeout(function () {
                        this._callback(this);
                    }.bind(this), 1000);
                }
            }
        }
    }, {
        key: "count",
        get: function get() {
            return this._count;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_count", value);
        }
    }, {
        key: "callback",
        get: function get() {
            return this._callback;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_callback", value);
        }
    }, {
        key: "finishText",
        get: function get() {
            return this._finishText;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_finishText", value);
        }
    }, {
        key: "showAnimation",
        get: function get() {
            return this._showAnimation;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_showAnimation", value);
        }
    }]);

    return CountDownMenu;
}(_DataSourceBase3.default);

exports.default = CountDownMenu;