// Action Type
import { ADD_TRACK } from "../constants/actionTypes";

// Actions
import generateNextTrackId from "./generateNextTrackId";
import selectTrack from "./selectTrack";

/**
 * Action creator: creates an action that adds a new track into the track list.
 * 
 * @param {Object} newTrack Object that contains one key { [id]: {trackContents} }.
 * @returns {Object} Action: adds a new track into the track list.
 */
export const addTrackSimple = newTrack => {
  return { type: ADD_TRACK, payload: newTrack };
};

/**
 * Thunk: Adds a new track objects, selects it, and generates a new track Id.
 * 
 * @param {Object} trackObject Initial contents of a track object at an Id.
 * @returns {Function} Action creator that handles all track adding actions.
 */

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
