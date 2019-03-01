"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RMSProp = require("./RMSProp");

var _RMSProp2 = _interopRequireDefault(_RMSProp);

var _SGD = require("./SGD");

var _SGD2 = _interopRequireDefault(_SGD);

var _Adam = require("./Adam");

var _Adam2 = _interopRequireDefault(_Adam);

var _AdamMatrix = require("./AdamMatrix");

var _AdamMatrix2 = _interopRequireDefault(_AdamMatrix);

var _ArrayUtils = require("../../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Assert = require("../../../../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var back_prop_type_sgd = "sgd";
var back_prop_type_rms_prop = "rmsprop";
var back_prop_type_adam = "adam";
var back_prop_type_adam_matrix = "adammatrix";

var all = [back_prop_type_sgd, back_prop_type_rms_prop, back_prop_type_adam, back_prop_type_adam_matrix];

/**
 * This is a factory for creating back propagation strategies.
 *
 * http://sebastianruder.com/optimizing-gradient-descent/index.html#gradientdescentoptimizationalgorithms
 */

var BackPropFactory = function () {
    function BackPropFactory() {
        _classCallCheck(this, BackPropFactory);
    }

    _createClass(BackPropFactory, null, [{
        key: "create",


        /**
         * Use this method to create an instance of the BackPropFactory.
         *
         * @param type {String} This should be a valid BACK_PROP_TYPE.  Check the static members of this class.
         * @param layerIndex {Number} This should be the layer index of the node this class serves.
         * @param nodeIndex {Number} This should be the node index of the node this class serves.
         * @param includeBias {Boolean} This should indicate whether or not the owning node includes the bias term.
         * @param edgeStore {EdgeStore} This should be the EdgeStore class for the Neural Network.
         * @param activationFunction {Object} This should be an ActivationFunction from the ActivationFunctions class
         * @returns {*} Returns a BackProp Strategy instance specific to the owning node.
         */
        value: function create(type, layerIndex, nodeIndex, includeBias, edgeStore, activationFunction) {
            (0, _Assert.assert)(_ArrayUtils2.default.isIn(BackPropFactory.BACK_PROP_TYPE_ALL, type), "Invalid BackProp Type");

            type = type.toLowerCase();

            switch (type) {
                case BackPropFactory.BACK_PROP_TYPE_SGD:
                    return new _SGD2.default(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction);
                case BackPropFactory.BACK_PROP_TYPE_RMS_PROP:
                    return new _RMSProp2.default(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction);
                case BackPropFactory.BACK_PROP_TYPE_ADAM:
                    return new _Adam2.default(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction);
                case BackPropFactory.BACK_PROP_TYPE_ADAM_MATRIX:
                    return new _AdamMatrix2.default(layerIndex, nodeIndex, includeBias, edgeStore, activationFunction);
                default:
                    throw new Error("Invalid BackProp Type");
            }
        }
    }, {
        key: "BACK_PROP_TYPE_SGD",


        /**
         * This back prop type indicates the Stochastic Gradient Descent Back Prop Strategy.
         * @returns {string}
         */
        get: function get() {
            return back_prop_type_sgd;
        }

        /**
         * This back prop type indeicates the RMSProp Back Prop Stategy
         * @returns {string}
         */

    }, {
        key: "BACK_PROP_TYPE_RMS_PROP",
        get: function get() {
            return back_prop_type_rms_prop;
        }

        /**
         * This back prop type indicates the ADAM Back Prop Stategy
         * @returns {string}
         */

    }, {
        key: "BACK_PROP_TYPE_ADAM",
        get: function get() {
            return back_prop_type_adam;
        }

        /**
         * Same as Adam but Im hoping this performs better.
         * @returns {string}
         */

    }, {
        key: "BACK_PROP_TYPE_ADAM_MATRIX",
        get: function get() {
            return back_prop_type_adam_matrix;
        }

        /**
         * This returns an array containing all the valid back prop strategy types.
         * @returns {Array}
         */

    }, {
        key: "BACK_PROP_TYPE_ALL",
        get: function get() {
            return all;
        }
    }]);

    return BackPropFactory;
}();

exports.default = BackPropFactory;