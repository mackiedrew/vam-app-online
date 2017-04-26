import React, { Component } from "react";
import "./WaveBlock.styl";

/**
 * Single grain, fine chunk, or coarse chunk as displayed as a component of a waveform.
 * @param {Object} props Read-only properties that get passed down from parent.
 */
class WaveBlock extends Component {
  constructor(props) {
    super(props);
    // Bind functions to `this`
    this.relativeAmplitude = this.relativeAmplitude.bind(this);
    this.amplitudeStyle = this.amplitudeStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Figures out the programmatic style of the total wave-block.
   * - uses flex-grow to determine proportion of waveform to grow to fill
   */
  waveBlockStyle() {
    const { start, end } = this.props;
    const length = end - start;
    return { flexGrow: length };
  }

  /**
   * Figures out the programmatic style of the amplitude button.
   * - height is calculated as % of total
   */
  amplitudeStyle() {
    const { selected } = this.props;
    const fillPercentage = this.relativeAmplitude();
    const height = `${fillPercentage * 100}%`;
    const opacity = selected ? "1.0" : "0.5";
    return { height, opacity };
  }

  /**
   * Relative amplitude is the % of maximum amplitude, this is used to calculate the waveform height
   */
  relativeAmplitude() {
    const { amplitude, maxAmplitude } = this.props;
    return amplitude / maxAmplitude;
  }

  // onClick handlers
  handleClick() {
    const { start, seekTo } = this.props;
    seekTo(start);
  }

  render() {
    const { filler, more } = this.props;
    const amplitudeStyle = this.amplitudeStyle();
    const waveBlockStyle = this.waveBlockStyle();

    return (
      <div
        className={`wave-block ${filler ? "filler" : ""} ${more ? "more" : ""}`}
        style={waveBlockStyle}
      >
        <div className="note">
          {more ? "more..." : filler ? "track ends" : ""}
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
