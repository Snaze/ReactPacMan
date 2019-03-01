"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("../../utils/Assert");

var _Edge = require("./Edge");

var _Edge2 = _interopRequireDefault(_Edge);

var _LinkedList = require("./LinkedList");

var _LinkedList2 = _interopRequireDefault(_LinkedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vert_color_white = 0;
var vert_color_grey = 1;
var vert_color_black = 2;

var Graph = function () {
    function Graph() {
        _classCallCheck(this, Graph);

        this._vertices = new Set();
        this._adj = {};
        this._edgeCount = 0;
    }

    _createClass(Graph, [{
        key: "addVertex",
        value: function addVertex(vertexId) {
            (0, _Assert.assert)(vertexId.indexOf(_Edge2.default.DELIMETER) < 0);

            this._vertices.add(vertexId);
            this._adj[vertexId] = new Set();
        }
    }, {
        key: "containsVertex",
        value: function containsVertex(vertexId) {
            return this._vertices.has(vertexId);
        }
    }, {
        key: "removeVertex",
        value: function removeVertex(vertexId) {
            this._vertices.delete(vertexId);
            delete this._adj[vertexId];
        }

        /**
         * Iterate over all vertices
         *
         * @param callback Standard callback --> callback(item, index);
         */

    }, {
        key: "iterateVertices",
        value: function iterateVertices(callback) {
            this._vertices.forEach(callback);
        }
    }, {
        key: "addEdge",
        value: function addEdge(vertexId1, vertexId2) {
            (0, _Assert.assert)(this.containsVertex(vertexId1));
            (0, _Assert.assert)(this.containsVertex(vertexId2));

            var prevSize = this._adj[vertexId1].size;

            this._adj[vertexId1].add(vertexId2);
            this._adj[vertexId2].add(vertexId1);

            if (prevSize !== this._adj[vertexId1].size) {
                this._edgeCount++;
            }
        }

        /**
         * Iterate over all edges
         *
         * @param callback The callback should be of the form callback(edge, index)
         */

    }, {
        key: "iterateEdges",
        value: function iterateEdges(callback) {
            this._vertices.forEach(function (vertId) {

                this._adj[vertId].forEach(function (otherVertId) {

                    callback(vertId, otherVertId);
                });
            }.bind(this));
        }
    }, {
        key: "containsEdge",
        value: function containsEdge(vertexId1, vertexId2) {
            return this._adj[vertexId1].has(vertexId2);
        }
    }, {
        key: "removeEdge",
        value: function removeEdge(vertexId1, vertexId2) {
            this._adj[vertexId1].delete(vertexId2);
            this._adj[vertexId2].delete(vertexId1);
            this._edgeCount--;
        }
    }, {
        key: "breadthFirstSearch",
        value: function breadthFirstSearch(startVertexId) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var _this = this;

            var vertIdsToIgnore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var maxDistance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.POSITIVE_INFINITY;

            var verts = {};
            this._vertices.forEach(function (vertId) {
                verts[vertId] = {
                    id: vertId,
                    color: vert_color_white,
                    distance: Number.POSITIVE_INFINITY,
                    previous: null
                };
            });

            var startVert = verts[startVertexId];
            startVert.color = vert_color_grey;
            startVert.distance = 0;

            var queue = new _LinkedList2.default();
            queue.append(startVert);

            var _loop = function _loop() {
                var u = queue.popFront();

                if (callback) {
                    callback(u);
                }

                _this._adj[u.id].forEach(function (vertexId) {
                    var v = verts[vertexId];

                    if (v.color === vert_color_white) {
                        v.color = vert_color_grey;
                        v.distance = u.distance + 1;
                        v.previous = u;

                        // If distance is less than max
                        // and we don't want to ignore this vertex
                        // then enqueue the vertex into the queue.
                        if (v.distance <= maxDistance && vertIdsToIgnore.indexOf(v.id) < 0) {
                            queue.append(v);
                        }
                    }
                });

                u.color = vert_color_black;
            };

            while (queue.length > 0) {
                _loop();
            }
        }
    }, {
        key: "edgeCount",
        get: function get() {
            return this._edgeCount;
        }
    }, {
        key: "vertexCount",
        get: function get() {
            return this._vertices.size;
        }
    }]);

    return Graph;
}();

exports.default = Graph;