// Action Type
import { MAGNIFY_VIEW } from "../constants/actionTypes";

// Actions
import setView from "./setView";

/**
 * Action creator: creates an action that logs magnification change in actions.
 * 
 * @returns {Object} Action: that logs magnification change in actions.
 */
export const magnifyViewLabel = () => ({ type: MAGNIFY_VIEW });

/**
 * Thunk: multiplies the view, changes just the end of the track. The start of
 * the track is anchored for now.
 * 
 * @param {Object} magnificationFactor What to multiply the end of view by.
 * @returns {Function} Action creator that magnifies the current view by 
 * the provided magnification factor.
 */
const magnifyView = magnificationFactor => {
  return (dispatch, getState) => {
    const { view } = getState().tracks;
    const newEnd = Math.ceil(view.end * magnificationFactor);
    const newView = {
      ...view,
      end: newEnd
    };
    dispatch(magnifyViewLabel());
    dispatch(setView(newView));
  };
};

export default magnifyView;
