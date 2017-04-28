import Subject, { Slice } from "./TimeBar";

const mockProps = {
  view: {
    start: 0,
    end: 44100 * 10, // 10 seconds
  }
}

describe("<TimeBar />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Subject {...mockProps} />);
  });
});

describe("<Slice />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Slice sample={400} sampleSpan={441000} />);
  });

  it("renders without when sample span over 60 seconds", () => {
    const wrapper = shallow(<Slice sample={400} sampleSpan={44100 * 60} />);
  });

  it("renders without when sample span over 60 minutes", () => {
    const wrapper = shallow(<Slice sample={400} sampleSpan={44100 * 60 * 61} />);
  });

});
