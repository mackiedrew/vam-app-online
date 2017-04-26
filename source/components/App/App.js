import React, { Component } from "react";
import "./App.styl";

// Libraries
import shortid from "shortid";
import filterObj from "filter-obj";

// Components
import Header from "../../containers/Header/Header";
import AddTrack from "../AddTrack/AddTrack";
import Filters from "../Filters/Filters";
import Tracks from "../Tracks/Tracks";
import Settings from "../Settings/Settings";
import SeekBar from "../SeekBar/SeekBar";

/**
 * This used to be called "Tracks" but was refactored to be the main app since everything was
 * happening here anyway.
 */
class App extends Component {
  constructor(props) {
    // Construct extended class `Component` with passed props
    super(props);

    // Create audio context for editing
    const audioContext = new AudioContext();
    const nextId = shortid.generate();

    // Set initial state to make it easier to reset to later
    this.initialState = {
      selectedTrack: undefined,
      nextId: nextId,
      filtersOpen: false,
      settingsOpen: false,
      context: audioContext,
      tracks: {},
      trackLengths: {},
      seek: 0, // samples
      view: {
        start: 0,
        end: undefined
      }
    };
    // Reset state to initialState
    this.state = this.initialState;

    // Bind functions to `this`
    this.seekTo = this.seekTo.bind(this);
    this.simpleAddTracks = this.simpleAddTracks.bind(this);
    this.handleTrackAdd = this.handleTrackAdd.bind(this);
    this.handleTrackRemove = this.handleTrackRemove.bind(this);
    this.reportTrackLength = this.reportTrackLength.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.selectTrack = this.selectTrack.bind(this);
  }

  /**
   * Move the seeking cursor to a specified location.
   * @param {Number} sample Integer to move the seeking cursor to, must be integer.
   */
  seekTo(sample = 0) {
    const { trackLengths } = this.state;
    const lengthList = Object.keys(trackLengths).map(key => trackLengths[key]);
    const maxSample = Math.max(...lengthList);
    // Check if sample is less than 0, indexes do not go that low. No upper-bound check yet.
    const candidatePositions = [0, sample, maxSample];
    const sortedPositions = candidatePositions.sort((a, b) => a - b);
    const newPosition = sortedPositions[1];
    const stateChanges = { seek: newPosition };
    this.setState(stateChanges);
    return newPosition;
  }

  simpleAddTracks(id, file) {
    const { tracks } = this.state;

    const newTrack = { [id]: file };
    const newTrackList = { ...tracks, ...newTrack };
    const stateChange = { tracks: newTrackList };
    // Set tracks state to be previous state plus new track
    this.setState(stateChange);
  }

  selectTrack(id) {
    this.setState({ selectedTrack: id });
  }

  handleTrackAdd(file) {
    // TODO: Put overwriting of old paths here
    const newId = this.state.nextId;
    const nextId = shortid.generate();
    this.setState({ nextId: nextId });
    this.selectTrack(newId);
    this.simpleAddTracks(newId, file);
  }

  toggleFilter() {
    const { filtersOpen } = this.state;
    this.setState({ filtersOpen: !filtersOpen });
  }

  toggleSettings() {
    const { settingsOpen } = this.state;
    this.setState({ settingsOpen: !settingsOpen });
  }

  /**
   * Remove a track from the tracks array matching the provided track id.
   * @param {String} idToRemove ID to remove from the tracks list
   */
  handleTrackRemove(idToRemove = "") {
    // Simple reference to state of tracks
    const { tracks } = this.state;
    // Allow track to remain if it's index does not equal that of the index to remove
    const newTracks = filterObj(tracks, id => id !== idToRemove);
    // Create a 'needs to change' object including all but the specified index
    const stateChange = { tracks: { ...newTracks } };
    // Merge new state object and the old state object
    this.setState(stateChange);
  }

  /**
   * Reporting track length is kind of ugly right now. But basically, the <Track /> will load the 
   * information about their individual files, then report back to the parent. Every time this sort
   * of update is done, it checks to make sure track lengths match existing trackIds. I do this to
   * prevent the state nesting that is frowned upon these days. 
   * @param {String} trackId ID string value from the 'tracks' state list reporting the new length
   * @param {Number} trackLength track length being reported from the trackID
   */
  reportTrackLength(trackId, trackLength) {
    // Breakout 2-layer-deep values for easy reference
    const { tracks, trackLengths } = this.state;
    // Determine the tracks that still exist, then recreate the track lengths array from that
    const stateTrackIds = Object.keys(tracks);
    // Create an object containing existing tracks with their lengths
    const updatedStateTrackLengths = stateTrackIds.reduce(
      (object, id) => ({ ...object, [id]: trackLengths[id] }),
      {}
    );
    // Generate new object containing track lengths that should exist and the new value
    const newTrackLengths = {
      ...updatedStateTrackLengths,
      [trackId]: trackLength
    };
    const stateChange = { trackLengths: newTrackLengths };
    // Change state of track lengths
    this.setState(stateChange);
    // Return for flexibility and testing
    return newTrackLengths;
  }

  render() {
    // Breakout 2-layer-deep values for easy reference
    const {
      nextId,
      seek,
      tracks,
      filtersOpen,
      settingsOpen,
      selectedTrack,
      view,
      context
    } = this.state;

    return (
      <div className="app">
        <Header
          toggleFilter={this.toggleFilter}
          toggleSettings={this.toggleSettings}
        >
          <AddTrack handleTrackAdd={this.handleTrackAdd} id={nextId} />
        </Header>
        <main>
          <Filters open={filtersOpen} />
          <Tracks
            context={context}
            handleTrackAdd={this.handleTrackAdd}
            handleTrackRemove={this.handleTrackRemove}
            reportTrackLength={this.reportTrackLength}
            seek={seek}
            seekTo={this.seekTo}
            selectTrack={this.selectTrack}
            selectedTrack={selectedTrack}
            tracks={tracks}
            view={view}
          />
          <Settings open={settingsOpen} />
        </main>

        <footer>
          <SeekBar seek={seek} seekTo={this.seekTo} />
        </footer>

      </div>
    );
  }
}

export default App;
