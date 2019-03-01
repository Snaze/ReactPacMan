"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import ArrayUtils from "../../../utils/ArrayUtils";


/**
 * This class represents a single transition.
 * Going from sequence_t, taking action_t, receiving reward_t, and ending up in sequence_t_plus_1.
 */
var Transition = function () {

  /**
   * This is the construction of the Transition.
   *
   * @param sequenceT {Sequence} This should be a limited "preprocessed" sequence of limited length.
   * @param actionT {Number} This should be the number representing the action taken.
   * @param rewardT {Number} This should be the number representing the reward received after taking
   * actionT.
   * @param sequenceTPlus1 {Sequence} This should be the limited "preprocessed" sequence you end up
   * in after taking actionT.
   * @param t {Number} The time t.
   * @param tdError {Number} The TD Error of the transition. ==> r + gamma * Q_max_a(s', a') - Q(s, a)
   */
  function Transition(sequenceT, actionT, rewardT, sequenceTPlus1, t, tdError) {
    _classCallCheck(this, Transition);

    this._sequenceT = sequenceT;
    this._actionT = actionT;
    this._rewardT = rewardT;
    this._sequenceTPlus1 = sequenceTPlus1;
    this._t = t;
    this._tdError = tdError;
    this._prevTdError = null;
  }

  /**
   * The Sequence object at time T
   * @returns {Sequence}
   */


  _createClass(Transition, [{
    key: "toKey",


    /**
     * This will create a key for this Transition.
     */
    value: function toKey() {
      var sequenceKey = this._sequenceT.toKey();
      var sequenceTPlus1Key = this._sequenceTPlus1.toKey();
      var rewardKey = this._rewardT.toString();
      var actionKey = this._actionT.toString();

      var toRet = [sequenceKey, sequenceTPlus1Key, rewardKey, actionKey];
      return toRet.join("_");
    }
  }, {
    key: "sequenceT",
    get: function get() {
      return this._sequenceT;
    }

    /**
     * The action taken after observing sequenceT at time T
     * @returns {Number}
     */

  }, {
    key: "actionT",
    get: function get() {
      return this._actionT;
    }

    /**
     * The reward received after taking actionT after observing sequenceT
     * @returns {Number}
     */

  }, {
    key: "rewardT",
    get: function get() {
      return this._rewardT;
    }

    /**
     * The resulting Sequence after taking actionT after observing sequenceT and receiving
     * rewardT
     * @returns {Sequence}
     */

  }, {
    key: "sequenceTPlus1",
    get: function get() {
      return this._sequenceTPlus1;
    }

    /**
     * The time t.
     * @returns {Number}
     */

  }, {
    key: "t",
    get: function get() {
      return this._t;
    }

    /**
     * Return the TD Error of this transition for the last time it was processed
     * @returns {Number}
     */

  }, {
    key: "tdError",
    get: function get() {
      return this._tdError;
    }

    /**
     * Set the TD Error
     * @param value {Number}
     */
    ,
    set: function set(value) {
      this._prevTdError = this._tdError;
      this._tdError = value;
    }

    /**
     * Previous TD Error Value
     * @returns {null|Number}
     */

  }, {
    key: "prevTdError",
    get: function get() {
      return this._prevTdError;
    }
  }]);

  return Transition;
}();

exports.default = Transition;