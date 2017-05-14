// @flow

// Libraries
import { createSelector } from "reselect";

// Helpers
import { objectToArray } from "../help/generic";
import { max } from "../help/math";

// Selectors
import trackLengths from "./trackLengths";

/**
 * Find the largest value in a ID-matched length object.
 * 
 * @param {Object} lengths Object with trackIds matched to their lengths.
 * @returns {number} Longest track length as a number.
 */
const longestTrackLengthCore = (lengths: {}): number => {
  const lengthArray: Array<number> = objectToArray(lengths);
  const longest: number = max(lengthArray);
  return longest;
};

// Selector Construction
const longestTrackLength = createSelector(trackLengths, longestTrackLengthCore);

export default longestTrackLength;
