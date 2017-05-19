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

<<<<<<< 772402a3454b26110ad4f1dbaaee916ec20ea809
<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
=======
>>>>>>> :memo::bug: Added missing docs and fixed binding bug
/**
 * Reduces actions related to the user interface (UI).
 * 
 * @param {Object} state Current state of this section of reducer.
 * @param {Object} action Action to be placed into store and resolved. Must
 * contain the `type` key. May contain the `payload` key.
 */
<<<<<<< 772402a3454b26110ad4f1dbaaee916ec20ea809
=======
>>>>>>> :spakles: Added modals! Only one so far
=======
>>>>>>> :memo::bug: Added missing docs and fixed binding bug
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
<<<<<<< 772402a3454b26110ad4f1dbaaee916ec20ea809
<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
        // Reset modal to the empty modal that starts off the state.
=======
>>>>>>> :spakles: Added modals! Only one so far
=======
        // Reset modal to the empty modal that starts off the state.
>>>>>>> :memo::bug: Added missing docs and fixed binding bug
        modalType: DEFAULT_STATE.modalType,
        modalData: DEFAULT_STATE.modalData
      };
    case MAKE_MODAL:
      return {
        ...state,
<<<<<<< 772402a3454b26110ad4f1dbaaee916ec20ea809
<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
        // Reassign state values to payload values.
=======
>>>>>>> :spakles: Added modals! Only one so far
=======
        // Reassign state values to payload values.
>>>>>>> :memo::bug: Added missing docs and fixed binding bug
        modalType: payload.type,
        modalData: payload.data
      };
    default:
      return state;
  }
};

export default UIReducer;
