// @flow

// Render
import React, { Component } from "react";
import "../styles/WaveBlock.styl";

// Types
import type { grainType } from "../constants/flowTypes";

/**
 * Used to display a single grain of a track.
 * @extends React.Component
 */
class WaveBlock extends Component {
  props: {
    grain: grainType,
    maxAmplitude?: number,
    selected?: boolean | void,
    setSeekPosition: () => void,
    tags: {
      quiet: boolean
    }
  };
  handleClick: () => void;

  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  waveBlockStyle(
    grain: grainType,
    tags: { quiet: boolean } = { quiet: false }
  ): {} {
    const { start, end } = grain;
    const quiet = tags.quiet;
    const length = end - start;
    const backgroundColor = quiet ? "rgb(240, 230, 230)" : "rgb(240, 240, 240)";
    const style = { flexGrow: length, backgroundColor };
    return style;
  }

  amplitudeStyle(
    selected: boolean | void,
    amplitude: number = 0,
    maxAmplitude: number = Infinity
  ): {} {
    const fillPercentage: number = amplitude / maxAmplitude;
    const height = `${fillPercentage * 100}%`;
    const opacity = selected ? "1.0" : "0.4";
    const style = { height, opacity };
    return style;
  }

  handleClick() {
    const { grain: { start }, setSeekPosition } = this.props;
    setSeekPosition(start);
  }

  render() {
    const { grain, selected, maxAmplitude, tags } = this.props;
    const { filler, more } = grain;
    const amplitudeStyle = this.amplitudeStyle(
      selected,
      grain.amplitude,
      maxAmplitude
    );
    const waveBlockStyle = this.waveBlockStyle(grain, tags);
    const extraClasses: string =
      (filler ? " filler" : "") + (more ? " more" : "");
    const note: string = more ? "more..." : filler ? "track ends" : "";

    return (
      <div className={`wave-block${extraClasses}`} style={waveBlockStyle}>
        <div className="note">
          {note}
        </div>
        <button
          className="amplitude"
          onClick={this.handleClick}
          style={amplitudeStyle}
        />
      </div>
    );
  }
}

export default WaveBlock;
