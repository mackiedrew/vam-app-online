import getGrainTagsFactory from "../getGrainTagsFactory";

describe("getGrainTagsFactory() factory", () => {
  it("returns a function", () => {
    const result = getGrainTagsFactory();
    expect(typeof result).toBe("function");
  });
});

describe("getGrainTags() selector", () => {
  const mockState = {
    settings: {
      quietCutoff: {
        value: 0.5
      }
    },
    tracks: {
      trackList: {
        "123ABC": { grains: [{ amplitude: 1 }, { amplitude: 0, end: 10 }] },
        "456DEF": { grains: [{ amplitude: 0 }, { amplitude: 1, end: 10 }] }
      }
    }
  };

  const mockProps = {
    id: "123ABC"
  };

  it("returns expected result", () => {
    const getGrainTags = getGrainTagsFactory();
    const result = getGrainTags(mockState, mockProps);
    expect(typeof result).toBe("object");
    expect(result[0].quiet).toBe(false);
    expect(result[1].quiet).toBe(true);
  });

  it("returns expected result when there are no grains", () => {
    const noGrainsMock = {
      settings: {
        quietCutoff: {
          value: 0.5
        }
      },
      tracks: {
        trackList: {
          "123ABC": {}
        }
      }
    };

    const getGrainTags = getGrainTagsFactory();
    const result = getGrainTags(noGrainsMock, mockProps);
    expect(typeof result).toBe("object");
    expect(result).toEqual([]);
  });
});
