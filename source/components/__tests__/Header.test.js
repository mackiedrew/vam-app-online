import Subject from "../Header";
jest.mock("../../containers/AddTrack", () => "AddTracks");

describe("<Header />", () => {
  it("renders without crashing", () => {
    shallow(<Subject />);
  });

  describe("buttons work", () => {
    it("Toggle Filters Button calls passed function", () => {
      const mockToggleFiltersMenu = sinon.spy();
      const subject = shallow(
        <Subject toggleFiltersMenu={mockToggleFiltersMenu} />
      );
      subject.find("button.toggle-filters").simulate("click");
      expect(mockToggleFiltersMenu.calledOnce).toBe(true);
    });
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
    it("without props", () => {
      const tree = renderer.create(<Subject />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with props", () => {
      const tree = renderer
        .create(
          <Subject
            toggleFiltersMenu={sinon.spy()}
            toggleSettingsMenu={sinon.spy()}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
