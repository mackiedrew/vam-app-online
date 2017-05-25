// Actions Types
import {
  SET_OPERATION_HOTKEY,
  RESUME_CONTROLS,
  PAUSE_CONTROLS,
  AUGMENT_A_OFF,
  AUGMENT_A_ON,
  AUGMENT_B_OFF,
  AUGMENT_B_ON,
  AUGMENT_C_OFF,
  AUGMENT_C_ON
} from "../constants/actionTypes";

// Settings configuration file is the default state.
import hotkeys from "../constants/hotkeys";

// Initial State
export const DEFAULT_STATE = {
  hotkeys: hotkeys,
  controlsEnabled: false,
  augmentA: false,
  augmentB: false,
  augmentC: false
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
    case AUGMENT_A_OFF:
      return {
        ...state,
        augmentA: false
      };
    case AUGMENT_A_ON:
      return {
        ...state,
        augmentA: true
      };
    case AUGMENT_B_OFF:
      return {
        ...state,
        augmentB: false
      };
    case AUGMENT_B_ON:
      return {
        ...state,
        augmentB: true
      };
    case AUGMENT_C_OFF:
      return {
        ...state,
        augmentC: false
      };
    case AUGMENT_C_ON:
      return {
        ...state,
        augmentC: true
      };
    default:
      return state;
  }
};

export default KeyboardReducer;
