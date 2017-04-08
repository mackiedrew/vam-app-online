import React from 'react'
import './Waveform.styl'

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Waveform = ({ grains, minAmplitude, maxAmplitude }) => {

  return (
    <div className="waveform">
      {
        grains.map(({ amplitude }, index) => {

          const amplitudeFactor = maxAmplitude - minAmplitude
          const percentageMaxAmplitude = (amplitude - minAmplitude) / amplitudeFactor

          const style = {
            height: `${percentageMaxAmplitude * 200 + 1}px`,
          }

          return (
            <div 
              key={index}
              className="grain"
              style={style}
            ></div>
          )}
        )
      }
    </div>
  )
}

export default Waveform
