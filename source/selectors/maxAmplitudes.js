// Libraries
import { createSelector } from "reselect";

// State Filter
const getTrackList = state => state.tracks.trackList;

/**
 * The highest amplitude of the 
 * 
 * @param {Array} grains Array of all the grains in a track.
 * @returns {number} The length of the track these grains belong to.
 */
const maxAmplitudeCore = grains => {
  const length = grains.length;
  const lastIndex = length - 1;
  const lastGrain = grains[lastIndex];
  const exclusiveLength = lastGrain.end;
  const inclusiveLength = exclusiveLength - 1;
  return inclusiveLength;
};

// Selector Construction
const maxAmplitude = createSelector(getTrackList, maxAmplitudeCore);

export default maxAmplitude;
