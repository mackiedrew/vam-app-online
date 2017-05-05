// Action Types
import { SET_TRACK_MAX_AMPLITUDE } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the maxAmplitude key of the specified track.
 * 
 * @param {string} trackId The id of track that will have it's maxAmplitude changed.
 * @param {string} maxAmplitude The maxAmplitude to set the specified track to.
 * @returns {Object} Action: sets the maxAmplitude key of the specified track.
 */
const setTrackMaxAmplitude = (trackId, maxAmplitude) => ({
  type: SET_TRACK_MAX_AMPLITUDE,
  payload: { id: trackId, maxAmplitude }
});

export default setTrackMaxAmplitude;
