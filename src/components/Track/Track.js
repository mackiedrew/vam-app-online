import React, { Component } from 'react'
import './Track.styl'

// Libraries
import { parse } from 'path'

// Helpers
import { richReadWav } from '../../libraries/wavHelp'
import { floor } from '../../libraries/genericHelp'

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

    // Bind functions
    this.readPath = this.readPath.bind(this)
  }

  /**
   * Finds the grain that contains the sample provided, will return the grain index.
   * It is based off of a binary search or bisection method of search.
   * There is probably a lot of work here to do in terms of optimization.
   * @param {Number} sample Sample number to target
   */
  sampleToGrain(sample) {

    const { grains, trackLength } = this.state

    // Exit quickly if the sample is not in the track.
    if (
        typeof sample !== 'number' ||
        sample < 0 ||
        sample > trackLength || 
        !grains || !trackLength
        ) {
      return false
    }

    let low = 0
    let high = grains.length

    while (low <= high) {
      const middle = floor(low + (high - low) / 2)
      const currentGrain = grains[middle]
      const { start, end } = currentGrain
      const sampleIsLowerThanCurrentGrain = (sample < start)
      const sampleIsInCurrentGrain = (sample >= start && sample < end)
      if (sampleIsInCurrentGrain) {
        return middle
      } else if (sampleIsLowerThanCurrentGrain) {
        high = middle - 1
      } else {
        low = middle + 1
      }
    }
    // If maximum search iterations is exceeded, return false do indicate failure
    return false
  }

  /**
   * Read important information from the wav file and place it into state. Or store an error.
   */
  readPath() {
    const { id, path, reportTrackLength } = this.props
    return richReadWav(path)
    .then((wavData) => {
      this.setState({ ...wavData })
      return wavData
    })
    .then((wavData) => {
      reportTrackLength(id, wavData.trackLength)
    })
    .catch((error) => this.setState({ error: String(error) }))
  }

  render() {

    // Break out values for the sake of easier template reading
    const { name, grains, maxAmplitude, error, trackLength } = this.state
    const { id, remove, view, seek, seekTo } = this.props
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
          <button className="remove" onClick={() => remove(id)}>Remove</button>
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
