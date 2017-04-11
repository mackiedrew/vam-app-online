import React, { Component } from 'react'
import './Track.styl'

// Libraries
import { parse } from 'path'
import { richReadWav } from '../../libraries/wavHelp'

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
    const wrapperWidth = undefined // getPixelWidth() later

    // Use separate value to allow for easy reset
    this.initialState = {
      name: fileName,
      pixelWidth: wrapperWidth,
      error: undefined,
      sampleRate: undefined,
      length: undefined,
      maxAmplitude: undefined,
      grains: [],
    }

    // Set state to initialState
    this.state = this.initialState

    // Read wav data from provided path
    this.readPath()

    // Bind functions
    this.readPath = this.readPath.bind(this)
  }

  /**
   * Read important information from the wav file and place it into state. Or store an error.
   */
  readPath() {
    const { path } = this.props
    return richReadWav(path)
    .then((wavData) => this.setState({ ...wavData }))
    .catch((error) => this.setState({ error: String(error) }))
  }

  render() {
    // Break out values for the sake of easier template reading
    const { name, grains, maxAmplitude, error } = this.state
    const { id, remove } = this.props
    const wrapperID = this.wrapperID

    return (
      <div id={wrapperID} className="track">
        <div className="controls">
          <span className="name">{name}</span>
          <button className="remove" onClick={() => remove(id)}>Remove</button>
        </div>
        <div className="display">
          {error ? <strong className="error">{error}</strong> : ''}
          <div className="seek-line"></div>
          <Waveform
            blocks={grains}
            maxAmplitude={maxAmplitude}
          />
        </div>
      </div>
    )
  }
}

export default Track
