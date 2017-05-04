// Action Type
import { SELECT_TRACK } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets selectedTrack to provided ID.
 * 
 * @param {string} payload The track ID of the track you want to select.
 * @returns {Object} Action: sets selectedTrack to provided ID.
 */
const selectTrack = payload => ({ type: SELECT_TRACK, payload });

export default selectTrack;
