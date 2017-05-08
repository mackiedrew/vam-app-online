// Action Type
import { SHIFT_VIEW } from "../constants/actionTypes";

// Actions
import setView from "./setView";

// Selectors
import longestTrackLength from "../selectors/longestTrackLength";

/**
 * Action creator: creates an action that logs a shifted view.
 * 
 * @returns {Object} Action: that logs a shifted view.
 */
export const shiftViewLabel = () => ({ type: SHIFT_VIEW });

/**
 * Thunk: shifts the view, by the provided shift factor.
 * 
 * @param {Object} shiftFactor What portion of the currently showing track the
 * view should move. 
 * @returns {Function} Action creator that shifts currently showing view.
 */
const shiftView = shiftFactor => {
  return (dispatch, getState) => {
    // Break out state values
    const state = getState();
    const { view } = state.tracks;
    const { start, end } = view;

    // How much room do we have to shift?
    const longestTrack = longestTrackLength(state);
    const maxView = longestTrack * 1; // Arbitrary
    const currentViewRange = end - start;
    const roomToEnd = maxView - end;

    const roomLeftToShift = shiftFactor < 0 ? start : roomToEnd;
    const idealShiftMagnitude = Math.abs(shiftFactor * currentViewRange);
    const actualShiftMagnitude = Math.min(idealShiftMagnitude, roomLeftToShift);

    // Recreate a shift direction we can actually use.
    const shiftDirection = shiftFactor < 0 ? -1 : 1;
    const viewShift = shiftDirection * actualShiftMagnitude;

    const newStart = Math.ceil(start + viewShift);
    const newEnd = Math.ceil(end + viewShift);

    const newView = {
      ...view,
      start: newStart,
      end: newEnd
    };
    dispatch(shiftViewLabel());
    dispatch(setView(newView));
  };
};

export default shiftView;
