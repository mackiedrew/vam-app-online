import Subject from "../ToolBar";

describe("<ToolBar />", () => {

  it("renders without crashing", () => {
    const subject = shallow(<Subject />);
  });

  it("calls handleSplit prop once when handleSplit function is called", () => {
    const mockHandleSplit = sinon.spy();
    const subject = shallow(<Subject handleSplit={mockHandleSplit} />);
    subject.instance().handleSplit();
    const mockCalled = mockHandleSplit.called;
    expect(mockCalled).toBe(true);
  });

});
