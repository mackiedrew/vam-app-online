import React from 'react'
import './Waveform.styl'

// Components
import WaveBlock from '../WaveBlock/WaveBlock'

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Waveform = ({ blocks, maxAmplitude }) =>
  <div className="waveform">
    {
      blocks && blocks.map(({ amplitude }, index) =>
        <WaveBlock
          key={index}
          amplitude={amplitude}
          maxAmplitude={maxAmplitude}
        />
      )
    }
  </div>

export default Waveform
