// Action Types
import { SET_TRACK_LENGTH } from "../constants/actionTypes";

// Action Creator
const setTrackLengthAsync = payload => ({ type: SET_TRACK_LENGTH, payload });

// Thunk
const setTrackLength = (id, length) => {
  const payload = { id, length };
  return dispatch => {
    dispatch(setTrackLengthAsync(payload));
  };
};

export default setTrackLength;
