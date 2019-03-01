"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _MainMenu = require("./menus/MainMenu");

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _LevelRunner = require("./LevelRunner");

var _LevelRunner2 = _interopRequireDefault(_LevelRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var levelNumToLevelMap = {
    0: "Level2WithPaths",
    1: "Level2WithPaths",
    2: "Level2WithPaths",

    3: "Level3WithPaths",
    4: "Level3WithPaths",
    5: "Level3WithPaths",

    6: "Level4WithPaths",
    7: "Level4WithPaths",
    8: "Level4WithPaths",

    9: "Level5WithPaths",
    10: "Level5WithPaths",
    11: "Level5WithPaths",

    12: "Level6WithPaths",
    13: "Level6WithPaths",
    14: "Level6WithPaths"
};

var Game = function (_DataSourceBase) {
    _inherits(Game, _DataSourceBase);

    _createClass(Game, null, [{
        key: "getLevelName",
        value: function getLevelName(levelNum) {
            var keys = Object.keys(levelNumToLevelMap);
            var keysAsNumbers = keys.map(function (item) {
                return parseInt(item, 10);
            });
            var maxValue = Math.max.apply(Math, _toConsumableArray(keysAsNumbers));

            var theKey = levelNum % (maxValue + 1);
            return levelNumToLevelMap[theKey];
        }
    }]);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

        _this._levelNum = 0;
        _this._mainMenu = _this._wireUp("_mainMenu", new _MainMenu2.default());
        _this._levelRunner = _this._wireUp("_levelRunner", new _LevelRunner2.default(Game.getLevelName(_this._levelNum)));
        _this._gameStarted = false;
        _this._numPlayers = 1;
        return _this;
    }

    _createClass(Game, [{
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {
            if (e.object === this._mainMenu) {
                if (e.source === "_selectionConfirmed" && this._mainMenu.selectionConfirmed) {
                    // this._mainMenu.selectionConfirmed = false;
                    this.numPlayers = this._mainMenu.numPlayers;
                    this.startGame();
                }
            } else if (e.object === this._levelRunner) {
                if (e.source === "_levelFinished" && this.levelRunner.levelFinished) {
                    this._levelNum++;

                    var levelName = Game.getLevelName(this._levelNum);
                    this._levelRunner.startLevel(levelName, true, this._levelNum + 1, this._mainMenu.selectedValue);
                } else if (e.source === "_gameOver" && this.levelRunner.gameOver) {
                    this._levelNum = 0;

                    this.gameStarted = false;
                    this.mainMenu.selectionConfirmed = false;
                    // this.levelRunner.gameOver = false;
                }
            }

            _get(Game.prototype.__proto__ || Object.getPrototypeOf(Game.prototype), "_nestedDataSourceChanged", this).call(this, e);
        }
    }, {
        key: "startGame",
        value: function startGame() {
            this._setValueAndRaiseOnChange("_gameStarted", true);

            var levelName = Game.getLevelName(this._levelNum);
            this._levelRunner.startLevel(levelName, true, this._levelNum + 1, this._mainMenu.selectedValue);
        }
    }, {
        key: "level",
        get: function get() {
            return this._levelRunner.level;
        }
    }, {
        key: "levelNum",
        get: function get() {
            return this._levelNum;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_levelNum", value);
        }
    }, {
        key: "numPlayers",
        get: function get() {
            return this._numPlayers;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_numPlayers", value);
        }
    }, {
        key: "gameStarted",
        get: function get() {
            return this._gameStarted;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_gameStarted", value);
        }
    }, {
        key: "editMode",
        get: function get() {
            return this._levelRunner.editMode;
        },
        set: function set(value) {
            this._levelRunner.editMode = value;
        }
    }, {
        key: "levelRunner",
        get: function get() {
            return this._levelRunner;
        }
    }, {
        key: "mainMenu",
        get: function get() {
            return this._mainMenu;
        }
    }]);

    return Game;
}(_DataSourceBase3.default);

exports.default = Game;