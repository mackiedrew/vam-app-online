// @flow

/**
 * The functions in this file that are intended for outside use should always
 * receive a grainArray and return an array containing whatever 
 */

import { getKeyFromObjectArray, zipObjectArray } from "./generic";
import { max, mean } from "./math";

// Types
import type {
  grainType,
  grainArray,
  booleanArray,
  numberArray,
  numberArrayArray
} from "../constants/flowTypes";

/**
 * Contain whatever our current quietness calculation algorithm should be.
 * 
 * @param {Object} grain Grain containing at least the amplitude key.
 * @param {number} cutOff Percentage (0 to 1) threshold that of which below, is
 * considered quiet.
 * @param {number} maxAmplitude Maximum amplitude of the track.
 * @returns {boolean} Whether or not the grain is considered quiet.
 */
export const isGrainQuiet = (
  { amplitude }: grainType,
  cutOff: number,
  maxAmplitude: number
): boolean => {
  const operationalAmplitude = amplitude !== undefined ? amplitude : 0;
  const amplitudePercentage = operationalAmplitude / maxAmplitude;
  const quiet = amplitudePercentage <= cutOff;
  return quiet;
};

/**
 * Checks against an array of grains to see if the grains match criteria to be
 * "quiet".
 * 
 * @param {Array} grains Grains array containing objects with at least the
 * amplitude key.
 * @param {number} cutOff Percentage (0 to 1) threshold that of which below, is
 * considered quiet.
 * @returns {Array} Boolean array matching provided grains in index, represents
 * whether or not the grain could be considered quiet or not.
 */
export const areGrainsQuiet = (
  grains: grainArray,
  cutOff: number
): booleanArray => {
  const amplitudes = getKeyFromObjectArray(grains, "amplitude", 0);
  const maxAmplitude = max(amplitudes);
  const quietArray = grains.map(grain =>
    isGrainQuiet(grain, cutOff, maxAmplitude)
  );
  return quietArray;
};

/**
 * Adds information about amplitude to grains.
 * 
 * @param {Object} message Message provided from the the web worker. Contains
 * an grainsArray.
 * @returns {Array} A new set of grains with amplitudes included.
 */
export const amplitudeCalculator = ({
  grains,
  cases
}: {
  grains: grainArray,
  cases: numberArrayArray
}): grainArray => {
  const amplitudes: numberArray = cases.map(mean);
  const newGrains: grainArray = zipObjectArray(grains, "amplitude", amplitudes);
  return newGrains;
};
