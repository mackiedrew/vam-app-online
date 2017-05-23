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
import seekForward from "../actions/seekForward";
import seekReverse from "../actions/seekReverse";
import shiftView from "../actions/shiftView";
import toggleCurrentlyPlaying from "../actions/toggleCurrentlyPlaying";

// Libraries
import { framesToTime } from "../help/convert";
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
  handleViewNext: () => void;
  handleViewPrevious: () => void;

  constructor(props: {
    seekPosition: number,
    currentlyPlaying: boolean,
    zoomIn: Function,
    zoomOut: Function,
    seekForward: Function,
    seekReverse: Function,
    shiftView: Function,
    shiftSeekPosition: Function,
    toggleCurrentlyPlaying: Function
  }) {
    // Initialize extended class with passed props
    super(props);

    // Bind functions to `this`
    this.handleViewNext = this.handleViewNext.bind(this);
    this.handleViewPrevious = this.handleViewPrevious.bind(this);
  }

  // Click handle functions for different buttons
  handleViewNext() {
    this.props.shiftView(1.0);
  }
  handleViewPrevious() {
    this.props.shiftView(-1.0);
  }

  render() {
    // Break out values for the sake of easier template reading
    const {
      seekPosition,
      currentlyPlaying,
      toggleCurrentlyPlaying,
      seekReverse,
      seekForward,
      zoomIn,
      zoomOut
    } = this.props;
    const time = framesToTime(seekPosition);
    const { ms, s, m, h } = time;

    // Construct new time string
    const timeStamp =
      `${leadingZeros(h)}:${leadingZeros(m)}:` +
      `${leadingZeros(s)}:${leadingZeros(ms, 3)}`;

    return (
      <div className="seek-bar">
        <div className="seek-controls">
          <button className="seek-minus-1" onClick={seekReverse}>
            <Icon icon="skip_previous" />
          </button>
          <ToggleButton
            offContents={<Icon icon="play_arrow" />}
            offFunction={toggleCurrentlyPlaying}
            on={currentlyPlaying}
            onContents={<Icon icon="pause" />}
            onFunction={toggleCurrentlyPlaying}
          />
          <button className="seek-plus-1" onClick={seekForward}>
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
          <button className="zoom-in" onClick={zoomIn}>
            <Icon icon="zoom_in" />
          </button>
          <button className="zoom-out" onClick={zoomOut}>
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
      seekForward: seekForward,
      seekReverse: seekReverse,
      shiftView: shiftView,
      toggleCurrentlyPlaying: toggleCurrentlyPlaying
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SeekBar);
