// @flow

// Flow Types
import type { Action, grainArray } from "../constants/flowTypes";

// Action Type
import { SET_TRACK_GRAINS } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the grains key of the specified
 * track.
 * 
 * @param {string} trackId The id of track that will have it's grains changed.
 * @param {Array} grains The grains to set the specified track to.
 * @returns {Object} Action: sets the grains key of the specified track.
 */
const setTrackGrains = (trackId: string, grains: grainArray): Action => {
  return {
    type: SET_TRACK_GRAINS,
    payload: { id: trackId, grains }
  };
};

export default setTrackGrains;
