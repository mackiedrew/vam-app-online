// @flow

// Flow Types
import type { numberArray } from "../constants/flowTypes";

// Helpers
import { add } from "./immutable";

/**
 * Faster flooring method using a bitwise trick with better behavior than
 * math.floor(). Will round both positive and negative numbers closer to zero.
 * 
 * @param {number} value The value to be rounded closer to zero.
 * @returns {number} Number rounded to nearest integer.
 */
export const floor = (value: number): number => ~~value;

/**
 * Figure out the mean average of the elements in an array.
 * 
 * @param {Array} array Array to find the mean of.
 * @returns {number} The mean of the values in the provided array.
 */
export const mean = (array: numberArray): number => add(array) / array.length;

/**
 * Calculate the max value of all the entries in an array.
 * 
 * @param {Array} array Array of values to determine the max array size.
 * @returns {number} Maximum value of the array.
 */
export const max = (array: numberArray): number => Math.max(...array);

/**
 * Get a random integer from provided minimum and maximum number. This will
 * produce an integer.
 * 
 * @param {number} min Minimum possible value (inclusive).
 * @param {number} max Maximum possible value (exclusive).
 * @returns {number} Random number between given values excluding max value.
 */
export const random = (min: number, max: number): number =>
  floor(Math.random() * (max - min)) + min;

/**
 * Provided with 3 values it will always return the middle value. Effectively
 * it allows for an upper and lower bound to be set, and if the value is outside
 * of these bounds, the corresponding bound is returned instead. Lower and upper
 * bounds are inclusive.
 * 
 * @param {number} value Value to ensure is between bounds.
 * @param {number} lower Inclusive lower limit/bound.
 * @param {number} upper Inclusive upper limit/bound.
 * @returns {number} Returns the clamped number.
 */
export const clamp = (value: number, lower: number, upper: number): number => {
  const clampedValue: number = Math.min(Math.max(lower, value), upper);
  return clampedValue;
};
