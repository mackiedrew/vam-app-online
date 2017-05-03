// Action Types
import { SET_TRACK_GRAINS } from "../constants/actionTypes";

// Action Creator
const setTrackGrainsAsync = payload => ({ type: SET_TRACK_GRAINS, payload });

// Thunk
const setTrackGrains = (id, grains) => {
  const payload = { id, grains };
  return dispatch => {
    dispatch(setTrackGrainsAsync(payload));
  };
};

export default setTrackGrains;
