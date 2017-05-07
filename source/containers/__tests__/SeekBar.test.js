import {
  SeekBar as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../SeekBar";

const mockProps = {
  seekPosition: 10,
  currentlyPlaying: true
};

describe("<Track />", () => {
  it("renders without crashing", () => {
    const subject = shallow(<Subject {...mockProps} />);
    expect(subject.is("div.seek-bar")).toBe(true);
  });

  it("seekSeconds call appropriate function with no sampleRate", () => {
    const mockShiftSeekPosition = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} shiftSeekPosition={mockShiftSeekPosition} />
    );
    subject.instance().seekSeconds(10);
    expect(mockShiftSeekPosition.called).toBe(true);
  });

  it("seekSeconds call appropriate function with a sampleRate", () => {
    const mockShiftSeekPosition = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} shiftSeekPosition={mockShiftSeekPosition} />
    );
    subject.instance().seekSeconds(10, 33333);
    expect(mockShiftSeekPosition.called).toBe(true);
  });

  it("handlePlus1 call appropriate function", () => {
    const mockShiftSeekPosition = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} shiftSeekPosition={mockShiftSeekPosition} />
    );
    subject.instance().handlePlus1();
    expect(mockShiftSeekPosition.called).toBe(true);
  });

  it("handleMinus1 call appropriate function", () => {
    const mockShiftSeekPosition = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} shiftSeekPosition={mockShiftSeekPosition} />
    );
    subject.instance().handleMinus1();
    expect(mockShiftSeekPosition.called).toBe(true);
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

  it("handleZoomIn call appropriate function", () => {
    const mockMagnifyView = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} magnifyView={mockMagnifyView} />
    );
    subject.instance().handleZoomIn();
    expect(mockMagnifyView.called).toBe(true);
  });

  it("handleZoomOut call appropriate function", () => {
    const mockMagnifyView = sinon.spy();
    const subject = shallow(
      <Subject {...mockProps} magnifyView={mockMagnifyView} />
    );
    subject.instance().handleZoomOut();
    expect(mockMagnifyView.called).toBe(true);
  });

  it("handleTogglePlay call appropriate function", () => {
    const mockToggleCurrentlyPlaying = sinon.spy();
    const subject = shallow(
      <Subject
        {...mockProps}
        toggleCurrentlyPlaying={mockToggleCurrentlyPlaying}
      />
    );
    subject.instance().handleTogglePlay();
    expect(mockToggleCurrentlyPlaying.called).toBe(true);
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
        magnifyView,
        shiftView,
        shiftSeekPosition,
        toggleCurrentlyPlaying
      } = mapDispatchToProps(mockDispatch);
      expect(typeof magnifyView).toBe("function");
      expect(typeof shiftView).toBe("function");
      expect(typeof shiftSeekPosition).toBe("function");
      expect(typeof toggleCurrentlyPlaying).toBe("function");
    });
  });
});
