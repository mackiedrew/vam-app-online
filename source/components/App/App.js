// Constructive Imports
import React, { Component } from "react";
import "./App.styl";

// Library Imports
import shortid from "shortid";
import filterObj from "filter-obj";

// Component Imports
import Track from "../Track/Track";
import AddTrack from "../AddTrack/AddTrack";
import SeekBar from "../SeekBar/SeekBar";
import Header from "../../containers/Header/Header";

/**
 * Tracks should be the overall organizing structure, controlling controls, track communication,
 * and editing invocations.
 */
class App extends Component {
  constructor(props) {
    // Construct extended class `Component` with passed props
    super(props);

    // Create audio context for editing
    const audioContext = new AudioContext();

    // Set initial state to make it easier to reset to later
    this.initialState = {
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
    this.trackList = this.trackList.bind(this);
    this.reportTrackLength = this.reportTrackLength.bind(this);
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

  handleTrackAdd(file) {
    // TODO: Put overwriting of old paths here
    const id = shortid.generate();
    this.simpleAddTracks(id, file);
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
   * Generate a set of track elements to display within the main render() function.
   */
  trackList() {
    // Breakout references for clarity and ease
    const { tracks, view, seek, context } = this.state;
    // Create list of tracks for iteration
    const trackIds = tracks && Object.keys(tracks);
    // Create an array containing <Track /> elements matching tracks in state
    const trackList = trackIds &&
      trackIds.map(id => (
        <Track
          add={this.handleTrackAdd}
          context={context}
          file={tracks[id]}
          id={id}
          key={id}
          remove={this.handleTrackRemove}
          reportTrackLength={this.reportTrackLength}
          seek={seek}
          seekTo={this.seekTo}
          view={view}
        />
      ));
    return trackList;
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
    const { seek, nextId, tracks } = this.state;

    return (
      <div className="app">
        <Header>
          <AddTrack handleTrackAdd={this.handleTrackAdd} nextId={nextId} />
        </Header>
        <main>
          <div className="tracks">
            {this.trackList()}
          </div>
          
            {Object.keys(tracks).map((id) => {
              const { path, type } = tracks[id];
              return (
                <audio autoPlay={false} id={id} key={id} controls>
                  <source key={id} src={path} type={type} />
                </audio>
              );
            })}

        </main>
        <footer>
          <SeekBar seek={seek} seekTo={this.seekTo} />
        </footer>
      </div>
    );
  }
}

export default App;
