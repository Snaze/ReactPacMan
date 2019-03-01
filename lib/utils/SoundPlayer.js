"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _howler = require("../../node_modules/howler/dist/howler");

var _howler2 = _interopRequireDefault(_howler);

var _pacman_beginning = require("../sounds/pacman_beginning.wav");

var _pacman_beginning2 = _interopRequireDefault(_pacman_beginning);

var _pacman_beginning3 = require("../sounds/pacman_beginning.mp3");

var _pacman_beginning4 = _interopRequireDefault(_pacman_beginning3);

var _pacman_chomp = require("../sounds/pacman_chomp.wav");

var _pacman_chomp2 = _interopRequireDefault(_pacman_chomp);

var _pacman_chomp3 = require("../sounds/pacman_chomp.mp3");

var _pacman_chomp4 = _interopRequireDefault(_pacman_chomp3);

var _pacman_death = require("../sounds/pacman_death.wav");

var _pacman_death2 = _interopRequireDefault(_pacman_death);

var _pacman_death3 = require("../sounds/pacman_death.mp3");

var _pacman_death4 = _interopRequireDefault(_pacman_death3);

var _pacman_eatfruit = require("../sounds/pacman_eatfruit.wav");

var _pacman_eatfruit2 = _interopRequireDefault(_pacman_eatfruit);

var _pacman_eatfruit3 = require("../sounds/pacman_eatfruit.mp3");

var _pacman_eatfruit4 = _interopRequireDefault(_pacman_eatfruit3);

var _pacman_eatghost = require("../sounds/pacman_eatghost.wav");

var _pacman_eatghost2 = _interopRequireDefault(_pacman_eatghost);

var _pacman_eatghost3 = require("../sounds/pacman_eatghost.mp3");

var _pacman_eatghost4 = _interopRequireDefault(_pacman_eatghost3);

var _pacman_extrapac = require("../sounds/pacman_extrapac.wav");

var _pacman_extrapac2 = _interopRequireDefault(_pacman_extrapac);

var _pacman_extrapac3 = require("../sounds/pacman_extrapac.mp3");

var _pacman_extrapac4 = _interopRequireDefault(_pacman_extrapac3);

var _pacman_intermission = require("../sounds/pacman_intermission.wav");

var _pacman_intermission2 = _interopRequireDefault(_pacman_intermission);

var _pacman_intermission3 = require("../sounds/pacman_intermission.mp3");

var _pacman_intermission4 = _interopRequireDefault(_pacman_intermission3);

var _ChompBig = require("../sounds/ChompBig.wav");

var _ChompBig2 = _interopRequireDefault(_ChompBig);

var _ChompBig3 = require("../sounds/ChompBig.mp3");

var _ChompBig4 = _interopRequireDefault(_ChompBig3);

var _ChompSmall = require("../sounds/ChompSmall.wav");

var _ChompSmall2 = _interopRequireDefault(_ChompSmall);

var _ChompSmall3 = require("../sounds/ChompSmall.mp3");

var _ChompSmall4 = _interopRequireDefault(_ChompSmall3);

var _Siren = require("../sounds/Siren.wav");

var _Siren2 = _interopRequireDefault(_Siren);

var _Siren3 = require("../sounds/Siren.mp3");

var _Siren4 = _interopRequireDefault(_Siren3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _singleton = Symbol();

var SoundPlayer = function () {
    function SoundPlayer(singletonToken) {
        var _this = this;

        _classCallCheck(this, SoundPlayer);

        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._playFinishedCallbackRef = function (e) {
            return _this._playFinishedCallback(e);
        };
        this._beginning = null;
        this._chomp = null;
        this._chompBig = null;
        this._chompSmall = null;
        this._death = null;
        this._eatfruit = null;
        this._eatghost = null;
        this._extrapac = null;
        this._intermission = null;
        this._siren = null;
        this._callbacks = {};
    }

    _createClass(SoundPlayer, [{
        key: "_createHowl",
        value: function _createHowl(mp3Path, wavPath) {
            return new _howler2.default.Howl({
                src: [mp3Path, wavPath],
                format: ['mp3', 'wav'],
                volume: 1.0,
                onend: this._playFinishedCallbackRef
            });
        }
    }, {
        key: "_setPropIfNotExists",
        value: function _setPropIfNotExists(prop, path) {
            if (this[prop] === null) {
                this[prop] = this._createHowl(path);
            }
        }
    }, {
        key: "_playFinishedCallback",
        value: function _playFinishedCallback(id) {
            // console.log("callback id = " + id);

            if (this._callbacks[id]) {
                this._callbacks[id](id);
                delete this._callbacks[id];
            }
        }
    }, {
        key: "play",
        value: function play(theSound, callback, spriteName) {

            var id = null;

            if (spriteName) {
                id = theSound.play(spriteName);
            } else {
                id = theSound.play();
            }

            // is this whack?

            if (callback) {
                this._callbacks[id] = callback;
            }

            return id;
        }
    }, {
        key: "beginning",
        get: function get() {
            this._setPropIfNotExists("_beginning", _pacman_beginning4.default, _pacman_beginning2.default);

            return this._beginning;
        }
    }, {
        key: "chomp",
        get: function get() {
            this._setPropIfNotExists("_chomp", _pacman_chomp4.default, _pacman_chomp2.default);

            return this._chomp;
        }
    }, {
        key: "chompBig",
        get: function get() {
            this._setPropIfNotExists("_chompBig", _ChompBig4.default, _ChompBig2.default);

            return this._chompBig;
        }
    }, {
        key: "chompSmall",
        get: function get() {
            this._setPropIfNotExists("_chompSmall", _ChompSmall4.default, _ChompSmall2.default);

            return this._chompSmall;
        }
    }, {
        key: "death",
        get: function get() {
            this._setPropIfNotExists("_death", _pacman_death4.default, _pacman_death2.default);

            return this._death;
        }
    }, {
        key: "eatfruit",
        get: function get() {
            this._setPropIfNotExists("_eatfruit", _pacman_eatfruit4.default, _pacman_eatfruit2.default);

            return this._eatfruit;
        }
    }, {
        key: "eatghost",
        get: function get() {
            this._setPropIfNotExists("_eatghost", _pacman_eatghost4.default, _pacman_eatghost2.default);

            return this._eatghost;
        }
    }, {
        key: "extrapac",
        get: function get() {
            this._setPropIfNotExists("_extrapac", _pacman_extrapac4.default, _pacman_extrapac2.default);

            return this._extrapac;
        }
    }, {
        key: "intermission",
        get: function get() {
            this._setPropIfNotExists("_intermission", _pacman_intermission4.default, _pacman_intermission2.default);

            return this._intermission;
        }
    }, {
        key: "siren",
        get: function get() {
            if (this._siren === null) {
                this._siren = new _howler2.default.Howl({
                    src: [_Siren4.default, _Siren2.default],
                    format: ['mp3', 'wav'],
                    volume: 1.0,
                    loop: true,
                    rate: 0.5,
                    sprite: {
                        main: [0, 250]
                    }
                });
            }

            return this._siren;
        }
    }], [{
        key: "instance",
        get: function get() {
            if (!this[_singleton]) {
                this[_singleton] = new SoundPlayer(_singleton);
            }

            return this[_singleton];
        }
    }]);

    return SoundPlayer;
}();

exports.default = SoundPlayer;