// @flow

// Flow Types
import type { State, grainArray, grainType } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Selectors
import getCurrentGrainIndexFactory from "./getCurrentGrainIndexFactory";

// State Filters
const getTrackGrains = (
  state: State,
  { trackId }: { trackId: string }
): grainArray => state.tracks.trackList[trackId].grains;

/**
 * Selects the current grain the seek position is on.
 * 
 * @param {Array} grains Total track grains.
 * @param {number} grainIndex Number from 0 to grains.length minus 1. If
 * grainIndex is equal to negative 1 then there is not grain at current seek
 * position. 
 * @returns {Object} Grain of the current index, maybe a fallback grain.
 */
const getCurrentGrainCore = (
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
const getCurrentGrain: Function = createSelector(
  [getTrackGrains, getCurrentGrainIndexFactory()],
  getCurrentGrainCore
);

// Factory
const getCurrentGrainFactory = (): Function => getCurrentGrain;

export default getCurrentGrainFactory;
