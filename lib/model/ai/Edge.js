"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("../../utils/Assert");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = function () {
    _createClass(Edge, null, [{
        key: "DELIMETER",
        get: function get() {
            return "|";
        }
    }]);

    function Edge(vertexId1, vertexId2) {
        var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        _classCallCheck(this, Edge);

        (0, _Assert.assert)(vertexId1.indexOf("|") < 0);
        (0, _Assert.assert)(vertexId2.indexOf("|") < 0);

        this._vertexId1 = vertexId1;
        this._vertexId2 = vertexId2;
        this._weight = weight;
    }

    _createClass(Edge, [{
        key: "isEqualTo",
        value: function isEqualTo(vertexId1, vertexId2) {
            return this.vertexId1 === vertexId1 && this.vertexId2 === vertexId2;
        }
    }, {
        key: "equals",
        value: function equals(otherEdge) {
            return this.vertexId1 === otherEdge.vertexId1 && this.vertexId2 === otherEdge.vertexId2;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Edge(this._vertexId1, this._vertexId2, this._weight);
        }
    }, {
        key: "cloneReverse",
        value: function cloneReverse() {
            return new Edge(this._vertexId2, this._vertexId1, this._weight);
        }
    }, {
        key: "key",
        get: function get() {
            return this._vertexId1 + "|" + this._vertexId2;
        }
    }, {
        key: "reverseKey",
        get: function get() {
            return this._vertexId2 + "|" + this._vertexId1;
        }
    }, {
        key: "vertexId1",
        get: function get() {
            return this._vertexId1;
        }
    }, {
        key: "vertexId2",
        get: function get() {
            return this._vertexId2;
        }
    }, {
        key: "weight",
        get: function get() {
            return this._weight;
        }
    }]);

    return Edge;
}();

exports.default = Edge;