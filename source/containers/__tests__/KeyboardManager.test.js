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
      const { toggleCurrentlyPlaying } = mapDispatchToProps(mockDispatch);
      expect(typeof toggleCurrentlyPlaying).toBe("function");
    });
  });
});
