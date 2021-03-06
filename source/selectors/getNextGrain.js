// @flow

// Flow Types
import type { State, grainArray, grainType } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Selectors
import getNextGrainIndex from "./getNextGrainIndex";

// State Filters
const getSelectedTrackGrains = (state: State): grainArray => {
  const selectedTrackId = state.tracks.selectedTrack;
  const selectedTrackGrains = state.tracks.trackList[selectedTrackId].grains;
  return selectedTrackGrains;
};

/**
 * Selects the next grain the seek position is on.
 * 
 * @param {Array} grains Total track grains.
 * @param {number} grainIndex Number from 0 to grains.length minus 1. If
 * grainIndex is equal to negative 1 then there is not grain at current seek
 * position. 
 * @returns {Object} Grain of the next index.
 */
const getNextGrainCore = (grains: grainArray, grainIndex: number): grainType =>
  grains[grainIndex];

// Selector Construction
const getNextGrain: Function = createSelector(
  [getSelectedTrackGrains, getNextGrainIndex],
  getNextGrainCore
);

export default getNextGrain;
