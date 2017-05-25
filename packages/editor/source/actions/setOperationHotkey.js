// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action
import { SET_OPERATION_HOTKEY } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets an operation to a new hotkey.
 * 
 * @param {string} operation The name of the operation to set the hotkey to.
 * @param {string} value The key or key combination which triggers the set event.
 * @returns {Object} Action: sets an operation to a new hotkey.
 */
const setOperationHotkey = (operation: string, value: string): Action => {
  return {
    type: SET_OPERATION_HOTKEY,
    payload: {
      operation,
      value
    }
  };
};

export default setOperationHotkey;
