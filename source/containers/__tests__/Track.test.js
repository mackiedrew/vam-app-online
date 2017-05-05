import { mapStateToProps, mapDispatchToProps } from "../Track";

// const mockSettings = {
//   grain: {
//     label: "Grain Time",
//     value: 5,
//     unit: "s",
//     type: "number"
//   },
//   quietCutoff: {
//     label: "Quietness Threshold",
//     value: 10,
//     unit: "%",
//     type: "number"
//   }
// };

// const mockTracks = {
//   "123ABC": {
//     grains: [{ start: 0, end: 4 }, { start: 4, end: 8 }],
//     fileName: "test.wav",
//     maxAmplitude: 2
//   }
// };

// const mockProps = {
//   id: "123ABC",
//   seekPosition: 10,
//   selectedTrack: "123ABC",
//   settings: mockSettings,
//   trackList: mockTracks,
//   view: { start: 0, end: 20 }
// };

describe("<Track />", () => {

  // it("renders without crashing", () => {
  //   const subject = shallow(<Subject {...mockProps} />);
  //   expect(subject.is("div.track")).toBe(true);
  // });

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
        setTrackLength,
        setTrackMaxAmplitude,
        setSeekPosition
      } = mapDispatchToProps(mockDispatch);
      expect(typeof setTrackSampleRate).toBe("function");
      expect(typeof setTrackGrains).toBe("function");
      expect(typeof setTrackLength).toBe("function");
      expect(typeof setTrackMaxAmplitude).toBe("function");
      expect(typeof setSeekPosition).toBe("function");
    });
  });
});
