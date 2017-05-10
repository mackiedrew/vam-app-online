import {
  Track as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../Track";
jest.mock("../TrackControls", () => "TrackControls");
jest.mock("../../help/wav", () => ({
  richReadWav: () =>
    new Promise(resolve =>
      resolve({
        sampleRate: 0,
        grains: []
      })
    )
}));

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

const mockTracks = {
  "123ABC": {
    grains: [{ start: 0, end: 4 }, { start: 4, end: 8 }],
    fileName: "test.wav"
  }
};

const mockProps = {
  id: "123ABC",
  seekPosition: 10,
  selectedTrack: "123ABC",
  settings: mockSettings,
  trackList: mockTracks,
  view: { start: 0, end: 20 }
};

describe("<Track />", () => {
  it("renders without crashing", () => {
    shallow(<Subject {...mockProps} />);
  });

  describe("renders correctly", () => {
    it("with no grains", () => {
      const tree = renderer
        .create(<Subject {...mockProps} trackList={{ "123ABC": {} }} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with grains", () => {
      const tree = renderer.create(<Subject {...mockProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("readPath() calls all actions it needs to", () => {
    const mockSetTrackSampleRate = sinon.spy();
    const mockSetTrackGrains = sinon.spy();
    const subject = shallow(
      <Subject
        {...mockProps}
        setTrackGrains={mockSetTrackGrains}
        setTrackSampleRate={mockSetTrackSampleRate}
      />
    );
    return subject.instance().readPath().then(() => {
      expect(mockSetTrackSampleRate.called).toBe(true);
      expect(mockSetTrackGrains.called).toBe(true);
    });
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        seekPosition: 1,
        trackList: 2,
        selectedTrack: 3,
        view: 4
      },
      settings: 5
    };

    it("returns object with expected properties", () => {
      const {
        seekPosition,
        selectedTrack,
        settings,
        trackList,
        view
      } = mapStateToProps(mockState);
      expect(seekPosition).toBe(1);
      expect(trackList).toBe(2);
      expect(selectedTrack).toBe(3);
      expect(view).toBe(4);
      expect(settings).toBe(5);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const {
        setTrackSampleRate,
        setTrackGrains,
        setSeekPosition
      } = mapDispatchToProps(mockDispatch);
      expect(typeof setTrackSampleRate).toBe("function");
      expect(typeof setTrackGrains).toBe("function");
      expect(typeof setSeekPosition).toBe("function");
    });
  });
});
