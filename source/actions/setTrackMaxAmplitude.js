// Action Types
import { SET_TRACK_MAX_AMPLITUDE } from "../constants/actionTypes";

// Action Creator
const setTrackMaxAmplitudeAsync = payload => ({
  type: SET_TRACK_MAX_AMPLITUDE,
  payload
});

// Thunk
const setTrackMaxAmplitude = (id, maxAmplitude) => {
  const payload = { id, maxAmplitude };
  return dispatch => {
    dispatch(setTrackMaxAmplitudeAsync(payload));
  };
};

export default setTrackMaxAmplitude;
