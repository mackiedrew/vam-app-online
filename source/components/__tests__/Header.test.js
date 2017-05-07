import Subject from "../Header";
jest.mock("../../containers/AddTrack", () => "AddTracks");

describe("<Header />", () => {
  it("renders without crashing", () => {
    shallow(
      <Subject
        toggleFiltersMenu={sinon.spy()}
        toggleSettingsMenu={sinon.spy()}
      />
    );
  });

  describe("buttons work", () => {
    it("Toggle Filters Button calls passed function", () => {
      const mockToggleFiltersMenu = sinon.spy();
      const subject = shallow(
        <Subject
          toggleFiltersMenu={mockToggleFiltersMenu}
          toggleSettingsMenu={sinon.spy()}
        />
      );
      subject.find("button.toggle-filters").simulate("click");
      expect(mockToggleFiltersMenu.calledOnce).toBe(true);
    });
    it("Toggle Settings Button calls passed function", () => {
      const mockToggleSettingsMenu = sinon.spy();
      const subject = shallow(
        <Subject
          toggleFiltersMenu={sinon.spy()}
          toggleSettingsMenu={mockToggleSettingsMenu}
        />
      );
      subject.find("button.toggle-settings").simulate("click");
      expect(mockToggleSettingsMenu.calledOnce).toBe(true);
    });
  });

  describe("renders correctly", () => {
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
