// @flow

// Types
import type {
  numberArray,
  objectArray,
  mixedArray
} from "../constants/flowTypes";

/**
 * This generates an array with length of given size. With array entries being 
 * from zero to size minus one. Which makes it work well as a mappable object
 * with a build-in index.
 * 
 * @param {number} size The eventual length of the array generated.
 * @returns {Array} Array with keys from 0 to size-1.
 */
export const range = (size: number): numberArray => [...Array(size).keys()];

/**
 * Pulls the provided key from each object in the provided array, should return
 * fallback if it doesn't exist in that object.
 * 
 * @param {Array} array Array of objects with keys contained.
 * @param {string} key Object key to take from each array entry.
 * @param {any|undefined} fallback If key doesn't exist, fallback to this.
 * @returns {Array} Array containing all the values from the original array at
 * given key.
 */
export const getKeyFromObjectArray = (
  array: objectArray,
  key: string,
  fallback: any = undefined
): mixedArray => array.map(entry => entry[key] || fallback);

/**
 * Removes top level keys from an object and flattens it into an array.
 * 
 * @param {Object} object Object to convert into an array.
 * @returns {Array} Array of all the top level values.
 */
export const objectToArray = (object: {}): mixedArray => {
  const keys = Object.keys(object);
  const array = keys.map(key => object[key]);
  return array;
};

/**
 * Adds a new key with given values to an existing array of object.
 * 
 * @param {Array} array Original array to add the values to under the given key.
 * @param {string} key Key that the values should be added to the array under.
 * @param {Array} values A length-matched array of values to add to the array.
 * @returns {Array} Array of objects with new added keys.
 */
export const zipObjectArray = (
  array: objectArray,
  key: string,
  values: mixedArray
): objectArray => {
  const newArray = array.map((object, index) => {
    return {
      ...object,
      [key]: values[index]
    };
  });
  return newArray;
};
