// @flow

/**
 * File should contain all functions for working with grains with an emphasis on pure functions.
 */
import {
  logicalSegment,
  divisionBinarySearch,
  random,
  range,
  getKeyFromObjectArray,
  max,
  zipObjectArray,
  mean
} from "./generic";

// Helpers
import { secondsToSamples } from "./convert";

// Types
import type {
  grainType,
  grainArray,
  mixedArray,
  numberArray,
  numberArrayArray
} from "../constants/flowTypes";

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
 * This will contain whatever our current quietness calculation algorithm should be.
 * 
 * @param {Object} grain Grain containing at least the amplitude key.
 * @param {number} cutOff Percentage (0 to 1) threshold that of which below, is considered quiet.
 * @param {number} maxAmplitude Maximum amplitude of the track.
 */
export const isGrainQuiet = ({ amplitude }, cutOff, maxAmplitude) => {
  const amplitudePercentage = amplitude / maxAmplitude;
  const quiet = amplitudePercentage <= cutOff;
  return quiet;
};

/**
 * Checks against an array of grains to see if the grains match criteria to be "quiet".
 * 
 * @param {Array} grains Grains array containing objects with at least the amplitude key.
 * @param {number} cutOff Percentage (0 to 1) threshold that of which below, is considered quiet.
 */
export const areGrainsQuiet = (grains, cutOff) => {
  const amplitudes = getKeyFromObjectArray(grains, "amplitude");
  const maxAmplitude = max(amplitudes);
  const quiet = grains.map(grain => isGrainQuiet(grain, cutOff, maxAmplitude));
  return quiet;
};

/**
 * Figures out the indexes of grains contained within the provided view.
 * 
 * @param {Array} grains Entire array of grains.
 * @param {Object} view Which frames (samples) should be seen, with start and end keys.
 * @param {number} trackLength How many frames (samples) are in the provided track.
 * @returns {Array} Returns an object containing two keys, startIndex and endIndex, which indicate
 * (inclusively) the grains that are fully within the view window.
 */
export const grainIndexesInView = (grains, { start, end }, trackLength) => {
  const startIndex = divisionBinarySearch(start, grains, trackLength);
  const lastIndex = grains.length - 1;
  const endIndexFromSearch = divisionBinarySearch(end, grains, trackLength);
  const endIndex = endIndexFromSearch === -1 ? lastIndex : endIndexFromSearch;
  const indexesInView = { startIndex, endIndex };
  return indexesInView;
};

/**
 * Creates a standard filler-type grain provided basic information.
 * 
 * @param {number} start Inclusive index of the start of the track.
 * @param {number} end Exclusive index of the end of the track.
 * @param {boolean} more Whether there is more track to the non-track-facing side of the grain.
 * @returns {Object} Object containing all provided values plus a true key of `filler`.
 */
export const createFillerGrain = (start, end, more) => ({
  start,
  end,
  more,
  filler: true
});

/**
 * 
 * 
 * @param {Array} grains Entire array of grains.
 * @param {Object} view Which frames (samples) should be seen, with start and end keys.
 * @param {number} trackLength How many frames (samples) are in the provided track.
 * @returns {Array} Returns a list of grains that need to be show with included filler grains.
 */
export const determineWhichGrainsToShow = (grains, view, trackLength) => {
  const { start, end } = view;
  const { startIndex, endIndex } = grainIndexesInView(
    grains,
    view,
    trackLength
  );

  // Start Filler Grain
  const firstGrainToShow = grains[startIndex];
  const moreStart = startIndex !== 0;
  const startFiller = createFillerGrain(
    start,
    firstGrainToShow.start,
    moreStart
  );

  // End Filler Grain
  const lastGrainToShow = grains[endIndex];
  const lastGrainIndex = grains.length - 1;
  const moreEnd = lastGrainIndex !== endIndex;
  const endFiller = createFillerGrain(lastGrainToShow.end, end, moreEnd);

  const grainsToInclude = grains.slice(startIndex, endIndex + 1);

  const grainsToShow = [startFiller, ...grainsToInclude, endFiller];
  return grainsToShow;
};

/**
 * Adds information to grains based on some precalculated data. Primarily about
 * quietness, amplitude, and max-amplitude.
 * 
 * @param {Object} message Message provided from the the web worker. Contains
 * an grainsArray, a quietness cutoff threshold and the pre-determine sample
 * cases for determining amplitude.
 * @returns {Object} Containing two keys {grains, maxAmplitude} the array of
 * grains now containing data on quietness, amplitude. And the max amplitude
 * is the highest amplitude of all the grains.
 */
export const amplitudeCalculator = ({
  protoGrains,
  quietCutoff,
  cases
}: {
  protoGrains: grainArray,
  quietCutoff: number,
  cases: numberArrayArray
}): { grains: grainArray, maxAmplitude: number } => {
  // Add amplitudes to grains
  const amplitudes = cases.map(mean);
  const simpleGrains = zipObjectArray(protoGrains, "amplitude", amplitudes);

  // Add quietness to grains
  const quietnessCutoff = quietCutoff / 100;
  const quietGrains = areGrainsQuiet(simpleGrains, quietnessCutoff);
  const finalGrains = zipObjectArray(simpleGrains, "quiet", quietGrains);

  // Calculate max amplitude
  const maxAmplitude = max(amplitudes);

  const result = { grains: finalGrains, maxAmplitude: maxAmplitude };
  return result;
};
