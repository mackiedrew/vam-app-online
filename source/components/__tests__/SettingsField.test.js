import Subject from "../SettingsField";

const mockNumberField = {
  name: "grain",
  field: {
    label: "Grain Time",
    value: 5,
    unit: "s",
    type: "number"
  }
};

const mockTextField = {
  name: "name",
  field: {
    label: "What's your name?",
    value: "Mackie Drew",
    type: "text"
  }
};

describe("<SettingsField />", () => {
  describe("renders without crashing", () => {
    it("with a number-type field", () => {
      shallow(<Subject {...mockNumberField} />);
    });
    it("with a text-type field", () => {
      shallow(<Subject {...mockTextField} />);
    });
  });

  describe("renders correctly", () => {
    it("with a number-type field", () => {
      const tree = renderer.create(<Subject {...mockNumberField} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with a text-type field", () => {
      const tree = renderer.create(<Subject {...mockTextField} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("calls the passed handleChange when input is changed", () => {
    it("with a number-type field", () => {
      const mockHandleChange = sinon.spy();
      const subject = shallow(
        <Subject handleChange={mockHandleChange} {...mockNumberField} />
      );
      const inputTag = subject.find("input");
      inputTag.simulate("change", { target: { value: 321 } });
      expect(mockHandleChange.called).toBe(true);
    });

    it("with a text-type field", () => {
      const mockHandleChange = sinon.spy();
      const subject = shallow(
        <Subject handleChange={mockHandleChange} {...mockTextField} />
      );
      const inputTag = subject.find("input");
      inputTag.simulate("change", { target: { value: "test123" } });
      expect(mockHandleChange.called).toBe(true);
    });
  });
});
