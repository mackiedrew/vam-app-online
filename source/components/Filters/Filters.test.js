import Subject from './Filters'

describe("<Filters />", () => {
  
  describe("renders without crashing", () => {
    it("while closed", () => {
      shallow(<Subject />)
    });
    it("while open", () => {
      shallow(<Subject open />)
    });
  });
});