import getCurrentGrainFactory from "../getCurrentGrainFactory";

describe("getCurrentGrainFactory() factory", () => {
  it("returns a function", () => {
    const result = getCurrentGrainFactory();
    expect(typeof result).toBe("function");
  });
});

describe("getCurrentGrain() selector", () => {
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
    const getCurrentGrain = getCurrentGrainFactory();
    const result = getCurrentGrain(testState, mockProps);
    expect(result).toEqual({ start: 10, end: 20 });
  });

  it("returns expected value when seek position is beyond track limits", () => {
    const getCurrentGrain = getCurrentGrainFactory();
    const result = getCurrentGrain(testStateInvalid, mockProps);
    expect(result).toEqual({ start: Infinity, end: -Infinity });
  });
});
