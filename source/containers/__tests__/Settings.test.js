import Subject from '../Settings'

describe('<Settings />', () => {
  
  describe("renders without crashing", () => {
    
    it('while open', () => {
      shallow(<Subject open />)
    });

    it('while closed', () => {
      shallow(<Subject />)
    });

  });
});