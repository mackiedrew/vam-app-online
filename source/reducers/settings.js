import { CHANGE_SETTING_VALUE } from "../constants/actionTypes";

// Configuration file is the default state.
import config from "../config";

const DEFAULT_STATE = { ...config };

const SettingsReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
  case CHANGE_SETTING_VALUE:
    return {
      ...state,
      [payload.name]: payload.value
    };
  default:
    return state;
  }
};

export default SettingsReducer;
