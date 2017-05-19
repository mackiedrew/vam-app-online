// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { SET_SEEK_POSITION } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the value of current seek position.
 * 
 * @param {number} position Frame position to seek to.
 * @returns {Object} Action: sets the value of current seek position.
 */
const setSeekPosition = (position: number): Action => {
  return {
    type: SET_SEEK_POSITION,
    payload: position
  };
};

export default setSeekPosition;
