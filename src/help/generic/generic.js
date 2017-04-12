// Libraries
import range from 'lodash.range'

/**
 * Faster flooring method using a bitwise trick with better behavior than Math.floor().
 * Will round both positive and negative numbers closer to zero.
 * @param {Number} value The value to be rounded closer to zero.
 */
export const floor = (value) => ~~value

/**
 * Leverages the faster floor into a ceiling function.
 * Will round both positive and negative numbers away from zero.
 * @param {Number} value The value to be rounded away from zero.
 */
export const ceiling = (value) => {
  if (value === 0) {
    return 0
  }
  return (value > 0) ? floor(value) + 1 : floor(value) - 1
}

/**
 * Creates an array of 'segments' that contain two values: start and end.
 * These values indicate the segments' key in the array in which the begin and end.
 * It is designed to work like, and with, slice(), where start is inclusive, and end is exclusive.
 * Will not mutate the original array.
 * @param {Array} array Array of values to be segmented, basically just need this for the length.
 * @param {Number} segmentSize Integer, number of array elements per segment (inclusive).
 */
export const logicalSegment = (array, segmentSize) => {
  const totalSegments = ceiling(array.length / segmentSize)
  const segmentsRange = range(0, totalSegments)
  const starts = segmentsRange.map((segment) => segment * segmentSize)
  // Good
  const ends = segmentsRange.map((segment) => {
    return segment === totalSegments - 1 ? array.length : (segment + 1) * segmentSize
  })
  const segments = segmentsRange.map((segment) => ({
    start: starts[segment],
    end: ends[segment],
  }))
  return segments
}

/**
 * This binary search will use large divisions of a sorted, continuous integer array with keys:
 * start, end. It will look for the index of the division containing a target value between it's
 * start and end keys.
 * @param {Number} targetValue Value within divisionArray to match for.
 * @param {Array} divisionArray Value of divisions with a start and end key with the start being
 * inclusive and the end being exclusive. Each entry in the array should obviously be an object.
 */
export const divisionBinarySearch = (targetValue, divisionArray) => {
  // Exit quickly if the sample is not in the track.
  if (typeof targetValue !== 'number' || !divisionArray || divisionArray.length < 1) {
    return false
  }
  const maxIndex = divisionArray && divisionArray[divisionArray.length - 1].end
  if (targetValue < 0 || targetValue > maxIndex) {
    return false
  }

  // Search bounds for binary search, when they are equal, the value is found
  let low = 0
  let high = divisionArray.length
  while (low <= high) {
    // Middle is the current search point, keep bisecting to search
    const middle = floor(low + (high - low) / 2)
    const currentDivision = divisionArray[middle]
    const { start, end } = currentDivision
    const targetIsLowerThanCurrentGrain = (targetValue < start)
    const targetIsInCurrentGrain = (targetValue >= start && targetValue < end)
    if (targetIsInCurrentGrain) {
      return middle
    } else if (targetIsLowerThanCurrentGrain) {
      high = middle - 1
    } else {
      low = middle + 1
    }
  }
}