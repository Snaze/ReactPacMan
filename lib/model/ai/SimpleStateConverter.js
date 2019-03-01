"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import ConvertBase from "../../utils/ConvertBase";


var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Assert = require("../../utils/Assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var max_distance = 41;
var max_living_state = 2;
var max_direction = 15;
var max_power_up_value = 5000;

var SimpleStateConverter = function () {
    function SimpleStateConverter() {
        _classCallCheck(this, SimpleStateConverter);

        this._firstLength = null;
    }

    _createClass(SimpleStateConverter, [{
        key: "toFeatureVector",


        /**
         * This will create a 1-way feature vector to train the Deep Q Learner.
         *
         * @param goc {GameObjectContainer} The game object container.
         * @returns {Array} The array that represents the feature vector.
         */
        value: function toFeatureVector(goc) {
            var toRet = [];

            _ArrayUtils2.default.extend(toRet, this._getPlayerVector(goc));
            _ArrayUtils2.default.extend(toRet, this._getGhostVector(goc, goc.ghostRed));
            _ArrayUtils2.default.extend(toRet, this._getGhostVector(goc, goc.ghostBlue));
            _ArrayUtils2.default.extend(toRet, this._getGhostVector(goc, goc.ghostOrange));
            _ArrayUtils2.default.extend(toRet, this._getGhostVector(goc, goc.ghostPink));
            _ArrayUtils2.default.extend(toRet, this._getPowerUpVector(goc));
            _ArrayUtils2.default.extend(toRet, this._getDotFeatureVector(goc));

            if (this._firstLength === null) {
                this._firstLength = toRet.length;
            }

            (0, _Assert.assert)(toRet.length === this._firstLength, "All Feature Vectors must be the same length");

            return toRet;
        }

        /**
         * This will return the feature vector for the specified ghost.
         * @param goc {GameObjectContainer} The GameObjectContainer
         * @param ghost {Ghost} The ghost.
         * @returns {Array} Returns array of the feature vector.
         * @private
         */

    }, {
        key: "_getGhostVector",
        value: function _getGhostVector(goc, ghost) {
            var toRet = [];

            this._populateArrayWithCommonInfo(toRet, goc, ghost);

            return toRet;
        }

        /**
         * This will return the feature vector for the powerup in the GOC.
         * @param goc {GameObjectContainer} The GameObjectContainer
         * @returns {Array} Returns the feature vector.
         * @private
         */

    }, {
        key: "_getPowerUpVector",
        value: function _getPowerUpVector(goc) {
            var toRet = [];
            this._populateArrayWithCommonInfo(toRet, goc, goc.powerUp);
            toRet.push(goc.powerUp.powerUpValue / max_power_up_value);

            return toRet;
        }

        /**
         * Use this to populate a feature vector for both the Ghost and the PowerUp
         *
         * @param goc {GameObjectContainer}
         * @param commonEntity {Ghost|PowerUp}
         * @param theArray {Array} The array you wish to populate
         * @private
         */

    }, {
        key: "_populateArrayWithCommonInfo",
        value: function _populateArrayWithCommonInfo(theArray, goc, commonEntity) {
            var level = goc.level;

            var distance = this._getDistanceBetweenLocations(goc, goc.player.location, commonEntity.location);
            theArray.push(distance);
            var direction = level.floydWarshall.getDirection(goc.player.location.toCellId(), commonEntity.location.toCellId());
            var directionArray = this.convertDirectionToNumber(direction);
            _ArrayUtils2.default.extend(theArray, directionArray);

            if (commonEntity.isAlive) {
                if (!!commonEntity.isScared) {
                    theArray.push(1 / max_living_state);
                } else {
                    theArray.push(2 / max_living_state);
                }
            } else {
                theArray.push(0 / max_living_state);
            }
        }
    }, {
        key: "_getDistanceBetweenLocations",
        value: function _getDistanceBetweenLocations(goc, fromLocation, toLocation) {
            var level = goc.level;
            var distance = level.floydWarshall.getPathDistance(fromLocation.toCellId(), toLocation.toCellId());
            if (typeof distance === "undefined") {
                distance = max_distance; // This might be a good value but might not.... Dont want it too big
            } else {
                distance--; // For some reason its returning distance + 1
            }

            if (distance > max_distance) {
                if (!!window.console) {
                    window.console.log("distance > max_distance");
                }
                distance = max_distance;
            }

            distance /= max_distance;

            return distance;
        }
    }, {
        key: "convertDirectionToNumber",
        value: function convertDirectionToNumber(direction) {
            var toRet = _ArrayUtils2.default.create1D(4, 0);

            if (direction === _Direction2.default.LEFT) {
                toRet[0] = 1;
            } else if (direction === _Direction2.default.UP) {
                toRet[1] = 1;
            } else if (direction === _Direction2.default.RIGHT) {
                toRet[2] = 1;
            } else if (direction === _Direction2.default.DOWN) {
                toRet[3] = 1;
            }

            return toRet;
        }

        /**
         * This will return the feature vector containing just player information.
         *
         * @param goc {GameObjectContainer} The GameObjectContainer.
         * @private
         */

    }, {
        key: "_getPlayerVector",
        value: function _getPlayerVector(goc) {
            var toRet = [];
            var level = goc.level;
            var player = goc.player;
            var cell = level.getCellByLocation(player.location);
            var locations = {
                left: player.location.clone().moveInDirection(_Direction2.default.LEFT, level.height, level.width),
                up: player.location.clone().moveInDirection(_Direction2.default.UP, level.height, level.width),
                right: player.location.clone().moveInDirection(_Direction2.default.RIGHT, level.height, level.width),
                down: player.location.clone().moveInDirection(_Direction2.default.DOWN, level.height, level.width)
            };

            var binaryArray = [];
            var buildBinaryArray = function buildBinaryArray(directionName) {
                if (locations[directionName].equals(player.location) || !cell.canTraverseTo(level.getCellByLocation(locations[directionName]), level.width, level.height, true)) {
                    binaryArray.push(0);
                } else {
                    binaryArray.push(1);
                }
            };

            buildBinaryArray("left");
            buildBinaryArray("up");
            buildBinaryArray("right");
            buildBinaryArray("down");

            _ArrayUtils2.default.extend(toRet, binaryArray);

            return toRet;
        }

        /**
         * This will return the feature vector for the closest dots
         * @param goc {GameObjectContainer}
         * @param maxSearchDepth {Number} This is the max search depth for the graph.  I used 22 because
         * most game boards are 23 x 20 so you would typically need 22 hops to get across the board directly.  If
         * there are a lot of obstacles this might be a problem but I'll leave it here for now.
         * @private
         */

    }, {
        key: "_getDotFeatureVector",
        value: function _getDotFeatureVector(goc) {
            var maxSearchDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 22;

            var toRet = [];
            var closestDotLocation = null;
            var closestBigDotLocation = null;

            var callback = function callback(vertex) {
                var cell = goc.level.getCellById(vertex.id);

                if (closestDotLocation === null && cell.hasLittleDot) {
                    closestDotLocation = cell.location;
                }

                if (closestBigDotLocation === null && cell.hasBigDot) {
                    closestBigDotLocation = cell.location;
                }
            };

            goc.graph.breadthFirstSearch(goc.player.location.toCellId(), callback);

            if (closestDotLocation === null) {
                toRet.push(max_distance / max_distance);
                _ArrayUtils2.default.extend(toRet, this.convertDirectionToNumber(_Direction2.default.NONE));

                if (!!window.console) {
                    window.console.log("Cannot find closest dot");
                }
            } else {
                toRet.push(this._getDistanceBetweenLocations(goc, goc.player.location, closestDotLocation));
                var direction = goc.level.floydWarshall.getDirection(goc.player.location.toCellId(), closestDotLocation.toCellId());
                var directionArray = this.convertDirectionToNumber(direction);
                _ArrayUtils2.default.extend(toRet, directionArray);
            }

            if (closestBigDotLocation === null) {
                toRet.push(max_distance / max_distance);
                _ArrayUtils2.default.extend(toRet, this.convertDirectionToNumber(_Direction2.default.NONE));

                if (!!window.console) {
                    window.console.log("Cannot find closest big dot");
                }
            } else {
                toRet.push(this._getDistanceBetweenLocations(goc, goc.player.location, closestBigDotLocation));
                var _direction = goc.level.floydWarshall.getDirection(goc.player.location.toCellId(), closestBigDotLocation.toCellId());

                var _directionArray = this.convertDirectionToNumber(_direction);
                _ArrayUtils2.default.extend(toRet, _directionArray);
            }

            return toRet;
        }
    }], [{
        key: "MAX_DISTANCE",
        get: function get() {
            return max_distance;
        }
    }, {
        key: "MAX_LIVING_STATE",
        get: function get() {
            return max_living_state;
        }
    }, {
        key: "MAX_DIRECTION",
        get: function get() {
            return max_direction;
        }
    }, {
        key: "MAX_POWER_UP_VALUE",
        get: function get() {
            return max_power_up_value;
        }
    }]);

    return SimpleStateConverter;
}();

exports.default = SimpleStateConverter;