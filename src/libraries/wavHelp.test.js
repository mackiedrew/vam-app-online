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

  it('returns a rejected promise if given bad file path', () => {
    return readFile(badSampleWavPath)
    .then(
      (result) => expect(result).toBeFalsy(),
      (error) => expect(error).toBeTruthy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return readFile(sampleWavPath)
    .then(
      (result) => expect(result).toBeTruthy(),
      (error) => expect(error).toBeFalsy()
    )
  })

})

describe('decodeWav(filePath)', () => {
  
  it('returns a rejected promise if given bad file path', () => {
    return decodeWav(badSampleWavPath)
    .then(
      (result) => expect(result).toBeFalsy(),
      (error) => expect(error).toBeTruthy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return decodeWav(sampleWavPath)
    .then(
      (result) => expect(result).toBeTruthy(),
      (error) => expect(error).toBeFalsy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return decodeWav(sampleWavPath)
    .then(
      (result) => {
        expect(result.sampleRate).toBeTruthy()
        expect(result.channelData).toBeTruthy()
      },
      (error) => expect(error).toBeFalsy()
    )
  })
  
})

describe('richReadWav(filePath)', () => {
  it('temp')
})
