// Action Types
import { REMOVE_TRACK } from "../constants/actionTypes";

// Action Creator
const removeTrackAsync = payload => {
  return { type: REMOVE_TRACK, payload };
};

// Thunk
const removeTrack = trackId => {
  return (dispatch, getState) => {
    const { trackList } = getState().tracks;
    const trackIds = Object.keys(trackList);
    const filteredIds = trackIds.filter(id => trackId !== id);
    const newTrackList = filteredIds.reduce(
      (current, id) => ({ ...current, [id]: trackList[id] }),
      {}
    );
    dispatch(removeTrackAsync(newTrackList));
  };
};

export default removeTrack;
