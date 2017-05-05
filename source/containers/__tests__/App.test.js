import { App as Subject, mapStateToProps, mapDispatchToProps } from "../App";

const mockSettings = {
  grain: {
    label: "Grain Time",
    value: 5,
    unit: "s",
    type: "number"
  },
  quietCutoff: {
    label: "Quietness Threshold",
    value: 10,
    unit: "%",
    type: "number"
  }
};

const mockProps = {
  seekPosition: 10,
  filtersOpen: true,
  settings: mockSettings,
  trackList: [{ id: "123ABC" }, { id: "456DEF" }],
  view: { start: 0, end: 20 }
};

describe("<App />", () => {
  it("renders without crashing", () => {
    const mockGenerateNextTrackId = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} generateNextTrackId={mockGenerateNextTrackId} />
    );
    expect(subject.is("div.app")).toBe(true);
    expect(mockGenerateNextTrackId.called).toBe(true);
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        seekPosition: 1,
        trackList: 2,
        view: 3
      },
      ui: {
        filtersOpen: 4
      },
      settings: 5
    };

    it("returns object with expected properties", () => {
      const {
        seekPosition,
        filtersOpen,
        settings,
        trackList,
        view
      } = mapStateToProps(mockState);
      expect(seekPosition).toBe(1);
      expect(trackList).toBe(2);
      expect(view).toBe(3);
      expect(filtersOpen).toBe(4);
      expect(settings).toBe(5);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const {
        toggleFiltersMenu,
        toggleSettingsMenu,
        generateNextTrackId
      } = mapDispatchToProps(mockDispatch);
      expect(typeof toggleFiltersMenu).toBe("function");
      expect(typeof toggleSettingsMenu).toBe("function");
      expect(typeof generateNextTrackId).toBe("function");
    });
  });
});
