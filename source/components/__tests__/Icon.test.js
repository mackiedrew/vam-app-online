import Subject from "../Icon";

const mockIcon = "no_an_icon";

describe("<Icon />", () => {
  it("renders without crashing with no props", () => {
    shallow(<Subject />);
  });

  it("renders without crashing with props", () => {
    shallow(<Subject icon={mockIcon} />);
  });

  describe("renders the correct elements", () => {
    const SubjectNoIcon = shallow(<Subject />);
    const SubjectWithIcon = shallow(<Subject icon={mockIcon} />);

    it("<i className='material-icons'>", () => {
      expect(SubjectNoIcon.is("i.material-icons")).toEqual(true);
      expect(SubjectWithIcon.is("i.material-icons")).toEqual(true);
    });
  });
});
