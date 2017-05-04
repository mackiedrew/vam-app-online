// Action Type
import { ADD_TRACK } from "../constants/actionTypes";

// Actions
import generateNextTrackId from "./generateNextTrackId";
import selectTrack from "./selectTrack";

// Action Creator
export const addTrackSimple = payload => {
  return { type: ADD_TRACK, payload };
};

// Thunk
const addTrack = trackObject => {
  return (dispatch, getState) => {
    const id = getState().tracks.nextTrackId;
    const newTrack = { [id]: trackObject };
    dispatch(addTrackSimple(newTrack));
    dispatch(generateNextTrackId());
    dispatch(selectTrack(id));
  };
};

export default addTrack;
