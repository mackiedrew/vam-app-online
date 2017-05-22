import getSelectedGrainIndex from "../getSelectedGrainIndex";

describe("getSelectedGrainIndex() selector", () => {
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
    const result = getSelectedGrainIndex(testState);
    expect(result).toBe(1);
  });

  it("returns expected value when seek position is beyond track limits", () => {
    const result = getSelectedGrainIndex(testStateInvalid);
    expect(result).toBe(-1);
  });
});
