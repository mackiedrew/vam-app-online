import React, { Component } from 'react'
import './SeekBar.styl'

// Libraries
import { samplesToSeconds } from '../../libraries/wavHelp'

/**
 * SeekBar will handle the controls and logic, and maybe a UI for interacting with the current seek
 * position of the tracks. This will be represented by a sample #.
 */
class SeekBar extends Component {

  constructor(props) {
    // Initialize extended class with passed props
    super(props)

    const { seek } = this.props

    // Set initial state to make it easier to reset to later
    this.initialState = {
      currentTime: samplesToSeconds(seek), // seconds
    }
    // Reset state to initialState
    this.state = this.initialState
    // Bind functions to `this`
    this.seekForward = this.seekForward.bind(this)
    this.seekReverse = this.seekReverse.bind(this)
  }

  /**
   * Increment the seek value by given samples.
   * @param {Number} samples Number of samples to increase seek by; 441000 samples by default.
   */
  seekForward(samples = 44100) {
    const { seek, seekTo } = this.props
    return seekTo(seek + samples)
  }

 /**
   * Decrement the seek value by given samples.
   * @param {Number} samples Number of samples to decrease seek by; 441000 samples by default.
   */
  seekReverse(samples = 44100) {
    const { seek, seekTo } = this.props
    return seekTo(seek - samples)
  }

  render() {
    // Break out values for the sake of easier template reading
    const { currentTime } = this.state
    const { seek } = this.props
    const seekForward = this.seekForward
    const seekReverse = this.seekReverse

    return (
      <div className="seek-bar">
        <div className="indicator current-sample">{seek}</div>
        <div className="indicator current-time">{currentTime}</div>
        <button className="seek-forward" onClick={() => seekForward()} >Fwd</button>
        <button className="seek-reverse" onClick={() => seekReverse()} >Rev</button>
      </div>
    )
  }
}

export default SeekBar
