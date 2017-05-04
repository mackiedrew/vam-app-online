// Action Type
import { GENERATE_NEXT_TRACK_ID } from "../constants/actionTypes";

// Libraries
import { generate } from "shortid";

/**
 * Action creator: creates an action that sets the nextTrackID.
 * @param {String} id The id to set newTrackId to.
 * @returns {Object} Action: sets the nextTrackID.
 */
export const setNextTrackId = id => ({
  type: GENERATE_NEXT_TRACK_ID,
  payload: id
});

/**
 * This is a redux thunk.
 * Generate a new track ID and set the state's newTrackId to that newly generated ID.
 */
const generateNextTrackId = () => {
  const nextTrackId = generate();
  return dispatch => {
    dispatch(setNextTrackId(nextTrackId));
  };
};

export default generateNextTrackId;
