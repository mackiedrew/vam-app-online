import Subject from "./Header";

describe("<Header />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Subject />);
  });
});
