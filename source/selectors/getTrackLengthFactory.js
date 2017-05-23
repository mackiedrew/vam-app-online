// @flow

// Flow Types
import type {
  State,
  TracksState,
  trackType,
  grainArray,
  grainType
} from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// State Filter
const getTargetTrackGrains = (state: State, props: { id: string }) => {
  const tracks: TracksState = state.tracks;
  const trackList: Object = tracks.trackList;
  const id: string = props.id;
  const track: trackType = trackList[id];
  const grains: grainArray = track.grains || [
    { start: Infinity, end: -Infinity }
  ];
  return grains;
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
const getTrackLengthCore = (grains: grainArray): number => {
  // How many grains are there total?
  const length: number = grains.length;
  // What is the last valid index value given the known length of the array?
  const lastIndex: number = length - 1;
  // Which grain is the last grain in the provided array?
  const lastGrain: grainType = grains[lastIndex];
  // What's the length of the grain array in frames including the last frame?
  const exclusiveLength: number = lastGrain.end;
  // What is the actually included length of the grain array?
  const inclusiveLength: number = exclusiveLength - 1;
  // What should the `correct` length be reported as? Exclusive? Inclusive?
  return inclusiveLength;
};

// Selector Construction
const getTrackLength: Function = createSelector(
  getTargetTrackGrains,
  getTrackLengthCore
);

// Selector Factory
const getTrackLengthFactory: Function = () => getTrackLength;

export default getTrackLengthFactory;
