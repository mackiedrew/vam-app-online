// Libraries
import { playElement, pauseElement, getElementById } from "../help/dom";

// Action Types
import { SET_CURRENTLY_PLAYING } from "../constants/actionTypes";

// Action Creator
const setCurrentlyPlayingAsync = payload => {
  return { type: SET_CURRENTLY_PLAYING, payload };
};

// Thunk
const setCurrentlyPlaying = isPlaying => {
  return (dispatch, getState) => {
    const { trackList } = getState().tracks;
    const trackIds = Object.keys(trackList);
    const audioTagIds = trackIds.map(id => `audio-manager-${id}`);
    const audioTags = audioTagIds.map(getElementById);
    dispatch(setCurrentlyPlayingAsync(isPlaying));
    isPlaying ? audioTags.map(playElement) : audioTagIds.map(pauseElement);
  };
};

export default setCurrentlyPlaying;
