// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { CLEAR_MODAL } from "../constants/actionTypes";

/**
 * Action creator: removes existing modal data and type.
 * 
 * @returns {Object} Action: clears modal.
 */
const clearModal = (): Action => {
  return { type: CLEAR_MODAL };
};

export default clearModal;
