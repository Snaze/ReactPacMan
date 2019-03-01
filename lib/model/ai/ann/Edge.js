"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import MathUtil from "../MathUtil";
// import ActivationFunctions from "./ActivationFunctions";
// import math from "../../../../node_modules/mathjs/dist/math";
// import WeightInitializer from "./WeightInitializer";

var Edge = function () {

    /**
     * Creates a new weighted edge for a Neural Network
     *
     * @param id The id shoudl conform to "sourceLayer_sourceNode__destLayer_destNode"
     * @param weightInitializer {WeightInitializer} The weight Initializer
     */
    function Edge(id, weightInitializer) {
        _classCallCheck(this, Edge);

        this._id = id;
        this._weight = 0;
        this._prevWeight = 0;
        this._isAlive = true;
        this._weightInitializer = weightInitializer;
    }

    _createClass(Edge, [{
        key: "randomizeWeight",
        value: function randomizeWeight() {
            this.weight = this._weightInitializer.createRandomWeight();
        }
    }, {
        key: "weight",
        get: function get() {
            return this._weight;
        },
        set: function set(value) {
            this._prevWeight = this._weight;
            this._weight = value;
        }
    }, {
        key: "isAlive",
        get: function get() {
            return this._isAlive;
        },
        set: function set(value) {
            this._isAlive = value;
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "prevWeight",
        get: function get() {
            return this._prevWeight;
        }
    }, {
        key: "activationFunction",
        get: function get() {
            return this._activationFunction;
        }
    }, {
        key: "fanInCount",
        get: function get() {
            return this._fanInCount;
        }
    }, {
        key: "fanOutCount",
        get: function get() {
            return this._fanOutCount;
        }
    }]);

    return Edge;
}();

exports.default = Edge;