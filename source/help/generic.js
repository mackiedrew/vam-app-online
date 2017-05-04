/**
 * This generates an array with length of given size. With array entries being from zero to size
 * minus one. Which makes it work well as a mappable object with a build-in index.
 * 
 * @param {number} size The eventual length of the array generated.
 * @returns {Array} Array with keys from 0 to size-1.
 */
export const range = size => [...Array(size).keys()];

/**
 * Calculate the max value of all the entries in an array.
 * 
 * @param {Array} array Array of values to determine the max array size.
 */
export const max = array => Math.max(...array);

/**
 * Adds all the elements of an array together.
 * 
 * @param {Array} array Array of values to add.
 */
export const add = array => array.reduce((a, b) => a + b, 0);

/**
 * Faster flooring method using a bitwise trick with better behavior than Math.floor().
 * Will round both positive and negative numbers closer to zero.
 * 
 * @param {number} value The value to be rounded closer to zero.
 */
export const floor = value => ~~value;

/**
 * Creates an array of 'segments' that contain two values: start and end.
 * These values indicate the segments' key in the array in which the begin and end.
 * It is designed to work like, and with, slice(), where start is inclusive, and end is exclusive.
 * Will not mutate the original array.
 * 
 * @param {Array} array Array of values to be segmented, basically just need this for the length.
 * @param {number} segmentSize Integer, number of array elements per segment (inclusive).
 */
export const logicalSegment = (array, segmentSize) => {
  const totalSegments = Math.ceil(array.length / segmentSize);
  const segmentsRange = range(totalSegments);
  const starts = segmentsRange.map(segment => segment * segmentSize);
  const ends = segmentsRange.map(segment => {
    return segment === totalSegments - 1
      ? array.length - 1
      : (segment + 1) * segmentSize;
  });
  const segments = segmentsRange.map(segment => ({
    start: starts[segment],
    end: ends[segment]
  }));
  return segments;
};

/**
 * This binary search will use large divisions of a sorted, continuous integer array with keys:
 * start, end. It will look for the index of the division containing a target value between it's
 * start and end keys.
 * 
 * @param {number} targetValue Value within divisionArray to match for.
 * @param {Array} divisionArray Value of divisions with a start and end key with the start being
 * inclusive and the end being exclusive. Each entry in the array should obviously be an object.
 */
export const divisionBinarySearch = (targetValue, divisionArray) => {
  // Exit quickly if the sample is not in the track.
  if (
    typeof targetValue !== "number" ||
    !divisionArray ||
    divisionArray.length < 1
  ) {
    return false;
  }
  const maxIndex = divisionArray && divisionArray[divisionArray.length - 1].end;
  if (targetValue < 0 || targetValue > maxIndex) {
    return false;
  }

  // Search bounds for binary search, when they are equal, the value is found
  let low = 0;
  let high = divisionArray.length;
  while (low <= high) {
    // Middle is the current search point, keep bisecting to search
    const middle = floor(low + (high - low) / 2);
    const currentDivision = divisionArray[middle];
    const { start, end } = currentDivision;
    const targetIsLowerThanCurrentGrain = targetValue < start;
    const targetIsInCurrentGrain = targetValue >= start && targetValue < end;
    if (targetIsInCurrentGrain) {
      return middle;
    } else if (targetIsLowerThanCurrentGrain) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
};

export const leadingZeros = (rawNumber, columns = 2) => {
  const number = String(Math.round(rawNumber));
  const digits = number.length;
  const neededZeros = columns - digits;
  const zeroes = neededZeros > 0 ? new Array(neededZeros).fill("0") : [];
  const allColumns = [...zeroes, number];
  const output = allColumns.reduce((a, b) => a + b, "");
  return output;
};

/**
 * Figure out the mean average of the elements in an array.
 * 
 * @param {Array} array Array to find the mean of.
 */
export const mean = array => add(array) / array.length;

/**
 * Adds a new key with given values to an existing array of object.
 * 
 * @param {Array} array Original array to add the values to under the given key.
 * @param {string} key The key name that the values should be added to the array as.
 * @param {string} values A hopefully length-matched array of values to add to the arry.
 */
export const zipObjectArray = (array, key, values) => {
  const newArray = array.map((object, index) => {
    return {
      ...object,
      [key]: values[index] || undefined
    };
  });
  return newArray;
};

/**
 * Get a random integer from provided minimum and maximum number. This will produce an integer.
 * 
 * @param {number} min Minimum possible value (inclusive).
 * @param {number} max Maximum possible value (exclusive).
 */
export const random = (min, max) => floor(Math.random() * (max - min)) + min;

/**
 * Pulls the provided key from each object in the provided array, should return undefined if it
 * doesn't exist in that object.
 * 
 * @param {Array} array Array of objects with keys contained.
 * @param {string} key Object key to take from each array entry.
 */
export const getKeyFromObjectArray = (array, key) =>
  array.map(entry => entry[key] || undefined);

/**
 * Removes top level keys from an object and flattens it into an array.
 * 
 * @param {Object} object Object to convert into an array.
 */
export const objectToArray = object => {
  const keys = Object.keys(object);
  const array = keys.map(key => object[key]);
  return array;
};

/**
 * Provided with 3 values it will always return the middle value. Effectively it allows for an upper
 * and lower bound to be set, and if the value is outside of these bounds, the corresponding bound
 * is returned instead. Lower and upper bounds are inclusive.
 * 
 * @param {number} value Value to ensure is between bounds.
 * @param {number} lower Inclusive lower limit/bound.
 * @param {number} upper Inclusive upper limit/bound.
 * @returns {number} Returns the clamped number.
 */
export const clamp = (value, lower, upper) => {
  return [value, lower, upper].sort((a, b) => a - b)[1];
};
