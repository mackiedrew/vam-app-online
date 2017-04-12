import React, { Component } from 'react'
import './Track.styl'

// Libraries
import { parse } from 'path'

// Helpers
import { richReadWav } from '../../libraries/wavHelp'
import { divisionBinarySearch } from '../../libraries/genericHelp'

// Components
import Waveform from '../../containers/Waveform/Waveform'

/**
 * <Track /> should take in a simple path to a to a file and generate logical divisions and pass
 * down any display options to allow
 */
class Track extends Component {

  constructor(props) {
    super(props)

    // Parse the file name of the track out of the full file path
    const fileName = props.path && parse(props.path).base

    // Format wrapper ID name for consistent reference
    this.wrapperID = `track-${props.id}`

    // Use separate value to allow for easy reset
    this.initialState = {
      name: fileName,
      error: undefined,
      sampleRate: undefined,
      trackLength: undefined,
      maxAmplitude: undefined,
      grains: [],
    }

    // Set state to initialState
    this.state = this.initialState

    // Read wav data from provided path
    this.readPath()
    .then(({ trackLength }) => {
      props.reportTrackLength(props.id, trackLength)
    })

    // Bind functions
    this.readPath = this.readPath.bind(this)
    this.handleRemoveButton = this.handleRemoveButton.bind(this)
  }

  /**
   * Convert sample number into grain index number for this track.
   * @param {Number} sample Sample number to target in search
   */
  sampleToGrain(sample) {
    // Breakout values more than 2 layers deep for easy reference
    const { grains, trackLength } = this.state
    const grainIndex = divisionBinarySearch(sample, grains, trackLength)
    return grainIndex
  }

  /**
   * Read important information from the wav file and place it into state. Or store an error.
   */
  readPath() {
    const { path } = this.props
    return richReadWav(path)
    .then((wavData) => {
      this.setState({ ...wavData })
      return wavData
    })
    .catch((error) => this.setState({ error: String(error) }))
  }

  // Button handleClick functions
  handleRemoveButton() { this.props.remove(this.props.id) }

  render() {

    // Break out values for the sake of easier template reading
    const { name, grains, maxAmplitude, error, trackLength } = this.state
    const { view, seek, seekTo } = this.props
    const { start, end } = view
    const wrapperID = this.wrapperID

    const endPoint = end || trackLength
    const seekPercentageInView = ((seek - start) /  endPoint) * 100
    const seekStyle = {
      left: `${seekPercentageInView}%`,
    }

    return (
      <div className="track" id={wrapperID}>
        <div className="controls">
          <span className="name">{name}</span>
          <button className="remove" onClick={this.handleRemoveButton}>Remove</button>
        </div>
        <div className="display">
          {error ? <strong className="error">{error}</strong> : ''}
          <div
            className="seek-line"
            style={seekStyle}
          ></div>
          <Waveform
            blocks={grains}
            maxAmplitude={maxAmplitude}
            seekTo={seekTo}
          />
        </div>
      </div>
    )
  }
}

export default Track
