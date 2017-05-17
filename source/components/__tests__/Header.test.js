import Subject from "../Header";
jest.mock("../../containers/AddTrack", () => "AddTracks");
jest.mock("../../images/logo.svg", () => "#");

describe("<Header />", () => {
  it("renders without crashing", () => {
    shallow(<Subject toggleSettingsMenu={sinon.spy()} />);
  });

  describe("buttons work", () => {
    it("Toggle Settings Button calls passed function", () => {
      const mockToggleSettingsMenu = sinon.spy();
      const subject = shallow(
        <Subject toggleSettingsMenu={mockToggleSettingsMenu} />
      );
      subject.find("button.toggle-settings").simulate("click");
      expect(mockToggleSettingsMenu.calledOnce).toBe(true);
    });
  });

  describe("renders correctly", () => {
    it("with props", () => {
      const tree = renderer
        .create(<Subject toggleSettingsMenu={sinon.spy()} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
