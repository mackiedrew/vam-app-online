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

  const mockStateNoGrainsKey = {
    tracks: {
      trackList: {
        "123ABC": {},
        "456DEF": {}
      }
    }
  };

  it("returns an array of expected contents, when no grains key exists", () => {
    const result = trackLengths(mockStateNoGrainsKey);
    expect(result).toEqual({ "123ABC": -Infinity, "456DEF": -Infinity });
  });

  const mockStateNoGrains = {
    tracks: {
      trackList: {
        "123ABC": { grains: [] },
        "456DEF": { grains: [] }
      }
    }
  };

  it("returns an array of expected contents, when no grains exist", () => {
    const result = trackLengths(mockStateNoGrains);
    expect(result).toEqual({ "123ABC": -Infinity, "456DEF": -Infinity });
  });
});
