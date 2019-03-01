"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Assert = require("../../../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This object represents a distinct State within the DeepQLearner.
 *
 * It is simply a collection of State Arrays and Actions taken.
 */
var Sequence = function () {

    /**
     * This creates a Sequence object.
     * @param initialState {Array} This should be an array representing the initial state.
     * @param size {Number} The max size of the sequence when you call preProcess
     */
    function Sequence(initialState) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

        _classCallCheck(this, Sequence);

        this._states = [initialState];
        this._actions = [];
        this._size = size;
    }

    /**
     * This will append the result of taking action from the previous state
     * and ending of in state "state".
     * @param action {Number} This should be a number representing the action taken.
     * @param state {Array} This should be an array representing the next state
     */


    _createClass(Sequence, [{
        key: "append",
        value: function append(action, state) {
            this._actions.push(action);
            this._states.push(state);
        }

        /**
         * This will create a new Sequence containing "size" most recent states.
         */

    }, {
        key: "createPreProcessedSequence",
        value: function createPreProcessedSequence() {

            var initialStateIndex = Math.max(0, this._states.length - this.size);
            var toRet = new Sequence(this.states[initialStateIndex], this.size);

            for (var i = initialStateIndex + 1; i < this.states.length; i++) {
                toRet.append(this.actions[i - 1], this.states[i]);
            }

            return toRet;
        }

        /**
         * This will return the entire sequence of states in a flattened array
         * @returns {Array} This will return the entire sequence of states in a flattened array.
         */

    }, {
        key: "toInput",
        value: function toInput() {
            if (this.size <= this.states.length) {
                var toFlatten = _ArrayUtils2.default.take(this.states, this.size, this.states.length - this.size);
                return _ArrayUtils2.default.flatten(toFlatten);
            }

            (0, _Assert.assert)(this.states.length > 0, "There should be at least one state in here");

            // This thing needs at least one state.
            var stateSize = this.states[0].length;
            var properSize = stateSize * this.size;

            var toRet = _ArrayUtils2.default.flatten(this.states);
            while (toRet.length < properSize) {
                toRet.unshift(0);
            }
            return toRet;
        }

        /**
         * This will convert this Sequence into a key.
         */

    }, {
        key: "toKey",
        value: function toKey() {
            var input = this.toInput(this.size);
            var arrayAsCharacters = input.map(function (item) {
                return item.toString();
            });
            return arrayAsCharacters.join("");
        }

        /**
         * This returns an array of the visited states
         * @returns {Array}
         */

    }, {
        key: "clone",


        /**
         * This will make a shallow-copy clone of this sequence object.
         */
        value: function clone() {
            var toRet = new Sequence(null, this.size);

            toRet._states = _ArrayUtils2.default.copy(this._states);
            toRet._actions = _ArrayUtils2.default.copy(this._actions);

            return toRet;
        }
    }, {
        key: "states",
        get: function get() {
            return this._states;
        }

        /**
         * This returns an array of the actions performed
         * @returns {Array}
         */

    }, {
        key: "actions",
        get: function get() {
            return this._actions;
        }

        /**
         * The max size of the preprocessed transition.
         * @returns {Number|*}
         */

    }, {
        key: "size",
        get: function get() {
            return this._size;
        }
    }]);

    return Sequence;
}();

exports.default = Sequence;