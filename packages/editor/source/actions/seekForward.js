// @flow

// Flow Types
import type { ThunkAction, Dispatch } from "../constants/flowTypes";

// Actions
import augmentShiftSeek from "./augmentShiftSeek";

/**
 * Thunk: shifts seek position forward.
 * 
 * @returns {Function} Action creator that seeks forward.
 */
const seekForward = (): ThunkAction => {
  return (dispatch: Dispatch): void => {
    dispatch(augmentShiftSeek(true));
  };
};

export default seekForward;
