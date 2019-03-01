"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObjectContainer = require("../GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

var _LevelFactory = require("./LevelFactory");

var _LevelFactory2 = _interopRequireDefault(_LevelFactory);

var _PowerUp = require("../actors/PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObjectContainerFactory = function () {
    function GameObjectContainerFactory() {
        _classCallCheck(this, GameObjectContainerFactory);
    }

    _createClass(GameObjectContainerFactory, null, [{
        key: "createGameObjectContainer",


        /**
         * -----------
         * |   |O|   |
         * |___|.|___|
         * |. . P . S|
         * |---|.|---|
         * |   |G|   |
         * -----------
         *
         * S = Strawberry
         * P = Player
         * G = Ghost
         * . = Little Dot
         * O = Big Dot
         * @returns {GameObjectContainer}
         */
        value: function createGameObjectContainer() {
            var level = _LevelFactory2.default.createTestLevel();
            var goc = new _GameObjectContainer2.default(level);
            goc.powerUp.location.set(4, 2);
            goc.powerUp.powerUpType = _PowerUp2.default.POWER_UP_STRAWBERRY;
            goc.powerUp.isAlive = true;

            return goc;
        }
    }]);

    return GameObjectContainerFactory;
}();

exports.default = GameObjectContainerFactory;