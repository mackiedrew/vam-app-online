// @flow

// Flow Types
import type { State, Dispatch } from "../constants/flowTypes";

// Render
import React, { Component } from "react";
import "../styles/TrackControls.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import selectTrack from "../actions/selectTrack";
import removeTrack from "../actions/removeTrack";
import toggleTrackMuted from "../actions/toggleTrackMuted";
import makeModal from "../actions/makeModal";

// Components
import ToggleButton from "../components/ToggleButton";
import Icon from "../components/Icon";

/**
 * Top-bar for each individual track. Used to be a part of the <Track /> object
 * but was broken out to help large file size.
 * 
 * @extends React.Component
 */
export class TrackControls extends Component {
  // Set class method flow types.
  handleRemoveButton: () => void;
  handleSelectTrack: () => void;
  handleToggleMute: () => void;

  constructor(props: {
    name: string,
    id: string,
    seekPosition: number,
    selectedTrack: string,
    trackList: Object,
    selectTrack: Function,
    removeTrack: Function,
    toggleMuted: Function,
    makeModal: Function
  }) {
    super(props);
    // Bind `this` to class methods.
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleSelectTrack = this.handleSelectTrack.bind(this);
    this.handleToggleMute = this.handleToggleMute.bind(this);
  }

  // Button handleClick functions
  handleRemoveButton() {
    // Which props need easy-access?
    const { makeModal, id, name } = this.props;
    // What modal type should be shown?
    const modalType = "REMOVE_TRACK";
    // What data does the modal need to render correctly?
    const modalData = {
      trackId: id,
      fileName: name
    };
    // How is the modal actually dispatched?
    makeModal(modalType, modalData);
  }

  handleSelectTrack() {
    this.props.selectTrack(this.props.id);
  }

  handleToggleMute() {
    this.props.toggleMuted(this.props.id);
  }

  render() {
    const { name, selectedTrack, id, trackList } = this.props;
    // Is this track selected?
    const selected: boolean = id === selectedTrack;
    // Is this track muted?
    const muted: boolean = trackList[id].muted;

    return (
      <div className="track-controls">
        <div>
          <ToggleButton
            offContents={<Icon icon="radio_button_unchecked" />}
            offFunction={this.handleSelectTrack}
            on={selected}
            onContents={<Icon icon="radio_button_checked" />}
            onFunction={this.handleSelectTrack}
          />
          <ToggleButton
            offContents={<Icon icon="volume_up" />}
            offFunction={this.handleToggleMute}
            on={muted}
            onContents={<Icon icon="volume_off" />}
            onFunction={this.handleToggleMute}
          />
        </div>
        <span className="name">{name}</span>
        <button className="remove" onClick={this.handleRemoveButton}>
          <Icon icon="delete_forever" />
        </button>
      </div>
    );
  }
}

export const mapStateToProps = (state: State) => {
  return {
    seekPosition: state.tracks.seekPosition,
    selectedTrack: state.tracks.selectedTrack,
    trackList: state.tracks.trackList
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      selectTrack: selectTrack,
      removeTrack: removeTrack,
      toggleMuted: toggleTrackMuted,
      makeModal: makeModal
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackControls);
