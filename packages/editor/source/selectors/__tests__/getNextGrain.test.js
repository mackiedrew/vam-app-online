import getNextGrain from "../getNextGrain";

describe("getNextGrain() selector", () => {
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
      seekPosition: 10,
      selectedTrack: "123ABC"
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
      seekPosition: 100,
      selectedTrack: "123ABC"
    }
  };

  it("returns expected value", () => {
    const result = getNextGrain(testState);
    expect(result).toEqual({ start: 20, end: 30 });
  });

  it("returns expected value when seek position is beyond track limits", () => {
    const result = getNextGrain(testStateInvalid);
    expect(result).toEqual({ start: 30, end: 40 });
  });
});
