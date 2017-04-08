import React, { Component } from 'react'
import './Track.styl'

// Libraries
import { parse } from 'path'
import { logWav } from '../../libraries/wavHelp'

// Components
import Waveform from '../../containers/Waveform/Waveform'

class Track extends Component {

  constructor(props) {
    super(props)

    const fileName = parse(props.path).base

    //logWav(props.path)

    this.initialState = {
      name: fileName,
      length: undefined, // Samples
      grains: [3, 4],
    }

    this.state = this.initialState
  }

  render() {

    const { name, grains } = this.state
    const { id, remove } = this.props

    return (
      <div className="track">
        <div className="controls">
          <span className="name">{name}</span>
          <button className="remove" onClick={() => remove(id)}>Remove</button>
        </div>
        <div className="display">
          <Waveform grains={grains} />
        </div>
      </div>
    )
  }
}

export default Track
