import Subject from "../ToggleButton";

describe("<ToggleButton />", () => {
  describe("renders without crashing while ", () => {
    
    it("off", () => {
      const wrapper = shallow(<Subject />)
    });

    it("on", () => {
      const wrapper = shallow(<Subject on />)
    });
    
  });
});
