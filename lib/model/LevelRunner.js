"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _GameObjectContainer = require("./GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _GameHeader = require("./GameHeader");

var _GameHeader2 = _interopRequireDefault(_GameHeader);

var _GameFooter = require("./GameFooter");

var _GameFooter2 = _interopRequireDefault(_GameFooter);

var _LevelFactory = require("./LevelFactory");

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

var _GameMode = require("./GameMode");

var _GameMode2 = _interopRequireDefault(_GameMode);

var _Assert = require("../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelRunner = function (_DataSourceBase) {
    _inherits(LevelRunner, _DataSourceBase);

    function LevelRunner(levelName) {
        _classCallCheck(this, LevelRunner);

        var _this = _possibleConstructorReturn(this, (LevelRunner.__proto__ || Object.getPrototypeOf(LevelRunner)).call(this));

        _this._editMode = false;
        _this._levelName = levelName;
        _this._level = _this._wireUp("_level", _LevelFactory2.default.createLevel(levelName));
        _this._gameObjectContainer = new _GameObjectContainer2.default(_this._level);
        _this._gameObjectContainer.paused = true;
        _this._editPanelEnabled = false;

        _this._gameHeader = new _GameHeader2.default(_this._gameObjectContainer.player, _this._gameObjectContainer.player2);

        _this._gameFooter = new _GameFooter2.default(_this._gameObjectContainer.player, _this._gameObjectContainer.player2, _this._level, _GameFooter2.default.ACTIVE_PLAYER_1);

        _this._levelFinished = false;
        _this._gameObjectContainerCallbackRef = function (e) {
            return _this.gameObjectContainerCallback(e);
        };
        _this._gameObjectContainer.callback = _this._gameObjectContainerCallbackRef;
        _this._levelNum = 1;
        _this._level.leveNum = _this._levelNum;
        _this._gameOver = false;
        return _this;
    }

    _createClass(LevelRunner, [{
        key: "gameObjectContainerCallback",
        value: function gameObjectContainerCallback(e) {
            if (e.callbackType === _GameObjectContainer2.default.CALLBACK_TYPE_LEVEL_FINISHED) {
                this.levelFinished = true;
            } else {
                this.gameOver = true;
                this.gameObjectContainer.player.resetNumLives();
                this.gameObjectContainer.player.score = 0;
            }
        }
    }, {
        key: "startLevel",
        value: function startLevel(levelName) {
            var forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var levelNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            var gameMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _GameMode2.default.PLAY;


            (0, _Assert.assert)(_GameMode2.default.ALL.indexOf(gameMode) >= 0, "Invalid Game Mode");

            this.loadLevel(levelName, forceReload, levelNum);

            this.levelFinished = false;
            this.gameOver = false;
            this._gameObjectContainer.gameMode = gameMode;
            this._gameObjectContainer.startOrRestartLevel();
        }
    }, {
        key: "loadLevel",
        value: function loadLevel(levelName, forceReload, levelNum) {
            this._levelNum = levelNum;

            if (this._levelName !== levelName || forceReload) {
                this._levelName = levelName;
                this._unWire(this._level);

                var oldLevel = this._level;
                var newLevel = this._wireUp("_level", _LevelFactory2.default.createLevel(levelName));
                newLevel.levelNum = levelNum;
                this._gameObjectContainer.level = newLevel;
                this._gameFooter.level = newLevel;
                this._level = newLevel;
                this._gameHeader.persistHighScore();
                oldLevel.dispose();
                oldLevel = null;
            }
        }
    }, {
        key: "reloadLevel",
        value: function reloadLevel() {
            this.loadLevel(this._levelName, true, this._levelNum);
        }
    }, {
        key: "editPanelEnabled",
        get: function get() {
            return this._editPanelEnabled;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_editPanelEnabled", value);
        }
    }, {
        key: "gameFooter",
        get: function get() {
            return this._gameFooter;
        }
    }, {
        key: "level",
        get: function get() {
            return this._level;
        }
    }, {
        key: "editMode",
        get: function get() {
            return this._editMode;
        },
        set: function set(value) {
            if (value) {
                this.reloadLevel();
                this.level.getCell(0, 0).selected = true;
            }

            this.level.editMode = value;
            this.gameObjectContainer.editMode = value;
            this._setValueAndRaiseOnChange("_editMode", value);
        }
    }, {
        key: "gameObjectContainer",
        get: function get() {
            return this._gameObjectContainer;
        }
    }, {
        key: "gameHeader",
        get: function get() {
            return this._gameHeader;
        }
    }, {
        key: "levelFinished",
        get: function get() {
            return this._levelFinished;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_levelFinished", value);
        }
    }, {
        key: "levelNum",
        get: function get() {
            return this._levelNum;
        }
    }, {
        key: "gameOver",
        get: function get() {
            return this._gameOver;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_gameOver", value);
        }
    }]);

    return LevelRunner;
}(_DataSourceBase3.default);

exports.default = LevelRunner;