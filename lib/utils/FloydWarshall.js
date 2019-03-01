"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Level from "../Level";


var _Location = require("../model/Location");

var _Location2 = _interopRequireDefault(_Location);

var _Direction = require("./Direction");

var _Direction2 = _interopRequireDefault(_Direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FloydWarshall = function () {
    function FloydWarshall() {
        _classCallCheck(this, FloydWarshall);

        this._dist = null;
        this._next = null;
        this._vertIds = null;
        this._edges = null;
        this._paths = null;
        this._directions = null;
        this._pathDistance = null;
    }

    _createClass(FloydWarshall, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                _directions: this._directions,
                _pathDistance: this._pathDistance
            };
        }
    }, {
        key: "getEdges",
        value: function getEdges(level) {
            if (this._edges === null) {
                this._edges = this.buildEdges(level);
            }

            return this._edges;
        }
    }, {
        key: "getVertIds",
        value: function getVertIds(level) {
            if (this._vertIds === null) {
                this._vertIds = this.buildVertIds(level);
            }

            return this._vertIds;
        }
    }, {
        key: "buildVertIds",
        value: function buildVertIds(level) {
            var toRet = [];

            level.iterateOverCells(function (cell) {
                if (cell.isActive) {
                    toRet.push(cell.id);
                }
            });

            return toRet;
        }
    }, {
        key: "buildEdges",
        value: function buildEdges(level) {
            var toRet = [];
            var self = this;

            this.getVertIds(level).forEach(function (vertId) {
                self.getVertIds(level).forEach(function (otherVertId) {
                    toRet.push([vertId, otherVertId]);
                });
            });

            return toRet;
        }
    }, {
        key: "getDistance",
        value: function getDistance(level, edge) {
            if (edge[0] === edge[1]) {
                return 0;
            }

            var currentCell = level.getCellById(edge[0]);
            var otherCell = level.getCellById(edge[1]);

            if (currentCell.canTraverseTo(otherCell, level.width, level.height)) {
                return 1;
            }

            return Number.POSITIVE_INFINITY;
        }

        /**
         * https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
         */

    }, {
        key: "_buildShortestPaths",
        value: function _buildShortestPaths(level) {
            if (this._dist !== null || this._next !== null) {
                throw new Error("Shortest Paths Already Calculated.");
            }

            var self = this;

            this.getEdges(level).forEach(function (edge) {
                var u = edge[0];
                var v = edge[1];

                if (typeof self.dist[u] === "undefined") {
                    self.dist[u] = {};
                }

                if (typeof self.next[u] === "undefined") {
                    self.next[u] = {};
                }

                self.dist[u][v] = self.getDistance(level, edge);
                self.next[u][v] = v;
            });

            this.getVertIds(level).forEach(function (k) {
                self.getVertIds(level).forEach(function (i) {
                    self.getVertIds(level).forEach(function (j) {
                        if (self.dist[i][j] > self.dist[i][k] + self.dist[k][j]) {
                            self.dist[i][j] = self.dist[i][k] + self.dist[k][j];
                            self.next[i][j] = self.next[i][k];
                        }
                    });
                });
            });
        }
    }, {
        key: "_getPath",
        value: function _getPath(u, v) {
            if (this.next[u][v] === null) {
                return [];
            }

            var path = [u];
            while (u !== v) {
                u = this.next[u][v];
                path.push(u);
            }

            return path;
        }
    }, {
        key: "buildAllPaths",
        value: function buildAllPaths(level) {
            if (this._paths !== null) {
                throw new Error("Paths already initialized.");
            }

            this._buildShortestPaths(level);

            this._paths = {};
            var self = this;

            this.getEdges(level).forEach(function (edge) {
                var key = FloydWarshall._convertEdgeToKey(edge);
                self._paths[key] = self._getPath(edge[0], edge[1]);
            });
        }
    }, {
        key: "getPath",
        value: function getPath(u, v) {
            if (this._paths === null) {
                throw new Error("You must call buildAllPaths before using this method");
            }

            var key = FloydWarshall._convertEdgeToKey([u, v]);
            return this._paths[key];
        }
    }, {
        key: "convertPathsToDirections",
        value: function convertPathsToDirections(level) {
            this._directions = {};
            this._pathDistance = {};

            for (var key in this._paths) {
                if (this._paths.hasOwnProperty(key)) {
                    var currentPath = this._paths[key];
                    if (currentPath.length === 1) {
                        this._directions[key] = _Direction2.default.NONE;
                        this._pathDistance[key] = 1;
                    } else {
                        var fromCellId = currentPath[0];
                        var toCellId = currentPath[1];
                        var fromCell = level.getCellById(fromCellId);
                        var toCell = level.getCellById(toCellId);

                        this._directions[key] = _Location2.default.getDirection(fromCell.location, toCell.location, level.width, level.height);
                        this._pathDistance[key] = currentPath.length;
                    }
                }
            }

            // I'm doing this to save space.
            this._dist = null;
            this._next = null;
            this._vertIds = null;
            this._edges = null;
            this._paths = null;
        }
    }, {
        key: "getDirection",
        value: function getDirection(fromCellId, toCellId) {
            if (this._directions === null) {
                throw new Error("You must first call convertPathsToDirections");
            }

            return this._directions[FloydWarshall._convertCellIdsToKey(fromCellId, toCellId)];
        }
    }, {
        key: "getPathDistance",
        value: function getPathDistance(fromCellId, toCellId) {
            if (this._pathDistance === null) {
                throw new Error("You must first call convertPathsToDirections");
            }

            return this._pathDistance[FloydWarshall._convertCellIdsToKey(fromCellId, toCellId)];
        }
    }, {
        key: "dist",
        get: function get() {
            if (this._dist === null) {
                this._dist = {};
            }

            return this._dist;
        }
    }, {
        key: "next",
        get: function get() {
            if (this._next === null) {
                this._next = {};
            }

            return this._next;
        }
    }], [{
        key: "fromJSON",
        value: function fromJSON(jsonObject) {
            var toRet = new FloydWarshall();

            toRet._directions = jsonObject._directions;
            toRet._pathDistance = jsonObject._pathDistance;

            return toRet;
        }
    }, {
        key: "_convertEdgeToKey",
        value: function _convertEdgeToKey(edge) {
            return edge[0] + "__" + edge[1];
        }
    }, {
        key: "_convertCellIdsToKey",
        value: function _convertCellIdsToKey(fromCellId, toCellId) {
            return fromCellId + "__" + toCellId;
        }
    }]);

    return FloydWarshall;
}();

exports.default = FloydWarshall;