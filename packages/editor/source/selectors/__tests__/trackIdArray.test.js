import trackIdArray from "../trackIdArray";

describe("trackIdArray() selector", () => {
  const mockState = {
    tracks: {
      trackList: {
        "123ABC": {},
        "456DEF": {}
      }
    }
  };

  it("returns an array of expected length", () => {
    const result = trackIdArray(mockState);
    expect(result.length).toBe(2);
  });

  it("returns an array of expected contents", () => {
    const result = trackIdArray(mockState);
    expect(result).toEqual(["123ABC", "456DEF"]);
  });
});
