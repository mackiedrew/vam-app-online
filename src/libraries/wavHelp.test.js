import { secondsToSamples, decodeWav, readFile, richReadWav } from './wavHelp'

describe('secondsToSamples(seconds, sampleRate)', () => {

  const testSeconds = 55
  const testSampleRate = 90123

  it('when provided with no values it returns 44100 [Hz]', () => {
    expect(secondsToSamples()).toEqual(44100)
  })

  it('when provided with no sampleRate it returns seconds * 44100 [Hz]', () => {
    expect(secondsToSamples(testSeconds)).toEqual(testSeconds * 44100)
  })

  it('multiplies seconds by sampleRate', () => {
    expect(secondsToSamples(testSeconds, testSampleRate)).toEqual(testSeconds * testSampleRate)
  })

})

const badSampleWavPath = '/XYZ123/ThisFileDoesNotExist.zip'
const sampleWavPath = './example/sample.wav'

describe('readFile(filePath)', () => {
  it('temp')
})

describe('decodeWav(filePath)', () => {
  it('temp')
})

describe('richReadWav(filePath)', () => {
  it('temp')
})
