import Subject from "../WaveBlock";

const minimumGrain = {
  start: 0,
  end: 13
};

const grainWithAmplitude = {
  ...minimumGrain,
  amplitude: 1
};

const grainFiller = {
  ...grainWithAmplitude,
  filler: true
};

const grainMore = {
  ...grainWithAmplitude,
  more: true
};

const grainQuiet = {
  ...grainWithAmplitude,
  quiet: true
};

const mockProps = {
  grain: minimumGrain,
  setSeekPosition: sinon.spy()
};

describe("<WaveBlock />", () => {
  describe("renders without crashing", () => {
    it("with bare minimum props", () => {
      shallow(<Subject {...mockProps} />);
    });
    it("with bare minimum props, and maxAmplitude", () => {
      shallow(<Subject {...mockProps} maxAmplitude={3} />);
    });
    it("with bare minimum props, and selected", () => {
      shallow(<Subject {...mockProps} selected />);
    });
    it("with bare minimum props, and grain with amplitude", () => {
      shallow(<Subject {...mockProps} grain={grainWithAmplitude} />);
    });
    it("with bare minimum props, and filler grain", () => {
      shallow(<Subject {...mockProps} grain={grainFiller} />);
    });
    it("with bare minimum props, and more grain", () => {
      shallow(<Subject {...mockProps} grain={grainMore} />);
    });
    it("with bare minimum props, and quiet grain", () => {
      shallow(<Subject {...mockProps} grain={grainQuiet} />);
    });
  });

  describe("renders correctly", () => {
    it("with bare minimum props", () => {
      const tree = renderer.create(<Subject {...mockProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with bare minimum props, and maxAmplitude", () => {
      const tree = renderer
        .create(<Subject {...mockProps} maxAmplitude={3} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with bare minimum props, and selected", () => {
      const tree = renderer
        .create(<Subject {...mockProps} selected />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with bare minimum props, and grain with amplitude", () => {
      const tree = renderer
        .create(<Subject {...mockProps} grain={grainWithAmplitude} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with bare minimum props, and filler grain", () => {
      const tree = renderer
        .create(<Subject {...mockProps} grain={grainFiller} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with bare minimum props, and more grain", () => {
      const tree = renderer
        .create(<Subject {...mockProps} grain={grainMore} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with bare minimum props, and quiet grain", () => {
      const tree = renderer
        .create(<Subject {...mockProps} grain={grainQuiet} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("handleClick()", () => {
    it("calls setSeekPosition with grain.start when called", () => {
      const mockSetSeekPosition = sinon.spy();
      const subject = shallow(
        <Subject {...mockProps} setSeekPosition={mockSetSeekPosition} />
      );
      const expectedArgument = mockProps.grain.start;
      subject.instance().handleClick();
      expect(mockSetSeekPosition.calledWith(expectedArgument)).toBe(true);
    });

    it("is called when the button is clicked", () => {
      const mockSetSeekPosition = sinon.spy();
      const subject = shallow(
        <Subject {...mockProps} setSeekPosition={mockSetSeekPosition} />
      );
      const expectedArgument = mockProps.grain.start;
      subject.find("button.amplitude").simulate("click");
      expect(mockSetSeekPosition.calledWith(expectedArgument)).toBe(true);
    });
  });
});
