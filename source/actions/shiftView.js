// @flow

// Flow Types
import type {
  Action,
  GetState,
  ThunkAction,
  Dispatch,
  State,
  viewType
} from "../constants/flowTypes";

// Action Type
import { SHIFT_VIEW } from "../constants/actionTypes";

// Actions
import setView from "./setView";

// Selectors
import longestTrackLength from "../selectors/longestTrackLength";

/**
 * Action creator: creates an action that logs a shifted view.
 * 
 * @returns {Object} Action: that logs a shifted view.
 */
export const shiftViewLabel = (): Action => {
  return { type: SHIFT_VIEW };
};

/**
 * Thunk: shifts the view, by the provided shift factor.
 * 
 * @param {Object} shiftFactor What portion of the currently showing track the
 * view should move. 
 * @returns {Function} Action creator that shifts currently showing view.
 */
const shiftView = (shiftFactor: number): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Break out state values
    const state: State = getState();
    const { view }: { view: viewType } = state.tracks;
    const { start, end } = view;
    // How much room do we have to shift?
    const longestTrack: number = longestTrackLength(state);
    // How far can beyond the end of tracks can a user view seek?
    const maxView: number = longestTrack * 1; // Arbitrary
    // What is the current span of the view in number of frames?
    const viewSpan: number = end - start;
    // How much room is left until the end of view-seekable distance?
    const roomToEnd: number = maxView - end;
    // Taking into account the direction of shift, how much room is left?
    const roomLeftToShift: number = shiftFactor < 0 ? start : roomToEnd;
    // If not running into bounds, how big of a shift should occur?
    const idealShiftMagnitude: number = Math.abs(shiftFactor * viewSpan);
    // Taking bounds into account how far can the view actually shift?
    const actualShiftMagnitude: number = Math.min(
      idealShiftMagnitude,
      roomLeftToShift
    );
    // Which numerical direction (+/-) will the track view shift?
    const shiftDirection: number = shiftFactor < 0 ? -1 : 1;
    const viewShift: number = shiftDirection * actualShiftMagnitude;
    // After the shift, where will the new start of the view be?
    const newStart: number = Math.ceil(start + viewShift);
    // After the shift, where will the new end of the view be?
    const newEnd: number = Math.ceil(end + viewShift);
    // Given these values, what is the new view object?
    const newView: viewType = {
      ...view,
      start: newStart,
      end: newEnd
    };
    // Dispatch actions!
    dispatch(shiftViewLabel());
    dispatch(setView(newView));
  };
};

export default shiftView;
