// Actions Types
import { SET_OPERATION_HOTKEY } from "../constants/actionTypes";

// Settings configuration file is the default state.
import hotkeys from "../constants/hotkeys";

// Initial State
export const DEFAULT_STATE = { ...hotkeys };

/**
 * Reduces action into the state of the object.
 * 
 * @param {Object} state Current state of the reducer in local scope.
 * @param {Object} action Action to be applied to the reducer.
 * @returns {Object} New state object, updated with action.
 */
const KeyboardReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_OPERATION_HOTKEY:
      return {
        ...state,
        [payload.operation]: {
          ...state[payload.operation],
          value: payload.value
        }
      };
    default:
      return state;
  }
};

export default KeyboardReducer;
