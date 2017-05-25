import Subject from "../RemoveTrackModal";

const testProps = {
  fileName: "File Name.wav",
  removeTrack: jest.fn(),
  clearModal: jest.fn()
};

describe("<Modal />", () => {
  it("renders without crashing", () => {
    shallow(<Subject {...testProps} />);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Subject {...testProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
