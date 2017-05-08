// @flow

// Flow Types
import type { mixedArray } from "../constants/flowTypes";

/**
 * Reverses an array without mutating.
 * 
 * @param {Array} original Original array of unknown length or contents.
 * @returns {Array} Same elements, returned in array but reversed.
 */
export const reverse = (original: mixedArray): mixedArray => {
  return original.reduce((accumulator, entry) => {
    return [entry, ...accumulator];
  }, []);
};
