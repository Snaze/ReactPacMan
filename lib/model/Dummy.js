"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dummy = function (_DataSourceBase) {
    _inherits(Dummy, _DataSourceBase);

    function Dummy() {
        _classCallCheck(this, Dummy);

        var _this = _possibleConstructorReturn(this, (Dummy.__proto__ || Object.getPrototypeOf(Dummy)).call(this));

        _this._tickNumber = 0;
        _this._interval = setInterval(function (e) {
            return _this.tickCallback(e);
        }, 1000);
        return _this;
    }

    _createClass(Dummy, [{
        key: "tickCallback",
        value: function tickCallback(e) {
            this.tickNumber = this.tickNumber + 1;
        }
    }, {
        key: "tickNumber",
        get: function get() {
            return this._tickNumber;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_tickNumber", value);
        }
    }]);

    return Dummy;
}(_DataSourceBase3.default);

exports.default = Dummy;