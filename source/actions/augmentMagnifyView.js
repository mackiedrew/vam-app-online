// @flow

// Flow Types
import type {
  GetState,
  ThunkAction,
  Dispatch,
  State
} from "../constants/flowTypes";

// Actions
import magnifyView from "./magnifyView";
import setView from "./setView";

// Selectors
import longestTrackLength from "../selectors/longestTrackLength";

// Constants
import {
  zoomOutMultiple,
  zoomOutMultipleAugmentA,
  zoomOutMultipleAugmentB,
  zoomOutMultipleAugmentC
} from "../constants/configuration";

/**
 * Thunk: zooms in or out depending on arguments, constants, and current
 * keyboard augmentations.
 * 
 * @param {boolean} zoomIn If true, you zoom in, otherwise, zoom out.
 * @returns {Function} Action creator that zooms in or out depending on
 * arguments, constants, and current keyboard augmentations.
 */
const augmentMagnifyView = (zoomIn: boolean = false): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Break out values.
    const state: State = getState();
    const { keyboard } = state;
    const {
      augmentA,
      augmentB,
      augmentC
    }: { augmentA: boolean, augmentB: boolean, augmentC: boolean } = keyboard;
    // How long is the longest track?
    const longestTrack: number = longestTrackLength(state);
    // Determine the scale for zooming out which is the default action.
    const scale = (() => {
      if (augmentA && !augmentB && !augmentC) {
        return zoomOutMultipleAugmentA;
      } else if (!augmentA && augmentB && !augmentC) {
        return zoomOutMultipleAugmentB;
      } else if (!augmentA && !augmentB && augmentC) {
        return zoomOutMultipleAugmentC;
      } else if (!augmentA && augmentB && augmentC) {
        return -1;
      } else {
        return zoomOutMultiple;
      }
    })();
    // Dispatch Actions
    if (scale !== -1) {
      // What is the magnification factor taking into account zooming in?
      const magnificationFactor: number = zoomIn ? 1 / scale : scale;
      // Dispatch zoom action.
      dispatch(magnifyView(magnificationFactor));
    } else {
      // Find new view to show the whole track.
      const newView = {
        start: 0,
        end: longestTrack
      };
      // Dispatch full view action.
      dispatch(setView(newView));
    }
  };
};

export default augmentMagnifyView;
