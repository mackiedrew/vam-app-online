// @flow

// Flow Types
import type {
  grainArray,
  State,
  Settings,
  trackType
} from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { areGrainsQuiet } from "../help/grainTags";

// State Filters
const getTargetTrack = (state: State, props: { id: string }): grainArray => {
  const { id } = props;
  return state.tracks.trackList[id];
};

const getSettings = (state: State): Settings => {
  return state.settings;
};

/**
 * Creates an object corresponding to each grain classifying it based on 
 * predetermined rules.
 * 
 * @param {Array} track Track object.
 * @param {Object} settings Current settings state.
 * @returns {Array} Array of objects containing all tag data.
 */
const getGrainTagsCore = (track: trackType, settings: Settings): Array<{}> => {
  const grains = track.grains || [];
  const quietCutOff: number = settings.quietCutoff.value / 100;
  const quietArray: Array<boolean> = areGrainsQuiet(grains, quietCutOff);
  const tags: {} = { quiet: quietArray };

  const combinedArrays: Array<{}> = grains.map((grain, i) => {
    const grainTags: {} = Object.keys(tags).reduce((accumulator, tag) => {
      const newObject: {} = { ...accumulator, [tag]: tags[tag][i] };
      return newObject;
    }, {});
    return grainTags;
  });

  return combinedArrays;
};

// Selector Construction
const getGrainTags = createSelector(
  [getTargetTrack, getSettings],
  getGrainTagsCore
);

// Factory
const getGrainTagsFactory = () => getGrainTags;

export default getGrainTagsFactory;
