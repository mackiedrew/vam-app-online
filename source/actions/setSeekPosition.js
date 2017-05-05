// Action Type
import { SET_SEEK_POSITION } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the value of current seek position.
 * 
 * @param {string} position Frame position to seek to.
 * @returns {Object} Action: sets the value of current seek position.
 */
const setSeekPosition = position => {
  return {
    type: SET_SEEK_POSITION,
    payload: position
  };
};

export default setSeekPosition;
