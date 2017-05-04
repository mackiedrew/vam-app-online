import Subject from "../Tracks";

const mockPropsNoTracks = {
  view: { start: 0, end: 10 },
  trackList: []
};

const mockPropsWithTracks = {
  view: { start: 0, end: 10 },
  trackList: [{ id: "track1" }, { id: "track2" }]
};

describe("<Tracks />", () => {
  it("renders without crashing without tracks", () => {
    shallow(<Subject {...mockPropsNoTracks} />);
  });

  it("renders without crashing with tracks", () => {
    shallow(<Subject {...mockPropsWithTracks} />);
  });
});
