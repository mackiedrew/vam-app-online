import Subject from "../Waveform";

const mockProps = {
  grains: [
    {
      start: 0,
      end: 3,
      amplitude: 4
    }
  ],
  maxAmplitude: 10,
  setSeekPosition: sinon.spy()
};

describe("<Waveform />", () => {
  describe("renders without crashing", () => {
    it("with empty grains", () => {
      shallow(<Subject grains={[]} />);
    });
    it("with a grains", () => {
      shallow(<Subject {...mockProps} />);
    });
  });

  describe("renders correctly", () => {
    it("with empty grains", () => {
      const tree = renderer.create(<Subject grains={[]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with a grains", () => {
      const tree = renderer.create(<Subject {...mockProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
