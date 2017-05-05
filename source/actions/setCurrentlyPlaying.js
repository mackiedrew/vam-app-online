// Action Type
import { SET_CURRENTLY_PLAYING } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the playing state of the tracks.
 * 
 * @param {boolean} isPlaying Whether or not the track is playing.
 * @returns {Object} Action: sets the playing state of the tracks.
 */
export const setCurrentlyPlayingSimple = isPlaying => {
  return { type: SET_CURRENTLY_PLAYING, payload: isPlaying };
};

/**
 * Thunk: Sets currently playing state.
 * 
 * @param {boolean} isPlaying Whether or not the track is playing.
 * @returns {Function} Action creator that sets currently playing state.
 */
const setCurrentlyPlaying = isPlaying => {
  return dispatch => {
    dispatch(setCurrentlyPlayingSimple(isPlaying));
  };
};

export default setCurrentlyPlaying;
