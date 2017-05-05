import Subject from "../SettingsField";

const mockProps = {
  name: "grain",
  field: {
    label: "Grain Time",
    value: 5,
    unit: "s",
    type: "number"
  }
};

describe("<SettingsField />", () => {
  it("renders without crashing", () => {
    shallow(<Subject {...mockProps} />);
  });

  it("renders without ", () => {
    const mockHandleChange = sinon.spy();
    const subject = shallow(
      <Subject handleChange={mockHandleChange} {...mockProps} />
    );
    const inputTag = subject.find("input");
    inputTag.simulate("change", { target: { value: 321 } });
    expect(mockHandleChange.called).toBe(true);
  });
});
