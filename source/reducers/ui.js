import { TOGGLE_SETTINGS_MENU } from "../constants/actionTypes";

export const DEFAULT_STATE = {
  settingsOpen: false
};

const UIReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_MENU:
      return {
        ...state,
        settingsOpen: !state.settingsOpen
      };
    default:
      return state;
  }
};

export default UIReducer;
