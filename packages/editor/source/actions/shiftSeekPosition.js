// @flow

// Flow Types
import type {
  Action,
  GetState,
  ThunkAction,
  Dispatch,
  State
} from "../constants/flowTypes";

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
export const shiftSeekPositionLabel = (): Action => {
  return { type: SHIFT_SEEK_POSITION };
};

/**
 * Thunk: shifts the seek position, by the provided shift.
 * 
 * @param {Object} shift What portion of the currently showing track the
 * seek position should move. 
 * @returns {Function} Action creator that shifts currently showing view.
 */
const shiftSeekPosition = (shift: number): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Collect current state data.
    const state: State = getState();
    const { seekPosition }: { seekPosition: number } = state.tracks;
    const longestTrack: number = longestTrackLength(state);

    // Figure out new seek position and validate.
    const targetSeekPosition: number = seekPosition + shift;
    const newSeekPosition: number = floor(
      clamp(targetSeekPosition, 0, longestTrack)
    );

    dispatch(shiftSeekPositionLabel());
    dispatch(setSeekPosition(newSeekPosition));
  };
};

export default shiftSeekPosition;
