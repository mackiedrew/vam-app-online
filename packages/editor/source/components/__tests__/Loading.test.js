import Subject from "../Loading";

describe("<Loading />", () => {
  describe("renders without crashing", () => {
    it("with no props", () => {
      shallow(<Subject />);
    });
    it("with props set", () => {
      shallow(<Subject bars={10} />);
    });
  });

  describe("renders correctly", () => {
    it("without props", () => {
      const tree = renderer.create(<Subject />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with props set", () => {
      const tree = renderer.create(<Subject bars={10} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
