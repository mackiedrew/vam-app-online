import React, { Component } from "react";

import { secondsToSamples } from "../../help/convert/convert";
import { floor } from "../../help/generic/generic";

class AudioManager extends Component {
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
    const { reportSeek, reportPaused, selectedTrack, playing } = this.props;
    if (playing) {
      const manager = document.getElementById(`audio-manager-${selectedTrack}`);
      const currentTime = manager.currentTime;
      const currentSample = floor(secondsToSamples(currentTime));
      reportSeek(currentSample);
      reportPaused(manager.paused);
    }
  }

  render() {
    const { tracks, mutedTracks } = this.props;
    const allTrackIds = tracks && Object.keys(tracks);

    const audioTags =
      tracks &&
      allTrackIds.map(id => {
        const { url, file } = tracks[id];
        const { type } = file;
        const muted = mutedTracks[id];
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

export default AudioManager;
