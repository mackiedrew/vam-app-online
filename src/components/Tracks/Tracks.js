// Constructive Imports
import React, { Component } from 'react'
import './Tracks.styl'

// Library Imports
import shortid from 'shortid'
import filterObj from 'filter-obj'
import { remote } from 'electron'

/**
 * This seems strange, but bare with me, mockDialog is important for testing. So what we are looking
 * at is a definition with a lot of qualifications. First, if remote exists, then set the value to
 * the actual remote.dialog.showOpenDialog. If it doesn't exists, then fall back onto the function
 * mockDialog() which returns a function that supplies what could seem like a reasonable fake value 
 * for the return. If there is a way to do this in the test file, I'd love to know.
 */
const mockDialog = () => ['./example/sample.wav']
const showOpenDialog = (remote && remote.dialog.showOpenDialog) || mockDialog

// Component Imports
import Track from '../Track/Track'
import SeekBar from '../SeekBar/SeekBar'

// Constants
const openDialogConfig = {
  title: 'Select Tracks',
  buttonLabel: 'Load Tracks',
  filters: [{ name: 'Track Files (.wav)', extensions: ['wav'] }],
  properties: [
    'openFile',
    'multiSelections',
  ]
}

/**
 * Tracks should be the overall organizing structure, controlling controls, track communication,
 * and editing invocations.
 */
class Tracks extends Component {

  constructor(props) {
    // Construct extended class `Component` with passed props
    super(props)
    // Set initial state to make it easier to reset to later
    this.initialState = {
      tracks: {
        debug: './example/sample.wav',
      },
      trackLengths: {},
      seek: 0, // samples
      view: {
        start: 0,
        end: undefined,
      }
    }
    // Reset state to initialState
    this.state = this.initialState

    // Bind functions to `this`
    this.seekTo = this.seekTo.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.selectTracks = this.selectTracks.bind(this)
    this.trackList = this.trackList.bind(this)
    this.reportTrackLength = this.reportTrackLength.bind(this)
  }

  /**
   * Move the seeking cursor to a specified location.
   * @param {Number} sample Integer to move the seeking cursor to, must be integer.
   */
  seekTo(sample = 0) {
    const maxSample = Math.max(...Object.values(this.state.trackLengths))
    // Check if sample is less than 0, indexes do not go that low. No upper-bound check yet.
    const candidatePositions = [0, sample, maxSample]
    const sortedPositions = candidatePositions.sort((a, b) => a - b)
    const newPosition = sortedPositions[1]
    const stateChanges = { seek: newPosition }
    this.setState(stateChanges)
    return newPosition
  }

  /**
   * Dumb add to the track list, only manages ID, does not worry about any file system operations
   * @param {Array} files Array of string complete paths to the file for the new track. 
   * ['path/to/the/file.ext', 'path/number/two.ext']
   */
  handleAdd(files = []) {
    // Simple reference to state of tracks
    const { tracks } = this.state
    // Generate new id for new track.
    const ids = files.map(() => shortid.generate())
    // Generate new track entry with ID
    const newTracks = ids.reduce((current, id, index) => {
      return { ...current, [id]: files[index] }
    }, {})
    // Generate a list of old tracks, plus the new one
    const newTrackList = { ...tracks, ...newTracks }
    // Create a new object containing all the tracks
    const stateChange = { tracks: { ...newTrackList } }
    // Set tracks state to be previous state plus new track
    this.setState(stateChange)
  }

  /**
   * Remove a track from the tracks array matching the provided track id.
   * @param {String} idToRemove ID to remove from the tracks list
   */
  handleRemove(idToRemove = '') {
    // Simple reference to state of tracks
    const { tracks } = this.state
    // Allow track to remain if it's index does not equal that of the index to remove
    const newTracks = filterObj(tracks, (id) => id !== idToRemove)
    // Create a 'needs to change' object including all but the specified index
    const stateChange = { tracks: { ...newTracks } }
    // Merge new state object and the old state object
    this.setState(stateChange)
  }

  /**
   * Open a file dialog, return a series of tracks, and then add these tracks to the list.
   */
  selectTracks() {
    // Simple reference to handleAdd function in class context
    const handleAdd = this.handleAdd
    // Open file dialog, it will ask for one or more files of type `wav`
    const selected_tracks = showOpenDialog(openDialogConfig)
    handleAdd(selected_tracks)
  }

  trackList() {
    // Breakout references for clarity and ease
    const { tracks, view, seek } = this.state
    const handleRemove = this.handleRemove
    // Create list of tracks for iteration
    const trackIds = tracks && Object.keys(tracks)
    // Create an array containing <Track /> elements matching tracks in state
    const trackList = trackIds && trackIds.map((id) =>
      <Track
        id={id}
        key={id}
        path={tracks[id]}
        remove={handleRemove}
        reportTrackLength={this.reportTrackLength}
        seek={seek}
        seekTo={this.seekTo}
        view={view}
      />
    )
    return trackList
  }
  
  /**
   * 
   * @param {String} trackId 
   * @param {Number} trackLength 
   */
  reportTrackLength(trackId, trackLength) {
    const { tracks, trackLengths } = this.state
    const extantTrackIds = Object.keys(tracks)
    const allTrackLengths = Object.keys(trackLengths)
    const extantTrackLengths = allTrackLengths.reduce((extantSoFar, lengthId) => {
      const trackStillExists = extantTrackIds.reduce((exists, trackId) =>
        exists || lengthId === trackId
      )
      const anotherTrackLength = { [lengthId]: trackLengths[lengthId] }
      return trackStillExists ? {...extantSoFar, ...anotherTrackLength} : { extantSoFar }
    }, {})
    const newTrackLengths = {
      ...extantTrackLengths,
      [trackId]: trackLength,
    }
    this.setState({trackLengths: newTrackLengths})
  }

  render() {
    // Breakout references for clarity and ease
    const { seek } = this.state
    const seekTo = this.seekTo
    const trackList = this.trackList
    const selectTracks = this.selectTracks

    return (
      <div className="tracks">
        <SeekBar
          seek={seek}
          seekTo={seekTo}
        />
        { trackList() }
        <button className="add-tracks" onClick={selectTracks}>
          Add Tracks
        </button>
      </div>
    )
  }
}

export default Tracks
