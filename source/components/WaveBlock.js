// @flow

// Flow Types
import type { grainType } from "../constants/flowTypes";

// Render
import React, { Component } from "react";
import "../styles/WaveBlock.styl";

/**
 * Used to display a single grain of a track.
 * @extends React.Component
 */
class WaveBlock extends Component {
  handleClick: () => void;

  constructor(props: {
    grain: grainType,
    maxAmplitude?: number,
    selected?: boolean | void,
    setSeekPosition: () => void,
    tags: {
      quiet: boolean
    }
  }) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  waveBlockStyle(grain: grainType): { flexGrow: number } {
    const { start, end } = grain;
    const length = end - start;
    const style = { flexGrow: length };
    return style;
  }

  amplitudeStyle(
    amplitude: number = 0,
    maxAmplitude: number = Infinity
  ): { height: string } {
    const fillPercentage: number = amplitude / maxAmplitude;
    const height = `${fillPercentage * 100}%`;
    const style = { height };
    return style;
  }

  /**
   * Handles a click event of the whole WaveBlock. Should set seek line to the 
   * start of the grain.
   * 
   * @returns {void} Nothing returned.
   */
  handleClick() {
    const { grain: { start }, setSeekPosition } = this.props;
    setSeekPosition(start);
  }

  render() {
    // Breakout values
    const { grain, selected, maxAmplitude, tags = {} } = this.props;
    const { disabled } = grain;

    // Figure out styles derived from props.
    const amplitudeStyle = this.amplitudeStyle(grain.amplitude, maxAmplitude);
    const waveBlockStyle: { flexGrow: number } = this.waveBlockStyle(grain);

    // Figure out classes derived from props.
    const isDisabled: string = disabled ? "disabled" : "enabled";
    const isSelected: string = selected ? "selected" : "unselected";
    const tagsAsStrings: Array<string> = Object.keys(tags);
    const appliedTags: Array<string> = tagsAsStrings.filter(tag => tags[tag]);
    const extraClasses: string = appliedTags.join(" ");

    return (
      <button
        className={`wave-block ${isDisabled} ${isSelected} ${extraClasses}`}
        disabled={disabled}
        onClick={this.handleClick}
        style={waveBlockStyle}
      >
        <div className={"amplitude"} style={amplitudeStyle} />
      </button>
    );
  }
}

export default WaveBlock;
