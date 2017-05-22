import { floor, max, mean, random, clamp } from "../math";

import { range } from "../../help/collections";

describe("floor(value)", () => {
  it("rounds a positive number closer to zero", () => {
    expect(floor(5.9)).toEqual(5);
  });

  it("rounds a negative number closer to zero", () => {
    expect(floor(-5.9)).toEqual(-5);
  });

  it("rounds zero, by doing nothing", () => {
    expect(floor(0)).toEqual(0);
  });
});

describe("random()", () => {
  it("returns a number between provided minimum and maximum", () => {
    const testMin = -10;
    const testMax = 10;
    const testRange = range(100);
    testRange.forEach(() => {
      const result = random(testMin, testMax);
      expect(result).toBeGreaterThanOrEqual(testMin);
      expect(result).toBeLessThan(testMax);
    });
  });
});

describe("max()", () => {
  const testArray = [-10, 0, 10];

  it("returns a single Number", () => {
    const result = max(testArray);
    expect(typeof result).toBe("number");
  });

  it("returns a single Number when passed an array with a single number", () => {
    const result = max([10]);
    expect(result).toBe(10);
  });

  it("returns a the highest number in the array", () => {
    const result = max(testArray);
    expect(result).toBe(10);
  });
});

describe("mean()", () => {
  const testArray = [-5, 0, 10, 20, 0];

  it("returns a single Number", () => {
    const result = mean(testArray);
    expect(typeof result).toBe("number");
  });

  it("returns a the same Number when passed an array with a single number", () => {
    const result = mean([10]);
    expect(result).toBe(10);
  });

  it("returns the accurate mean average of an array", () => {
    const expectedResult = 5;
    const result = mean(testArray);
    expect(result).toBe(expectedResult);
  });
});

describe("clamp()", () => {
  it("returns a number", () => {
    const result = clamp(5, 0, 10);
    expect(typeof result).toBe("number");
  });

  it("returns lower bound if the provided value is equal to the lower bound.", () => {
    const lowerBound = 0;
    const result = clamp(lowerBound, lowerBound, 10);
    expect(result).toBe(lowerBound);
  });

  it("returns upper bound if the provided value is equal to the upper bound.", () => {
    const upperBound = 10;
    const result = clamp(0, upperBound, upperBound);
    expect(result).toBe(upperBound);
  });

  it("returns proper value even when provided with alphabetically differently sorted numbers.", () => {
    const result = clamp(0, 1, 10);
    expect(result).toBe(1);
  });
});
