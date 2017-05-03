// Action Types
import { GENERATE_NEXT_TRACK_ID } from "../constants/actionTypes";

// Libraries
import { generate } from "shortid";

// Action Creator
const generateNextTrackIdAsync = payload => {
  return { type: GENERATE_NEXT_TRACK_ID, payload };
};

// Thunk
const generateNextTrackId = () => {
  const nextTrackId = generate();
  return dispatch => {
    dispatch(generateNextTrackIdAsync(nextTrackId));
  };
};

export default generateNextTrackId;
