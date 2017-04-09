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

    // Use separate value to allow for easy reset
    this.initialState = {
      name: fileName,
      sampleRate: undefined,
      length: undefined,
      maxAmplitude: undefined,
      grains: [],
    }

    // Set state to initialState
    this.state = this.initialState

    // Read wav data from provided path
    this.readPath(props.path)

    // Bind functions
    this.readPath = this.readPath.bind(this)
  }

  // Read important data off of the wav file
  readPath(path) {
    return richReadWav(path)
    .then((wavData) =>
      this.setState({ ...wavData })
    )
  }

  render() {
    // Break out values for the sake of easier template reading
    const { name, grains, maxAmplitude } = this.state
    const { id, remove } = this.props

    return (
      <div className="track">
        <div className="controls">
          <span className="name">{name}</span>
          <button className="remove" onClick={() => remove(id)}>Remove</button>
        </div>
        <div className="display">
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
