import Subject from "../ToggleButton";

describe("<ToggleButton />", () => {
  describe("renders without crashing", () => {
    it("while off", () => {
      shallow(<Subject />);
    });
    it("while on", () => {
      shallow(<Subject on />);
    });
  });

  describe("renders correctly", () => {
    it("while off", () => {
      const tree = renderer.create(<Subject />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("while on", () => {
      const tree = renderer.create(<Subject on />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("button calls appropriate function", () => {
    it("while off, calls on function", () => {
      const onFunctionMock = sinon.spy();
      const offFunctionMock = sinon.spy();
      const subject = shallow(
        <Subject offFunction={offFunctionMock} onFunction={onFunctionMock} />
      );
      subject.find("button.toggle-button").simulate("click");
      expect(onFunctionMock.called).toBe(false);
      expect(offFunctionMock.called).toBe(true);
    });
    it("while on, calls on function", () => {
      const onFunctionMock = sinon.spy();
      const offFunctionMock = sinon.spy();
      const subject = shallow(
        <Subject offFunction={offFunctionMock} onFunction={onFunctionMock} on />
      );
      subject.find("button.toggle-button").simulate("click");
      expect(onFunctionMock.called).toBe(true);
      expect(offFunctionMock.called).toBe(false);
    });
  });
});
