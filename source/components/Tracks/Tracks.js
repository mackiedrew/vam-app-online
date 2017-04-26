import React, { Component } from "react";
import "./Tracks.styl";

// Components
import Track from "../Track/Track";
import TimeBar from "../../containers/TimeBar/TimeBar";
import AudioManager from "../../components/AudioManager/AudioManager";

class Tracks extends Component {
  constructor(props) {
    // Construct extended class `Component` with passed props
    super(props);

    // Bind functions to `this`
    this.trackIds = this.trackIds.bind(this);
    this.renderTrackList = this.renderTrackList.bind(this);
  }

  trackIds() {
    const { tracks } = this.props;
    return Object.keys(tracks);
  }

  /**
   * Generate a set of track elements to display within the main render() function.
   */
  renderTrackList() {
    // Breakout references for clarity and ease
    const {
      tracks,
      view,
      seek,
      context,
      selectedTrack,
      reportTrackLength,
      handleTrackRemove,
      handleTrackAdd,
      mutedTracks,
      toggleMute,
      selectTrack,
      seekTo
    } = this.props;
    // Create list of tracks for iteration
    const trackIds = this.trackIds();
    // Create an array containing <Track /> elements matching tracks in state
    const trackList =
      trackIds &&
      trackIds.map(id => {
        const selected = selectedTrack === id;
        return (
          <Track
            add={handleTrackAdd}
            context={context}
            file={tracks[id].file}
            id={id}
            key={id}
            muted={mutedTracks[id]}
            remove={handleTrackRemove}
            reportTrackLength={reportTrackLength}
            seek={seek}
            seekTo={seekTo}
            selectTrack={selectTrack}
            selected={selected}
            toggleMute={toggleMute}
            view={view}
          />
        );
      });
    return trackList;
  }
  
  renderNoTracks() {
    const trackIds = this.trackIds();
    const tracksExist = trackIds.length > 0;
    return tracksExist
      ? ""
      : <div className="no-tracks">
          no tracks
        </div>;
  }

  render() {
    const { view, tracks, playing, reportSeek, reportPaused, selectedTrack, mutedTracks } = this.props;
    return (
      <section className="tracks">
        <TimeBar view={view} />
        <AudioManager
          mutedTracks={mutedTracks}
          playing={playing}
          reportPaused={reportPaused}
          reportSeek={reportSeek}
          selectedTrack={selectedTrack}
          tracks={tracks} 
        />
        { this.renderNoTracks() }
        { this.renderTrackList() }
      </section>
    );
  }
}

export default Tracks;
