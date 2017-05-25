import {
  SeekBar as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../SeekBar";

const mockProps = {
  seekPosition: 10,
  currentlyPlaying: true
};

describe("<SeekBar />", () => {
  it("renders without crashing", () => {
    const subject = shallow(<Subject {...mockProps} />);
    expect(subject.is("div.seek-bar")).toBe(true);
  });

  it("handleViewNext call appropriate function", () => {
    const mockShiftView = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} shiftView={mockShiftView} />
    );
    subject.instance().handleViewNext();
    expect(mockShiftView.called).toBe(true);
  });

  it("handleViewPrevious call appropriate function", () => {
    const mockShiftView = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} shiftView={mockShiftView} />
    );
    subject.instance().handleViewPrevious();
    expect(mockShiftView.called).toBe(true);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Subject {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        currentlyPlaying: 1,
        seekPosition: 2
      }
    };

    it("returns object with expected properties", () => {
      const { currentlyPlaying, seekPosition } = mapStateToProps(mockState);
      expect(currentlyPlaying).toBe(1);
      expect(seekPosition).toBe(2);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const {
        zoomIn,
        zoomOut,
        shiftView,
        seekForward,
        seekReverse,
        toggleCurrentlyPlaying
      } = mapDispatchToProps(mockDispatch);
      expect(typeof zoomIn).toBe("function");
      expect(typeof zoomOut).toBe("function");
      expect(typeof seekForward).toBe("function");
      expect(typeof seekReverse).toBe("function");
      expect(typeof shiftView).toBe("function");
      expect(typeof toggleCurrentlyPlaying).toBe("function");
    });
  });
});
