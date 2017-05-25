// @flow

// Flow Types
import type { mixedArray, numberArray } from "../constants/flowTypes";

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

/**
 * Adds all the elements of an array together.
 * 
 * @param {Array} array Array of values to add.
 * @returns {number} All array elements added together.
 */
export const add = (array: numberArray): number =>
  array.reduce((a, b) => a + b, 0);
