// Action Types
import { TOGGLE_CURRENTLY_PLAYING } from "../constants/actionTypes";

// Actions
import setCurrentlyPlaying from "./setCurrentlyPlaying";

// Action Creators
const toggleCurrentlyPlayingAsync = () => ({ type: TOGGLE_CURRENTLY_PLAYING });

// Thunk
const toggleCurrentlyPlaying = () => {
  return (dispatch, getState) => {
    const { currentlyPlaying } = getState().tracks;
    dispatch(toggleCurrentlyPlayingAsync());
    dispatch(setCurrentlyPlaying(!currentlyPlaying));
  };
};

export default toggleCurrentlyPlaying;
