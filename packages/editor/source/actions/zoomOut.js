// @flow

// Flow Types
import type { ThunkAction, Dispatch } from "../constants/flowTypes";

// Actions
import augmentMagnifyView from "./augmentMagnifyView";

/**
 * Thunk: zooms out the view.
 * 
 * @returns {Function} Action creator that zooms out.
 */
const zoomOut = (): ThunkAction => {
  return (dispatch: Dispatch): void => {
    dispatch(augmentMagnifyView(false));
  };
};

export default zoomOut;
