// Action Type
import { SHIFT_VIEW } from "../constants/actionTypes";

// Actions
import setView from "./setView";

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
    const { view } = getState().tracks;
    const { start, end } = view;
    const viewRange = end - start;
    const viewShift = shiftFactor * viewRange;
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
