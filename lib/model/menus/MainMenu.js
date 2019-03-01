"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("../DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _SoundPlayer = require("../../utils/SoundPlayer");

var _SoundPlayer2 = _interopRequireDefault(_SoundPlayer);

var _GameMode = require("../GameMode");

var _GameMode2 = _interopRequireDefault(_GameMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenu = function (_DataSourceBase) {
    _inherits(MainMenu, _DataSourceBase);

    function MainMenu() {
        _classCallCheck(this, MainMenu);

        var _this = _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).call(this));

        _this._selectedValue = _GameMode2.default.PLAY;
        _this._selectionConfirmed = false;
        _this._soundCompleteCallbackRef = function (e) {
            return _this._soundCompleteCallback(e);
        };
        _this._soundId = _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.intermission);
        return _this;
    }

    _createClass(MainMenu, [{
        key: "_soundCompleteCallback",
        value: function _soundCompleteCallback(e) {
            // setTimeout(function () {
            //     SoundPlayer.instance.play(SoundPlayer.instance.beginning, this._soundCompleteCallbackRef);
            // }.bind(this), 10000);
        }
    }, {
        key: "selectedValue",
        get: function get() {
            return this._selectedValue;
        },
        set: function set(value) {
            if (_GameMode2.default.ALL.indexOf(value) < 0) {
                throw new Error("Invalid selected player");
            }

            this._setValueAndRaiseOnChange("_selectedValue", value);
            _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.eatfruit);
        }
    }, {
        key: "numPlayers",
        get: function get() {
            return 1;
        }
    }, {
        key: "selectionConfirmed",
        get: function get() {
            return this._selectionConfirmed;
        },
        set: function set(value) {
            if (!this._selectionConfirmed && value) {
                _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.eatghost);

                if (this._soundId !== null) {
                    _SoundPlayer2.default.instance.intermission.stop(this._soundId);
                    this._soundId = null;
                }

                if (this.numPlayers === MainMenu.SELECTED_PLAYERS_2) {
                    return;
                }
            }

            this._setValueAndRaiseOnChange("_selectionConfirmed", value);
        }
    }]);

    return MainMenu;
}(_DataSourceBase3.default);

exports.default = MainMenu;