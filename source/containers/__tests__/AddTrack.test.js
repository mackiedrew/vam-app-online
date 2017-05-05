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
    const subject = shallow(<Subject {...mockProps} />);
    expect(subject.is("div.add-track")).toBe(true);
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
