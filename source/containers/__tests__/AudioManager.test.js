import {
  AudioManager as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../AudioManager";

jest.useFakeTimers();

const mockProps = {
  setSeekPosition: sinon.spy(),
  selectedTrack: "123ABC",
  trackList: {
    "123ABC": {
      url: "http://track.1/",
      type: "wav/dog",
      muted: false
    }
  }
};

describe("<AudioManager />", () => {
  describe("renders without crashing", () => {
    it("while playing", () => {
      shallow(<Subject {...mockProps} currentlyPlaying />);
    });
    it("while not playing", () => {
      shallow(<Subject {...mockProps} />);
    });
  });

  describe("renders correctly", () => {
    it("while playing", () => {
      const tree = renderer
        .create(<Subject {...mockProps} currentlyPlaying />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("while not playing", () => {
      const tree = renderer.create(<Subject {...mockProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("tick calls setSeekPosition correctly", () => {
    it("while playing", () => {
      const mockSetSeekPosition = sinon.spy();
      const mockGetElementById = sinon.stub();
      mockGetElementById.returns({
        currentTime: 123
      });
      document.getElementById = mockGetElementById;
      const subject = shallow(
        <Subject
          {...mockProps}
          setSeekPosition={mockSetSeekPosition}
          currentlyPlaying
        />
      );
      subject.instance().tick();
      expect(mockSetSeekPosition.called).toBe(true);
    });
    it("while not playing", () => {
      const mockSetSeekPosition = sinon.spy();
      const mockGetElementById = sinon.stub();
      mockGetElementById.returns({
        currentTime: 123
      });
      document.getElementById = mockGetElementById;
      const subject = shallow(
        <Subject {...mockProps} setSeekPosition={mockSetSeekPosition} />
      );
      subject.instance().tick();
      expect(mockSetSeekPosition.called).toBe(false);
    });
  });

  it("clearInterval() is called when componentWillUnmount() called", () => {
    const subject = shallow(<Subject {...mockProps} />);
    subject.instance().componentWillUnmount();
    expect(clearInterval.mock.calls.length).toBe(1);
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        trackList: 1,
        selectedTrack: 2
      }
    };

    it("returns object with expected properties", () => {
      const { selectedTrack, trackList } = mapStateToProps(mockState);
      expect(trackList).toBe(1);
      expect(selectedTrack).toBe(2);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const { setSeekPosition } = mapDispatchToProps(mockDispatch);
      expect(typeof setSeekPosition).toBe("function");
    });
  });
});
