import {
  KeyboardManager as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../KeyboardManager";

jest.mock("../../selectors/getHotkeyValues", () => () => "HOTKEYS!");

const mockProps = {
  hotkeyValues: {
    play: "p",
    next: "e",
    previous: "q",
    nextTrack: "j",
    previousTrack: "k"
  },
  toggleCurrentlyPlaying: jest.fn()
};

describe("<KeyboardManager />", () => {
  it("renders without crashing", () => {
    shallow(<Subject {...mockProps} />);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Subject {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      keyboard: {
        play: {
          label: "Play/Pause Key",
          value: "p"
        },
        next: {
          label: "Next Grain Key",
          value: "e"
        },
        previous: {
          label: "Previous Grain Key",
          value: "q"
        },
        nextTrack: {
          label: "Next Track Key",
          value: "j"
        },
        previousTrack: {
          label: "Previous Track Key",
          value: "k"
        }
      }
    };

    it("returns object with expected properties", () => {
      const { hotkeyValues } = mapStateToProps(mockState);
      expect(hotkeyValues).toEqual("HOTKEYS!");
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const {
        toggleCurrentlyPlaying,
        toggleSettingsMenu,
        augmentAOff,
        augmentAOn,
        augmentBOff,
        augmentBOn,
        augmentCOff,
        augmentCOn
      } = mapDispatchToProps(mockDispatch);
      expect(typeof toggleCurrentlyPlaying).toBe("function");
      expect(typeof toggleSettingsMenu).toBe("function");
      expect(typeof augmentAOff).toBe("function");
      expect(typeof augmentAOn).toBe("function");
      expect(typeof augmentBOff).toBe("function");
      expect(typeof augmentBOn).toBe("function");
      expect(typeof augmentCOff).toBe("function");
      expect(typeof augmentCOn).toBe("function");
    });
  });
});
