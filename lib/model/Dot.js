"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var none = 0;
var little = 1;
var big = 2;
var all = [none, little, big];

var Dot = function () {
    function Dot() {
        _classCallCheck(this, Dot);
    }

    _createClass(Dot, null, [{
        key: "isValid",
        value: function isValid(value) {
            return all.indexOf(value) > -1;
        }
    }, {
        key: "NONE",
        get: function get() {
            return none;
        }
    }, {
        key: "LITTLE",
        get: function get() {
            return little;
        }
    }, {
        key: "BIG",
        get: function get() {
            return big;
        }
    }, {
        key: "ALL",
        get: function get() {
            return all;
        }
    }]);

    return Dot;
}();

exports.default = Dot;