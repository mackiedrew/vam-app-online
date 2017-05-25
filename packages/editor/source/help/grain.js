// @flow

// Flow Types
import type {
  viewType,
  grainType,
  grainArray,
  mixedArray,
  numberArray,
  numberArrayArray
} from "../constants/flowTypes";

// Helpers
import { logicalSegment, divisionBinarySearch } from "../help/generic";
import { range } from "../help/collections";
import { random } from "../help/math";
import { secondsToSamples } from "./convert";

/**
 * Splits a single grain object into two adjacent grain objects that maintain
 * any additional grain meta data of the original grain. Should also return the
 * same grain if splitPoint is out of bounds: grain.start == splitPint, or
 * splitPoint is not within the grain.
 * 
 * @param {Object} grain Contains 'start' and 'end' keys.
 * @param {number} splitPoint Value of the sample this grain should be split at.
 * @returns {Array} Containing either one or two grains.
 */
export const splitGrainIntoTwo = (
  grain: grainType,
  splitPoint: number
): [grainType, grainType] | [grainType] => {
  const pointTooLow: boolean = splitPoint <= grain.start;
  // grain.end minus one because it is exclusive
  const pointTooHigh: boolean = splitPoint >= grain.end - 1;
  // Quick exit
  if (pointTooLow || pointTooHigh) {
    return [grain];
  }
  // Determine new start and end points.
  const leftStart: number = grain.start;
  const leftEnd: number = splitPoint;
  const rightStart: number = splitPoint;
  const rightEnd: number = grain.end;
  // Create new grains
  const leftGrain: grainType = {
    ...grain,
    start: leftStart,
    end: leftEnd
  };
  const rightGrain: grainType = {
    ...grain,
    start: rightStart,
    end: rightEnd
  };
  // Create array to return grains in order.
  return [leftGrain, rightGrain];
};

/**
 * Finds the location of a sample within an array of grains, isolates the grain
 * that the sample belongs to, and if the sample is within the grains range and
 * is not a on a cut point between grains it will return a new grains array
 * containing the new split grains instead of original.
 * 
 * @param {Array} grains An array containing all of the grains in a range.
 * @param {number} splitPoint Value of the sample this grain should be split at.
 * @returns {Array} Containing either one or two grains.
 */
export const splitGrain = (
  grains: grainArray,
  splitPoint: number
): grainArray => {
  // Isolate samples for quick exit check.
  const firstSample = grains[0].start;
  const lastGrainIndex = grains.length - 1;
  const lastSample = grains[lastGrainIndex].end - 1;
  // Comparisons for quick exit.
  const pointTooLow = splitPoint <= firstSample;
  const pointTooHigh = splitPoint >= lastSample;
  // Quick exit
  if (pointTooLow || pointTooHigh) {
    return grains;
  }
  // Find location of split point for dividing array.
  const targetGrainIndex = divisionBinarySearch(splitPoint, grains);
  // Divide array prior to reassembly.
  const leftSide = grains.slice(0, targetGrainIndex);
  const rightSide = grains.slice(targetGrainIndex + 1, lastGrainIndex + 1);
  const targetGrain = grains.slice(targetGrainIndex, targetGrainIndex + 1)[0];
  // Create new array with split grains included.
  const splitGrain = splitGrainIntoTwo(targetGrain, splitPoint);
  const newGrains = [...leftSide, ...splitGrain, ...rightSide];
  return newGrains;
};

/**
 * Logically segments grains into equally spaced components.
 * This is hopefully temporary.
 * 
 * @param {Array} data Only used to get the length of the array.
 * @param {number} secondsPerGrain Number of seconds per grain, the end grain
 * may be shorter.
 * @returns {Array} Containing freshly minted grains.
 */
export const createEquallySpacedGrains = (
  data: mixedArray,
  secondsPerGrain: number
): grainArray => {
  const grainLength = secondsToSamples(secondsPerGrain);
  const grains = logicalSegment(data, grainLength);
  return grains;
};

/**
 * Calculates the difference between start and end for every supplied grain.
 * 
 * @param {Array} grains Grain objects with keys start and end.
 * @returns {Array} Containing the lengths of the grains.
 */
