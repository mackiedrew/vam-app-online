import trackLengths from "../trackLengths";

describe("trackLengths() selector", () => {
  const mockState = {
    tracks: {
      trackList: {
        "123ABC": { grains: [{ end: 300 }, { end: 600 }] },
        "456DEF": { grains: [{ end: 200 }, { end: 800 }] }
      }
    }
  };

  it("returns an object of expected size", () => {
    const result = trackLengths(mockState);
    expect(Object.keys(result).length).toBe(2);
  });

  it("returns an array of expected contents", () => {
    const result = trackLengths(mockState);
    expect(result).toEqual({ "123ABC": 600, "456DEF": 800 });
  });
});
