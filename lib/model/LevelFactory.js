"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Level = require("./Level");

var _Level2 = _interopRequireDefault(_Level);

var _lodash = require("../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelFactory = function () {
    function LevelFactory() {
        _classCallCheck(this, LevelFactory);
    }

    _createClass(LevelFactory, null, [{
        key: "getLevel",
        value: function getLevel(levelName) {

            if (!window || !window.react_pac_man || !window.react_pac_man[levelName]) {
                return new _Level2.default().toJSON();
            }

            return window.react_pac_man[levelName];
        }
    }, {
        key: "createLevel",
        value: function createLevel(levelName) {
            levelName = levelName.toLowerCase();
            levelName = _lodash2.default.replace(levelName, "withpaths", "");

            switch (levelName) {
                case "level1":
                    throw new Error("this level is not longer supported");
                case "level2":
                case "level3":
                case "level4":
                case "level5":
                case "level6":
                    return _Level2.default.fromJSON(LevelFactory.getLevel(levelName));
                default:
                    throw new Error("Unknown Level Name found");
            }

            // throw new Error("Unknown Level Name found");
        }
    }]);

    return LevelFactory;
}();

exports.default = LevelFactory;