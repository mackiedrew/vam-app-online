// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { TOGGLE_TRACK_MUTED } from "../constants/actionTypes";

/**
 * Action creator: creates an action that toggles the tracks muted value.
 * 
 * @param {string} trackId The track ID of the track you want mute toggled for.
 * @returns {Object} Action: toggles the tracks muted value.
 */
const toggleTrackMuted = (trackId: string): Action => {
  return { type: TOGGLE_TRACK_MUTED, payload: trackId };
};

export default toggleTrackMuted;
