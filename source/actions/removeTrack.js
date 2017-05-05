// Action Type
import { REMOVE_TRACK } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets a new track list to delete a track.
 * 
 * @param {Object} newTrackList An entire new track list to swap in for the old one.
 * @returns {Object} Action: removes track by setting the track list to a new object.
 */
export const removeTrackSimple = newTrackList => {
  return { type: REMOVE_TRACK, payload: newTrackList };
};

/**
 * Thunk: removes a track from the track list.
 * 
 * @param {Object} trackId Which track to remove by ID.
 * @returns {Function} Action creator that removes a track from the track list. 
 */
const removeTrack = trackId => {
  return (dispatch, getState) => {
    const { trackList } = getState().tracks;
    const trackIds = Object.keys(trackList);
    const filteredIds = trackIds.filter(id => trackId !== id);
    const newTrackList = filteredIds.reduce(
      (current, id) => ({ ...current, [id]: trackList[id] }),
      {}
    );
    dispatch(removeTrackSimple(newTrackList));
  };
};

export default removeTrack;
