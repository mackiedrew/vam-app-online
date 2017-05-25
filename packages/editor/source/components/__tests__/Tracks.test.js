import Subject from "../Tracks";
jest.mock("../../containers/AudioManager", () => "AudioManager");
jest.mock("../../containers/Track", () => "Track");

const mockPropsNoTracks = {
  view: { start: 0, end: 10 },
  trackList: {}
};

const mockPropsWithTracks = {
  view: { start: 0, end: 10 },
  trackList: { track1: {}, track2: {} }
};

describe("<Tracks />", () => {
  describe("renders without crashing", () => {
    it("without tracks", () => {
      shallow(<Subject {...mockPropsNoTracks} />);
    });
    it("with tracks", () => {
      shallow(<Subject {...mockPropsWithTracks} />);
    });
  });

  describe("renders correctly", () => {
    it("without tracks", () => {
      const tree = renderer.create(<Subject {...mockPropsNoTracks} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("with tracks", () => {
      const tree = renderer
        .create(<Subject {...mockPropsWithTracks} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
