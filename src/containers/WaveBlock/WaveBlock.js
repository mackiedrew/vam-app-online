import React from 'react'
import './WaveBlock.styl'

/**
 * Single grain, fine chunk, or coarse chunk as displayed as a component of a waveform.
 * @param {Object} props Read-only properties that get passed down from parent.
 */
const WaveBlock = ({ amplitude, maxAmplitude }) => {

  const relativeAmplitude = amplitude / maxAmplitude

  const style = { height: `${relativeAmplitude * 200}px` }

  return (
    <div className="wave-block">
      <div className="amplitude" style={style}>

      </div>
    </div>
  )
}

export default WaveBlock
