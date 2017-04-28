import Subject from "./App";

describe("<App />", () => {

  it("renders without crashing", () => {
    shallow(<Subject />)
  });

});