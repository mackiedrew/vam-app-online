import Subject from "../Icon";

const mockIcon = "not_an_icon";

describe("<Icon />", () => {
  it("renders without crashing with props", () => {
    shallow(<Subject icon={mockIcon} />);
  });

  describe("renders the correct elements", () => {
    const SubjectWithIcon = shallow(<Subject icon={mockIcon} />);
    it("<i className='material-icons'>", () => {
      expect(SubjectWithIcon.is("i.material-icons")).toEqual(true);
    });
  });

  describe("renders correctly", () => {
    it("with icon", () => {
      const tree = renderer.create(<Subject icon={mockIcon} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("with icon and size", () => {
      const tree = renderer
        .create(<Subject icon={mockIcon} size={50} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
