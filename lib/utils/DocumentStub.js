"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class had weird behavior when binding to key events.
 *
 * The event was being fired off twice.
 *
 * TODO: Figure out how to do this.
 */
var DocumentStub = function () {
    function DocumentStub() {
        _classCallCheck(this, DocumentStub);
    }

    _createClass(DocumentStub, null, [{
        key: "body",
        get: function get() {
            if (typeof document !== "undefined") {
                return document;
            }

            return _react2.default.createElement("div", null);
        }
    }]);

    return DocumentStub;
}();

exports.default = DocumentStub;