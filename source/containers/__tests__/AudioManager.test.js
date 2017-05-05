import { mapStateToProps, mapDispatchToProps } from "../AudioManager";

describe("<Track />", () => {

  describe("mapStateToProps()", () => {
    const mockState = {
      tracks: {
        trackList: 1,
        selectedTrack: 2
      }
    };

    it("returns object with expected properties", () => {
      const {
        selectedTrack,
        trackList
      } = mapStateToProps(mockState);
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
