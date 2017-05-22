// @flow

// Flow Types
import type { ThunkAction, Dispatch } from "../constants/flowTypes";

// Actions
import augmentMagnifyView from "./augmentMagnifyView";

/**
 * Thunk: zooms in the view.
 * 
 * @returns {Function} Action creator that zooms in.
 */
const zoomIn = (): ThunkAction => {
  return (dispatch: Dispatch): void => {
    dispatch(augmentMagnifyView(true));
  };
};

export default zoomIn;
