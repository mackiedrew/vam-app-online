import getHotkeyValues from "../getHotkeyValues";

const mockState = {
  keyboard: {
    hotkeys: {
      play: {
        label: "Play/Pause Key",
        value: "p"
      },
      next: {
        label: "Next Grain Key",
        value: "e"
      },
      previous: {
        label: "Previous Grain Key",
        value: "q"
      },
      nextTrack: {
        label: "Next Track Key",
        value: "j"
      },
      previousTrack: {
        label: "Previous Track Key",
        value: "k"
      }
    }
  }
};

describe("getHotkeyValues() selector", () => {
  it("returns an object of expected size", () => {
    const result = getHotkeyValues(mockState);
    expect(Object.keys(result).length).toBe(5);
  });

  it("returns expected result", () => {
    const result = getHotkeyValues(mockState);
    const expected = {
      play: "p",
      next: "e",
      previous: "q",
      nextTrack: "j",
      previousTrack: "k"
    };
    expect(result).toEqual(expected);
  });
});
