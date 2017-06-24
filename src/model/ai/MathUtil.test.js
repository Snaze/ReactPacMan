import MathUtil from "./MathUtil";
import ArrayUtil from "../../utils/ArrayUtils";

it ("distance works", () => {
    // SETUP
    let array1 = [1, 2, 3];
    let array2 = [0, 2, 3];

    // CALL
    let distance = MathUtil.distance(array1, array1);
    let distance2 = MathUtil.distance(array1, array2);

    // ASSERT
    expect(distance).toBeCloseTo(0);
    expect(distance2).toBeCloseTo(1);
});

it ("clip works", () => {
    // SETUP
    let toClip = [0.1, -0.1, 1.1, 1.0, 0.5];

    // CALL
    MathUtil.clip(toClip, 0, 1);

    // ASSERT
    let filteredResult = ArrayUtil.filter(toClip, (item) => item >= 0 && item <= 1);
    expect(filteredResult.length).toBe(5);
    expect(filteredResult[0]).toBeCloseTo(0.1);
    expect(filteredResult[1]).toBeCloseTo(0.0);
    expect(filteredResult[2]).toBeCloseTo(1.0);
    expect(filteredResult[3]).toBeCloseTo(1.0);
    expect(filteredResult[4]).toBeCloseTo(0.5);
});