import { secondsToSamples } from './wavHelp'

describe('secondsToSamples(seconds, sampleRate)', () => {

  it('when provided with no values it returns 44100 [Hz]', () => {
    assume(secondsToSamples()).to.be.equal(44100)
  })

  it('when provided with no sampleRate it returns seconds * 44100 [Hz]', () => {
    const testSeconds = 55
    assume(secondsToSamples(testSeconds)).to.be.equal(testSeconds * 44100)
  })

  it('multiplies seconds by sampleRate', () => {
    const testSeconds = 55
    const testSampleRate = 90123
    assume(secondsToSamples(testSeconds, testSampleRate)).to.be.equal(testSeconds * testSampleRate)
  })

})


describe('readWav(filePath)', () => {
  it('promise is rejected if the file does not exist')
  it('promise is resolved if the file is a valid wav')
})

describe('logWav(filePath)', () => {
  it('works')
})

describe('richReadWav(filePath)', () => {
  it('works')
})
