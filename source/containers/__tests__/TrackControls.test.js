import {
  TrackControls as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../TrackControls";

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
  id: "123ABC",
  selectedTrack: "123ABC",
  settings: mockSettings,
  trackList: { "123ABC": { muted: true }, "456DEF": { muted: false } }
};

describe("<App />", () => {
  it("renders without crashing", () => {
    const subject = shallow(<Subject {...mockProps} />);
    expect(subject.is("div.track-controls")).toBe(true);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Subject {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls toggledMuted prop when handleToggleMute is called", () => {
    const mockToggleMuted = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} toggleMuted={mockToggleMuted} />
    );
    subject.instance().handleToggleMute();
    expect(mockToggleMuted.called).toBe(true);
  });

  it("calls remoteTrack prop when handleRemoveButton is called", () => {
    const mockRemoteTrack = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} removeTrack={mockRemoteTrack} />
    );
    subject.instance().handleRemoveButton();
    expect(mockRemoteTrack.called).toBe(true);
  });

  it("calls selectTrack prop when handleSelectTrack is called", () => {
    const mockSelectTrack = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} selectTrack={mockSelectTrack} />
    );
    subject.instance().handleSelectTrack();
    expect(mockSelectTrack.called).toBe(true);
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        seekPosition: 1,
        selectedTrack: 2,
        trackList: 3
      }
    };

    it("returns object with expected properties", () => {
      const { seekPosition, selectedTrack, trackList } = mapStateToProps(
        mockState
      );
      expect(seekPosition).toBe(1);
      expect(selectedTrack).toBe(2);
      expect(trackList).toBe(3);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const { selectTrack, removeTrack, toggleMuted } = mapDispatchToProps(
        mockDispatch
      );
      expect(typeof selectTrack).toBe("function");
      expect(typeof removeTrack).toBe("function");
      expect(typeof toggleMuted).toBe("function");
    });
  });
});
