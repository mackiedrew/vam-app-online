import trackLength from "../trackLength";

describe("trackLength() selector", () => {
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

  it("returns a number", () => {
    const result = trackLength(mockState, mockProps);
    expect(typeof result).toBe("number");
  });

  it("returns expected value", () => {
    const result = trackLength(mockState, mockProps);
    expect(result).toBe(599);
  });
});
