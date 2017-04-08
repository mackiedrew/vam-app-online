import React from 'react'
import './Waveform.styl'

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Waveform = ({ grains }) => {

  return (
    <div className="waveform">
      { grains.map((grain, index) => 
        <div 
          key={index}
          className="grain"
        ></div>
      )}
    </div>
  )
}

export default Waveform
