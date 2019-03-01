"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var active_player_1 = 1;
var active_player_2 = 2;
var valid_active_players = [active_player_1, active_player_2];

var GameFooter = function (_DataSourceBase) {
    _inherits(GameFooter, _DataSourceBase);

    _createClass(GameFooter, null, [{
        key: "ACTIVE_PLAYER_1",
        get: function get() {
            return active_player_1;
        }
    }, {
        key: "ACTIVE_PLAYER_2",
        get: function get() {
            return active_player_2;
        }
    }]);

    function GameFooter(player1, player2, level, activePlayer) {
        _classCallCheck(this, GameFooter);

        var _this = _possibleConstructorReturn(this, (GameFooter.__proto__ || Object.getPrototypeOf(GameFooter)).call(this));

        if (valid_active_players.indexOf(activePlayer) < 0) {
            throw new Error("Invalid Active Player");
        }

        if (player1.gender === player2.gender) {
            throw new Error("Players should have different genders");
        }

        _this._player1 = _this._wireUp("_player1", player1);
        _this._player2 = _this._wireUp("_player2", player2);
        _this._level = _this._wireUp("_level", level);
        _this._activePlayer = activePlayer;
        _this._powerUps = null;
        _this._numLives = 0;

        if (_this._activePlayer === GameFooter.ACTIVE_PLAYER_1) {
            _this._numLives = _this._player1._numLives;
        } else {
            _this._numLives = _this._player2._numLives;
        }
        return _this;
    }

    _createClass(GameFooter, [{
        key: "_handlePlayerValueChance",
        value: function _handlePlayerValueChance(e, player) {
            if (e.source === "_numLives") {
                this.numLives = player.numLives;
            }
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            if (e.object === this._player1 && this._activePlayer === GameFooter.ACTIVE_PLAYER_1) {
                this._handlePlayerValueChance(e, this._player1);

                _get(GameFooter.prototype.__proto__ || Object.getPrototypeOf(GameFooter.prototype), "_nestedDataSourceChanged", this).call(this, e);
            } else if (e.object === this._player2 && this._activePlayer === GameFooter.ACTIVE_PLAYER_2) {
                this._handlePlayerValueChance(e, this._player2);

                _get(GameFooter.prototype.__proto__ || Object.getPrototypeOf(GameFooter.prototype), "_nestedDataSourceChanged", this).call(this, e);
            }
        }
    }, {
        key: "getPlayer",
        value: function getPlayer() {
            if (this.activePlayer === active_player_1) {
                return this._player1;
            } else if (this.activePlayer === active_player_2) {
                return this._player2;
            }

            throw new Error("You should never get here");
        }
    }, {
        key: "getActivePlayerGender",
        value: function getActivePlayerGender() {
            if (this._activePlayer === GameFooter.ACTIVE_PLAYER_1) {
                return this._player1.gender;
            }

            return this._player2.gender;
        }
    }, {
        key: "activePlayer",
        get: function get() {
            return this._activePlayer;
        },
        set: function set(value) {
            if (value === GameFooter.ACTIVE_PLAYER_1) {
                this.numLives = this._player1.numLives;
            } else {
                this.numLives = this._player2.numLives;
            }

            this._setValueAndRaiseOnChange("_activePlayer", value);
        }
    }, {
        key: "powerUps",
        get: function get() {
            return this._level.powerUps;
        }
    }, {
        key: "numLives",
        get: function get() {
            return this._numLives;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_numLives", value);
        }
    }, {
        key: "level",
        get: function get() {
            return this._level;
        },
        set: function set(value) {
            if (this._level) {
                this._unWire(this._level);
                this._level = null;
            }

            this._setValueAndRaiseOnChange("_level", value);
        }
    }]);

    return GameFooter;
}(_DataSourceBase3.default);

exports.default = GameFooter;