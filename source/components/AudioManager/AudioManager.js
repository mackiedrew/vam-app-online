import React, { Component } from "react";

class AudioManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tracks } = this.props;
    const allTrackIds = tracks && Object.keys(tracks);

    return (
      <audio autoPlay={true} id="audio-manager">
        {
          tracks && allTrackIds.map((id) => {
            const { path, type } = tracks[id];
            console.log(tracks[id]);
            console.log(path);
            console.log(type);
            return <source key={id} src={name} type={type}></source>;
          })
        }
      </audio>
    );
  }
}

export default AudioManager;
