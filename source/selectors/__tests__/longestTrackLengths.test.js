import longestTrackLength from "../longestTrackLength";

describe("longestTrackLength() selector", () => {
  const mockState = {
    tracks: {
      trackList: {
        "123ABC": { grains: [{ end: 300 }, { end: 600 }] },
        "456DEF": { grains: [{ end: 200 }, { end: 800 }] }
      }
    }
  };

  it("returns an object of expected size", () => {
    const result = longestTrackLength(mockState);
    expect(typeof result).toBe("number");
  });

  it("returns an array of expected contents", () => {
    const result = longestTrackLength(mockState);
    expect(result).toEqual(800);
  });
});
