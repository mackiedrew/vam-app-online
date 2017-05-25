// @flow

// Flow Types
import type {
  GetState,
  ThunkAction,
  Dispatch,
  State
} from "../constants/flowTypes";

// Actions
import shiftSeekPosition from "./shiftSeekPosition";
import setSeekPosition from "./setSeekPosition";

// Selectors
import getNextGrain from "../selectors/getNextGrain";
import getPreviousGrain from "../selectors/getPreviousGrain";
import longestTrackLength from "../selectors/longestTrackLength";

/**
 * Thunk: handles key controlled seek shifting.
 * 
 * @param {boolean} forward If true, forward seek, if false, reverse.
 * @returns {Function} ThunkAction that handles key controlled seek shifting.
 */
const augmentShiftSeek = (forward: boolean = false): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Break out values.
    const state: State = getState();
    const { keyboard } = state;
    const {
      augmentA,
      augmentB,
      augmentC
    }: { augmentA: boolean, augmentB: boolean, augmentC: boolean } = keyboard;

    // Temporary! It should probably be hooked into something later.
    const sampleRate = 44100;

    // Will the shift be forward or reverse?
    const direction = forward ? 1 : -1;

    // Which function should be dispatched?
    if (augmentA && !augmentB && !augmentC) {
      // Shift 1 frame.
      const frames = direction * 1;
      dispatch(shiftSeekPosition(frames));
    } else if (augmentA && !augmentB && augmentC) {
      // Shift 1 millisecond.
      const frames = direction * (sampleRate / 1000);
      dispatch(shiftSeekPosition(frames));
    } else if (!augmentA && !augmentB && augmentC) {
      // Shift 1 second.
      const frames = direction * sampleRate;
      dispatch(shiftSeekPosition(frames));
    } else if (!augmentA && augmentB && augmentC) {
      // Shift 1 minute.
      const frames = direction * sampleRate * 60;
      dispatch(shiftSeekPosition(frames));
    } else if (augmentA && augmentB && augmentC) {
      // Shift 1 hour.
      const frames = direction * sampleRate * 60 * 60;
      dispatch(shiftSeekPosition(frames));
    } else if (!augmentA && augmentB && !augmentC) {
      // Shift to the end or the beginning of longest track.
      const longestLength = longestTrackLength(state);
      const newSeekPosition = forward ? longestLength : 0;
      dispatch(setSeekPosition(newSeekPosition));
    } else {
      // Shift 1 grain forward or back.
      const nextGrain = getNextGrain(state);
      const previousGrain = getPreviousGrain(state);
      const targetGrain = forward ? nextGrain : previousGrain;
      const newSeekPosition = targetGrain.start;
      dispatch(setSeekPosition(newSeekPosition));
    }
  };
};

export default augmentShiftSeek;
