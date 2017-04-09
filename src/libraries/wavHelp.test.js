import { secondsToSamples, decodeWav, readFile, richdecodeWav } from './wavHelp'

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

const badSampleWavPath = '/XYZ123/ThisFileDoesNotExist.zip'
const sampleWavPath = './example/sample.wav'

describe('readFile(filePath)', () => {
    
  it('promise is rejected if the file does not exist', () => {
    const promise = readFile(badSampleWavPath)
    promise.then((result) =>
      console.log('result', result)
    )
    const shouldBeTrue = assume(promise).to.be.rejected
    console.log('true1111', shouldBeTrue)
    const shouldBeFalse = assume(promise).to.be.fufilled
    console.log('false1111', shouldBeFalse)
  })

    
  it('promise is rejected if the file does not exist', () => {
    const response = readFile(badSampleWavPath)
  })

})

describe('decodeWav(filePath)', () => {
  
  it('promise is rejected if the file does not exist', () => {
    const response = decodeWav(badSampleWavPath)
    .should.be.rejected
  })

  it('promise is resolved if the file is a valid wav', () => {
    const response = decodeWav(sampleWavPath)
    .then(() => assume(true).to.be.equal(true))
    .catch(() => assume(true).to.be.equal(false))
  })

  it('returns a buffer containing sampleRate and an array of channels', () => {
    const response = decodeWav(sampleWavPath)
    .then((buffer) => {
      assume(buffer.sampleRate).to.be.above(0)
      assume(channelData.length).to.be.above(0)
    })
    .catch(() => assume(true).to.be.equal(false))
  })
})

describe('richReadWav(filePath)', () => {
  it('works')
})
