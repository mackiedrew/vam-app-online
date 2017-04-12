import React, { Component } from 'react'
import './SeekBar.styl'

// Libraries
import { secondsToSamples } from '../../libraries/wavHelp'

/**
 * SeekBar will handle the controls and logic, and maybe a UI for interacting with the current seek
 * position of the tracks. This will be represented by a sample #.
 */
class SeekBar extends Component {

  constructor(props) {
    // Initialize extended class with passed props
    super(props)

    // Set initial state to make it easier to reset to later
    this.initialState = {
      currentTime: '00:00:00', // seconds
    }
    // Reset state to initialState
    this.state = this.initialState

    // Bind functions to `this`
    this.seekForward = this.seekForward.bind(this)
    this.seekReverse = this.seekReverse.bind(this)
    this.seekSecondsForward = this.seekSecondsForward.bind(this)
    this.seekSecondsReverse = this.seekSecondsReverse.bind(this)
  }

  /**
   * Increment the seek value by given samples.
   * @param {Number} samples Number of samples to increase seek by.
   */
  seekForward(samples) {
    const { seek, seekTo } = this.props
    return seekTo(seek + samples)
  }

 /**
   * Decrement the seek value by given samples.
   * @param {Number} samples Number of samples to decrease seek by.
   */
  seekReverse(samples) {
    const { seek, seekTo } = this.props
    return seekTo(seek - samples)
  }

  /**
   * Increment the seek value by given seconds and rate.
   * @param {Number} seconds Number of seconds to increase seek by;
   * @param {Number} sampleRate Sample rate of the audio clip you are working with.
   */
  seekSecondsForward(seconds, sampleRate = 44100) {
    const samples = secondsToSamples(seconds, sampleRate)
    return this.seekForward(samples)
  }

  /**
   * Decrement the seek value by given seconds and rate.
   * @param {Number} seconds Number of samples to decrease seek by; 441000 samples by default.
   * @param {Number} sampleRate Sample rate of the audio clip you are working with.
   */
  seekSecondsReverse(seconds, sampleRate = 44100) {
    const samples = secondsToSamples(seconds, sampleRate)
    return this.seekReverse(samples)
  }

  render() {
    // Break out values for the sake of easier template reading
    const { currentTime } = this.state
    const { seek } = this.props
    const seekForward = this.seekForward
    const seekReverse = this.seekReverse
    const seekSecondsForward = this.seekSecondsForward
    const seekSecondsReverse = this.seekSecondsReverse

    return (
      <div className="seek-bar">
        <div className="control-bar">
          <button className="seek-reverse" onClick={() => seekSecondsReverse(10)}>-10</button>
          <button className="seek-reverse" onClick={() => seekReverse(44100)}>-1</button>
          <button className="seek-forward" onClick={() => seekForward(44100)}>+1</button>
          <button className="seek-forward" onClick={() => seekSecondsForward(10)}>+10</button>
        </div>
        <div className="indicators">
          <div className="current-sample">Sample: {seek}</div>
          <div className="current-time">Time: {currentTime}</div>
        </div>
      </div>
    )
  }
}

export default SeekBar
