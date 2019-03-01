"use strict";

var _Normalizer = require("./Normalizer");

var _Normalizer2 = _interopRequireDefault(_Normalizer);

var _ActivationFunctions = require("./ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _ArrayUtils = require("../../../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// it ("normalize column removes negative values if relu and normalizes between 0 and 1", () => {
//     let toNormalize = [[5, 10, 15],
//         [10, 15, 20],
//         [15, 20, 25]];
//     let nn = new Normalizer(ActivationFunctions.relu);
//
//     // CALL
//     let result = nn.normalize(toNormalize, true);
//
//     // ASSERT
//     let flattenedResult = ArrayUtils.flatten(result);
//     let filteredResult = ArrayUtils.filter(flattenedResult, (item) => item >= 0 && item <= 1);
//     expect(flattenedResult.length).toBe(filteredResult.length);
//     expect(flattenedResult.length).toBe(9);
// });

it("normalize column works", function () {
    // SETUP
    var toNormalize = [1, 3, 5];
    // let stdDev = 2;
    var normalizer = new _Normalizer2.default(_ActivationFunctions2.default.sigmoid);

    // CALL
    var toCheck = normalizer.normalizeColumn(toNormalize).data;

    // ASSERT
    // minMaxNormalization
    expect(toCheck[0]).toBeCloseTo(0);
    expect(toCheck[1]).toBeCloseTo(0.5);
    expect(toCheck[2]).toBeCloseTo(1);
});

it("normalize works", function () {
    // SETUP
    var toNormalize = [[5, 10, 15], [10, 15, 20], [15, 20, 25]];
    // let stddev = 5;
    // let mean = [10, 15, 20];
    var normalizer = new _Normalizer2.default(_ActivationFunctions2.default.sigmoid);

    // CALL
    var result = normalizer.normalize(toNormalize, true);

    // console.log(result);

    // ASSERT
    // min-max normalization
    expect(_ArrayUtils2.default.arrayApproxEquals(result[0], [0.0, 0.0, 0.0])).toBe(true);
    expect(_ArrayUtils2.default.arrayApproxEquals(result[1], [0.5, 0.5, 0.5])).toBe(true);
    expect(_ArrayUtils2.default.arrayApproxEquals(result[2], [1.0, 1.0, 1.0])).toBe(true);
    // for (let y = 0; y < result.length; y++) {
    //
    //     for (let x = 0; x < result[y].length; x++) {
    //         let expectedValue = (toNormalize[y][x] - mean[x]) / stddev;
    //         expect(result[y][x]).toBeCloseTo(expectedValue);
    //     }
    // }
});