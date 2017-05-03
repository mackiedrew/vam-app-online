import { TOGGLE_TRACK_MUTE } from "../constants/actionTypes";

// Action Creator
const toggleTrackMuteAsync = payload => ({ type: TOGGLE_TRACK_MUTE, payload });

// Thunk
const toggleTrackMute = trackId => {
  return dispatch => {
    dispatch(toggleTrackMuteAsync(trackId));
  };
};

export default toggleTrackMute;
