import Subject from "./Tracks";

const mockTracks = {
  track1: "Zilch!",
}

describe("<Tracks />", () => {

  describe("renders", () => {
    
    it("without crashing", () => {
      shallow(<Subject tracks={mockTracks} />)
    });

    it("as a section with class 'tracks'", () => {
      const subject = shallow(<Subject tracks={mockTracks} />);
      expect(subject.is("section.tracks")).toBe(true);
    });

  });

  describe("has appropriate function for the functions", () => {
    describe("renderNoTracks()", () => {
      
      it("returns empty string when there are tracks", () => {
        const subject = shallow(<Subject tracks={mockTracks} />);
        expect(subject.instance().renderNoTracks()).toBe("")
      });

      it("returns as a div with class 'no-tracks' when no tracks exist", () => {
        const subject = shallow(<Subject tracks={{}} />);
        const result = subject.instance().renderNoTracks();
        const resultRender = shallow(result);
        expect(resultRender.is("div.no-tracks")).toBe(true);
      });

    });
  });

});
