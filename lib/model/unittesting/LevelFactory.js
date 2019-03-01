"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Level = require("../Level");

var _Level2 = _interopRequireDefault(_Level);

var _Dot = require("../Dot");

var _Dot2 = _interopRequireDefault(_Dot);

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelFactory = function () {
    function LevelFactory() {
        _classCallCheck(this, LevelFactory);
    }

    _createClass(LevelFactory, null, [{
        key: "_setTwoWayBorder",
        value: function _setTwoWayBorder(level, x, y, direction, value) {

            var cell = level.getCell(x, y);
            var otherLocation = new _Location2.default(x, y);
            otherLocation.moveInDirection(direction, level.height, level.width);
            var otherCell = level.getCellByLocation(otherLocation);

            cell.setSolidBorder(direction, value);
            otherCell.setSolidBorder(_Direction2.default.getOpposite(direction), value);
        }

        /**
         * -----------
         * |   |O|   |
         * |___|.|___|
         * |. . P . .|
         * |---|.|---|
         * |   |G|   |
         * -----------
         * @returns {Level}
         */

    }, {
        key: "createTestLevel",
        value: function createTestLevel() {
            var toRet = new _Level2.default(5, 5);

            LevelFactory._setTwoWayBorder(toRet, 2, 0, _Direction2.default.LEFT, true);
            LevelFactory._setTwoWayBorder(toRet, 2, 0, _Direction2.default.UP, true);
            LevelFactory._setTwoWayBorder(toRet, 2, 0, _Direction2.default.RIGHT, true);
            toRet.getCell(2, 0).dotType = _Dot2.default.BIG;

            LevelFactory._setTwoWayBorder(toRet, 2, 1, _Direction2.default.LEFT, true);
            LevelFactory._setTwoWayBorder(toRet, 2, 1, _Direction2.default.RIGHT, true);
            toRet.getCell(2, 1).dotType = _Dot2.default.LITTLE;

            toRet.getCell(2, 2).isPlayerSpawn = true;

            LevelFactory._setTwoWayBorder(toRet, 2, 3, _Direction2.default.LEFT, true);
            LevelFactory._setTwoWayBorder(toRet, 2, 3, _Direction2.default.RIGHT, true);
            toRet.getCell(2, 3).dotType = _Dot2.default.LITTLE;

            LevelFactory._setTwoWayBorder(toRet, 2, 4, _Direction2.default.LEFT, true);
            LevelFactory._setTwoWayBorder(toRet, 2, 4, _Direction2.default.RIGHT, true);
            LevelFactory._setTwoWayBorder(toRet, 2, 4, _Direction2.default.DOWN, true);
            toRet.getCell(2, 4).dotType = _Dot2.default.LITTLE;
            toRet.getCell(2, 4).isGhostRedSpawn = true;

            LevelFactory._setTwoWayBorder(toRet, 1, 2, _Direction2.default.UP, true);
            LevelFactory._setTwoWayBorder(toRet, 1, 2, _Direction2.default.DOWN, true);
            toRet.getCell(1, 2).solidBorder.top = true;
            toRet.getCell(1, 2).solidBorder.bottom = true;
            toRet.getCell(1, 2).dotType = _Dot2.default.LITTLE;

            LevelFactory._setTwoWayBorder(toRet, 0, 2, _Direction2.default.UP, true);
            LevelFactory._setTwoWayBorder(toRet, 0, 2, _Direction2.default.DOWN, true);
            LevelFactory._setTwoWayBorder(toRet, 0, 2, _Direction2.default.LEFT, true);
            toRet.getCell(0, 2).dotType = _Dot2.default.LITTLE;

            LevelFactory._setTwoWayBorder(toRet, 3, 2, _Direction2.default.UP, true);
            LevelFactory._setTwoWayBorder(toRet, 3, 2, _Direction2.default.DOWN, true);
            toRet.getCell(3, 2).dotType = _Dot2.default.LITTLE;

            LevelFactory._setTwoWayBorder(toRet, 4, 2, _Direction2.default.UP, true);
            LevelFactory._setTwoWayBorder(toRet, 4, 2, _Direction2.default.DOWN, true);
            LevelFactory._setTwoWayBorder(toRet, 4, 2, _Direction2.default.RIGHT, true);
            toRet.getCell(4, 2).dotType = _Dot2.default.LITTLE;

            return toRet;
        }
    }]);

    return LevelFactory;
}();

exports.default = LevelFactory;