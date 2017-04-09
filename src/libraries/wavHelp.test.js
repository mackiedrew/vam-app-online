import { secondsToSamples, readWav, richReadWav } from './wavHelp'

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

describe('readWav(filePath)', () => {
  
  it('promise is rejected if the file does not exist', () => {
    const response = readWav(badSampleWavPath)
    .then(() => assume(true).to.be.equal(false))
    .catch(() => assume(true).to.be.equal(true))
  })

  it('promise is resolved if the file is a valid wav', () => {
    const response = readWav(sampleWavPath)
    .then(() => assume(true).to.be.equal(true))
    .catch(() => assume(true).to.be.equal(false))
  })

  it('returns a buffer containing sampleRate and an array of channels', () => {
    const response = readWav(sampleWavPath)
    .then((buffer) => {
      assume(buffer.sampleRate).to.be.above(0)
      assume(channelData.length).to.be.above(0)
    })
    .catch(() => assume(true).to.be.equal(false))
  })
})

describe('richReadWav(filePath)', () => {
  
  it('returns a promise', () => {
    assume(richReadWav(sampleWavPath)).to.be.a('promise')
  })

  it('resolves an object from promise', () => {
    richReadWav(sampleWavPath)
    .then((result) => assume(result).to.be.an('object'))
  })

  it('returns an object with a reasonable sample rate', () => {
    richReadWav(sampleWavPath)
    .then(({sampleRate}) => {
      assume(sampleRate).to.be.a('number')
      assume(sampleRate).to.be.above(0)
      assume(sampleRate).to.be.below(9999999999)
    })
  })

  it('returns an object with a reasonable length', () => {
    richReadWav(sampleWavPath)
    .then(({length}) => {
      assume(length).to.be.a('number')
      assume(length).to.be.above(0)
    })
  })

  it('returns an object with a reasonable number of grains', () => {
    richReadWav(sampleWavPath)
    .then(({grains}) => {
      assume(grains).to.be.an('array')
      assume(grains.length).to.be.above(0)
    })
  })

  it('returns an object with a reasonable maximum amplitude', () => {
    richReadWav(sampleWavPath)
    .then(({maxAmplitude}) => {
      assume(maxAmplitude).to.be.a('number')
      assume(maxAmplitude).to.be.above(0)
    })
  })
})
