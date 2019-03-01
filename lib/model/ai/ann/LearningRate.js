"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var decay_type_exponential = 0;

var LearningRate = function () {
    _createClass(LearningRate, null, [{
        key: "DECAY_TYPE_EXPONENTIAL",
        get: function get() {
            return decay_type_exponential;
        }
    }]);

    function LearningRate(startValue, endValue, numEpochs) {
        var decayType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LearningRate.DECAY_TYPE_EXPONENTIAL;

        _classCallCheck(this, LearningRate);

        this._startValue = startValue;
        this._endValue = endValue;
        this._numEpochs = numEpochs;
        this._decayType = decayType;
        this._growthConstant = LearningRate.getGrowthConstant(startValue, endValue, numEpochs);
    }

    _createClass(LearningRate, [{
        key: "getLearningRate",


        /**
         * This will return the learning rate at time t
         *
         * @param t {Number} This should most likely be the epoch number
         */
        value: function getLearningRate(t) {
            if (t > this._numEpochs) {
                t = this._numEpochs;
            }

            return this._startValue * Math.exp(this._growthConstant * t);
        }
    }, {
        key: "startValue",
        get: function get() {
            return this._startValue;
        },
        set: function set(value) {
            this._startValue = value;
            this._growthConstant = LearningRate.getGrowthConstant(this._startValue, this._endValue, this._numEpochs);
        }
    }, {
        key: "endValue",
        get: function get() {
            return this._endValue;
        },
        set: function set(value) {
            this._endValue = value;
            this._growthConstant = LearningRate.getGrowthConstant(this._startValue, this._endValue, this._numEpochs);
        }
    }, {
        key: "numEpochs",
        get: function get() {
            return this._numEpochs;
        },
        set: function set(value) {
            this._numEpochs = value;
            this._growthConstant = LearningRate.getGrowthConstant(this._startValue, this._endValue, this._numEpochs);
        }
    }, {
        key: "decayType",
        get: function get() {
            return this._decayType;
        }
    }, {
        key: "growthConstant",
        get: function get() {
            return this._growthConstant;
        }
    }], [{
        key: "getGrowthConstant",
        value: function getGrowthConstant(startValue, endValue, numEpochs) {
            return Math.log(endValue / startValue) / numEpochs;
        }
    }]);

    return LearningRate;
}();

exports.default = LearningRate;