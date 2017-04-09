import { floor, ceiling, logicalSegment } from './genericHelp'

describe('floor(value)', () => {

  it('rounds a positive number closer to zero', () => {
    assume(floor(5.9)).to.be.equal(5)
  })

  it('rounds a negative number closer to zero', () => {
    assume(floor(-5.9)).to.be.equal(-5)
  })
  
  it('rounds zero, by doing nothing', () => {
    assume(floor(0)).to.be.equal(0)
  })

})

describe('ceiling(value)', () => {

  it('rounds a positive number closer to zero', () => {
    assume(ceiling(5.1)).to.be.equal(6)
  })

  it('rounds a negative number closer to zero', () => {
    assume(ceiling(-5.1)).to.be.equal(-6)
  })
  
  it('rounds zero, by doing nothing', () => {
    assume(ceiling(0)).to.be.equal(0)
  })

})

const testArray = [0, 1, 0, 1, 0, -1, 0, 1, 1]

describe('logicalSegment(array, segmentSize)', () => {

  it('generates the correct number of segments', () => {
    assume(logicalSegment(testArray, 2).length).to.be.equal(5)
    assume(logicalSegment(testArray, 3).length).to.be.equal(4)
    assume(logicalSegment(testArray, 4).length).to.be.equal(3)
    assume(logicalSegment(testArray, 5).length).to.be.equal(2)
  })

  it('both start and end keys are generated for every segment', () => {
    const segments = logicalSegment(testArray, 3)
    const passingSegments = segments.reduce((passing, segment) => {
      const startExists = segment.start !== undefined
      const endExists = segment.end !== undefined
      if (startExists && endExists) {
        return passing + 1
      }
      return passing
    }, 0)
    assume(passingSegments).to.be.equal(segments.length)
  })

  it('last end segment is equal to value length of the array minus one', () => {
    const segments = logicalSegment(testArray, 3)
    assume(segments[segments.length - 1].end).to.be.equal(9)
  })

  it('returns equal segments of proper size, except for the last segment size', () => {
    const segmentSize = 3
    const segments = logicalSegment(testArray, segmentSize)
    const segmentLengths = segments.map(({start, end}) => end - start)
    const segmentLengthsTotal = segmentLengths.slice(0, -1).reduce((a, b) => a + b, 0)
    const segmentMean = segmentLengthsTotal / (segments.length - 1)
    assume(segmentMean).to.be.equal(segmentSize)

    const danglingLength = segmentLengthsTotal - testArray.length
    assume(segmentLengths[segmentLengths.length - 1]).to.be.equal(danglingLength)
  })

  it('returns segments with which the end value of [n] is equal to start of [n+1]', () => {
    const segmentSize = 3
    const segments = logicalSegment(testArray, segmentSize)
    assume(segments[0].start).to.be.equal(0)
    segments.slice(1,-1).forEach(({start, end}, index) => {
      const previousEnd = segments[index].end
      assume(start).to.be.equal(previousEnd)
    })
    assume(segments[segments.length - 1].end).to.be.equal(testArray.length)
  })

})