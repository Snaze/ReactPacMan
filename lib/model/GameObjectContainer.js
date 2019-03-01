"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase2 = require("./DataSourceBase");

var _DataSourceBase3 = _interopRequireDefault(_DataSourceBase2);

var _Player = require("./actors/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Ghost = require("./actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _GameTimer = require("./GameTimer");

var _GameTimer2 = _interopRequireDefault(_GameTimer);

var _moment = require("../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _PowerUp = require("./actors/PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _GameModal = require("./GameModal");

var _GameModal2 = _interopRequireDefault(_GameModal);

var _SoundPlayer = require("../utils/SoundPlayer");

var _SoundPlayer2 = _interopRequireDefault(_SoundPlayer);

var _KeyEventer = require("../utils/KeyEventer");

var _KeyEventer2 = _interopRequireDefault(_KeyEventer);

var _GameMode = require("./GameMode");

var _GameMode2 = _interopRequireDefault(_GameMode);

var _DeepQLearner = require("./ai/dqn/DeepQLearner");

var _DeepQLearner2 = _interopRequireDefault(_DeepQLearner);

var _SimpleStateConverter = require("./ai/SimpleStateConverter");

var _SimpleStateConverter2 = _interopRequireDefault(_SimpleStateConverter);

var _StateConverter = require("./ai/StateConverter");

var _StateConverter2 = _interopRequireDefault(_StateConverter);

var _BinaryMatrix = require("./utils/BinaryMatrix");

var _BinaryMatrix2 = _interopRequireDefault(_BinaryMatrix);

var _Direction = require("../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var max_power_up_spawn_time = 90.0;
var callback_type_level_finished = 0;
var callback_type_game_over = 1;
var toBinaryIndices = {
    littleDot: 4,
    bigDot: 3,
    ghost: 2,
    player: 1,
    powerUp: 0,
    directionHeader: 0
};

var GameObjectContainer = function (_DataSourceBase) {
    _inherits(GameObjectContainer, _DataSourceBase);

    _createClass(GameObjectContainer, null, [{
        key: "CALLBACK_TYPE_LEVEL_FINISHED",
        get: function get() {
            return callback_type_level_finished;
        }
    }, {
        key: "CALLBACK_TYPE_GAME_OVER",
        get: function get() {
            return callback_type_game_over;
        }
    }]);

    function GameObjectContainer(level) {
        _classCallCheck(this, GameObjectContainer);

        var _this = _possibleConstructorReturn(this, (GameObjectContainer.__proto__ || Object.getPrototypeOf(GameObjectContainer)).call(this));

        _this._player = _this._wireUp("_player", new _Player2.default(level, _Player2.default.MRS_PAC_MAN));
        _this._player2 = _this._wireUp("_player2", new _Player2.default(level, _Player2.default.MR_PAC_MAN));
        _this._ghostRed = _this._wireUp("_ghostRed", new _Ghost2.default(level, _Ghost2.default.RED, _this._player));
        _this._ghostBlue = _this._wireUp("_ghostBlue", new _Ghost2.default(level, _Ghost2.default.BLUE, _this._player));
        _this._ghostPink = _this._wireUp("_ghostPink", new _Ghost2.default(level, _Ghost2.default.PINK, _this._player));
        _this._ghostOrange = _this._wireUp("_ghostOrange", new _Ghost2.default(level, _Ghost2.default.ORANGE, _this._player));
        _this._powerUp = _this._wireUp("_powerUp", new _PowerUp2.default(level, _PowerUp2.default.POWER_UP_CHERRY));
        // this._countDownMenu = this._wireUp("_countDownMenu", new CountDownMenu());
        // this._modal = this._wireUp("_modal", new Modal());
        _this._gameModal = _this._wireUp("_gameModal", new _GameModal2.default());
        _this._powerUpSpawnTime = (0, _moment2.default)().add(Math.floor(Math.random() * max_power_up_spawn_time), "s");

        _this._gameObjects = [_this._player,
        // this._player2,
        _this._ghostRed, _this._ghostBlue, _this._ghostPink, _this._ghostOrange, _this._powerUp];

        _this._gameTimerTickFinishedRef = function (e) {
            return _this.gameTimerTickFinished(e);
        };
        _this._timerWired = false;

        // This is used to create the feature vector to feed the Deep Q Learner
        _this._simpleStateConverter = new _SimpleStateConverter2.default();

        // This is used to save / restore state between learning.  Mainly this is because of you are storing
        // static times in the entities.  You should really just store ms or s remaining.
        // TODO: Fix times issue.
        _this._stateConverter = new _StateConverter2.default();
        _this._previousState = null;
        _this._deepQLearner = null;
        _this._deepQLearnerCallbackRef = function (deepQLearner, actionNum) {
            return _this._deepQLearnerCallback(deepQLearner, actionNum);
        };
        _this._playerActionNum = 0;

        _this._keyPressRef = function (e) {
            return _this._keyPress(e);
        };
        _KeyEventer2.default.instance.addCallback(_this._keyPressRef, _KeyEventer2.default.CALLBACK_KEYDOWN);

        _this._currentPlayerDead = false;
        _this._restartLevelRef = null;

        _this._callback = null;
        _this._gameOver = false;
        _this._levelFirstStart = true;
        _this._levelRunning = false;
        // this._binaryMatrix = null;
        _this._graph = null;
        _this._gameMode = _GameMode2.default.PLAY;

        _this.toIgnore.push("_state");
        return _this;
    }

    _createClass(GameObjectContainer, [{
        key: "dispose",
        value: function dispose() {
            _KeyEventer2.default.instance.removeCallback(this._keyPressRef, _KeyEventer2.default.CALLBACK_KEYDOWN);

            _get(GameObjectContainer.prototype.__proto__ || Object.getPrototypeOf(GameObjectContainer.prototype), "dispose", this).call(this);
        }
    }, {
        key: "_wireGameTimer",
        value: function _wireGameTimer() {
            if (!this._timerWired) {
                this._timerWired = true;
                _GameTimer2.default.instance.addTickFinishedCallback(this._gameTimerTickFinishedRef);
            }
        }
    }, {
        key: "_wireQLearner",
        value: function _wireQLearner() {
            if (!this._timerWired) {
                this._timerWired = true;
                var initialState = this._simpleStateConverter.toFeatureVector(this);
                // this._previousState = this._stateConverter.toFeatureVector(this);
                this.deepQLearner.learn(this._deepQLearnerCallbackRef, initialState);
            }
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            if (e.object === this._powerUp && e.source === "_isAlive" && !e.newValue) {
                // console.log("_resetPowerUpSpawnTime");
                this._resetPowerUpSpawnTime();
            } else if (e.object === this._gameModal && e.source === "_visible" && !e.newValue) {
                this._gameModalDismissCallback(this._gameModal);
            }

            _get(GameObjectContainer.prototype.__proto__ || Object.getPrototypeOf(GameObjectContainer.prototype), "_nestedDataSourceChanged", this).call(this, e);
        }
    }, {
        key: "_keyPress",
        value: function _keyPress(key) {
            if (!this._levelRunning) {
                return;
            }

            if (key.toLowerCase() === "p") {
                if (this.paused) {
                    this.paused = false;
                    this._gameModal.hideModal();
                } else {
                    this.paused = true;
                    this._gameModal.showPausedModal();
                }
            }
        }
    }, {
        key: "_gameModalDismissCallback",
        value: function _gameModalDismissCallback() {
            if (this.callback) {
                if (this._gameModal.mode === _GameModal2.default.MODAL_MODE_GAME_OVER) {
                    this.callback({
                        callbackType: GameObjectContainer.CALLBACK_TYPE_GAME_OVER,
                        object: this
                    });
                } else if (this._gameModal.mode === _GameModal2.default.MODAL_MODE_COUNTDOWN) {
                    this._runLevel();
                }
            }
        }
    }, {
        key: "_runLevel",
        value: function _runLevel() {
            this.resetAllGhostBrains();
            this.paused = false;
            this._restartLevelRef = null;
            this._levelRunning = true;
        }
    }, {
        key: "_killIfCollision",
        value: function _killIfCollision(thePlayer, theGhost, now) {
            var _this2 = this;

            if (thePlayer.isCollision(theGhost)) {
                if (thePlayer.attackModeFinishTime > now && theGhost.isScared) {
                    // GHOST IS DEAD SINCE PLAYER IS ATTACKING
                    if (theGhost.isAlive) {
                        theGhost.kill(this.player, GameObjectContainer.nextKillScore);
                    }
                } else if (theGhost.isAlive) {
                    // PLAYER IS DEAD SINCE PLAYER IS NOT ATTACKING
                    // OR GHOST IS NOT SCARED
                    if (thePlayer.isAlive) {
                        thePlayer.isAlive = false;
                        thePlayer.numLives -= 1;
                        // thePlayer.resetReward();

                        this.resetAllGhostBrains();
                        this.currentPlayerDead = true;
                        this.paused = true;
                        this._levelRunning = false;

                        if (this._restartLevelRef === null) {
                            this._restartLevelRef = function () {
                                return _this2.startOrRestartLevel();
                            };
                            var self = this;
                            if (this._gameMode !== _GameMode2.default.TRAIN) {
                                setTimeout(function () {
                                    self.startOrRestartLevel();
                                }, 3000);
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: "_resetPowerUpSpawnTime",
        value: function _resetPowerUpSpawnTime() {
            this._powerUpSpawnTime = (0, _moment2.default)().add(Math.floor(Math.random() * max_power_up_spawn_time), "s");
        }
    }, {
        key: "_pickUpPowerUpIfCollision",
        value: function _pickUpPowerUpIfCollision(thePlayer, thePowerup) {
            if (thePlayer.isCollision(thePowerup)) {
                thePowerup.pickUp(thePlayer);

                this._resetPowerUpSpawnTime();
            }
        }
    }, {
        key: "_checkIfAllDotsEaten",
        value: function _checkIfAllDotsEaten(thePlayer, theLevel) {
            var levelFinished = false;

            if (thePlayer.dotsEaten === theLevel.numDots && !this.paused) {
                // if (thePlayer.dotsEaten >= 2 && !this.paused) {

                levelFinished = true;

                if (this._gameMode !== _GameMode2.default.TRAIN) {
                    this.level.blinkBorder = true;
                    this.resetAllGhostBrains();

                    this._levelRunning = false;
                    this.paused = true;

                    if (!!this.callback) {
                        setTimeout(function () {
                            this.callback({
                                callbackType: GameObjectContainer.CALLBACK_TYPE_LEVEL_FINISHED,
                                object: this
                            });
                        }.bind(this), 4000);
                    }
                }
            }

            return levelFinished;
        }
    }, {
        key: "startOrRestartLevel",
        value: function startOrRestartLevel() {

            this.moveAllBackToSpawnAndResetActors();
            this.gameOver = false;
            this._levelRunning = false;

            if (this._gameMode === _GameMode2.default.PLAY) {
                if (this.player.numLives === 0) {
                    this.gameModal.showGameOverModal(this.player.score, this.level.levelNum);
                } else {
                    this._wireGameTimer();

                    var count = 3;
                    if (!this._levelFirstStart) {
                        this.gameModal.showCountDownModal(count);
                    } else {
                        this._levelFirstStart = false;
                        _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.beginning, function () {
                            this.gameModal.showCountDownModal(count);
                        }.bind(this));
                    }
                }
            } else if (this._gameMode === _GameMode2.default.TRAIN) {
                this._player.learnMode = true;
                this._player.resetNumLives();
                this._runLevel();
                this._wireQLearner();
            }
        }
    }, {
        key: "_deepQLearnerCallback",
        value: function _deepQLearnerCallback(deepQLearner, actionNum) {
            // FIRST, restore previous state because Deep Q Learner may be slow.
            // this._stateConverter.setFeatureVector(this, this._previousState);

            // NEXT, store the action for the player to perform.
            // console.log(`actionNum = ${actionNum}`);
            this.playerActionNum = actionNum;

            // NEXT, execute the game step.
            var levelFinished = this.gameTimerTickFinished();
            var isTerminal = false;

            // If the player is killed restart the level.
            if (!this.player.isAlive) {
                this.startOrRestartLevel();
                isTerminal = true;
            }

            // If the level is finish, fire the event to load the next level.
            if (levelFinished && !!this.callback) {
                this.callback({
                    callbackType: GameObjectContainer.CALLBACK_TYPE_LEVEL_FINISHED,
                    object: this
                });

                isTerminal = true;
                this._runLevel();
            }

            // save new state
            // this._previousState = this._stateConverter.toFeatureVector(this);

            return {
                reward: this.player.currentReward,
                state: this._simpleStateConverter.toFeatureVector(this),
                isTerminal: isTerminal
            };
        }
    }, {
        key: "gameTimerTickFinished",
        value: function gameTimerTickFinished() {

            var levelFinished = false;

            if (!this.level.playerSpawnLocation.isValid || this.editMode) {
                return;
            }

            var moved = false;

            this.iterateOverGameObjects(function (gameObj) {
                var temp = gameObj.executeActorStep(this);
                if (temp) {
                    moved = true;
                }
            }.bind(this));

            if (moved) {
                if (this.player.attackModeFinishTime <= (0, _moment2.default)()) {
                    GameObjectContainer.resetNextKillScore();
                }

                var now = (0, _moment2.default)();

                this.checkAndSpawnPowerUp(now);

                this._killIfCollision(this.player, this.ghostRed, now);
                this._killIfCollision(this.player, this.ghostBlue, now);
                this._killIfCollision(this.player, this.ghostPink, now);
                this._killIfCollision(this.player, this.ghostOrange, now);

                this._pickUpPowerUpIfCollision(this.player, this.powerUp);

                levelFinished = this._checkIfAllDotsEaten(this.player, this.level);
            }

            return levelFinished;
        }
    }, {
        key: "checkAndSpawnPowerUp",
        value: function checkAndSpawnPowerUp(now) {
            if (this._powerUp.isAlive) {
                return;
            }

            if (now > this._powerUpSpawnTime) {
                this._powerUp.spawn(this.level);
            }
        }
    }, {
        key: "iterateOverGameObjects",
        value: function iterateOverGameObjects(theCallback) {
            this._gameObjects.forEach(function (go) {
                theCallback(go, this);
            });
        }
    }, {
        key: "resetAllGhostBrains",
        value: function resetAllGhostBrains() {
            this.iterateOverGameObjects(function (gameObject) {
                if (gameObject instanceof _Ghost2.default) {
                    gameObject.resetBrain();
                }
            });
        }
    }, {
        key: "moveAllBackToSpawnAndResetActors",
        value: function moveAllBackToSpawnAndResetActors() {
            var self = this;

            this.iterateOverGameObjects(function (gameObject) {
                // We want to move everything except the powerup
                if (gameObject === self.powerUp) {
                    return;
                }

                if (typeof gameObject.moveBackToSpawn !== "undefined") {
                    gameObject.moveBackToSpawn();
                }

                if (typeof gameObject.resetDirection !== "undefined") {
                    gameObject.resetDirection();
                }

                if (typeof gameObject.resetBrain !== "undefined") {
                    gameObject.resetBrain();
                }

                if (typeof gameObject.isAlive !== "undefined") {
                    gameObject.isAlive = true;
                }
            });
        }
    }, {
        key: "_updateBinaryMatrix",
        value: function _updateBinaryMatrix() {
            var directionBinary = _Direction2.default.toBinary(this.player.direction);
            this._binaryMatrix.setBinaryHeaderValue(toBinaryIndices.directionHeader, directionBinary);

            this._binaryMatrix.setBinaryValueAtLocation("player", this.player.location, toBinaryIndices.player, "1");

            // If the player is at a current location, then he must have already eaten the dot.
            this._binaryMatrix.setBinaryValueAtLocation(null, this.player.location, toBinaryIndices.bigDot, "0");
            this._binaryMatrix.setBinaryValueAtLocation(null, this.player.location, toBinaryIndices.littleDot, "0");

            this._binaryMatrix.setBinaryValueAtLocation("ghostRed", this.ghostRed.location, toBinaryIndices.ghost, "1");
            this._binaryMatrix.setBinaryValueAtLocation("ghostBlue", this.ghostBlue.location, toBinaryIndices.ghost, "1");
            this._binaryMatrix.setBinaryValueAtLocation("ghostOrange", this.ghostOrange.location, toBinaryIndices.ghost, "1");
            this._binaryMatrix.setBinaryValueAtLocation("ghostPink", this.ghostPink.location, toBinaryIndices.ghost, "1");

            this._binaryMatrix.setBinaryValueAtLocation("powerUp", this.powerUp.location, toBinaryIndices.powerUp, "1");
        }
    }, {
        key: "toFeatureVector",
        value: function toFeatureVector() {
            var toRet = [];
            // _powerUpSpawnTime
            // GameObjectContainer._nextKillScore

            var powerUpSpawnTime = 0;
            if (this._powerUpSpawnTime > (0, _moment2.default)()) {
                powerUpSpawnTime = this._powerUpSpawnTime.diff((0, _moment2.default)(), "ms");
            }

            toRet[0] = powerUpSpawnTime;
            toRet[1] = GameObjectContainer._nextKillScore;
            toRet[2] = this.level.floydWarshall.getPathDistance(this.player.location.toCellId(), this.ghostRed.location.toCellId());
            toRet[3] = this.level.floydWarshall.getPathDistance(this.player.location.toCellId(), this.ghostBlue.location.toCellId());
            toRet[4] = this.level.floydWarshall.getPathDistance(this.player.location.toCellId(), this.ghostPink.location.toCellId());
            toRet[5] = this.level.floydWarshall.getPathDistance(this.player.location.toCellId(), this.ghostOrange.location.toCellId());
            toRet[6] = this.level.floydWarshall.getPathDistance(this.player.location.toCellId(), this.powerUp.location.toCellId());

            if (Number.isNaN(toRet[2])) {
                toRet[2] = -1;
            }
            if (Number.isNaN(toRet[3])) {
                toRet[3] = -1;
            }
            if (Number.isNaN(toRet[4])) {
                toRet[4] = -1;
            }
            if (Number.isNaN(toRet[5])) {
                toRet[5] = -1;
            }
            if (Number.isNaN(toRet[6])) {
                toRet[6] = -1;
            }

            return toRet;
        }
    }, {
        key: "setFeatureVector",
        value: function setFeatureVector(featureVector) {
            this._powerUpSpawnTime = (0, _moment2.default)().add(featureVector[0], "ms");
            GameObjectContainer._nextKillScore = featureVector[1];
            // The rest should always be static for a give level.
        }
    }, {
        key: "powerUp",
        get: function get() {
            return this._powerUp;
        }
    }, {
        key: "player",
        get: function get() {
            return this._player;
        }
    }, {
        key: "player2",
        get: function get() {
            return this._player2;
        }
    }, {
        key: "ghostRed",
        get: function get() {
            return this._ghostRed;
        }
    }, {
        key: "ghostBlue",
        get: function get() {
            return this._ghostBlue;
        }
    }, {
        key: "ghostPink",
        get: function get() {
            return this._ghostPink;
        }
    }, {
        key: "ghostOrange",
        get: function get() {
            return this._ghostOrange;
        }
    }, {
        key: "level",
        get: function get() {
            return this.player.level;
        },
        set: function set(value) {
            if (value !== this.level) {
                this._levelFirstStart = true;
                this._graph = null;
            }

            this.iterateOverGameObjects(function (gameObject) {
                gameObject.level = value;
            });
        }
    }, {
        key: "editMode",
        get: function get() {
            return this.player.editMode;
        },
        set: function set(value) {
            this.iterateOverGameObjects(function (gameObject) {
                gameObject.editMode = value;
            });
        }
    }, {
        key: "paused",
        set: function set(value) {
            this.iterateOverGameObjects(function (gameObject) {
                gameObject.paused = value;
            });
        },
        get: function get() {
            return this._gameObjects[0].paused;
        }
    }, {
        key: "currentPlayerDead",
        get: function get() {
            return this._currentPlayerDead;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_currentPlayerDead", value);
        }
    }, {
        key: "callback",
        get: function get() {
            return this._callback;
        },
        set: function set(value) {
            this._callback = value;
        }
    }, {
        key: "gameOverCallback",
        get: function get() {
            return this._gameOverCallback;
        },
        set: function set(value) {
            this._gameOverCallback = value;
        }
    }, {
        key: "countDownMenu",
        get: function get() {
            return this._countDownMenu;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_countDownMenu", value);
        }
    }, {
        key: "modal",
        get: function get() {
            return this._modal;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_modal", value);
        }
    }, {
        key: "gameOver",
        get: function get() {
            return this._gameOver;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_gameOver", value);
        }
    }, {
        key: "gameOverText",
        get: function get() {
            return this._gameOverText;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_gameOverText", value);
        }
    }, {
        key: "gameModal",
        get: function get() {
            return this._gameModal;
        }
    }, {
        key: "gameMode",
        get: function get() {
            return this._gameMode;
        },
        set: function set(value) {
            this._gameMode = value;
        }
    }, {
        key: "playerActionNum",
        get: function get() {
            return this._playerActionNum;
        },
        set: function set(value) {
            this._playerActionNum = value;
        }
    }, {
        key: "binaryMatrix",
        get: function get() {

            if (null === this._binaryMatrix) {
                var theMatrix = this.level.toBinary();
                this._binaryMatrix = new _BinaryMatrix2.default(theMatrix, 1);
            }

            this._updateBinaryMatrix();

            return this._binaryMatrix;
        }
    }, {
        key: "graph",
        get: function get() {
            if (this._graph === null) {
                this._graph = this.level.toGraph();
            }

            return this._graph;
        }
    }, {
        key: "deepQLearner",
        get: function get() {
            if (this._deepQLearner === null) {
                var temp = this._simpleStateConverter.toFeatureVector(this);
                var rar = 0.98;
                var finalRar = 0.001;
                var maxEpochs = 1000;
                var radr = Math.pow(finalRar / rar, 1 / maxEpochs);

                this._deepQLearner = new _DeepQLearner2.default(temp.length, 4, 0.03, 0.9, rar, radr, true, maxEpochs, 1, maxEpochs, 1000000, 4, 32, 100);
            }

            return this._deepQLearner;
        }
    }], [{
        key: "resetNextKillScore",
        value: function resetNextKillScore() {
            GameObjectContainer._nextKillScore = 100;
        }
    }, {
        key: "peekNextKillScore",
        value: function peekNextKillScore() {
            return GameObjectContainer._nextKillScore;
        }
    }, {
        key: "nextKillScore",
        get: function get() {
            GameObjectContainer._nextKillScore *= 2;
            return GameObjectContainer._nextKillScore;
        }
    }, {
        key: "trainingFeatureIndices",
        get: function get() {
            if (GameObjectContainer._trainingFeatureIndices === null) {
                GameObjectContainer._trainingFeatureIndices = [2, // ghostRed distance
                3, // ghostBlue distance
                4, // ghostPink distance
                5, // ghostOrange distance
                6 // powerUp Distance
                ];
            }

            return GameObjectContainer._trainingFeatureIndices;
        }
    }, {
        key: "featureVectorLength",
        get: function get() {
            return 7;
        }
    }]);

    return GameObjectContainer;
}(_DataSourceBase3.default);

GameObjectContainer._nextKillScore = 100;
GameObjectContainer._trainingFeatureIndices = null;
exports.default = GameObjectContainer;