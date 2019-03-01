"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require("../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QLearner = function () {
    function QLearner(numStates) {
        var numActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.2;
        var gamma = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.9;
        var rar = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.98;
        var radr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.9999;
        var verbose = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

        _classCallCheck(this, QLearner);

        this._numStates = numStates;
        this._numActions = numActions;
        this._alpha = alpha;
        this._gamma = gamma;
        this._rar = rar;
        this._radr = radr;
        this._verbose = verbose;

        this._s = 0;
        this._a = 0;
        this._q = QLearner.createQMatrix(numStates, numActions);

        if (!!window) {
            window.q = this._q;
        }
    }

    _createClass(QLearner, [{
        key: "log",
        value: function log(toLog) {
            if (this._verbose && !!console) {
                console.log(toLog);
            }
        }

        /**
         * Update the state without updating the Q-table
         * @param s: The new state
         * @returns: The selected action
         */

    }, {
        key: "querySetState",
        value: function querySetState(s) {

            var action = this.getAction(s, false);

            this.log("s = " + this._s + ", a = " + this._a + ", s_prime = " + s + ", a_prime = " + action + ", rar = " + this._rar);

            this._s = s;
            this._a = action;

            return action;
        }

        /**
         * Update the Q table and return an action
         *
         * @param sPrime: The new state
         * @param r: The reward
         * @returns: The selected action
         */

    }, {
        key: "query",
        value: function query(sPrime, r) {

            var aPrime = this.getAction(sPrime, true);
            var firstPart = _math2.default.chain(1.0).subtract(this._alpha).multiply(this._q[this._s][this._a]).done();

            var secondPart = _math2.default.chain(this._gamma).multiply(this._q[sPrime][aPrime]).add(r).multiply(this._alpha).done();
            this._q[this._s][this._a] = _math2.default.chain(firstPart).add(secondPart).done();

            // this._q[this._s][this._a] = (1.0 - this._alpha) * this._q[this._s][this._a] +
            //     this._alpha * (r + this._gamma * this._q[sPrime][aPrime]);

            //      self.Q[self.s, self.a] = (1. - self.alpha) * self.Q[self.s, self.a] \
            //          + self.alpha * (r + self.gamma * self.Q[s_prime, a_prime])

            // this.log(`s = ${this._s}, a = ${this._a}, sPrime = ${sPrime}, aPrime = ${aPrime}, r = ${r}`);

            this._s = sPrime;
            this._a = aPrime;

            return aPrime;
        }

        /**
         * TODO: Move this to a common location
         *
         * @param theArray
         */

    }, {
        key: "getAction",
        value: function getAction(sPrime) {
            var updateRar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


            var randomValue = Math.random();
            var aPrime = null;

            if (this._rar >= randomValue) {
                aPrime = Math.floor(Math.random() * this._numActions);
            } else {
                aPrime = QLearner.argMax(this._q[sPrime]);
            }

            if (updateRar) {
                this._rar = _math2.default.chain(this._rar).multiply(this._radr).done();
            }

            return aPrime;
        }
    }], [{
        key: "createQMatrix",
        value: function createQMatrix(numStates, numActions) {
            var toRet = [];

            for (var s = 0; s < numStates; s++) {
                toRet[s] = [];

                for (var a = 0; a < numActions; a++) {
                    toRet[s][a] = QLearner.getRandomArbitrary(-1.0, 1.0);
                }
            }

            return toRet;
        }
    }, {
        key: "argMax",
        value: function argMax(theArray) {
            var index = -1;
            var max = Number.NEGATIVE_INFINITY;

            if (typeof theArray === "undefined") {
                debugger;
            }

            theArray.forEach(function (item, i) {
                if (item > max) {
                    max = item;
                    index = i;
                }
            });

            return index;
        }

        /**
         * TODO: Move this to a common location
         *
         * @param min
         * @param max
         * @returns {*}
         */

    }, {
        key: "getRandomArbitrary",
        value: function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }]);

    return QLearner;
}();

exports.default = QLearner;