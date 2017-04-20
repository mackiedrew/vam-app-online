const wav = rewire('./source/help/wav/wav');

class ReadWavWorkerMock {
  constructor() {}
}

const ReadWavWorker = rewire("../../workers/readWav.worker.js");

describe('secondsToSamples(seconds, sampleRate)', () => {

  const testSeconds = 55
  const testSampleRate = 90123

  it('when provided with no values it returns 44100 [Hz]', () => {
    expect(wav.secondsToSamples()).toEqual(44100)
  })

  it('when provided with no sampleRate it returns seconds * 44100 [Hz]', () => {
    expect(wav.secondsToSamples(testSeconds)).toEqual(testSeconds * 44100)
  })

  it('multiplies seconds by sampleRate', () => {
    expect(wav.secondsToSamples(testSeconds, testSampleRate)).toEqual(testSeconds * testSampleRate)
  })

})

describe('samplesToSeconds(samples, sampleRate)', () => {

  const testSamples = 302322
  const testSampleRate = 90123

  it('when provided with no values it returns 1 / 44100 seconds', () => {
    expect(wav.samplesToSeconds()).toEqual(1 / 44100)
  })

  it('when provided with no sampleRate it returns samples / 44100 [Hz]', () => {
    expect(wav.samplesToSeconds(testSamples)).toEqual(testSamples / 44100)
  })

  it('divides samples by sampleRate', () => {
    expect(wav.samplesToSeconds(testSamples, testSampleRate)).toEqual(testSamples / testSampleRate)
  })

})

const badSampleWavPath = '/XYZ123/ThisFileDoesNotExist.zip'
const sampleWavPath = './example/sample.wav'

describe('readFile(filePath)', () => {

  it('returns a rejected promise if given bad file path', () => {
    return wav.readFile(badSampleWavPath)
    .then(
      (result) => expect(result).toBeFalsy(),
      (error) => expect(error).toBeTruthy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return wav.readFile(sampleWavPath)
    .then(
      (result) => expect(result).toBeTruthy(),
      (error) => expect(error).toBeFalsy()
    )
  })

})

describe('decodeWav(filePath)', () => {
  
  it('returns a rejected promise if given bad file path', () => {
    return wav.decodeWav(badSampleWavPath)
    .then(
      (result) => expect(result).toBeFalsy(),
      (error) => expect(error).toBeTruthy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return wav.decodeWav(sampleWavPath)
    .then(
      (result) => expect(result).toBeTruthy(),
      (error) => expect(error).toBeFalsy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return wav.decodeWav(sampleWavPath)
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
    return wav.richReadWav(badSampleWavPath)
    .then(
      (result) => expect(result).toBeFalsy(),
      (error) => expect(error).toBeTruthy()
    )
  })

  it('returns a resolved promise if given a proper file path', () => {
    return wav.richReadWav(sampleWavPath)
    .then(
      (result) => expect(result).toBeTruthy(),
      (error) => expect(error).toBeFalsy()
    )
  })

})