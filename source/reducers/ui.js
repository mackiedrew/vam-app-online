import {
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  TOGGLE_SETTINGS,
  SHOW_FILTERS,
  HIDE_FILTERS,
  TOGGLE_FILTERS
} from "../actions/ui";

const DEFAULT_STATE = {
  settingsOpen: false,
  filtersOpen: false
};

const UIReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SHOW_SETTINGS:
    return {
      ...state,
      settingsOpen: true
    };
  case HIDE_SETTINGS:
    return {
      ...state,
      settingsOpen: false
    };
  case TOGGLE_SETTINGS:
    return {
      ...state,
      settingsOpen: !state.settingsOpen
    };
  case SHOW_FILTERS:
    return {
      ...state,
      filtersOpen: true
    };
  case HIDE_FILTERS:
    return {
      ...state,
      filtersOpen: false
    };
  case TOGGLE_FILTERS:
    return {
      ...state,
      filtersOpen: !state.filtersOpen
    };
  default:
    return state;
  }
};

export default UIReducer;
