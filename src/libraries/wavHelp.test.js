import { secondsToSamples, samplesToSeconds, decodeWav, readFile, richReadWav } from './wavHelp'

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

describe('samplesToSeconds(samples, sampleRate)', () => {

  const testSamples = 302322
  const testSampleRate = 90123

  it('when provided with no values it returns 1 / 44100 seconds', () => {
    expect(samplesToSeconds()).toEqual(1 / 44100)
  })

  it('when provided with no sampleRate it returns samples / 44100 [Hz]', () => {
    expect(samplesToSeconds(testSamples)).toEqual(testSamples / 44100)
  })

  it('divides samples by sampleRate', () => {
    expect(samplesToSeconds(testSamples, testSampleRate)).toEqual(testSamples / testSampleRate)
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

  it('returns a rejected promise if given bad file path', () => {
    return richReadWav(badSampleWavPath)
    .then(
      (result) => expect(result).toBeFalsy(),
      (error) => expect(error).toBeTruthy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return richReadWav(sampleWavPath)
    .then(
      (result) => expect(result).toBeTruthy(),
      (error) => expect(error).toBeFalsy()
    )
  })

})