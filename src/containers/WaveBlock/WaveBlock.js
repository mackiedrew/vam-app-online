import React, { Component } from 'react'
import './WaveBlock.styl'

/**
 * Single grain, fine chunk, or coarse chunk as displayed as a component of a waveform.
 * @param {Object} props Read-only properties that get passed down from parent.
 */
class WaveBlock extends Component {

  constructor(props) {
    super(props)
    this.relativeAmplitude = this.relativeAmplitude.bind(this)
    this.amplitudeStyle = this.amplitudeStyle.bind(this)
  }

  relativeAmplitude() {
    const { amplitude, maxAmplitude } = this.props
    return amplitude / maxAmplitude
  }

  waveBlockStyle() {
    const { start, end } = this.props
    const length = end - start
    return { flexGrow: length }
  }

  amplitudeStyle() {
    const fillPercentage = this.relativeAmplitude()
    const height = `${fillPercentage * 100}%`
    return { height }
  }

  render() {

    const { start, seekTo } = this.props
    const amplitudeStyle = this.amplitudeStyle()
    const waveBlockStyle = this.waveBlockStyle()

    return (
      <div className="wave-block" style={waveBlockStyle}>
        <button
          className="amplitude"
          style={amplitudeStyle}
          onClick={() => seekTo(start)}
        />
      </div>
    )
  }
}

export default WaveBlock
