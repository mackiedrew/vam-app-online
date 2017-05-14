// @flow

// Flow Types
import type {
  Action,
  GetState,
  ThunkAction,
  Dispatch,
  viewType,
  State
} from "../constants/flowTypes";

// Action Type
import { MAGNIFY_VIEW } from "../constants/actionTypes";

// Actions
import setView from "./setView";

// Selectors
import longestTrackLength from "../selectors/longestTrackLength";

// Helpers
import { clamp, floor } from "../help/math";

/**
 * Action creator: creates an action that logs magnification change in actions.
 * 
 * @returns {Object} Action: that logs magnification change in actions.
 */
export const magnifyViewLabel = (): Action => {
  return { type: MAGNIFY_VIEW };
};

/**
 * Thunk: multiplies the view, changes just the end of the track. The start of
 * the track is anchored for now.
 * 
 * @param {number} magnifyFactor What to multiply the end of view by.
 * @returns {Function} Action creator that magnifies the current view by 
 * the provided magnification factor.
 */
const magnifyView = (magnifyFactor: number): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Break out values.
    const state: State = getState();
    const { tracks } = state;
    const { view }: { view: viewType } = tracks;
    const { start, end }: { start: number, end: number } = view;
    // Figure out what changes are in store for the view in this action.
    const currentViewRange: number = end - start;
    const targetViewRange: number = currentViewRange * magnifyFactor;
    const changedViewRange: number = targetViewRange - currentViewRange;
    // Used for determining the maximum zoom out distance depending on tracks.
    const longestTrack: number = longestTrackLength(state);
    // Arbitrary constant; should see beyond longest track to see its end.
    const maxView: number = longestTrack * 2;
    // Determine what share of the new view to show should go on which ends.
    const targetNewEnd: number = end + changedViewRange;
    const cantAddToEnd: number = maxView - targetNewEnd;
    const targetEndBeyondMax: boolean = cantAddToEnd < 0;
    const targetNewStart: number = targetEndBeyondMax
      ? start + cantAddToEnd
      : start;
    /* Bound new values to respective, logical end points. Probably over-kill.
     * Note: targetNewStart + 2 is the minimum because start < end, view span
     * must always be at least 1, and end is not inclusive.
     */
    const rawNewEnd: number = clamp(targetNewEnd, targetNewStart + 2, maxView);
    const rawNewStart: number = clamp(targetNewStart, 0, rawNewEnd - 1);
    // View should only contain integers since it represents discrete frames.
    const newEnd: number = floor(rawNewEnd);
    const newStart: number = floor(rawNewStart);
    // Construct new view object.
    const newView: viewType = { start: newStart, end: newEnd };
    // Dispatch Actions
    dispatch(magnifyViewLabel());
    dispatch(setView(newView));
  };
};

export default magnifyView;
