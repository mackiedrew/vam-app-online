import React, { Component } from "react";
import "./Tracks.styl";

// Components
import Track from "../Track/Track";

class Tracks extends Component {
  constructor(props) {
    // Construct extended class `Component` with passed props
    super(props);

    // Bind functions to `this`
    this.trackIds = this.trackIds.bind(this);
    this.renderTrackList = this.renderTrackList.bind(this);
    this.renderAudioTags = this.renderAudioTags.bind(this);
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
      selectTrack,
      seekTo,
    } = this.props;
    // Create list of tracks for iteration
    const trackIds = this.trackIds();
    // Create an array containing <Track /> elements matching tracks in state
    const trackList = trackIds &&
      trackIds.map((id) => {
        
        const selected = selectedTrack === id;

        return (
          <Track
            add={handleTrackAdd}
            context={context}
            file={tracks[id]}
            id={id}
            key={id}
            remove={handleTrackRemove}
            reportTrackLength={reportTrackLength}
            seek={seek}
            seekTo={seekTo}
            selectTrack={selectTrack}
            selected={selected}
            view={view}
          />
        );
      });
    return trackList;
  }

  renderAudioTags() {
    const { tracks } = this.props;
    const trackIds = tracks && this.trackIds();

    return trackIds.map((id) => {
      const { path, type } = tracks[id];
      return (
        <audio autoPlay={false} id={id} key={id} controls>
          <source key={id} src={path} type={type} />
        </audio>
      );
    });
  }

  renderNoTracks() {
    const trackIds = this.trackIds();
    const tracksExist = trackIds.length > 0;
    return tracksExist ? "" :
      <div className="no-tracks">
        no tracks
      </div>;
  }

  render() {
    return (
      <section className="tracks">
        { this.renderNoTracks() }
        { this.renderTrackList() }
        { this.renderAudioTags() }
      </section>
    );
  }
}

export default Tracks;
