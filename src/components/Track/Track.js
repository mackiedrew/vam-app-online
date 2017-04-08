import React, { Component } from 'react'
import './Track.styl'

// Libraries
import { parse } from 'path'
import { logWav, readWav } from '../../libraries/wavHelp'
import range from 'lodash.range'

// Components
import Waveform from '../../containers/Waveform/Waveform'

class Track extends Component {

  constructor(props) {
    super(props)

    const fileName = parse(props.path).base

    this.initialState = {
      name: fileName,
      sampleRate: undefined,
      length: undefined,
      minAmplitude: undefined,
      maxAmplitude: undefined,
      data: [],
      grains: [],
    }

    this.state = this.initialState
  }

  // Since this loads prior to 
  componentWillMount () {

    // Process wav file
    readWav(this.props.path)
    .then(({sampleRate, channelData}) => {
      
      
      // Gather data from wav
      const data = channelData[0]
      const length = data.length

      // Generate Grains
      const TEMPGRAINSIZE = 441000
      const numberOfGrains = ~~(length / TEMPGRAINSIZE) + 1
      const grainPoints = range(0, numberOfGrains).map((index) => {
        
        const start = index * TEMPGRAINSIZE
        const end = index + 1 === numberOfGrains ? length : start + TEMPGRAINSIZE

        return { start, end }
      })

      // Determine Average Amplitude
      const amplitudes = data.map((datum) => Math.abs(datum))

      const grainAmplitudes = grainPoints.map(({start, end}) => {
        const grainSamples = amplitudes.slice(start, end)
        const sum = grainSamples.reduce((a, b) => a + b, 0)
        const numberOfSamples = (end - start)
        const mean = sum / numberOfSamples
        return mean
      })

      const minAmplitude = Math.min(...grainAmplitudes)
      const maxAmplitude = Math.max(...grainAmplitudes)

      // Stitch grainPoints and amplitudes
      const grains = grainPoints.map((grain, index) => ({
        ...grain,
        amplitude: grainAmplitudes[index],
      }))

      // Set State
      this.setState({ sampleRate, length, grains, minAmplitude, maxAmplitude })
    })
  }

  render() {

    const { name, grains, minAmplitude, maxAmplitude } = this.state
    const { id, remove } = this.props

    return (
      <div className="track">
        <div className="controls">
          <span className="name">{name}</span>
          <button className="remove" onClick={() => remove(id)}>Remove</button>
        </div>
        <div className="display">
          <Waveform
            grains={grains}
            minAmplitude={minAmplitude}
            maxAmplitude={maxAmplitude}
          />
        </div>
      </div>
    )
  }
}

export default Track
