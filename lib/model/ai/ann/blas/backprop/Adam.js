"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ArrayUtils = require("../../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _vectorious = require("vectorious");

var _Assert = require("../../../../../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This will perform the Adam flavor of Back Prop using vectorious (so hopefully this will be
 * faster)
 */
var Adam = function () {

    /**
     * Constructor for the ADAM BLAS backprop method.
     *
     * Consult the following website for more info on what these parameters do.
     *
     * http://sebastianruder.com/optimizing-gradient-descent/index.html#gradientdescentoptimizationalgorithms
     *
     * @param gradientDecay {Number} This decays the gradient.
     * @param squaredGradientDecay {Number} This decays the squared gradient.
     * @param errorFactor {Number} The error factor.
     */
    function Adam() {
        var gradientDecay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.9;
        var squaredGradientDecay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.999;
        var errorFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-8;

        _classCallCheck(this, Adam);

        this._gradientDecay = gradientDecay;
        this._inverseGradientDecay = 1.0 - this._gradientDecay;
        this._squaredGradientDecay = squaredGradientDecay;
        this._inverseSquaredGradientDecay = 1.0 - this._squaredGradientDecay;
        this._errorFactor = errorFactor;

        this._gradient = null;
        this._gradientSquared = null;
    }

    /**
     * This method will populate this._gradient and this._gradientSquared if null.
     * @param shape {Array} This is be the shape of the incoming default SGD gradient
     * @private
     */


    _createClass(Adam, [{
        key: "_populateGradientHistory",
        value: function _populateGradientHistory(shape) {
            if (this._gradient === null) {
                this._gradient = new _vectorious.Matrix(_ArrayUtils2.default.create(shape[0], shape[1], 0));
            }

            if (this._gradientSquared === null) {
                this._gradientSquared = new _vectorious.Matrix(_ArrayUtils2.default.create(shape[0], shape[1], 0));
            }
        }

        /**
         * This method will calculate weight deltas according to the standard SGD deltas.
         *
         * n = # of inputs / # of incoming weights per node
         * m = # of records in mini-batch
         * r = # of nodes in next layer / # of error values in next layer / # of outgoing weights
         * p = # of nodes in current layer / "this._numNodes"
         *
         * @param currentGradient {Matrix} The SGD gradients.  This should be (n x p)
         * @param learningRate {Number} This should be the current learning rate 1 >= learningRate > 0
         */

    }, {
        key: "getWeightDeltas",
        value: function getWeightDeltas(currentGradient, learningRate) {
            (0, _Assert.assert)(learningRate > 0 && learningRate <= 1, "Invalid Learning Rate");

            this._populateGradientHistory(currentGradient.shape);

            // let test = BLAS;
            var m_t = _vectorious.Matrix.scale(this.gradient, this.gradientDecay).add(_vectorious.Matrix.scale(currentGradient, this.inverseGradientDecay));

            var currentGradientSquared = _vectorious.Matrix.product(currentGradient, currentGradient);

            var v_t = _vectorious.Matrix.scale(this.gradientSquared, this.squaredGradientDecay).add(_vectorious.Matrix.scale(currentGradientSquared, this.inverseSquaredGradientDecay));

            var mHat_t = _vectorious.Matrix.scale(m_t, 1.0 / this.inverseGradientDecay);

            var vHat_t = _vectorious.Matrix.scale(v_t, 1.0 / this.inverseSquaredGradientDecay);

            // TODO: You could probably interface with BLAS directly and make this faster.
            var weightDeltas = mHat_t.map(function (currMHatT, row, column) {
                return -(learningRate / (Math.sqrt(vHat_t.get(row, column)) + this.errorFactor)) * currMHatT;
            }.bind(this));

            this._gradient = m_t;
            this._gradientSquared = v_t;

            return weightDeltas;
        }

        /**
         * This is the previous Gradient used to find the weight deltas
         *
         * @returns {Matrix}
         */

    }, {
        key: "gradient",
        get: function get() {
            return this._gradient;
        }

        /**
         * This is the previous Squared Gradient used to find weight deltas
         * @returns {Matrix}
         */

    }, {
        key: "gradientSquared",
        get: function get() {
            return this._gradientSquared;
        }

        /**
         *
         * @returns {Number|*}
         */

    }, {
        key: "gradientDecay",
        get: function get() {
            return this._gradientDecay;
        }

        /**
         *
         * @returns {Number|*}
         */

    }, {
        key: "squaredGradientDecay",
        get: function get() {
            return this._squaredGradientDecay;
        }

        /**
         *
         * @returns {Number|*}
         */

    }, {
        key: "errorFactor",
        get: function get() {
            return this._errorFactor;
        }

        /**
         *
         * @returns {number|*}
         */

    }, {
        key: "inverseGradientDecay",
        get: function get() {
            return this._inverseGradientDecay;
        }
    }, {
        key: "inverseSquaredGradientDecay",
        get: function get() {
            return this._inverseSquaredGradientDecay;
        }
    }]);

    return Adam;
}();

exports.default = Adam;