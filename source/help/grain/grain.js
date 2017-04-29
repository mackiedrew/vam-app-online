/**
 * File should contain all functions for working with grains with an emphasis on pure functions.
 */

import { logicalSegment, divisionBinarySearch } from "../generic/generic";
import { secondsToSamples } from "../wav/wav";

/**
 * Splits a single grain object into two adjacent grain objects that maintain any additional grain
 * meta data of the original grain. Should also return the same grain if splitPoint is out of 
 * bounds: grain.start == splitPint, or splitPoint is not within the grain.
 * @param {Object} grain Contains 'start' and 'end' keys.
 * @param {Number} splitPoint The value of the sample this grain should be split at.
 */
export const splitGrainIntoTwo = (grain, splitPoint) => {
  const pointTooLow = splitPoint <= grain.start;
  // grain.end minus one because it is exclusive
  const pointTooHigh = splitPoint >= grain.end - 1;
  // Quick exit
  if (pointTooLow || pointTooHigh) {
    return [grain];
  }
  // Determine new start and end points.
  const leftStart = grain.start;
  const leftEnd = splitPoint;
  const rightStart = splitPoint;
  const rightEnd = grain.end;
  // Create new grains, ensure copying extra keys that may have existed in original grain
  const leftGrain = {
    ...grain,
    start: leftStart,
    end: leftEnd
  };
  const rightGrain = {
    ...grain,
    start: rightStart,
    end: rightEnd
  };
  // Create array to return grains in order.
  const splitGrain = [leftGrain, rightGrain];
  return splitGrain;
};

/**
 * Finds the location of a sample within an array of grains, isolates the grain that the sample
 * belongs to, and if the sample is within the grains range and is not a on a cut point between
 * grains it will return a new grains array containing the new split grains instead of original.
 * @param {Array} grains An array containing all of the grains in a range.
 * @param {Number} splitPoint The value of the sample this grain should be split at.
 */
export const splitGrain = (grains, splitPoint) => {
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
 * Logically segments grains into equally spaced components. This is hopefully temporary.
 * @param {Array} data Only used to get the length of the array.
 * @param {Number} secondsPerGrain Number of seconds per grain, the end grain may be shorter.
 */
export const createEquallySpacedGrains = (data, secondsPerGrain) => {
  const grainLength = secondsToSamples(secondsPerGrain);
  const grains = logicalSegment(data, grainLength);
  return grains;
};

/**
 * Get a certain number of samples (or cases to not be confused with audio samples) from provided
 * grains. This can be used to get a representative sample of a segment of audio.
 * @param {Array} grains 
 * @param {Array} data 
 * @param {Number} caseRate 
 */
export const createSampleCases = (grains, data, caseRate) => {
  const samples = grains.map(grain => {
    const grainLength = grain.end - grain.start;
    const samples = Math.ceil(grainLength / caseRate);
    const sampleRange = [...Array(samples).keys()];
    const collectedSamples = sampleRange.map(i => {
      const frameNumber = grain.start + i * caseRate;
      const sample = Math.abs(data[frameNumber]);
      return sample;
    });
    return collectedSamples;
  });
  return samples;
};
