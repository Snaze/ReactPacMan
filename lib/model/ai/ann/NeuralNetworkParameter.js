"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NeuralNetworkParameter = function () {
    function NeuralNetworkParameter() {
        _classCallCheck(this, NeuralNetworkParameter);

        this._inputs = null;
        this._expectedOutputs = null;
        this._miniBatchSize = 10;
        this._maxEpochs = 100;
        this._minError = null;
        this._minWeightDelta = null;
        this._cacheMinError = false;
        this._normalizeInputs = false;
    }

    _createClass(NeuralNetworkParameter, [{
        key: "normalizeInputs",
        get: function get() {
            return this._normalizeInputs;
        },
        set: function set(value) {
            this._normalizeInputs = value;
        }
    }, {
        key: "inputs",
        get: function get() {
            return this._inputs;
        },
        set: function set(value) {
            this._inputs = value;
        }
    }, {
        key: "expectedOutputs",
        get: function get() {
            return this._expectedOutputs;
        },
        set: function set(value) {
            this._expectedOutputs = value;
        }
    }, {
        key: "miniBatchSize",
        get: function get() {
            return this._miniBatchSize;
        },
        set: function set(value) {
            this._miniBatchSize = value;
        }
    }, {
        key: "maxEpochs",
        get: function get() {
            return this._maxEpochs;
        },
        set: function set(value) {
            this._maxEpochs = value;
        }
    }, {
        key: "minError",
        get: function get() {
            return this._minError;
        },
        set: function set(value) {
            this._minError = value;
        }
    }, {
        key: "minWeightDelta",
        get: function get() {
            return this._minWeightDelta;
        },
        set: function set(value) {
            this._minWeightDelta = value;
        }
    }, {
        key: "cacheMinError",
        get: function get() {
            return this._cacheMinError;
        },
        set: function set(value) {
            this._cacheMinError = value;
        }
    }]);

    return NeuralNetworkParameter;
}();

exports.default = NeuralNetworkParameter;