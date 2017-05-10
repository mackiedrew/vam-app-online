// Libraries
import { createSelector } from "reselect";

// State Filter
const getTargetTrackGrains = (state, props) => {
  return state.tracks.trackList[props.id].grains;
};

/**
 * Selects the final grains end point in an array of grains, this can be
 * operationally considered to be the total length of the track as long as
 * all of the grains of the tracks are contiguous, in order, and comprehensively
 * provided.
 * 
 * @param {Array} grains Array of all the grains in a track.
 * @returns {number} The length of the track these grains belong to.
 */
const getTrackLengthCore = grains => {
  const length = grains.length;
  const lastIndex = length - 1;
  const lastGrain = grains[lastIndex];
  const exclusiveLength = lastGrain.end;
  const inclusiveLength = exclusiveLength - 1;
  return inclusiveLength;
};

// Selector Construction
const getTrackLength = createSelector(getTargetTrackGrains, getTrackLengthCore);

// Selector Factory
const getTrackLengthFactory = () => getTrackLength;

export default getTrackLengthFactory;
