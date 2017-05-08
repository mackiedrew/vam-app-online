// Action Type
import { TOGGLE_CURRENTLY_PLAYING } from "../constants/actionTypes";

// Actions
import setCurrentlyPlaying from "./setCurrentlyPlaying";

/**
 * Action creator: creates an action that labels a toggled state of playing.
 * 
 * @returns {Object} Action: that labels a toggled state of playing.
 */
export const toggleCurrentlyPlayingLabel = () => ({
  type: TOGGLE_CURRENTLY_PLAYING
});

/**
 * Thunk: toggles the currently playing state.
 * 
 * @returns {Function} Action creator that toggles the currently playing state.
 */
const toggleCurrentlyPlaying = () => {
  return (dispatch, getState) => {
    const { currentlyPlaying } = getState().tracks;
    dispatch(toggleCurrentlyPlayingLabel());
    dispatch(setCurrentlyPlaying(!currentlyPlaying));
  };
};

export default toggleCurrentlyPlaying;
