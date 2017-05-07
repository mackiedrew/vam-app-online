import Subject from "../TimeBar";

const mockProps = {
  view: {
    start: 0,
    end: 44100 * 10 // 10 seconds
  }
};

describe("<TimeBar />", () => {
  it("renders without crashing", () => {
    shallow(<Subject {...mockProps} />);
  });

  describe("renders correctly", () => {
    it("with props", () => {
      const tree = renderer.create(<Subject {...mockProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
