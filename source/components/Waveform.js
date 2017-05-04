import React from "react";
import "../styles/Waveform.styl";

// Components
import WaveBlock from "../components/WaveBlock";

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 * 
 * @param {Object} props Provided properties.
 */
const Waveform = ({ blocks, maxAmplitude, setSeekPosition, selected }) => (
  <div className="waveform">
    {blocks &&
      blocks.map(({ start, end, amplitude, filler, more, quiet }, index) => (
        <WaveBlock
          amplitude={amplitude}
          end={end}
          filler={filler}
          key={index}
          maxAmplitude={maxAmplitude}
          more={more}
          quiet={quiet}
          selected={selected}
          setSeekPosition={setSeekPosition}
          start={start}
        />
      ))}
  </div>
);

export default Waveform;
