// @flow

// Flow Types
import type { UIState, Action } from "../constants/flowTypes";

// Action Types
import { TOGGLE_SETTINGS_MENU } from "../constants/actionTypes";

// Initializing state
export const DEFAULT_STATE: UIState = {
  settingsOpen: false
};

const UIReducer = (state: UIState = DEFAULT_STATE, action: Action) => {
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
