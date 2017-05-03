// Action Types
import { SET_TRACK_FILE_NAME } from "../constants/actionTypes";

// Action Creator
const setTrackFileNameAsync = payload => ({
  type: SET_TRACK_FILE_NAME,
  payload
});

// Thunk
const setTrackFileName = (id, fileName) => {
  const payload = { id, fileName };
  return dispatch => {
    dispatch(setTrackFileNameAsync(payload));
  };
};

export default setTrackFileName;
