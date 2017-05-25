// @flow

// Flow Types
import type {
  State,
  trackType,
  grainArray,
  grainType
} from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { objectToArray } from "../help/collections";

// Create functions that return portions of state
const trackList = (state: State): {} => state.tracks.trackList;

/**
 * Determine track length for every track.
 * 
 * @param {Object} tracks Track list object from the tracks reducer state.
 * @returns {Object} TrackId-keyed object with corresponding track lengths.
 */
const trackLengthsCore = (tracks: {}): {} => {
  // If a grain cannot be found use this fallback grain.
  const fallback: grainType = { start: Infinity, end: -Infinity };
  // Create iterable version of the track array.
  const trackArray: Array<trackType> = objectToArray(tracks);
  // Create iterable version of grains in each track.
  const grainsList: Array<grainArray> = trackArray.map(
    track => track.grains || [fallback]
  );
  // How many grains in each track?
  const numberOfGrains: Array<number> = grainsList.map(grains => grains.length);
  // What is the highest valid index in each grain array?
  const finalGrainIndexes: Array<number> = numberOfGrains.map(x => x - 1);
  // What are the last grains in each array?
  const finalGrains: grainArray = finalGrainIndexes.map((i, t) => {
    // Which track should we be accessing?
    const track: trackType = trackArray[t];
    // Check to ensure the grains element exists.
    const grains: grainArray | void = track.grains;
    if (grains !== undefined) {
      // Check to ensure the grain exists.
      const candidateGrain: grainType | void = grains[i];
      if (candidateGrain !== undefined) {
        return candidateGrain;
      }
      return fallback;
    }
    return fallback;
  });
  // What is the final grain's end point in number of frames?
  const lastFrames: Array<number> = finalGrains.map(grain => grain.end);
  // What are the corresponding trackIds?
  const trackIds: Array<string> = Object.keys(tracks);
  // Which Id corresponds to which length?
  const lastFramesWithIds = trackIds.reduce(
    (accumulator: {}, id: string, i: number): {} => ({
      ...accumulator,
      [id]: lastFrames[i]
    }),
    {}
  );
  return lastFramesWithIds;
};

const trackLengths: Function = createSelector(trackList, trackLengthsCore);

export default trackLengths;
