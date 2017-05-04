import { SET_SEEK_POSITION } from "../constants/actionTypes";

// Action Creator
const setSeekPositionAsync = position => {
  return {
    type: SET_SEEK_POSITION,
    payload: position
  };
};

// Thunk
const setSeekPosition = position => {
  return dispatch => {
    dispatch(setSeekPositionAsync(position));
  };
};

export default setSeekPosition;
