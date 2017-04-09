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
export const ceiling = (value) => (value > 0) ? floor(value) + 1 : floor(value) - 1

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
  const segments = segmentsRange.map((index) => {
    const start = index * segmentSize
    const end = index + 1 === totalSegments ? length : start + segmentSize
    return {start, end}
  })
  return segments
}