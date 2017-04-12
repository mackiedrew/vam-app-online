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
    this.generateSeekLineStyle = this.generateSeekLineStyle.bind(this)
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

  /**
   * Generate the in-line style object for programmatically determining the position of the
   * the seek line based on some % left of the screen taking into account the viewport.
   */
  generateSeekLineStyle() {
    // Breakout any 2-layer-deep values for easy reference
    const { trackLength } = this.state
    const { view, seek } = this.props
    // Figure out operation end point, fall back to trackLength if view.end hasn't come in yet.
    const endPoint = view.end || trackLength
    // Figure out % of parent width to cover
    const seekPercentageInView = ((seek - view.start) /  endPoint) * 100
    // Generate style object
    const seekLineStyle = { left: `${seekPercentageInView}%` }
    return seekLineStyle
  }

  // Button handleClick functions
  handleRemoveButton() { this.props.remove(this.props.id) }

  render() {

    // Break out values for the sake of easier template reading
    const { name, grains, maxAmplitude, error  } = this.state
    const { seekTo } = this.props
    // Generate styles
    const seekLineStyle = this.generateSeekLineStyle()

    return (
      <div className="track" id={this.wrapperID}>
        <div className="controls">
          <span className="name">{name}</span>
          <button className="remove" onClick={this.handleRemoveButton}>Remove</button>
        </div>
        <div className="display">
          {error ? <strong className="error">{error}</strong> : ''}
          <div
            className="seek-line"
            style={seekLineStyle}
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
