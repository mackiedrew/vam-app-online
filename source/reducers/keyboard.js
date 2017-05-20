// Actions Types
import {
  SET_OPERATION_HOTKEY,
  RESUME_CONTROLS,
  PAUSE_CONTROLS
} from "../constants/actionTypes";

// Settings configuration file is the default state.
import hotkeys from "../constants/hotkeys";

// Initial State
export const DEFAULT_STATE = {
  hotkeys: hotkeys,
  controlsEnabled: false
};

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
        hotkeys: {
          ...state.hotkeys,
          [payload.operation]: {
            ...state.hotkeys[payload.operation],
            value: payload.value
          }
        }
      };
    case RESUME_CONTROLS:
      return {
        ...state,
        controlsEnabled: true
      };
    case PAUSE_CONTROLS:
      return {
        ...state,
        controlsEnabled: false
      };
    default:
      return state;
  }
};

export default KeyboardReducer;
