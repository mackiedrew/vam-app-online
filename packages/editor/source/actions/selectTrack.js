// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { SELECT_TRACK } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets selectedTrack to provided ID.
 * 
 * @param {string} trackId The track ID of the track you want to select.
 * @returns {Object} Action: sets selectedTrack to provided ID.
 */
const selectTrack = (trackId: string): Action => {
  return {
    type: SELECT_TRACK,
    payload: trackId
  };
};

export default selectTrack;
