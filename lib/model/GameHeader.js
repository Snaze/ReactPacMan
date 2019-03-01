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

var high_score_string = "highScore";

var GameHeader = function (_DataSourceBase) {
    _inherits(GameHeader, _DataSourceBase);

    _createClass(GameHeader, null, [{
        key: "HIGH_SCORE_STRING",
        get: function get() {
            return high_score_string;
        }
    }]);

    function GameHeader(player1, player2) {
        _classCallCheck(this, GameHeader);

        var _this = _possibleConstructorReturn(this, (GameHeader.__proto__ || Object.getPrototypeOf(GameHeader)).call(this));

        if (player1 === null) {
            throw new Error("Player1 must have a value");
        }

        _this._player1 = _this._wireUp("_player1", player1);

        if (player2 !== null) {
            _this._player2 = _this._wireUp("_player2", player2);
        } else {
            _this._player2 = null;
        }

        _this._highScore = _this.localStorageHighScore;
        _this.toIgnore.push("_state");
        return _this;
    }

    _createClass(GameHeader, [{
        key: "persistHighScore",
        value: function persistHighScore() {
            this.localStorageHighScore = Math.max(this.player1Score, this.player2Score, this.highScore);
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {
            if (e.source === "_score") {
                var highScore = Math.max(this.player1Score, this.player2Score, this._highScore);
                this._setValueAndRaiseOnChange("_highScore", highScore);

                _get(GameHeader.prototype.__proto__ || Object.getPrototypeOf(GameHeader.prototype), "_nestedDataSourceChanged", this).call(this, e);
            }
        }
    }, {
        key: "localStorageHighScore",
        get: function get() {
            var theHighScore = 0;

            try {
                theHighScore = localStorage.getItem(GameHeader.HIGH_SCORE_STRING);

                if (theHighScore) {
                    return theHighScore;
                }
            } catch (e) {
                this.log("localStorage not working.");
                // DO SOMETHING HERE
            }

            return 0;
        },
        set: function set(value) {
            try {
                localStorage.setItem(GameHeader.HIGH_SCORE_STRING, value);
            } catch (e) {
                this.log("localStorage not working.");
            }
        }
    }, {
        key: "player1Score",
        get: function get() {
            return this._player1.score;
        }
    }, {
        key: "player2Score",
        get: function get() {
            if (this._player2 !== null) {
                return this._player2.score;
            }

            return 0;
        }
    }, {
        key: "player1",
        get: function get() {
            return this._player1;
        },
        set: function set(value) {
            if (this._player1 !== null) {
                this._unWire(this._player1);
            }

            this._setValueAndRaiseOnChange("_player1", value);
        }
    }, {
        key: "player2",
        get: function get() {
            return this._player2;
        },
        set: function set(value) {
            if (this._player2 !== null) {
                this._unWire(this._player2);
            }

            this._setValueAndRaiseOnChange("_player2", value);
        }
    }, {
        key: "highScore",
        get: function get() {
            return this._highScore;
        }
    }]);

    return GameHeader;
}(_DataSourceBase3.default);

exports.default = GameHeader;