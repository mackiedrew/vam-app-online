// Libraries
import fs from 'fs'
import WavDecoder from 'wav-decoder'
import { logicalSegment } from './genericHelp'

// Load configuration file
import config from '../config.js'

/**
 * Converts seconds to samples, given a sample rate. Both have defaults so if you provide not params
 * it will simply provide a typical conversion factor. This is intentionally over-verbose.
 * @param {Number} seconds 
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const secondsToSamples = (seconds=1, sampleRate=44100) => seconds * sampleRate

/**
 * Reads and returns a promise containing the data within the wav files decoded by `wav-decoder`.
 * @param {String} filePath Absolute full path to the wav file, including filename.ext
 */
export const readWav = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, buffer) => {
      if (error) {
        return reject(error)
      }
      return resolve(buffer)
    })
  }).then((buffer) => WavDecoder.decode(buffer))
}

/**
 * Reads and logs a promise containing the data within the wav files decoded by `wav-decoder`.
 * @param {String} filePath Absolute full path to the wav file, including filename.ext
 */
export const logWav = (filePath) => {
  readWav(filePath)
  .then(({sampleRate, channelData}) => {
    /* eslint-disable no-console */
    console.log('Sample Rate:', sampleRate)
    console.log('Channels:', channelData.length) 
    channelData.map((channelDatum, index) => {
      console.log(`Channel (${index}):`, channelData[index])
    })
    /* eslint-enable no-console */
  })
}

/**
 * Ugly function, but currently gathers information that is much more processed than the simple 
 * readWav() function.
 * @param {String} filePath Absolute full path to the wav file, including filename.ext
 */
export const richReadWav = (filePath) => {
  return readWav(filePath)
  .then(({sampleRate, channelData}) => {
    // Break out data for easy reference
    const data = channelData[0]
    const length = data.length

    // Generate grains by logically segmenting the full array of samples
    const grainLength = secondsToSamples(config.grains.temp)
    const grainPoints = logicalSegment(data, grainLength)

    // Calculate mean amplitude of each grain
    const sampleAmplitudes = data.map((value) => Math.abs(value))
    const grainAmplitudes = grainPoints.map(({start, end}) => {
      const grainSamples = sampleAmplitudes.slice(start, end)
      const sum = grainSamples.reduce((a, b) => a + b, 0)
      const numberOfSamples = (end - start)
      const mean = sum / numberOfSamples
      return mean
    })

    // Stitch grainPoints and grainAmplitudes together
    const grains = grainPoints.map((grain, index) => ({
      ...grain,
      amplitude: grainAmplitudes[index],
    }))

    // Calculate track amplitude information
    const minAmplitude = Math.min(...grainAmplitudes)
    const maxAmplitude = Math.max(...grainAmplitudes)

    return { sampleRate, length, grains, minAmplitude, maxAmplitude }
  })
}