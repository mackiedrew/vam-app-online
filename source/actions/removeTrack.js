// @flow

// Flow Types
import type { ReduxAction } from "../constants/flowTypes";

// Action Type
import { REMOVE_TRACK } from "../constants/actionTypes";

// Actions
import selectTrack from "./selectTrack";

// Selectors
import trackIdArray from "../selectors/trackIdArray";

// Helpers
import { clamp } from "../help/generic";

/**
 * Action creator: creates an action that sets a new track list to delete a
 * track.
 * 
 * @param {Object} newTrackList An entire new track list to swap in for the old
 * one.
 * @returns {Object} Action: removes track by setting the track list to a new
 * object.
 */
export const removeTrackSimple = (newTrackList: Object): ReduxAction => {
  return { type: REMOVE_TRACK, payload: newTrackList };
};

/**
 * Thunk: removes a track from the track list.
 * 
 * @param {string} trackId Which track to remove by ID.
 * @returns {Function} Action creator that removes a track from the track list. 
 */
const removeTrack = (trackId: string) => {
  return (dispatch: Function, getState: Function) => {
    // Get a list of existing tracks.
    const state = getState();
    const trackIds = trackIdArray(state);
    const { trackList, selectedTrack } = state.tracks;

    // Reconstruct a whole new track list to avoid mutation.
    const filteredIds = trackIds.filter(id => trackId !== id);
    const newTrackList = filteredIds.reduce(
      (current, id) => ({ ...current, [id]: trackList[id] }),
      {}
    );
    dispatch(removeTrackSimple(newTrackList));

    if (trackId === selectedTrack) {
      const trackListLength: number = trackIds.length;
      // Track list length will be one higher than the max index.
      const oldMaxIndex: number = trackListLength - 1;
      // The new list is always one entry smaller.
      const newMaxIndex: number = oldMaxIndex - 1;
      // Find the index of the old track so we can find the best replacement.
      const removedTrackIndex: number = trackIds.indexOf(trackId);
      // Try for the previous index, if out of bounds fall to the first or last.
      const nextTrackId: number = clamp(removedTrackIndex, 0, newMaxIndex);
      // Select the actual track ID rather than just the index.
      const nextTrack: string = filteredIds[nextTrackId];
      dispatch(selectTrack(nextTrack));
    }
  };
};

export default removeTrack;
