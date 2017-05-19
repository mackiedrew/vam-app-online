// @flow

// Flow Types
import type {
  Action,
  State,
  GetState,
  ThunkAction,
  Dispatch
} from "../constants/flowTypes";

// Action Type
import { TOGGLE_CURRENTLY_PLAYING } from "../constants/actionTypes";

// Actions
import setCurrentlyPlaying from "./setCurrentlyPlaying";

/**
 * Action creator: creates an action that labels a toggled state of playing.
 * 
 * @returns {Object} Action: that labels a toggled state of playing.
 */
export const toggleCurrentlyPlayingLabel = (): Action => {
  return {
    type: TOGGLE_CURRENTLY_PLAYING
  };
};

/**
 * Thunk: toggles the currently playing state.
 * 
 * @returns {Function} Action creator that toggles the currently playing state.
 */
const toggleCurrentlyPlaying = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // What is the current state?
    const state: State = getState();
    // What is the current state of currently playing?
    const currentlyPlaying: boolean = state.tracks.currentlyPlaying;
    // What is the new state of currently playing going to be?
    const newCurrentlyPlaying: boolean = !currentlyPlaying;
    // Dispatch Actions!
    dispatch(toggleCurrentlyPlayingLabel());
    dispatch(setCurrentlyPlaying(newCurrentlyPlaying));
  };
};

export default toggleCurrentlyPlaying;
