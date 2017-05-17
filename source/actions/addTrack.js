// @flow

// Flow Types
import type {
  Action,
  GetState,
  ThunkAction,
  Dispatch
} from "../constants/flowTypes";

// Action Type
import { ADD_TRACK } from "../constants/actionTypes";

// Actions
import generateNextTrackId from "./generateNextTrackId";
import selectTrack from "./selectTrack";

// Selectors

/**
 * Action creator: creates an action that adds a new track into the track list.
 * 
 * @param {Object} newTrack Object that contains one key
 * { [id]: {trackContents} }.
 * @returns {Object} Action: adds a new track into the track list.
 */
export const addTrackSimple = (newTrack: {}): Action => {
  return { type: ADD_TRACK, payload: newTrack };
};

/**
 * Thunk: Adds a new track objects, selects it, and generates a new track Id.
 * 
 * @param {Object} trackObject Initial contents of a track object at an Id.
 * @returns {Function} Action creator that handles all track adding actions.
 */
const addTrack = (trackObject: {}): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    const state = getState();
    const id: string = state.tracks.nextTrackId;
    const newTrack = { [id]: trackObject };
    dispatch(addTrackSimple(newTrack));
    dispatch(generateNextTrackId());
    dispatch(selectTrack(id));
  };
};

export default addTrack;
