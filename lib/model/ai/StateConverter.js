"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Location from "../Location";


var _ArrayUtils = require("../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _Player = require("../actors/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Ghost = require("../actors/Ghost");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _PowerUp = require("../actors/PowerUp");

var _PowerUp2 = _interopRequireDefault(_PowerUp);

var _GameObjectContainer = require("../GameObjectContainer");

var _GameObjectContainer2 = _interopRequireDefault(_GameObjectContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class should be used to convert the GameObjectContainer into a feature vector
 * that will be used to train the NN.
 */
var StateConverter = function () {
    function StateConverter() {
        _classCallCheck(this, StateConverter);
    }

    _createClass(StateConverter, [{
        key: "toFeatureVector",


        /**
         * This will convert the GameObjectContainer into the feature vector.
         *
         * @param goc {GameObjectContainer}
         * @returns {Array}
         */
        value: function toFeatureVector(goc) {
            // Must be done in this order...
            // PLAYER
            // Ghost Red
            // Ghost Blue
            // Ghost Pink
            // Ghost Orange
            // PowerUp
            // GameObjectContainer

            var toRet = [];

            _ArrayUtils2.default.extend(toRet, goc.player.toFeatureVector());
            _ArrayUtils2.default.extend(toRet, goc.ghostRed.toFeatureVector());
            _ArrayUtils2.default.extend(toRet, goc.ghostBlue.toFeatureVector());
            _ArrayUtils2.default.extend(toRet, goc.ghostPink.toFeatureVector());
            _ArrayUtils2.default.extend(toRet, goc.ghostOrange.toFeatureVector());
            _ArrayUtils2.default.extend(toRet, goc.powerUp.toFeatureVector());
            _ArrayUtils2.default.extend(toRet, goc.toFeatureVector());

            return toRet;
        }

        /**
         * This will modify the GameObjectContainer to represent the state
         * of the feature vector
         *
         * @param goc {GameObjectContainer}
         * @param featureVector {Array}
         */

    }, {
        key: "setFeatureVector",
        value: function setFeatureVector(goc, featureVector) {
            // PLAYER
            // Ghost Red
            // Ghost Blue
            // Ghost Pink
            // Ghost Orange
            // PowerUp
            // GameObjectContainer

            var currentStartIndex = 0;
            goc.player.setFeatureVector(_ArrayUtils2.default.take(featureVector, _Player2.default.featureVectorLength, currentStartIndex));
            currentStartIndex += _Player2.default.featureVectorLength;

            goc.ghostRed.setFeatureVector(_ArrayUtils2.default.take(featureVector, _Ghost2.default.featureVectorLength, currentStartIndex));
            currentStartIndex += _Ghost2.default.featureVectorLength;

            goc.ghostBlue.setFeatureVector(_ArrayUtils2.default.take(featureVector, _Ghost2.default.featureVectorLength, currentStartIndex));
            currentStartIndex += _Ghost2.default.featureVectorLength;

            goc.ghostPink.setFeatureVector(_ArrayUtils2.default.take(featureVector, _Ghost2.default.featureVectorLength, currentStartIndex));
            currentStartIndex += _Ghost2.default.featureVectorLength;

            goc.ghostOrange.setFeatureVector(_ArrayUtils2.default.take(featureVector, _Ghost2.default.featureVectorLength, currentStartIndex));
            currentStartIndex += _Ghost2.default.featureVectorLength;

            goc.powerUp.setFeatureVector(_ArrayUtils2.default.take(featureVector, _PowerUp2.default.featureVectorLength, currentStartIndex));
            currentStartIndex += _PowerUp2.default.featureVectorLength;

            goc.setFeatureVector(_ArrayUtils2.default.take(featureVector, _GameObjectContainer2.default.featureVectorLength, currentStartIndex));
            // currentStartIndex += GameObjectContainer.featureVectorLength;
        }
    }], [{
        key: "capitalizeStartChar",


        /**
         * This method will capitalize that first character of a string
         * @param color {string}
         * @returns {string}
         */
        value: function capitalizeStartChar(color) {
            var splitArray = color.split("");
            splitArray[0] = splitArray[0].toUpperCase();
            return splitArray.join("");
        }
    }, {
        key: "trainingFeatureIndices",
        get: function get() {
            if (StateConverter._trainingFeatureIndices === null) {
                var toSet = [];
                var temp = void 0;
                var currentLength = 0;

                // PLAYER
                temp = _ArrayUtils2.default.copy(_Player2.default.trainingFeatureIndices);
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _Player2.default.featureVectorLength;

                // Ghost Red
                temp = _ArrayUtils2.default.copy(_Ghost2.default.trainingFeatureIndices);
                temp = temp.map(function (item) {
                    return item + currentLength;
                });
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _Ghost2.default.featureVectorLength;

                // Ghost Blue
                temp = _ArrayUtils2.default.copy(_Ghost2.default.trainingFeatureIndices);
                temp = temp.map(function (item) {
                    return item + currentLength;
                });
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _Ghost2.default.featureVectorLength;

                // Ghost Pink
                temp = _ArrayUtils2.default.copy(_Ghost2.default.trainingFeatureIndices);
                temp = temp.map(function (item) {
                    return item + currentLength;
                });
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _Ghost2.default.featureVectorLength;

                // Ghost Orange
                temp = _ArrayUtils2.default.copy(_Ghost2.default.trainingFeatureIndices);
                temp = temp.map(function (item) {
                    return item + currentLength;
                });
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _Ghost2.default.featureVectorLength;

                // PowerUp
                temp = _ArrayUtils2.default.copy(_PowerUp2.default.trainingFeatureIndices);
                temp = temp.map(function (item) {
                    return item + currentLength;
                });
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _PowerUp2.default.featureVectorLength;

                // GameObjectContainer
                temp = _ArrayUtils2.default.copy(_GameObjectContainer2.default.trainingFeatureIndices);
                temp = temp.map(function (item) {
                    return item + currentLength;
                });
                _ArrayUtils2.default.extend(toSet, temp);
                currentLength += _GameObjectContainer2.default.featureVectorLength;

                StateConverter._trainingFeatureIndices = toSet;
            }

            return StateConverter._trainingFeatureIndices;
        }
    }]);

    return StateConverter;
}();

StateConverter._trainingFeatureIndices = null;
exports.default = StateConverter;