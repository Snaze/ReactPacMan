"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class will be used store past sequence transitions
 * and to select past minibatches of them.
 */
var ReplayMemory = function () {

    /**
     * This is the constructor for the replay memory. When the capacity is filled, the oldest items will be removed
     * first.
     * @param capacity {Number} This is the max number of transitions you wish to store.
     */
    function ReplayMemory(capacity) {
        _classCallCheck(this, ReplayMemory);

        this._capacity = capacity;
        this._data = _ArrayUtils2.default.create1D(capacity, null);
        this._keys = Object.create(null);
        this._index = 0;
        this._maxIndex = 0;
    }

    /**
     * This will increment the current index value.  This stores the last index used to insert data.
     * @private
     */


    _createClass(ReplayMemory, [{
        key: "_incrementIndex",
        value: function _incrementIndex() {
            this._index++;

            if (this._index >= this._capacity) {
                this._index = 0;
            }
        }

        /**
         * This will increment the max index value.  The max index represents how much of the _data array
         * is currently being used, allowing the selection of random mini-batches.
         * @private
         */

    }, {
        key: "_incrementMaxIndex",
        value: function _incrementMaxIndex() {
            if (this._maxIndex < this._capacity) {
                this._maxIndex++;
            }
        }

        /**
         * Use this method to return the Transition key if possible.  Else it will just to toString()
         * @param transition {Transition|*}
         * @private
         */

    }, {
        key: "_getTransitionKey",
        value: function _getTransitionKey(transition) {
            if (!!transition.toKey) {
                return transition.toKey();
            }

            return transition.toString();
        }

        /**
         * This method will store the transition in memory.
         * @param transition {Transition} This is the transition object.
         */

    }, {
        key: "store",
        value: function store(transition) {
            var transitionKey = this._getTransitionKey(transition);

            // We already have this transition
            if (transitionKey in this._keys) {
                return;
            }

            var transitionToRemove = this._data[this._index];
            if (transitionToRemove !== null) {
                var transitionKeyToRemove = this._getTransitionKey(transitionToRemove);
                delete this._keys[transitionKeyToRemove];
            }

            this._data[this._index] = transition;
            this._keys[transitionKey] = true;

            this._incrementIndex();
            this._incrementMaxIndex();
        }

        /**
         * This will return an Array of transitions which can be used
         * to train the neural network.
         *
         * @param miniBatchSize {Number} The number of Transition objects you wish to retrieve.
         * @returns {Array} Returns array of Transition objects representing the mini-batch
         */

    }, {
        key: "sampleRandomMinibatch",
        value: function sampleRandomMinibatch() {
            var miniBatchSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            return _ArrayUtils2.default.sample(this._data, miniBatchSize, true, this.maxIndex);
        }

        /**
         * This represents the number of transitions the ReplayMemory can hold.
         * @returns {Number}
         */

    }, {
        key: "capacity",
        get: function get() {
            return this._capacity;
        }

        /**
         * This represents the next index that will be used to insert data.
         * @returns {Number}
         */

    }, {
        key: "index",
        get: function get() {
            return this._index;
        }

        /**
         * This indicates that all indices less than this value contain valid transitions.
         * @returns {Number}
         */

    }, {
        key: "maxIndex",
        get: function get() {
            return this._maxIndex;
        }
    }]);

    return ReplayMemory;
}();

exports.default = ReplayMemory;