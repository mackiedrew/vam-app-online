// Render
import React, { Component } from "react";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import setSeekPosition from "../actions/setSeekPosition";

// Helpers
import { secondsToSamples } from "../help/convert";
import { floor } from "../help/generic";

/**
 * Manages the playing state and seeking state as an interface between redux
 * state and the DOM.
 * 
 * @extends React.Component
 */
export class AudioManager extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const { setSeekPosition, selectedTrack, currentlyPlaying } = this.props;
    if (currentlyPlaying) {
      const audioTag = document.getElementById(
        `audio-manager-${selectedTrack}`
      );
      const { currentTime } = audioTag;
      const currentSample = floor(secondsToSamples(currentTime));
      setSeekPosition(currentSample);
    }
  }

  render() {
    const { trackList } = this.props;
    const allTrackIds = Object.keys(trackList);
    const audioTags = allTrackIds.map(id => {
      const { url, type, muted } = trackList[id];
      return (
        <audio id={`audio-manager-${id}`} key={id} muted={muted}>
          <source src={url} type={type} />
        </audio>
      );
    });

    return (
      <div className="audio-manager">
        {audioTags}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    trackList: state.tracks.trackList,
    selectedTrack: state.tracks.selectedTrack
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSeekPosition: setSeekPosition
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioManager);
