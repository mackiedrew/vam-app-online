// Render
import React, { Component } from "react";
import "./TrackControls.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import selectTrack from "../../actions/selectTrack";
import removeTrack from "../../actions/removeTrack";
import toggleTrackMute from "../../actions/toggleTrackMute";

// Components
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import Icon from "../../components/Icon/Icon";

class TrackControls extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleSelectTrack = this.handleSelectTrack.bind(this);
    this.handleToggleMute = this.handleToggleMute.bind(this);
  }

  // Button handleClick functions
  handleRemoveButton() {
    this.props.removeTrack(this.props.id);
  }

  handleSelectTrack() {
    this.props.selectTrack(this.props.id);
  }

  handleToggleMute() {
    this.props.toggleMute(this.props.id);
  }

  render() {
    const { name, selectedTrack, id, trackList } = this.props;

    const selected = id === selectedTrack;
    const muted = trackList[id].muted;

    return (
      <div className="track-controls">
        <div>
          <ToggleButton
            offContents={<Icon icon="radio_button_unchecked" />}
            offFunction={this.handleSelectTrack}
            on={selected}
            onContents={<Icon icon="radio_button_checked" />}
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

const mapStateToProps = state => {
  return {
    settings: state.settings,
    seekPosition: state.tracks.seekPosition,
    selectedTrack: state.tracks.selectedTrack,
    trackList: state.tracks.trackList
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectTrack: selectTrack,
      removeTrack: removeTrack,
      toggleMute: toggleTrackMute
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackControls);
