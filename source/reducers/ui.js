import {
  TOGGLE_SETTINGS_MENU,
  TOGGLE_FILTERS_MENU
} from "../constants/actionTypes";

export const DEFAULT_STATE = {
  settingsOpen: false,
  filtersOpen: false
};

const UIReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_MENU:
      return {
        ...state,
        settingsOpen: !state.settingsOpen
      };
    case TOGGLE_FILTERS_MENU:
      return {
        ...state,
        filtersOpen: !state.filtersOpen
      };
    default:
      return state;
  }
};

export default UIReducer;
