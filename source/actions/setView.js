// Action Type
import { SET_VIEW } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the current view.
 * 
 * @param {string} view View containing start and end.
 * @returns {Object} Action: sets the current view.
 */
const setView = view => {
  return {
    type: SET_VIEW,
    payload: view
  };
};

export default setView;
