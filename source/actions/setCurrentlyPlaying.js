// @flow

// Flow Types
import type { Action, ThunkAction, Dispatch } from "../constants/flowTypes";

// Action Type
import { SET_CURRENTLY_PLAYING } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the playing state of the tracks.
 * 
 * @param {boolean} isPlaying Whether or not the track is playing.
 * @returns {Object} Action: sets the playing state of the tracks.
 */
export const setCurrentlyPlayingSimple = (isPlaying: boolean): Action => {
  return { type: SET_CURRENTLY_PLAYING, payload: isPlaying };
};

/**
 * Thunk: Sets currently playing state.
 * 
 * @param {boolean} isPlaying Whether or not the track is playing.
 * @returns {Function} Action creator that sets currently playing state.
 */
const setCurrentlyPlaying = (isPlaying: boolean): ThunkAction => {
  return (dispatch: Dispatch): void => {
    dispatch(setCurrentlyPlayingSimple(isPlaying));
  };
};

export default setCurrentlyPlaying;
