"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require("../../../../node_modules/mathjs/dist/math");

var _math2 = _interopRequireDefault(_math);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Normalizer = function () {
    function Normalizer(activationFunction) {
        _classCallCheck(this, Normalizer);

        this._activationFunction = activationFunction;
        this._normalizationData = [];
        // this._toNormalizePositive = [ActivationFunctions.relu, ActivationFunctions.lrelu];
        this._toNormalizePositive = _ActivationFunctions2.default.all;
    }

    _createClass(Normalizer, [{
        key: "normalizeToPositive",
        value: function normalizeToPositive(data) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (min === null) {
                min = _math2.default.min(data);
            }

            if (max === null) {
                max = _math2.default.max(data);
            }

            if (!_ArrayUtils2.default.isIn(this._toNormalizePositive, this._activationFunction)) {
                return {
                    data: data,
                    min: min,
                    max: max
                };
            }

            var numerator = _math2.default.subtract(data, min);
            var denominator = _math2.default.subtract(max, min);
            data = _math2.default.divide(numerator, denominator);

            // if (min < 0) {
            //     data = math.subtract(data, min);
            // }
            //
            // if (max > 1) {
            //     data = math.divide(data, max);
            // }

            return {
                data: data,
                min: min,
                max: max
            };
        }
    }, {
        key: "normalizeColumn",
        value: function normalizeColumn(data) {
            var mean = _math2.default.mean(data);
            var stdDev = _math2.default.std(data);
            if (stdDev === 0) {
                stdDev = 1e-6;
            }

            // let data = this.normalizeColumnWithMeanAndStdDev(data, mean, stdDev);

            var temp = this.normalizeToPositive(data);

            return {
                data: temp.data,
                mean: mean,
                std: stdDev,
                min: temp.min,
                max: temp.max
            };
        }
    }, {
        key: "normalizeColumnWithMeanAndStdDev",
        value: function normalizeColumnWithMeanAndStdDev(colData, mean, stdDev) {
            return _math2.default.chain(colData).subtract(mean).divide(stdDev).done();
        }
    }, {
        key: "normalize",
        value: function normalize(dataSet) {
            var saveNormalizationData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            if (saveNormalizationData) {
                this._normalizationData = [];
            }

            var width = _ArrayUtils2.default.width(dataSet);
            var height = _ArrayUtils2.default.height(dataSet);
            var toRet = _ArrayUtils2.default.create(height, width, 0);

            _ArrayUtils2.default.forEachColumn(dataSet, function (column, columnIndex) {
                var toSet = null;
                if (saveNormalizationData) {
                    toSet = this.normalizeColumn(column);

                    this._normalizationData.push({
                        mean: toSet.mean,
                        std: toSet.std,
                        min: toSet.min,
                        max: toSet.max
                    });

                    _ArrayUtils2.default.setColumn(toRet, toSet.data, columnIndex);
                } else {
                    var normalizationData = this._normalizationData[columnIndex];
                    // let mean = normalizationData.mean;
                    // let std = normalizationData.std;
                    var min = normalizationData.min;
                    var max = normalizationData.max;

                    toSet = column;
                    // toSet = this.normalizeColumnWithMeanAndStdDev(column, mean, std);
                    var temp = this.normalizeToPositive(toSet, min, max);
                    toSet = temp.data;

                    _ArrayUtils2.default.setColumn(toRet, toSet, columnIndex);
                }
            }.bind(this));

            return toRet;
        }
    }]);

    return Normalizer;
}();

exports.default = Normalizer;