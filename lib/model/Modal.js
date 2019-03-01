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

var buttonTypeYes = 0;
var buttonTypeNo = 1;

var Modal = function (_DataSourceBase) {
    _inherits(Modal, _DataSourceBase);

    _createClass(Modal, null, [{
        key: "BUTTON_YES",
        get: function get() {
            return buttonTypeYes;
        }
    }, {
        key: "BUTTON_NO",
        get: function get() {
            return buttonTypeNo;
        }
    }]);

    function Modal() {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

        _this._width = 400;
        _this._height = 400;
        _this._yesButtonText = "OK";
        _this._noButtonText = "CANCEL";
        _this._fontSize = 24;
        _this._title = "TITLE";
        _this._show = false;
        _this._buttonClick = null;
        return _this;
    }

    _createClass(Modal, [{
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_width", value);
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_height", value);
        }
    }, {
        key: "yesButtonText",
        get: function get() {
            return this._yesButtonText;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_yesButtonText", value);
        }
    }, {
        key: "noButtonText",
        get: function get() {
            return this._noButtonText;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_noButtonText", value);
        }
    }, {
        key: "fontSize",
        get: function get() {
            return this._fontSize;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_fontSize", value);
        }
    }, {
        key: "title",
        get: function get() {
            return this._title;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_title", value);
        }
    }, {
        key: "show",
        get: function get() {
            return this._show;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_show", value);
        }
    }, {
        key: "buttonClick",
        get: function get() {
            return this._buttonClick;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_buttonClick", value);
        }
    }]);

    return Modal;
}(_DataSourceBase3.default);

exports.default = Modal;