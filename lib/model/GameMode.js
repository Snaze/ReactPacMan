"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var game_mode_play = 0;
var game_mode_train = 1;
var game_mode_watch = 2;
var game_mode_watch_pre_trained = 3;
var game_mode_all = [game_mode_play, game_mode_train, game_mode_watch, game_mode_watch_pre_trained];

var GameMode = function () {
    function GameMode() {
        _classCallCheck(this, GameMode);
    }

    _createClass(GameMode, null, [{
        key: "PLAY",
        get: function get() {
            return game_mode_play;
        }
    }, {
        key: "TRAIN",
        get: function get() {
            return game_mode_train;
        }
    }, {
        key: "WATCH",
        get: function get() {
            return game_mode_watch;
        }
    }, {
        key: "WATCH_PRE_TRAINED",
        get: function get() {
            return game_mode_watch_pre_trained;
        }
    }, {
        key: "ALL",
        get: function get() {
            return game_mode_all;
        }
    }]);

    return GameMode;
}();

exports.default = GameMode;