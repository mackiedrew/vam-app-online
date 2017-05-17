import {
  Settings as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../Settings";

const mockSettings = {
  grain: {
    label: "Grain Time",
    value: 5,
    unit: "s",
    type: "number"
  },
  quietCutoff: {
    label: "Quietness Threshold",
    value: 10,
    unit: "%",
    type: "number"
  }
};

const mockHotkeys = {
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
};

const mockProps = {
  open: true,
  settings: mockSettings,
  hotkeys: mockHotkeys
};

describe("<Settings />", () => {
  it("renders without crashing", () => {
    const subject = shallow(<Subject {...mockProps} />);
    expect(subject.is("aside.settings")).toBe(true);
  });

  it("renders with open class when passed open prop as true", () => {
    const subject = shallow(<Subject {...mockProps} open />);
    expect(subject.is("aside.open")).toBe(true);
  });

  it("renders with closed class when passed open prop as false", () => {
    const subject = shallow(<Subject {...mockProps} open={false} />);
    expect(subject.is("aside.closed")).toBe(true);
  });

  describe("renders correctly", () => {
    it("while open", () => {
      const tree = renderer.create(<Subject {...mockProps} open />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("while closed", () => {
      const tree = renderer
        .create(<Subject {...mockProps} open={false} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("triggers changeHotkey when handleHotKeyChange is called", () => {
    const mockChangeHotkey = sinon.spy();
    const mockPreventDefault = sinon.spy();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      target: {
        value: 50
      }
    };
    const subject = shallow(
      <Subject {...mockProps} changeHotkey={mockChangeHotkey} />
    );
    subject.instance().handleHotkeyChange(mockEvent, "testOperation");

    expect(mockPreventDefault.called).toBe(true);
    expect(mockChangeHotkey.called).toBe(true);
  });

  it("triggers changeSetting when handleSettingsChange is called", () => {
    const mockChangeSetting = sinon.spy();
    const mockPreventDefault = sinon.spy();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      target: {
        value: 50
      }
    };
    const subject = shallow(
      <Subject {...mockProps} changeSetting={mockChangeSetting} />
    );
    subject.instance().handleSettingsChange(mockEvent, "testSetting");

    expect(mockPreventDefault.called).toBe(true);
    expect(mockChangeSetting.called).toBe(true);
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      ui: {
        settingsOpen: 1
      },
      settings: 2,
      keyboard: 3
    };

    it("returns object with expected properties", () => {
      const { open, settings, hotkeys } = mapStateToProps(mockState);
      expect(open).toBe(1);
      expect(settings).toBe(2);
      expect(hotkeys).toBe(3);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const { changeSetting, changeHotkey } = mapDispatchToProps(mockDispatch);
      expect(typeof changeSetting).toBe("function");
      expect(typeof changeHotkey).toBe("function");
    });
  });
});
