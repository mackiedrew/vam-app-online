// @flow

// Flow Types
import type { State, grainArray, grainType } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Selectors
import getSelectedGrainIndex from "./getSelectedGrainIndex";

// State Filters
const getSelectedTrackGrains = (state: State): grainArray => {
  const selectedTrackId = state.tracks.selectedTrack;
  const selectedTrackGrains = state.tracks.trackList[selectedTrackId].grains;
  return selectedTrackGrains;
};

/**
 * Selects the current grain the seek position is on.
 * 
 * @param {Array} grains Total track grains.
 * @param {number} grainIndex Number from 0 to grains.length minus 1. If
 * grainIndex is equal to negative 1 then there is not grain at current seek
 * position. 
 * @returns {Object} Grain of the current index, maybe a fallback grain.
 */
const getSelectedGrainCore = (
  grains: grainArray,
  grainIndex: number
): grainType => {
  if (grainIndex === -1) {
    return { start: Infinity, end: -Infinity };
  } else {
    return grains[grainIndex];
  }
};

// Selector Construction
const getSelectedGrain: Function = createSelector(
  [getSelectedTrackGrains, getSelectedGrainIndex],
  getSelectedGrainCore
);

export default getSelectedGrain;
