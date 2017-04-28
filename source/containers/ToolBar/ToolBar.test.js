import Subject from "./ToolBar";

const mockProps = {
  view: {
    start: 0,
    end: 44100 * 10, // 10 seconds
  }
}

describe("<TimeBar />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Subject />);
  });
});
