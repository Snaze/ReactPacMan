"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConvertBase = function () {
    function ConvertBase() {
        _classCallCheck(this, ConvertBase);
    }

    _createClass(ConvertBase, null, [{
        key: "convert",
        value: function convert(num) {
            return {
                from: function from(baseFrom) {
                    return {
                        to: function to(baseTo) {
                            return parseInt(num, baseFrom).toString(baseTo);
                        }
                    };
                }
            };
        }

        // binary to decimal

    }, {
        key: "bin2dec",
        value: function bin2dec(num) {
            return ConvertBase.convert(num).from(2).to(10);
        }

        // binary to hexadecimal

    }, {
        key: "bin2hex",
        value: function bin2hex(num) {
            return ConvertBase.convert(num).from(2).to(16);
        }

        // decimal to binary

    }, {
        key: "dec2bin",
        value: function dec2bin(num) {
            return ConvertBase.convert(num).from(10).to(2);
        }

        // decimal to hexadecimal

    }, {
        key: "dec2hex",
        value: function dec2hex(num) {
            return ConvertBase.convert(num).from(10).to(16);
        }

        // hexadecimal to binary

    }, {
        key: "hex2bin",
        value: function hex2bin(num) {
            return ConvertBase.convert(num).from(16).to(2);
        }

        // hexadecimal to decimal

    }, {
        key: "hex2dec",
        value: function hex2dec(num) {
            return ConvertBase.convert(num).from(16).to(10);
        }
    }]);

    return ConvertBase;
}();

exports.default = ConvertBase;