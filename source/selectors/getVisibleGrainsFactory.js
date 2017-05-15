// @flow

// Flow Types
import type {
  grainArray,
  viewType,
  State,
  grainType,
  trackType
} from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// Helpers
import { grainIndexesInView } from "../help/grain";

// State Filters
const getTargetTrack = (state: State, props: { id: string }): {} => {
  const { id } = props;
  return state.tracks.trackList[id];
};
const getView = (state: State): viewType => {
  return state.tracks.view;
};

/**
 * Creates a filtered version of the grains which contains the only fully 
 * visible grains and cut grains modelled after the real, adjacent, grains.
 * 
 * @param {Object} track Track object.
 * @param {Object} view Current track view.
 * @returns {Array} Array containing all visible full grains and cut filler
 * grains.
 */
export const getVisibleGrainsCore = (
  track: trackType,
  view: viewType
): grainArray => {
  // Protect against an undefined grains array.
  if (!track || !track.grains || track.grains.length === 0) {
    return [];
  }
  const grains: grainArray = track.grains;

  // Find which grains fully fit within the current view.
  const [startIndex, endIndex]: [number, number] = grainIndexesInView(
    grains,
    view
  );

  if (startIndex === -1 && endIndex === -1) {
    return [];
  }

  /* Generate a filler grain which fills the space between full grains and
   * the bounds of the current view. It will try to inherit the real full 
   * grains amplitude to it's non-viewable side, but if that doesn't exist
   * it will fall back to an amplitude of zero.
   */
  const startFillerModelIndex: number = startIndex - 1;
  const startFillerModel: grainType = grains[startFillerModelIndex] || {};
  const { amplitude: startFillerAmplitude = 0 } = startFillerModel;
  const startFiller: grainType = {
    start: view.start,
    end: grains[startIndex].start,
    amplitude: startFillerAmplitude,
    disabled: true
  };

  const endFillerModelIndex: number = endIndex + 1;
  const endFillerModel: grainType = grains[endFillerModelIndex] || {};
  const { amplitude: endFillerAmplitude = 0 } = endFillerModel;
  const endFiller: grainType = {
    start: grains[endIndex].end,
    end: view.end,
    amplitude: endFillerAmplitude,
    disabled: true
  };
  // Generate new grain array containing only visible sections of grains.
  const fullGrains: grainArray = grains.slice(startIndex, endIndex + 1);
  const visibleGrains: grainArray = [startFiller, ...fullGrains, endFiller];
  return visibleGrains;
};

// Selector Construction
const getVisibleGrains = createSelector(
  [getTargetTrack, getView],
  getVisibleGrainsCore
);

// Factory
const getVisibleGrainsFactory = (): Function => getVisibleGrains;

export default getVisibleGrainsFactory;
