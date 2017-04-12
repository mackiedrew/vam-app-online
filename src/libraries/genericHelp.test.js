import { floor, ceiling, mergeZip, logicalSegment, uninvite } from './genericHelp'

describe('floor(value)', () => {

  it('rounds a positive number closer to zero', () => {
    expect(floor(5.9)).toEqual(5)
  })

  it('rounds a negative number closer to zero', () => {
    expect(floor(-5.9)).toEqual(-5)
  })
  
  it('rounds zero, by doing nothing', () => {
    expect(floor(0)).toEqual(0)
  })

})

describe('ceiling(value)', () => {

  it('rounds a positive number closer to zero', () => {
    expect(ceiling(5.1)).toEqual(6)
  })

  it('rounds a negative number closer to zero', () => {
    expect(ceiling(-5.1)).toEqual(-6)
  })
  
  it('rounds zero, by doing nothing', () => {
    expect(ceiling(0)).toEqual(0)
  })

})

const testArray = [0, 1, 0, 1, 0, -1, 0, 1, 1]

describe('logicalSegment(array, segmentSize)', () => {

  it('generates the correct number of segments', () => {
    expect(logicalSegment(testArray, 2).length).toEqual(5)
    expect(logicalSegment(testArray, 3).length).toEqual(4)
    expect(logicalSegment(testArray, 4).length).toEqual(3)
    expect(logicalSegment(testArray, 5).length).toEqual(2)
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
    expect(passingSegments).toEqual(segments.length)
  })

  it('last end segment is equal to value length of the array minus one', () => {
    const segments = logicalSegment(testArray, 3)
    expect(segments[segments.length - 1].end).toEqual(9)
  })

  it('returns equal segments of proper size, except for the last segment size', () => {
    const segmentSize = 3
    const segments = logicalSegment(testArray, segmentSize)
    const segmentLengths = segments.map(({start, end}) => end - start)
    const segmentLengthsTotal = segmentLengths.slice(0, -1).reduce((a, b) => a + b, 0)
    const segmentMean = segmentLengthsTotal / (segments.length - 1)
    expect(segmentMean).toEqual(segmentSize)

    const danglingLength = segmentLengthsTotal - testArray.length
    expect(segmentLengths[segmentLengths.length - 1]).toEqual(danglingLength)
  })

  it('returns segments with which the end value of [n] is equal to start of [n+1]', () => {
    const segmentSize = 3
    const segments = logicalSegment(testArray, segmentSize)
    expect(segments[0].start).toEqual(0)
    segments.slice(1,-1).forEach(({start, end}, index) => {
      const previousEnd = segments[index].end
      expect(start).toEqual(previousEnd)
    })
    expect(segments[segments.length - 1].end).toEqual(testArray.length)
  })

})
