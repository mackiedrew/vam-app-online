import fs from 'fs'
import WavDecoder from 'wav-decoder'

/*
 * Notes:
 * channelData is returned as a 32-bit float array
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

/* eslint-disable no-console */
export const logWav = (filePath) => {
  readWav(filePath)
  .then(({sampleRate, channelData}) => {
    console.log('Sample Rate:', sampleRate)
    console.log('Channels:', channelData.length) 
    channelData.map((channelDatum, index) => {
      console.log(`Channel (${index}):`, channelData[index])
    })
  })
}
/* eslint-enable no-console */