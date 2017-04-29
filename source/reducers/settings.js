import { RESET_SETTINGS, CHANGE_SETTING_VALUE } from "../actions/settings";

// Configuration file is the default state.
import config from "../config";

const DEFAULT_STATE = { ...config };

const SettingsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case RESET_SETTINGS:
    return DEFAULT_STATE;
  case CHANGE_SETTING_VALUE:
    return {
      ...state,
      [action.setting]: {
        ...state[action.setting],
        value: action.value,
      }
    };
  default:
    return state;
  }
};

export default SettingsReducer;
