// Action Types
import { SELECT_TRACK } from "../constants/actionTypes";

// Action Creator
const selectTrackAsync = payload => {
  return { type: SELECT_TRACK, payload };
};

// Thunk
const selectTrack = id => {
  return dispatch => {
    dispatch(selectTrackAsync(id));
  };
};

export default selectTrack;
