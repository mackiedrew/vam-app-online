import React, { Component } from "react";
import "./SeekBar.styl";

// Libraries
import { secondsToSamples } from "../../help/wav/wav";

/**
 * SeekBar will handle the controls and logic, and maybe a UI for interacting with the current seek
 * position of the tracks. This will be represented by a sample #.
 */
class SeekBar extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);

    // Set initial state to make it easier to reset to later
    this.initialState = {
      currentTime: {
        ms: 0,
        s: 0,
        m: 0,
        h: 0
      }
    };
    // Reset state to initialState
    this.state = this.initialState;

    // Bind functions to `this`
    this.seekSamples = this.seekSamples.bind(this);
    this.seekSeconds = this.seekSeconds.bind(this);
    this.handlePlus10 = this.handlePlus10.bind(this);
    this.handleMinus10 = this.handleMinus10.bind(this);
    this.handlePlus1 = this.handlePlus1.bind(this);
    this.handleMinus1 = this.handleMinus1.bind(this);
  }

  leadingZeros(rawNumber, columns = 2) {
    const number = String(Math.round(rawNumber));
    const digits = number.length;
    const neededZeros = columns - digits || 0;
    const zeroes = new Array(neededZeros).fill("0");
    const allColumns = [...zeroes, number];
    const output = allColumns.reduce((a, b) => a + b, "");
    return output;
  }

  /**
   * Move the seek value by given samples.
   * @param {Number} samples Number of samples to move seek by.
   */
  seekSamples(samples) {
    const { seek, seekTo } = this.props;
    const newSeek = seek + samples;
    return seekTo(newSeek);
  }

  /**
   * Move the seek value by given seconds and rate.
   * @param {Number} seconds Number of seconds to move seek by;
   * @param {Number} sampleRate Sample rate of the audio clip you are working with.
   */
  seekSeconds(seconds, sampleRate = 44100) {
    const samples = secondsToSamples(seconds, sampleRate);
    return this.seekSamples(samples);
  }

  // Click handle functions for different buttons
  handlePlus10() {
    this.seekSeconds(10);
  }
  handleMinus10() {
    this.seekSeconds(-10);
  }
  handlePlus1() {
    this.seekSeconds(1);
  }
  handleMinus1() {
    this.seekSeconds(-1);
  }

  render() {
    // Break out values for the sake of easier template reading
    const { currentTime: { ms, s, m, h } } = this.state;
    const { seek } = this.props;

    // Construct new time string
    const time = `${this.leadingZeros(h)}:${this.leadingZeros(m)}:` + 
      `${this.leadingZeros(s)}:${this.leadingZeros(ms, 3)}`;

    return (
      <div className="seek-bar">
        <div className="control-bar">
          <button className="seek-minus-10" onClick={this.handleMinus10}>
            -10
          </button>
          <button className="seek-minus-1" onClick={this.handleMinus1}>
            -1
          </button>
          <button className="seek-plus-1" onClick={this.handlePlus1}>+1</button>
          <button className="seek-plus-10" onClick={this.handlePlus10}>
            +10
          </button>
        </div>
        <div className="indicators">
          <div className="current-time">{time}</div>
        </div>
      </div>
    );
  }
}

export default SeekBar;
