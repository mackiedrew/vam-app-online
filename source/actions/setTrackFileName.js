// Action Type
import { SET_TRACK_FILE_NAME } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the fileName key of the specified track.
 * 
 * @param {string} trackId The id of track that will have it's file name changed.
 * @param {string} fileName The file name to set the specified track to.
 * @returns {Object} Action: sets the fileName key of the specified track.
 */
const setTrackFileName = (trackId, fileName) => ({
  type: SET_TRACK_FILE_NAME,
  payload: { id: trackId, fileName }
});

export default setTrackFileName;
