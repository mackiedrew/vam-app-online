// @flow

// Render
import React from "react";
import "../styles/Waveform.styl";

// Types
import type { grainArray } from "../constants/flowTypes";

// Components
import WaveBlock from "../components/WaveBlock";

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and
 * provided data into a pretty display format. It should not do a lot of the
 * heavy lifting, most of it should be given to a library for processing or
 * provided directly through the props.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Waveform = ({
  grains,
  maxAmplitude,
  selected,
  setSeekPosition
}: {
  grains: grainArray,
  maxAmplitude: number,
  selected: boolean | void,
  setSeekPosition: () => void
}) => {
  const waveBlocks = grains.map((grain, i) => (
    <WaveBlock
      grain={grain}
      key={i}
      maxAmplitude={maxAmplitude}
      selected={selected}
      setSeekPosition={setSeekPosition}
    />
  ));

  return (
    <div className="waveform">
      {waveBlocks}
    </div>
  );
};

export default Waveform;
