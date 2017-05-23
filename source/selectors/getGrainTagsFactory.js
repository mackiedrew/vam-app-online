// @flow

// Flow Types
import type {
  State,
  SettingsType,
  trackType,
  TracksState
} from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { areGrainsQuiet } from "../help/grainTags";

// State Filters
const getTargetTrack = (state: State, props: { id: string }): {} => {
  const id: string = props.id;
  const tracks: TracksState = state.tracks;
  const trackList: {} = tracks.trackList;
  const track: trackType = trackList[id];
  return track;
};

const getSettings = (state: State): SettingsType => {
  return state.settings;
};

/**
 * Creates an object corresponding to each grain classifying it based on 
 * predetermined rules.
 * 
 * @param {Object} track Track object.
 * @param {Object} settings Current settings state.
 * @returns {Array} Array of objects containing all tag data.
 */
const getGrainTagsCore = (
  track: trackType,
  settings: SettingsType
): Array<{}> => {
  // Which grains exist within the track?
  const grains = track.grains || [];
  // What % of max volume should be considered quiet (0 to 1)?
  const quietCutOff: number = settings.quietCutoff.value / 100;
  // Which grains are quiet?
  const quietArray: Array<boolean> = areGrainsQuiet(grains, quietCutOff);
  // Which arrays should be considered tags, and by what name (the key)?
  const tags: { quiet: Array<boolean> } = { quiet: quietArray };
  // What tags does each grain have with one object per grain in an array?
  const combinedArrays: Array<{}> = grains.map((grain, i) => {
    // What types of tags exist for each grain?
    const tagNames: Array<string> = Object.keys(tags);
    // By what method will we stitch together the tag arrays?
    const tagCombiner: Function = (accumulator: {}, tag: string): {} => {
      const newTagValue: any = tags[tag][i];
      const newTag: {} = { [tag]: newTagValue };
      const newObject: {} = { ...accumulator, ...newTag };
      return newObject;
    };
    // Which tags does the current grain have?
    const grainTags: {} = tagNames.reduce(tagCombiner, {});
    return grainTags;
  });

  return combinedArrays;
};

// Selector Construction
const getGrainTags: Function = createSelector(
  [getTargetTrack, getSettings],
  getGrainTagsCore
);

// Factory
const getGrainTagsFactory: Function = (): Function => getGrainTags;

export default getGrainTagsFactory;
