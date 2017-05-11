import getTrackLengthFactory from "../getTrackLengthFactory";

describe("getTrackLengthFactory() factory", () => {
  it("returns a function", () => {
    const result = getTrackLengthFactory();
    expect(typeof result).toBe("function");
  });
});

describe("getTrackLength() selector", () => {
  const mockState = {
    tracks: {
      trackList: {
        "123ABC": { grains: [{ end: 300 }, { end: 600 }] },
        "456DEF": { grains: [{ end: 200 }, { end: 800 }] }
      }
    }
  };

  const mockProps = {
    id: "123ABC"
  };

  it("returns expected value", () => {
    const getTrackLength = getTrackLengthFactory();
    const result = getTrackLength(mockState, mockProps);
    expect(result).toBe(599);
  });
});
