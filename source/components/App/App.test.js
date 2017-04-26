import Subject from "./App";

describe("<App />", () => {

  describe("renders", () => {
    
    it("without crashing", () => {
      shallow(<Subject />)
    });

    it("as a div with class 'app'", () => {
      const subject = shallow(<Subject />);
      expect(subject.is("div.app")).toBe(true);
    });

  });

  it("toggleFilter() toggles the state of the filters menu", () => {
    const subject = shallow(<Subject />)
    expect(subject.state("filtersOpen")).toBeDefined()
    expect(subject.state("filtersOpen")).toBe(false)
    subject.instance().toggleFilter()
    expect(subject.state("filtersOpen")).toBe(true)
  });

  it("toggleSettings() toggles the state of the settings menu", () => {
    const subject = shallow(<Subject />)
    expect(subject.state("settingsOpen")).toBeDefined()
    expect(subject.state("settingsOpen")).toBe(false)
    subject.instance().toggleSettings()
    expect(subject.state("settingsOpen")).toBe(true)
  });

  it("simpleAddTracks() properly adds a track to state", () => {
    const subject = shallow(<Subject />)
    const initialTrackLength = Object.keys(subject.state("tracks")).length
    expect(initialTrackLength).toBe(0)
    subject.instance().simpleAddTracks("id", "track_file")
    const finalTracks = subject.state("tracks")["id"]
    expect(finalTracks).toBe("track_file")
  });

  it("selectTrack() sets the state of the selected track to id", () => {
    const subject = shallow(<Subject />)
    expect(subject.state("selectedTrack")).toBeUndefined()
    subject.instance().selectTrack("mock_id")
    expect(subject.state("selectedTrack")).toBe("mock_id")
  });

  it("handleTrackAdd() adds a track, and sets the selectedTrack to the new one", () => {
    const subject = shallow(<Subject />)
    const initialTrackLength = Object.keys(subject.state("tracks")).length
    expect(initialTrackLength).toBe(0)
    subject.instance().handleTrackAdd("mock_file")
    const finalTrackLength = Object.keys(subject.state("tracks")).length
    expect(finalTrackLength).toBe(1)
    const finalTrackId = Object.keys(subject.state("tracks"))[0]
    expect(subject.state("selectedTrack")).toBe(finalTrackId)
  });

  it("handleTrackRemove() removes a track by id", () => {
    const subject = shallow(<Subject />)
    const initialTrackLength = Object.keys(subject.state("tracks")).length
    expect(initialTrackLength).toBe(0)
    subject.instance().simpleAddTracks("mock_id", "mock_file")
    const addedTrackLength = Object.keys(subject.state("tracks")).length
    expect(addedTrackLength).toBe(1)
    subject.instance().handleTrackRemove("mock_id")
    const finalTrackLength = Object.keys(subject.state("tracks")).length
    expect(finalTrackLength).toBe(0)
  });

  it("handleTrackRemove() removes nothing with unprovided id", () => {
    const subject = shallow(<Subject />)
    const initialTrackLength = Object.keys(subject.state("tracks")).length
    expect(initialTrackLength).toBe(0)
    subject.instance().simpleAddTracks("mock_id", "mock_file")
    const addedTrackLength = Object.keys(subject.state("tracks")).length
    expect(addedTrackLength).toBe(1)
    subject.instance().handleTrackRemove()
    const finalTrackLength = Object.keys(subject.state("tracks")).length
    expect(finalTrackLength).toBe(1)
  });

  describe("seekTo() seeks to the proper sample number", () => {
    
    it("sets seek to 0 no sample provided", () => {
      const subject = shallow(<Subject />)
      subject.instance().simpleAddTracks("mock_id", "mock_file")
      subject.instance().reportTrackLength("mock_id", 12345)
      subject.instance().seekTo()
      expect(subject.state("seek")).toBe(0)
    })

    it("sets seek to 0 for negative samples", () => {
      const subject = shallow(<Subject />)
      subject.instance().simpleAddTracks("mock_id", "mock_file")
      subject.instance().reportTrackLength("mock_id", 12345)
      subject.instance().seekTo(-100)
      expect(subject.state("seek")).toBe(0)
    })

    it("sets seek to intended number for valid sample", () => {
      const subject = shallow(<Subject />)
      subject.instance().simpleAddTracks("mock_id", "mock_file")
      subject.instance().reportTrackLength("mock_id", 12345)
      subject.instance().seekTo(100)
      expect(subject.state("seek")).toBe(100)
    })

    it("sets seek to max length if seek number is too high", () => {
      const subject = shallow(<Subject />)
      subject.instance().simpleAddTracks("mock_id", "mock_file")
      subject.instance().reportTrackLength("mock_id", 12345)
      subject.instance().seekTo(54321)
      expect(subject.state("seek")).toBe(12345)
    })

  });

});
