// Action Types
import { SET_TRACK_LENGTH } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the length key of the specified track.
 * 
 * @param {string} trackId The id of track that will have it's length changed.
 * @param {string} length The length to set the specified track to.
 * @returns {Object} Action: sets the length key of the specified track.
 */
const setTrackLength = (trackId, length) => ({
  type: SET_TRACK_LENGTH,
  payload: { id: trackId, length }
});

export default setTrackLength;
