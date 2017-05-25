import maxAmplitudes from "../maxAmplitudes";

describe("maxAmplitudes() selector", () => {
  const mockState = {
    tracks: {
      trackList: {
        "123ABC": { grains: [{ amplitude: 1 }, { amplitude: 0 }] },
        "456DEF": { grains: [{ amplitude: undefined }, { amplitude: 1 }] },
        "789GHI": { grains: [{ amplitude: 1 }, { amplitude: -10 }] }
      }
    }
  };

  it("returns an object of expected size", () => {
    const result = maxAmplitudes(mockState);
    expect(Object.keys(result).length).toBe(3);
  });

  it("returns an array of expected contents", () => {
    const result = maxAmplitudes(mockState);
    expect(result).toEqual({ "123ABC": 1, "456DEF": 1, "789GHI": 10 });
  });
});
