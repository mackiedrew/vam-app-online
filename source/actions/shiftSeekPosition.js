// Action Type
import { SHIFT_SEEK_POSITION } from "../constants/actionTypes";

/**
 * Action creator: creates an action that adds this number of frames to the current seek position.
 * 
 * @param {number} shift The number of frames you would like to shift the seek position.
 * @returns {Object} Action: adds this number of frames to the current seek position.
 */
const shiftSeekPosition = shift => ({
  type: SHIFT_SEEK_POSITION,
  payload: shift
});

export default shiftSeekPosition;
