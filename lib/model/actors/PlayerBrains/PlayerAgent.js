"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QLearner = require("../../ai/QLearner");

var _QLearner2 = _interopRequireDefault(_QLearner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerAgent = function () {
    function PlayerAgent(numStates) {
        _classCallCheck(this, PlayerAgent);

        this._qLearner = new _QLearner2.default(numStates, 4);
    }

    _createClass(PlayerAgent, [{
        key: "act",
        value: function act(stateNumber) {
            var reward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (reward === null) {
                return this._qLearner.querySetState(stateNumber);
            }

            return this._qLearner.query(stateNumber, reward);
        }
    }]);

    return PlayerAgent;
}();

exports.default = PlayerAgent;