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

<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
/**
 * Reduces actions related to the user interface (UI).
 * 
 * @param {Object} state Current state of this section of reducer.
 * @param {Object} action Action to be placed into store and resolved. Must
 * contain the `type` key. May contain the `payload` key.
 */
=======
>>>>>>> :spakles: Added modals! Only one so far
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
<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
        // Reset modal to the empty modal that starts off the state.
=======
>>>>>>> :spakles: Added modals! Only one so far
        modalType: DEFAULT_STATE.modalType,
        modalData: DEFAULT_STATE.modalData
      };
    case MAKE_MODAL:
      return {
        ...state,
<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
        // Reassign state values to payload values.
=======
>>>>>>> :spakles: Added modals! Only one so far
        modalType: payload.type,
        modalData: payload.data
      };
    default:
      return state;
  }
};

export default UIReducer;
