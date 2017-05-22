// @flow

// Flow Types
import type { State, Dispatch } from "../constants/flowTypes";

// Render
import React, { Component } from "react";
import "../styles/SeekBar.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import zoomIn from "../actions/zoomIn";
import zoomOut from "../actions/zoomOut";
import shiftView from "../actions/shiftView";
import shiftSeekPosition from "../actions/shiftSeekPosition";
import toggleCurrentlyPlaying from "../actions/toggleCurrentlyPlaying";

// Libraries
import { secondsToSamples, framesToTime } from "../help/convert";
import { leadingZeros } from "../help/generic";

// Components
import ToggleButton from "../components/ToggleButton";
import Icon from "../components/Icon";

/**
 * SeekBar will handle the controls and logic, and maybe a UI for interacting
 * with the current seek position of the tracks. This will be represented by
 * a frame #.
 */
export class SeekBar extends Component {
  // Set class method flow types.
  seekSeconds: (number, number) => number;
  handlePlus1: () => void;
  handleMinus1: () => void;
  handleViewNext: () => void;
  handleViewPrevious: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleTogglePlay: () => void;

  constructor(props: {
    seekPosition: number,
    currentlyPlaying: boolean,
    zoomIn: Function,
    zoomOut: Function,
    shiftView: Function,
    shiftSeekPosition: Function,
    toggleCurrentlyPlaying: Function
  }) {
    // Initialize extended class with passed props
    super(props);

    // Bind functions to `this`
    this.seekSeconds = this.seekSeconds.bind(this);
    this.handlePlus1 = this.handlePlus1.bind(this);
    this.handleMinus1 = this.handleMinus1.bind(this);
    this.handleViewNext = this.handleViewNext.bind(this);
    this.handleViewPrevious = this.handleViewPrevious.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  /**
   * Move the seek value by given seconds and rate.
   * 
   * @param {number} seconds Number of seconds to move seek by.
   * @param {number} sampleRate Sample rate of the audio clip you are working with.
   * @returns {undefined} Returns nothing, side effects occur.
   */
  seekSeconds(seconds: number, sampleRate: number = 44100) {
    const frames: number = secondsToSamples(seconds, sampleRate);
    this.props.shiftSeekPosition(frames);
  }

  // Click handle functions for different buttons
  handlePlus1() {
    this.seekSeconds(1, 44100);
  }
  handleMinus1() {
    this.seekSeconds(-1, 44110);
  }
  handleViewNext() {
    this.props.shiftView(1.0);
  }
  handleViewPrevious() {
    this.props.shiftView(-1.0);
  }
  handleZoomIn() {
    this.props.zoomIn();
  }
  handleZoomOut() {
    this.props.zoomOut();
  }
  handleTogglePlay() {
    this.props.toggleCurrentlyPlaying();
  }
  render() {
    // Break out values for the sake of easier template reading
    const { seekPosition, currentlyPlaying } = this.props;
    const time = framesToTime(seekPosition);
    const { ms, s, m, h } = time;

    // Construct new time string
    const timeStamp =
      `${leadingZeros(h)}:${leadingZeros(m)}:` +
      `${leadingZeros(s)}:${leadingZeros(ms, 3)}`;

    return (
      <div className="seek-bar">
        <div className="seek-controls">
          <button className="seek-minus-1" onClick={this.handleMinus1}>
            <Icon icon="skip_previous" />
          </button>
          <ToggleButton
            offContents={<Icon icon="play_arrow" />}
            offFunction={this.handleTogglePlay}
            on={currentlyPlaying}
            onContents={<Icon icon="pause" />}
            onFunction={this.handleTogglePlay}
          />
          <button className="seek-plus-1" onClick={this.handlePlus1}>
            <Icon icon="skip_next" />
          </button>
        </div>
        <div className="view-controls">
          <button className="view-previous" onClick={this.handleViewPrevious}>
            <Icon icon="navigate_before" />
          </button>
          <button className="view-next" onClick={this.handleViewNext}>
            <Icon icon="navigate_next" />
          </button>
          <button className="zoom-in" onClick={this.handleZoomIn}>
            <Icon icon="zoom_in" />
          </button>
          <button className="zoom-out" onClick={this.handleZoomOut}>
            <Icon icon="zoom_out" />
          </button>
          <div className="current-time">{timeStamp}</div>

        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state: State) => {
  return {
    seekPosition: state.tracks.seekPosition,
    currentlyPlaying: state.tracks.currentlyPlaying
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      zoomIn: zoomIn,
      zoomOut: zoomOut,
      shiftView: shiftView,
      shiftSeekPosition: shiftSeekPosition,
      toggleCurrentlyPlaying: toggleCurrentlyPlaying
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SeekBar);
