import getVisibleGrainsFactory, {
  getVisibleGrainsCore
} from "../getVisibleGrainsFactory";

describe("getVisibleGrainsCore() factory", () => {
  const mockTrack = {
    grains: [
      { start: 0, end: 10, amplitude: 1 },
      { start: 10, end: 20, amplitude: 2 },
      { start: 20, end: 30, amplitude: 3 },
      { start: 30, end: 40, amplitude: 4 },
      { start: 40, end: 50, amplitude: 5 },
      { start: 50, end: 60, amplitude: 6 },
      { start: 60, end: 70, amplitude: 7 },
      { start: 70, end: 80, amplitude: 8 },
      { start: 80, end: 90, amplitude: 9 },
      { start: 90, end: 100, amplitude: 10 }
    ]
  };
  const mockView = { start: 0, end: 100 };

  it("returns expected result when view exactly matches grains", () => {
    const result = getVisibleGrainsCore(mockTrack, mockView);
    const expected = [
      { start: 0, end: 0, amplitude: 0, disabled: true },
      ...mockTrack.grains,
      { start: 100, end: 100, amplitude: 0, disabled: true }
    ];
    expect(result).toEqual(expected);
  });

  it("returns expected result when there is no grain key", () => {
    const emptyTrack = {};
    const result = getVisibleGrainsCore(emptyTrack, mockView);
    expect(result).toEqual([]);
  });

  it("returns expected result when there is a grain key but no grains", () => {
    const emptyGrains = { grains: [] };
    const result = getVisibleGrainsCore(emptyGrains, mockView);
    expect(result).toEqual([]);
  });

  it("returns expected result when there are no grains in view", () => {
    const result = getVisibleGrainsCore(mockTrack, { start: 200, end: 300 });
    expect(result).toEqual([]);
  });

  it("returns expected result when getting a middle section of a track", () => {
    const result = getVisibleGrainsCore(mockTrack, { start: 25, end: 65 });
    const expected = [
      { start: 25, end: 30, amplitude: 3, disabled: true },
      { start: 30, end: 40, amplitude: 4 },
      { start: 40, end: 50, amplitude: 5 },
      { start: 50, end: 60, amplitude: 6 },
      { start: 60, end: 65, amplitude: 7, disabled: true }
    ];
    expect(result).toEqual(expected);
  });

  it("returns expected result when getting a left section of a track", () => {
    const result = getVisibleGrainsCore(mockTrack, { start: 0, end: 25 });
    const expected = [
      { start: 0, end: 0, amplitude: 0, disabled: true },
      { start: 0, end: 10, amplitude: 1 },
      { start: 10, end: 20, amplitude: 2 },
      { start: 20, end: 25, amplitude: 3, disabled: true }
    ];
    expect(result).toEqual(expected);
  });

  it("returns expected result when getting a right section of a track", () => {
    const result = getVisibleGrainsCore(mockTrack, { start: 75, end: 100 });
    const expected = [
      { start: 75, end: 80, amplitude: 8, disabled: true },
      { start: 80, end: 90, amplitude: 9 },
      { start: 90, end: 100, amplitude: 10 },
      { start: 100, end: 100, amplitude: 0, disabled: true }
    ];
    expect(result).toEqual(expected);
  });

  it("returns expected result when getting a larger section than the track", () => {
    const result = getVisibleGrainsCore(mockTrack, { start: 0, end: 200 });
    const expected = [
      { start: 0, end: 0, amplitude: 0, disabled: true },
      ...mockTrack.grains,
      { start: 100, end: 200, amplitude: 0, disabled: true }
    ];
    expect(result).toEqual(expected);
  });
});

describe("getVisibleGrainsFactory() factory", () => {
  it("returns a function", () => {
    const result = getVisibleGrainsFactory();
    expect(typeof result).toBe("function");
  });
});

describe("getVisibleGrains() selector", () => {
  const mockState = {
    tracks: {
      view: { start: 0, end: 100 },
      trackList: {
        "123ABC": {
          grains: [
            { start: 0, end: 10 },
            { start: 10, end: 20 },
            { start: 10, end: 30 },
            { start: 20, end: 30 },
            { start: 30, end: 40 },
            { start: 40, end: 50 },
            { start: 50, end: 60 },
            { start: 60, end: 70 },
            { start: 70, end: 80 },
            { start: 80, end: 90 },
            { start: 90, end: 100 }
          ]
        }
      }
    }
  };

  const mockProps = {
    id: "123ABC"
  };

  it("returns expected result", () => {
    const getVisibleGrains = getVisibleGrainsFactory();
    const result = getVisibleGrains(mockState, mockProps);
    const expected = [
      { start: 0, end: 0, amplitude: 0, disabled: true },
      ...mockState.tracks.trackList[mockProps.id].grains,
      { start: 100, end: 100, amplitude: 0, disabled: true }
    ];
    expect(typeof result).toBe("object");
    expect(result).toEqual(expected);
  });
});
