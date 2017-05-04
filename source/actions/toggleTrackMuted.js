// Action Type
import { TOGGLE_TRACK_MUTED } from "../constants/actionTypes";

/**
 * Action creator: creates an action that toggles the tracks muted value.
 * 
 * @param {string} payload The track ID of the track you want mute toggled for.
 * @returns {Object} Action: toggles the tracks muted value.
 */
const toggleTrackMuted = payload => ({ type: TOGGLE_TRACK_MUTED, payload });

export default toggleTrackMuted;
