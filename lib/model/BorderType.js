"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Replace all usages of BorderType to use Direction
var BorderType = function () {
    function BorderType() {
        _classCallCheck(this, BorderType);
    }

    _createClass(BorderType, null, [{
        key: "isValid",
        value: function isValid(borderType) {
            return _Direction2.default.isValid(borderType);
        }
    }, {
        key: "LEFT",
        get: function get() {
            return _Direction2.default.LEFT;
        }
    }, {
        key: "TOP",
        get: function get() {
            return _Direction2.default.UP;
        }
    }, {
        key: "RIGHT",
        get: function get() {
            return _Direction2.default.RIGHT;
        }
    }, {
        key: "BOTTOM",
        get: function get() {
            return _Direction2.default.DOWN;
        }
    }]);

    return BorderType;
}();

exports.default = BorderType;