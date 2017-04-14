import React from "react";
import "./Waveform.styl";

// Components
import WaveBlock from "../WaveBlock/WaveBlock";

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Waveform = ({ blocks, maxAmplitude, seekTo }) => (
  <div className="waveform">
    {blocks &&
      blocks.map(({ start, end, amplitude }, index) => (
        <WaveBlock
          amplitude={amplitude}
          end={end}
          key={index}
          maxAmplitude={maxAmplitude}
          seekTo={seekTo}
          start={start}
        />
      ))}
  </div>
);

export default Waveform;
