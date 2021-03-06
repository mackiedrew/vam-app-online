// @flow

// Flow Types
import type { State, grainArray } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { divisionBinarySearch } from "../help/generic";

// State Filters
const getSelectedTrackGrains = (state: State): grainArray => {
  const selectedTrackId = state.tracks.selectedTrack;
  const selectedTrackGrains = state.tracks.trackList[selectedTrackId].grains;
  return selectedTrackGrains;
};
const getSeekPosition = (state: State): number => state.tracks.seekPosition;

/**
 * Finds the current grain index based on current seek position for a single
 * track, if the seek position is beyond the track length, it returns -1.
 * 
 * @param {Array} grains Total grains existing to target track.
 * @param {number} seekPosition Current position of the seek line in frames.
 * @returns {number} Either current grain index for a track, or -1 if not found.
 */
const getSelectedGrainCore = (
  grains: grainArray,
  seekPosition: number
): number => {
  // Which grain is the current seek position in?
  const currentGrainIndex = divisionBinarySearch(seekPosition, grains);
  // Return current grain index
  return currentGrainIndex;
};

// Selector Construction
const getSelectedGrainIndex: Function = createSelector(
  [getSelectedTrackGrains, getSeekPosition],
  getSelectedGrainCore
);

export default getSelectedGrainIndex;
