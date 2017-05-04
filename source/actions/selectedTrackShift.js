// Action Types
import { SELECTED_TRACK_SHIFT } from "../constants/actionTypes";

// Action Creator
const selectedTrackShiftAsync = payload => {
  return { type: SELECTED_TRACK_SHIFT, payload };
};

// Thunk
const selectedTrackShift = shift => {
  return (dispatch, getState) => {
    const { selectedTrack, trackList } = getState().tracks;
    const trackIds = Object.keys(trackList);
    const maxTrackIndex = trackIds.length - 1;
    const currentlySelectedTrackIndex = trackIds.indexOf(selectedTrack);
    const targetTrackId = currentlySelectedTrackIndex + shift;
    const newSelectedTrackIndex = targetTrackId % maxTrackIndex;
    const newSelectedTrackId = trackIds[newSelectedTrackIndex];
    dispatch(selectedTrackShiftAsync(newSelectedTrackId));
  };
};

export default selectedTrackShift;
