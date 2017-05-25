// @flow

// Flow Types
import type { State, grainArray } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { clamp } from "../help/math";

// Selectors
import getSelectedGrainIndex from "./getSelectedGrainIndex";

// State Filters
const getSelectedTrackGrains = (state: State): grainArray => {
  const selectedTrackId = state.tracks.selectedTrack;
  const selectedTrackGrains = state.tracks.trackList[selectedTrackId].grains;
  return selectedTrackGrains;
};

/**
 * Finds the previous grain index in order of the selected track.
 * 
 * @param {Array} grains Total grains existing to target track.
 * @param {number} currentIndex Currently selected index of the selected track.
 * @returns {number} Either current grain index for a track, or -1 if not found.
 */
const getPreviousGrainIndexCore = (
  grains: grainArray,
  currentIndex: number
): number => {
  // What should effectively be considered the candidate value?
  const candidate: number = currentIndex === -1 ? Infinity : currentIndex - 1;
  // What is the lower bound of the grains array?
  const lowerBound: number = 0;
  // What is the upper bound of the grains array?
  const upperBound: number = grains.length - 1;
  // What should actually be considered the next grain index?
  const previousGrainIndex: number = clamp(candidate, lowerBound, upperBound);
  // Return next grain index
  return previousGrainIndex;
};

// Selector Construction
const getPreviousGrainIndex: Function = createSelector(
  [getSelectedTrackGrains, getSelectedGrainIndex],
  getPreviousGrainIndexCore
);

export default getPreviousGrainIndex;
