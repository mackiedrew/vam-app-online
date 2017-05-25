import getCurrentGrainIndexFactory from "../getCurrentGrainIndexFactory";

describe("getCurrentGrainIndexFactory() factory", () => {
  it("returns a function", () => {
    const result = getCurrentGrainIndexFactory();
    expect(typeof result).toBe("function");
  });
});

describe("getCurrentGrainIndex() selector", () => {
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
      seekPosition: 100
    }
  };

  const mockProps = {
    trackId: "123ABC"
  };

  it("returns expected value", () => {
    const getCurrentGrainIndex = getCurrentGrainIndexFactory();
    const result = getCurrentGrainIndex(testState, mockProps);
    expect(result).toBe(1);
  });

  it("returns expected value when seek position is beyond track limits", () => {
    const getCurrentGrainIndex = getCurrentGrainIndexFactory();
    const result = getCurrentGrainIndex(testStateInvalid, mockProps);
    expect(result).toBe(-1);
  });
});