export const grainLengths = (grains: grainArray): numberArray =>
  grains.map(({ start, end }) => end - start);

/**
 * Get a certain number of samples (or cases to not be confused with audio
 * samples) from provided grains. This can be used to get a representative
 * sample of a segment of audio.
 * 
 * @param {Array} grains Grain objects with keys start and end.
 * @param {Array} data Original data to pull samples from, grains should be
 * generated from this.
 * @param {number} caseRate How many data should there be per sample case.
 * @returns {Array} Array of arrays of numbers which are the sample cases.
 */
export const createSampleCases = (
  grains: grainArray,
  data: mixedArray,
  caseRate: number
): numberArrayArray => {
  const lengths = grainLengths(grains);
  const casesPerGrain = lengths.map(l => Math.ceil(l / caseRate));
  const rangePerGrain = casesPerGrain.map(range);
  const cases = grains.map(({ start, end }, i) => {
    const casesIndexes = rangePerGrain[i].map(() => random(start, end));
    const collectedSignedData = casesIndexes.map(i => data[i]);
    const collectedData = collectedSignedData.map(Math.abs);
    return collectedData;
  });
  return cases;
};

/**
 * Figures out the indexes of grains contained within the provided view.
 * 
 * @param {Array} grains Entire array of grains.
 * @param {Object} view Which frames (samples) should be seen, with start and
 * end keys.
 * @returns {Array} Returns an array containing which indicate (inclusively)
 * the grains that are fully within the view window.
 */
export const grainIndexesInView = (
  grains: grainArray,
  view: viewType
): [number, number] => {
  // Get start of view and enf of view with pre-cautious defaults
  const { start = 0, end = Infinity }: { start: number, end: number } = view;

  // Calculate total length of array as a help to the search function.
  const grainsLength: number = grains.length;
  const maxGrainsIndex: number = grainsLength - 1;
  const lastGrain: grainType = grains[maxGrainsIndex];
  const heapSize: number = lastGrain.end;

  // Find points where the start and end values of view cut the grain array.
  const search = divisionBinarySearch;
  const startSearch: number = search(start, grains, heapSize);
  const endSearch: number = search(end - 1, grains, heapSize);

  // No indexes in view, quick exit.
  if (startSearch === -1) {
    return [-1, -1];
  }

  // Protect against values that are "not found" for the end value.
  const endCandidate: number = endSearch === -1 ? maxGrainsIndex : endSearch;

  // Check to see if the returned values contain a whole grain.
  const startSearchGrain: grainType = grains[startSearch];
  const endSearchGrain: grainType = grains[endCandidate];
  const isStartSearchFull: boolean = start <= startSearchGrain.start;
  const isEndSearchFull: boolean = end >= endSearchGrain.end;

  // These should represent full grains.
  const firstFullIndex: number = isStartSearchFull
    ? startSearch
    : startSearch + 1;
  const lastFullIndex: number = isEndSearchFull
    ? endCandidate
    : endCandidate - 1;

  // Construct return item which has inclusive indexes for full array.
  const indexesInView = [firstFullIndex, lastFullIndex];
  return indexesInView;
};

/**
 * Creates a standard filler-type grain provided basic information.
 * 
 * @param {number} start Inclusive index of the start of the track.
 * @param {number} end Exclusive index of the end of the track.
 * @param {boolean} more Whether there is more track to the non-track-facing
 * side of the grain.
 * @returns {Object} Object containing all provided values plus a true key of
 * `filler`.
 */
export const createFillerGrain = (
  start: number,
  end: number,
  more: boolean
): grainType => ({
  start,
  end,
  more,
  filler: true
});

/**
 * Compares `start` and `end` keys of a grain against a target to ensure it is
 * within that grain.
 * 
 * @param {number} target Which number should be checked for in the grain.
 * @param {Object} grain The grain to check if the target is within.
 * @returns {boolean} Whether target value is in a grain.
 */
export const isInGrain = (
  target: number,
  grain: grainType = { start: Infinity, end: -Infinity }
): boolean => {
  const { start, end } = grain;
  const aboveStart: boolean = target >= start;
  const belowEnd: boolean = target < end;
  const inGrain: boolean = aboveStart && belowEnd;
  return inGrain;
};
