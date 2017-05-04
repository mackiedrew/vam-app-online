// Action Types
import { SHIFT_SEEK_POSITION } from "../constants/actionTypes";

// Action Creator
const shiftSeekPositionAsync = payload => ({
  type: SHIFT_SEEK_POSITION,
  payload
});

// Thunk
const shiftSeekPosition = shift => {
  return dispatch => {
    dispatch(shiftSeekPositionAsync(shift));
  };
};

export default shiftSeekPosition;
