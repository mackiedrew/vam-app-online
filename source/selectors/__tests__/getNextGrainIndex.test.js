import getNextGrainIndex from "../getNextGrainIndex";

describe("getNextGrainIndex() selector", () => {
  const testState = {
    tracks: {
      trackList: {
        "123ABC": {
          grains: [
            { start: 0, end: 10 },
            { start: 10, end: 20 },
            { start: 20, end: 30 },
            { start: 30, end: 40 }
          ]
        }
      },
      selectedTrack: "123ABC",
      seekPosition: 10
    }
  };

  const testStateInvalid = {
    tracks: {
      trackList: {
        "123ABC": {
          grains: [
            { start: 0, end: 10 },
            { start: 10, end: 20 },
            { start: 20, end: 30 },
            { start: 30, end: 40 }
          ]
        }
      },
      selectedTrack: "123ABC",
      seekPosition: 100
    }
  };

  it("returns expected value", () => {
    const result = getNextGrainIndex(testState);
    expect(result).toBe(2);
  });

  it("returns expected value when seek position is beyond track limits", () => {
    const result = getNextGrainIndex(testStateInvalid);
    expect(result).toBe(3);
  });
});
