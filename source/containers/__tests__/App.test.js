import { App as Subject, mapStateToProps, mapDispatchToProps } from "../App";
jest.mock("../../components/Header", () => "Header");
jest.mock("../../components/Tracks", () => "Tracks");
jest.mock("../Settings", () => "Settings");
jest.mock("../SeekBar", () => "SeekBar");

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

  it("renders correctly", () => {
    const tree = renderer
      .create(<Subject {...mockProps} generateNextTrackId={sinon.spy()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        seekPosition: 1,
        trackList: 2,
        view: 3
      },
      settings: 4
    };

    it("returns object with expected properties", () => {
      const { seekPosition, settings, trackList, view } = mapStateToProps(
        mockState
      );
      expect(seekPosition).toBe(1);
      expect(trackList).toBe(2);
      expect(view).toBe(3);
      expect(settings).toBe(4);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const { toggleSettingsMenu, generateNextTrackId } = mapDispatchToProps(
        mockDispatch
      );
      expect(typeof toggleSettingsMenu).toBe("function");
      expect(typeof generateNextTrackId).toBe("function");
    });
  });
});
