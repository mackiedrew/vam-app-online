import {
  AddTrack as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../AddTrack";

const mockProps = {
  nextTrackId: "123ABC",
  addTrack: sinon.spy()
};

describe("<AddTrack />", () => {
  it("renders without crashing", () => {
    shallow(<Subject {...mockProps} />);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Subject {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("handleOnChange() works correctly", () => {
    it("calls addTrack(), URL.createObjectURL, document.getElementById", () => {
      const mockNextId = "123ABC";
      const mockAddTrack = sinon.spy();
      const mockCreateObjectURL = sinon.stub();
      mockCreateObjectURL.returns("http://test.dot/");
      const mockGetElementById = sinon.stub();
      const mockInputTag = {
        files: [
          {
            fileName: "test1.wav",
            type: "dot/test"
          },
          {
            fileName: "test2.wav",
            type: "dot/test"
          }
        ]
      };
      mockGetElementById.withArgs(mockNextId).returns(mockInputTag);
      URL.createObjectURL = mockCreateObjectURL;
      document.getElementById = mockGetElementById;
      const subject = shallow(
        <Subject addTrack={mockAddTrack} nextTrackId={mockNextId} />
      );
      subject.instance().handleOnChange();
      expect(mockAddTrack.called).toBe(true);
      expect(mockCreateObjectURL.called).toBe(true);
      expect(mockGetElementById.called).toBe(true);
    });
    it("is called when the file <input> changes", () => {
      const mockNextId = "123ABC";
      const mockAddTrack = sinon.spy();
      const mockCreateObjectURL = sinon.stub();
      mockCreateObjectURL.returns("http://test.dot/");
      const mockGetElementById = sinon.stub();
      const mockInputTag = {
        files: [
          {
            fileName: "test1.wav",
            type: "dot/test"
          },
          {
            fileName: "test2.wav",
            type: "dot/test"
          }
        ]
      };
      mockGetElementById.withArgs(mockNextId).returns(mockInputTag);
      URL.createObjectURL = mockCreateObjectURL;
      document.getElementById = mockGetElementById;
      const subject = shallow(
        <Subject addTrack={mockAddTrack} nextTrackId={mockNextId} />
      );
      const inputTag = subject.find("input");
      inputTag.simulate("change", { target: { value: 321 } });
      expect(mockAddTrack.called).toBe(true);
      expect(mockCreateObjectURL.called).toBe(true);
      expect(mockGetElementById.called).toBe(true);
    });
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        nextTrackId: 1
      }
    };

    it("returns object with expected properties", () => {
      const { nextTrackId } = mapStateToProps(mockState);
      expect(nextTrackId).toBe(1);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const { addTrack } = mapDispatchToProps(mockDispatch);
      expect(typeof addTrack).toBe("function");
    });
  });
});
