"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require("../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * https://theclevermachine.wordpress.com/2014/09/08/derivation-derivatives-for-common-neural-network-activation-functions/
 *
 * TODO: refactor outputError and hiddenError into the node itself.  They are all the same.
 */
var ActivationFunctions = function () {
    function ActivationFunctions() {
        _classCallCheck(this, ActivationFunctions);
    }

    _createClass(ActivationFunctions, null, [{
        key: "all",
        get: function get() {
            if (ActivationFunctions._all === null) {
                ActivationFunctions._all = [ActivationFunctions.sigmoid, ActivationFunctions.tanh, ActivationFunctions.relu, ActivationFunctions.lrelu, ActivationFunctions.identity];
            }

            return ActivationFunctions._all;
        }
    }, {
        key: "identity",
        get: function get() {
            if (ActivationFunctions._identity === null) {
                ActivationFunctions._identity = {
                    output: function output(x) {
                        return x;
                    },
                    derivative: function derivative(x) {
                        return 1;
                    }
                };
            }

            return ActivationFunctions._identity;
        }
    }, {
        key: "sigmoid",
        get: function get() {
            if (ActivationFunctions._sigmoid === null) {
                ActivationFunctions._sigmoid = {
                    output: function output(x) {
                        return _math2.default.chain(_math2.default.e).pow(_math2.default.multiply(-1, x)).add(1.0).inv().done();
                    },
                    derivative: function derivative(x) {
                        return _math2.default.multiply(_math2.default.subtract(1.0, x), x);
                    }
                };
            }

            return ActivationFunctions._sigmoid;
        }
    }, {
        key: "tanh",
        get: function get() {
            if (ActivationFunctions._tanh === null) {
                ActivationFunctions._tanh = {
                    output: function output(x) {
                        var numerator = _math2.default.subtract(1, _math2.default.pow(_math2.default.e, _math2.default.multiply(-2, x)));
                        var denominator = _math2.default.add(1, _math2.default.pow(_math2.default.e, _math2.default.multiply(-2, x)));
                        return _math2.default.divide(numerator, denominator);
                    },
                    derivative: function derivative(x) {
                        return _math2.default.subtract(1.0, _math2.default.pow(x, 2));
                    }
                };
            }

            return ActivationFunctions._tanh;
        }
    }, {
        key: "relu",
        get: function get() {
            if (ActivationFunctions._relu === null) {
                ActivationFunctions._relu = {
                    output: function output(x) {
                        return _math2.default.max(0, x);
                    },
                    derivative: function derivative(x) {
                        return x > 0 ? 1 : 0;
                    }
                };
            }

            return ActivationFunctions._relu;
        }
    }, {
        key: "lrelu",
        get: function get() {
            if (ActivationFunctions._lrelu === null) {
                ActivationFunctions._lrelu = {
                    output: function output(x) {
                        return _math2.default.max(0.01 * x, x);
                    },
                    derivative: function derivative(x) {
                        return x > 0 ? 1 : 0.01;
                    }
                };
            }

            return ActivationFunctions._lrelu;
        }
    }]);

    return ActivationFunctions;
}();

ActivationFunctions._all = null;
ActivationFunctions._identity = null;
ActivationFunctions._sigmoid = null;
ActivationFunctions._tanh = null;
ActivationFunctions._relu = null;
ActivationFunctions._lrelu = null;
exports.default = ActivationFunctions;