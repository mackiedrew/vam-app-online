// Action Types
import { ADD_TRACK } from "../constants/actionTypes";

// Actions
import generateNextTrackId from "./generateNextTrackId";
import selectTrack from "./selectTrack";

// Action Creator
const addTrackAsync = payload => {
  return { type: ADD_TRACK, payload };
};

// Thunk
const addTrack = trackObject => {
  return (dispatch, getState) => {
    const id = getState().tracks.nextTrackId;
    const newTrack = { [id]: trackObject };
    dispatch(addTrackAsync(newTrack));
    dispatch(generateNextTrackId());
    dispatch(selectTrack(id));
  };
};

export default addTrack;
