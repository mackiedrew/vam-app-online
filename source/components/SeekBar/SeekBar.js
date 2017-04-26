import React, { Component } from "react";
import "./SeekBar.styl";

// Libraries
import { secondsToSamples, samplesToTime } from "../../help/wav/wav";
import { leadingZeros } from "../../help/generic/generic";

// Components
import ToggleButton from "../../containers/ToggleButton/ToggleButton";
import Icon from "../../containers/Icon/Icon";

/**
 * SeekBar will handle the controls and logic, and maybe a UI for interacting with the current seek
 * position of the tracks. This will be represented by a sample #.
 */
class SeekBar extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);

    // Bind functions to `this`
    this.seekSamples = this.seekSamples.bind(this);
    this.seekSeconds = this.seekSeconds.bind(this);
    this.handlePlus10 = this.handlePlus10.bind(this);
    this.handleMinus10 = this.handleMinus10.bind(this);
    this.handlePlus1 = this.handlePlus1.bind(this);
    this.handleMinus1 = this.handleMinus1.bind(this);
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
    const { seek, viewMagnify, togglePlay, playing } = this.props;
    const time = samplesToTime(seek);
    const { ms, s, m, h } = time;

    // Construct new time string
    const timeStamp =
      `${leadingZeros(h)}:${leadingZeros(m)}:` +
      `${leadingZeros(s)}:${leadingZeros(ms, 3)}`;

    return (
      <div className="seek-bar">
        <div className="control-bar">
          <button className="seek-minus-10" onClick={this.handleMinus10}>
            <Icon icon="replay_10" />
          </button>
          <button className="seek-minus-1" onClick={this.handleMinus1}>
            <Icon icon="skip_previous" />
          </button>
          <ToggleButton
            offContents={<Icon icon="play_arrow" />}
            offFunction={() => togglePlay()}
            on={playing}
            onContents={<Icon icon="pause" />}
            onFunction={() => togglePlay()}
          />
          <button className="seek-plus-1" onClick={this.handlePlus1}>
            <Icon icon="skip_next" />
          </button>
          <button className="seek-plus-10" onClick={this.handlePlus10}>
            <Icon icon="forward_10" />
          </button>
        </div>
        <div className="indicators">
          <button className="zoom-in" onClick={() => viewMagnify(0.75)}>
            <Icon icon="zoom_in" />
          </button>
          <button className="zoom-out" onClick={() => viewMagnify(1.5)}>
            <Icon icon="zoom_out" />
          </button>
          <div className="current-time">{timeStamp}</div>

        </div>
      </div>
    );
  }
}

export default SeekBar;
