// @flow

// Render
import React from "react";
import "../styles/Tracks.styl";

// Types
import type { viewType } from "../constants/flowTypes";

// Components
import Track from "../containers/Track";
import TimeBar from "../components/TimeBar";
import AudioManager from "../containers/AudioManager";

/**
 * Section of the UI containing all of the tracks listed as rows.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Tracks = ({ trackList, view }: { trackList: {}, view: viewType }) => {
  const trackIds: Array<string> = Object.keys(trackList);
  const numberOfTracks: number = trackIds.length;
  const tracksExist: boolean = numberOfTracks > 0;
  const tracks = trackIds.map(id => <Track id={id} key={id} />);
  const noTracks = <div className="no-tracks">no tracks</div>;
  const children = tracksExist ? tracks : noTracks;

  return (
    <section className="tracks">
      <TimeBar view={view} />
      <AudioManager />
      {children}
    </section>
  );
};

export default Tracks;
