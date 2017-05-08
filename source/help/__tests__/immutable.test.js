import { reverse } from "../immutable";

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
