// Action Type
import { SHIFT_SEEK_POSITION } from "../constants/actionTypes";

// Actions
import setSeekPosition from "./setSeekPosition";

// Selectors
import longestTrackLength from "../selectors/longestTrackLength";

// Helpers
import { clamp, floor } from "../help/math";

/**
 * Action creator: creates an action that adds this number of frames to the
 * current seek position.
 * 
 * @returns {Object} Action: adds this number of frames to the current seek
 * position.
 */
export const shiftSeekPositionLabel = () => ({ type: SHIFT_SEEK_POSITION });

/**
 * Thunk: shifts the seek position, by the provided shift.
 * 
 * @param {Object} shift What portion of the currently showing track the
 * seek position should move. 
 * @returns {Function} Action creator that shifts currently showing view.
 */
const shiftSeekPosition = shift => {
  return (dispatch, getState) => {
    // Collect current state data.
    const state = getState();
    const { seekPosition } = state.tracks;
    const longestTrack = longestTrackLength(state);

    // Figure out new seek position and validate.
    const targetSeekPosition = seekPosition + shift;
    const newSeekPosition = floor(clamp(targetSeekPosition, 0, longestTrack));

    dispatch(shiftSeekPositionLabel());
    dispatch(setSeekPosition(newSeekPosition));
  };
};

export default shiftSeekPosition;
