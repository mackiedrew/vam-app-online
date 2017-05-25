// Actions
import { CHANGE_SETTING_VALUE } from "../constants/actionTypes";

// Settings configuration file is the default state.
import settings from "../constants/settings";

// Initial State
export const DEFAULT_STATE = { ...settings };

/**
 * Reduces action into the state of the object.
 * 
 * @param {Object} state Current state of the reducer in local scope.
 * @param {Object} action Action to be applied to the reducer.
 * @returns {Object} New state object, updated with action.
 */
const SettingsReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_SETTING_VALUE:
      return {
        ...state,
        [payload.setting]: {
          ...state[payload.setting],
          value: payload.value
        }
      };
    default:
      return state;
  }
};

export default SettingsReducer;
