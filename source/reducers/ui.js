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
        modalType: DEFAULT_STATE.modalType,
        modalData: DEFAULT_STATE.modalData
      };
    case MAKE_MODAL:
      return {
        ...state,
        modalType: payload.type,
        modalData: payload.data
      };
    default:
      return state;
  }
};

export default UIReducer;
