// Action Types
import { SET_CURRENTLY_PLAYING } from "../constants/actionTypes";

// Action Creator
const setCurrentlyPlayingAsync = payload => {
  return { type: SET_CURRENTLY_PLAYING, payload };
};

// Thunk
const setCurrentlyPlaying = isPlaying => {
  return dispatch => {
    dispatch(setCurrentlyPlayingAsync(isPlaying));
  };
};

export default setCurrentlyPlaying;
