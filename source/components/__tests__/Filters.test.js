import Subject from "../Filters";

describe("<Filters />", () => {
  describe("renders without crashing", () => {
    it("while closed", () => {
      shallow(<Subject />);
    });
    it("while open", () => {
      shallow(<Subject open />);
    });
  });

  describe("renders correctly", () => {
    it("while closed", () => {
      const tree = renderer.create(<Subject />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("while open", () => {
      const tree = renderer.create(<Subject open />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
