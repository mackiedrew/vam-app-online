import Subject from "../ToggleButton";

describe("<ToggleButton />", () => {
  describe("renders without crashing while ", () => {
    it("off", () => {
      shallow(<Subject />);
    });

    it("on", () => {
      shallow(<Subject on />);
    });
  });
});
