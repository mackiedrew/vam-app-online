// @flow

// Types
import type { grainArray, numberArray } from "../constants/flowTypes";

// Helpers
import { isInGrain } from "./grain";
import { range } from "./collections";

/**
 * Creates an array of 'segments' that contain two values: start and end.
 * These values indicate the segments' key in the array in which the begin and
 * end. It is designed to work like, and with, slice(), where start is
 * inclusive, and end is exclusive. Will not mutate the original array.
 * 
 * @param {Array} array Array of values to be segmented, basically just need
 * this for the length.
 * @param {number} segmentSize Integer, number of array elements per segment
 * (inclusive).
 * @returns {Array} Returns an array of objects with start and end keys.
 */
export const logicalSegment = (
  array: numberArray,
  segmentSize: number
): grainArray => {
  const totalSegments: number = Math.ceil(array.length / segmentSize);
  const segmentsRange: Array<number> = range(totalSegments);
  const starts: Array<number> = segmentsRange.map(
    (segmentIndex: number): number => segmentIndex * segmentSize
  );
  const maxSegmentIndex: number = totalSegments - 1;
  const ends = segmentsRange.map(segment => {
    return segment === maxSegmentIndex
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
 * Simple version of the divisionBinarySearch() which takes low and high values
 * for the sake of honing in on a value through recursion.
 * 
 * @param {number} target Value within heap to match for.
 * @param {Array} heap Value of divisions with a start and end key with
 * the start being inclusive and the end being exclusive. Each entry in the
 * array should obviously be an object.
 * @param {number} low Current low value for search.
 * @param {number} high Current high value for search.
 * @returns {number} Index of division in array the value exists within.
 */
export const simpleDivisionBinarySearch = (
  target: number,
  heap: grainArray,
  low: number,
  high: number
): number => {
  if (high < low) {
    return -1;
  }
  const middle: number = Math.ceil((low + high) / 2);
  if (isInGrain(target, heap[middle])) {
    return middle;
  }
  if (target < heap[middle].start) {
    return simpleDivisionBinarySearch(target, heap, low, middle - 1);
  }
  return simpleDivisionBinarySearch(target, heap, middle + 1, high);
};

/**
 * This binary search will use large divisions of a sorted, continuous integer
 * array with keys: `start`, `end`. It will look for the index of the division
 * containing a target value between it's `start` and `end` keys.
 * 
 * @param {number} target Target value.
 * @param {Array} heap An array of contiguous grains to search.
 */
export const divisionBinarySearch = (
  target: number,
  heap: grainArray | void
): number => {
  if (heap === undefined) {
    return -1;
  }
  if (heap.length === 0) {
    return -1;
  }
  if (target > heap[heap.length - 1].end) {
    return -1;
  }
  const low = 0;
  const high = heap.length - 1;
  return simpleDivisionBinarySearch(target, heap, low, high);
};

/**
 * Formats a number to have leading zeroes if it is less than provided columns.
 * It will round the number first, and it will also not add zeroes if the number
 * is already long enough.
 * 
 * @param {number} rawNumber Raw number provided to be formatted.
 * @param {number} columns Number of digits to the rounded rawNumber to.
 * @returns {string} String containing the original value, rounded with leading
 * zeroes to the set number of columns.
 */
export const leadingZeros = (
  rawNumber: number,
  columns: number = 2
): string => {
  const roundedNumber = Math.round(rawNumber);
  const number = String(roundedNumber);
  const digits = number.length;
  const neededZeros = columns - digits;
  const zeroes = neededZeros > 0 ? new Array(neededZeros).fill("0") : [];
  const allColumns = [...zeroes, number];
  const output = allColumns.reduce((a, b) => a + b, "");
  return output;
};
