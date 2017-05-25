// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { SET_TRACK_SAMPLE_RATE } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the sampleRate key of the specified track.
 * 
 * @param {string} trackId The id of track that will have it's sampleRate changed.
 * @param {string} sampleRate The sampleRate to set the specified track to.
 * @returns {Object} Action: sets the sampleRate key of the specified track.
 */
const setTrackSampleRate = (trackId: string, sampleRate: number): Action => ({
  type: SET_TRACK_SAMPLE_RATE,
  payload: { id: trackId, sampleRate }
});

export default setTrackSampleRate;
