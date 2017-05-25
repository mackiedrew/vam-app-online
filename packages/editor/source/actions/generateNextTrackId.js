// @flow

// Flow Types
import type { Action, ThunkAction, Dispatch } from "../constants/flowTypes";

// Action Type
import { GENERATE_NEXT_TRACK_ID } from "../constants/actionTypes";

// Libraries
import { generate } from "shortid";

/**
 * Action creator: creates an action that sets the nextTrackID.
 * 
 * @param {string} id The id to set newTrackId to.
 * @returns {Object} Action: sets the nextTrackID.
 */
export const setNextTrackId = (id: string): Action => {
  return {
    type: GENERATE_NEXT_TRACK_ID,
    payload: id
  };
};

/**
 * Thunk: Generate a new track ID and set the state's newTrackId to that newly
 * generated ID.
 * 
 * @returns {Function} Action creator that generates new track id and sets it to
 * nextTrackId.
 */
const generateNextTrackId = (): ThunkAction => {
  const nextTrackId: string = generate();
  return (dispatch: Dispatch): void => {
    dispatch(setNextTrackId(nextTrackId));
  };
};

export default generateNextTrackId;
