// Action Types
import { SET_TRACK_SAMPLE_RATE } from "../constants/actionTypes";

// Action Creator
const setTrackSampleRateAsync = payload => ({
  type: SET_TRACK_SAMPLE_RATE,
  payload
});

// Thunk
const setTrackSampleRate = (id, sampleRate) => {
  const payload = { id, sampleRate };
  return dispatch => {
    dispatch(setTrackSampleRateAsync(payload));
  };
};

export default setTrackSampleRate;
