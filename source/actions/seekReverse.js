// @flow

// Flow Types
import type { ThunkAction, Dispatch } from "../constants/flowTypes";

// Actions
import augmentShiftSeek from "./augmentShiftSeek";

/**
 * Thunk: shifts seek position in reverse.
 * 
 * @returns {Function} Action creator that seeks in reverse.
 */
const seekReverse = (): ThunkAction => {
  return (dispatch: Dispatch): void => {
    dispatch(augmentShiftSeek(false));
  };
};

export default seekReverse;
