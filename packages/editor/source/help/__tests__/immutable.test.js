import { reverse, add } from "../immutable";

describe("immutableReverse", () => {
  it("returns an empty array if provided as original", () => {
    const original = [];
    const result = reverse(original);
    expect(result).toEqual(original);
  });
  it("returns the same array if provided with single element array", () => {
    const original = [1];
    const result = reverse(original);
    expect(result).toEqual(original);
  });
  it("returns a reversed array when provided with an array above n=1", () => {
    const original = [1, 2, 3, 4, 5];
    const reversed = [5, 4, 3, 2, 1];
    const result = reverse(original);
    expect(result).toEqual(reversed);
  });
});

describe("add()", () => {
  const testArray = [-5, 0, 10];

  it("returns a single Number", () => {
    const result = add(testArray);
    expect(typeof result).toBe("number");
  });

  it("returns a the same Number when passed an array with a single number", () => {
    const result = add([10]);
    expect(result).toBe(10);
  });

  it("returns the added array", () => {
    const expectedResult = 5;
    const result = add(testArray);
    expect(result).toBe(expectedResult);
  });

  it("returns 0 for a fully zero containing array", () => {
    const expectedResult = 0;
    const result = add([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(result).toBe(expectedResult);
  });
});
