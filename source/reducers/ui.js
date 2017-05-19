// Action Types
import {
  TOGGLE_SETTINGS_MENU,
  CLEAR_MODAL,
  MAKE_MODAL
} from "../constants/actionTypes";

// Initializing state
export const DEFAULT_STATE = {
  settingsOpen: false,
  modalType: "NONE",
  modalData: {}
};

/**
 * Reduces actions related to the user interface (UI).
 * 
 * @param {Object} state Current state of this section of reducer.
 * @param {Object} action Action to be placed into store and resolved. Must
 * contain the `type` key. May contain the `payload` key.
 */
const UIReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTINGS_MENU:
      return {
        ...state,
        settingsOpen: !state.settingsOpen
      };
    case CLEAR_MODAL:
      return {
        ...state,
        // Reset modal to the empty modal that starts off the state.
        modalType: DEFAULT_STATE.modalType,
        modalData: DEFAULT_STATE.modalData
      };
    case MAKE_MODAL:
      return {
        ...state,
        // Reassign state values to payload values.
        modalType: payload.type,
        modalData: payload.data
      };
    default:
      return state;
  }
};

export default UIReducer;
