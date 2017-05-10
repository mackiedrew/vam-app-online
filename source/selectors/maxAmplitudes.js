// @flow

// Flow Types
import type { State, trackType, grainArray } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { objectToArray, getKeyFromObjectArray, max } from "../help/generic";

// State Filter
const trackList = (state: State): {} => state.tracks.trackList;

/**
 * Creates an ID matching track keys to the newly calculated maximum amplitudes.
 * 
 * @param {Object} tracks Object of tracks pulled from state.
 * @returns {Object} An object containing keys of tracks with maxAmplitudes set.
 */
const maxAmplitudesCore = (tracks: {}): {} => {
  // Get grain list.
  const trackArray: Array<trackType> = objectToArray(tracks);
  // This mock grain is used to fulfill type requirements.
  const emptyGrains = [{ amplitude: 0 }];
  // Collect all the grains, swapping out the non-grain tracks with a mock.
  const grainsList: Array<grainArray> = getKeyFromObjectArray(
    trackArray,
    "grains",
    emptyGrains
  );
  // Create array of all amplitudes.
  const amplitudesArray = grainsList.map(grains =>
    getKeyFromObjectArray(grains, "amplitude", 0)
  );
  const absoluteAmplitudes = amplitudesArray.map(x => x.map(Math.abs));
  // Calculate maxAmplitude for each grain list.
  const maxAmplitudes = absoluteAmplitudes.map(max);
  // Reconstruct to avoid mutation.
  const trackIds = Object.keys(tracks);
  const maxAmplitudesWithIds = trackIds.reduce(
    (accumulator, id, i) => ({ ...accumulator, [id]: maxAmplitudes[i] }),
    {}
  );
  return maxAmplitudesWithIds;
};

// Construct Selector
const maxAmplitudes = createSelector(trackList, maxAmplitudesCore);

export default maxAmplitudes;
