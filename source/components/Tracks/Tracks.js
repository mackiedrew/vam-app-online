// Render
import React from "react";
import "./Tracks.styl";

// Components
import Track from "../../containers/Track/Track";
import TimeBar from "../../components/TimeBar/TimeBar";
import AudioManager from "../../containers/AudioManager/AudioManager";

const Tracks = ({ trackList, view }) => {
  const trackIds = Object.keys(trackList);
  const numberOfTracks = trackIds.length;
  const tracksExist = numberOfTracks > 0;

  return (
    <section className="tracks">
      <TimeBar view={view} />
      <AudioManager />
      {tracksExist ? "" : <div className="no-tracks">no tracks</div>}
      {Object.keys(trackList).map(id => <Track id={id} key={id} />)}
    </section>
  );
};

export default Tracks;
